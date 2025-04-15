"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import FormField from "./FormField"
import { useRouter } from "next/navigation"
import { auth } from "@/firebase/client"
import { signIn, signUp } from "@/lib/actions/auth.action"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"

const authFormSchema = (type: FormType) => {
    return z.object({
        name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(3),
    });
};

const AuthForm = ({ type }: { type: FormType }) => {
    const router = useRouter();
    const formSchema = authFormSchema(type);
    let isSignIn = type === "sign-in";

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (type === "sign-in") {

                const { email, password } = values;

                const userCredentials = await signInWithEmailAndPassword(auth, email, password);
                const idToken = await userCredentials.user.getIdToken();

                if(!idToken){
                    toast.error('Sign in failed.')
                    return;
                }

                await signIn({
                    email, idToken
                })

                toast.success("Sing In Successfull");
                router.push("/");
            } else {

                const { name, email, password } = values;

                const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

                const result = await signUp({
                    uid: userCredentials.user.uid,
                    name: name!,
                    email,
                    password 
                })

                if(!result?.success){
                    toast.message(result?.message);
                    return;
                }

                toast.success("Sing Up Successful, Please Sign In");
                router.push("/sign-in");
                console.log("Sign up : ", values)
            }
        } catch (error) {
            toast.error(`We got an error ${error}`)
        }
    }

    return (
        <div className="card-border lg:min-w-[566px]">
            <div className="flex flex-col gap-3 card py-14 px-10 items-center">
                <div className="flex flex-row gap-4 justify-center">
                    <Image src="/logo.svg" alt="logo" height={32} width={38} />
                    <h2 className="text-primary-100">Agent-AI</h2>
                </div>
                <h3 className="text-2xl text-center">Practies Job interview with AI</h3>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8 mt-4">
                        {!isSignIn && (
                            <FormField<z.infer<typeof formSchema>>
                                name="name"
                                control={form.control}
                                label="Name"
                                placeholder="Enter your name"
                                type="text"
                            />
                        )}

                        <FormField<z.infer<typeof formSchema>>
                            name="email"
                            control={form.control}
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                        />

                        <FormField<z.infer<typeof formSchema>>
                            name="password"
                            control={form.control}
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                        />

                        <Button type="submit" className="!w-full !bg-primary-200 !text-dark-100 hover:!bg-primary-200/80 !rounded-full !min-h-10 !font-bold !px-5 cursor-pointer">{isSignIn ? "Sign-In" : "Create an Account"}</Button>
                    </form>
                </Form>
                <p className="text-center">
                    {isSignIn ? "No account yet?" : "Have an account Already?"}
                    <Link href={!isSignIn ? "/sign-in" : "/sign-up"} className="font-bold text-user-primary ml-1" >{!isSignIn ? "Sing In" : "Sign Up"}</Link>
                </p>
            </div>
        </div>
    )
}

export default AuthForm