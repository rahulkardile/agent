"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"

const authFormSchema = (type: FormType) => {
    return z.object({
      name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
      email: z.string().email(),
      password: z.string().min(3),
    });
  };

const AuthForm = ({ type } : { type: FormType }) => {

    let isSingIn = type === "sign-in";

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
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
                        {!isSingIn && <p>Name</p>}
                        <p>Email</p>
                        <p>Password</p>
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