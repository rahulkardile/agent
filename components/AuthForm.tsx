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

const authFormSchema = (type: FormType) => {
    return z.object({
      name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
      email: z.string().email(),
      password: z.string().min(3),
    });
  };

const AuthForm = ({ type } : { type: FormType }) => {
    const router = useRouter();
    const formSchema = authFormSchema(type);
    let isSingIn = type === "sign-in";

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email:"",
            password: ""
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log("test onSubmit");
        
        try {
            if(type === "sign-in"){
                toast.success("Sing In Successfull");
                router.push("/");
                console.log("Sign in : ", values)
            }else{
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
                        {!isSingIn && (<FormField name="name" control={form.control} lable="Name" placeholder="Enter your name" type="text" />)}
                        <FormField name="Email" control={form.control} lable="Email" placeholder="Enter your Email" type="email" />
                        <FormField name="password" control={form.control} lable="Password" placeholder="Enter your password" type="password" />                        
                        <Button type="submit" className="!w-full !bg-primary-200 !text-dark-100 hover:!bg-primary-200/80 !rounded-full !min-h-10 !font-bold !px-5 cursor-pointer">{isSingIn ? "Sign-In" : "Create an Account"}</Button>
                    </form>
                </Form>
                <p className="text-center">
                    {isSingIn ? "No account yet?" : "Have an account Already?"}
                    <Link href={!isSingIn ? "/sign-in" : "/sign-up" } className="font-bold text-user-primary ml-1" >{!isSingIn ? "Sing In" : "Sign Up"}</Link>
                </p>
            </div>
        </div>
    )
}

export default AuthForm