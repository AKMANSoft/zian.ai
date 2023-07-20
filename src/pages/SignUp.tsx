import { cn } from "@/lib/utils";
import MainLayout from "../components/layout";
import { Input, InputEl } from "@/components/ui/input";
import { PrimaryBtn } from "@/components/ui/buttons";
import Anchor from "@/components/ui/anchor-link";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod"
import { SignUpFormSchema, signUpFormSchema } from "@/types/forms.types";
import GrBorderBox from "@/components/ui/gr-border-box";
import { useState } from "react";
import { TextAreaEl } from "@/components/ui/textarea";
import SelectEl from "@/components/ui/selectel";


export default function SignUpPage() {
    const [currentStep, setCurrentStep] = useState<"SIGNUP" | "ONBOARDING">()
    const form = useForm<SignUpFormSchema>({
        resolver: zodResolver(signUpFormSchema),
        mode: "all",
        reValidateMode: "onChange"
    })


    return (
        <MainLayout secure={false}>
            <div className="flex flex-col items-center justify-center py-20">
                <GrBorderBox className="p-[2px] rounded-20 w-full max-w-[500px] shadow-xl">
                    <div className={cn(
                        "transform overflow-hidden rounded-20 bg-gr-purple-dark",
                        "relative"
                    )}>
                        {
                            currentStep === "ONBOARDING" ?
                                <GrBorderBox>
                                    <div className="md:px-8 py-[30px] max-h-[calc(100vh_-_200px)] rounded-20 bg-gr-purple-dark">
                                        {/* content */}
                                        <img src="/images/avatar.png" width={100} height={100} loading="lazy"
                                            className={cn(
                                                "w-[100px] h-auto aspect-square rounded-full overflow-hidden mx-auto",
                                                "block"
                                            )}
                                            alt="" />
                                        <div className="font-nebula text-white text-center text-2xl font-normal mt-5">
                                            Customize ZIAN
                                            <br />Ai for your business
                                        </div>
                                        <div className="p-3 lg:p-5 lg:pt-8 space-y-[10px]">
                                            <InputEl label="Your Website Link" placeholder="" />
                                            <SelectEl
                                                className="w-full"
                                                labelNode={
                                                    <label className="w-full flex items-center justify-between text-start flex-wrap gap-1 mb-2">
                                                        <p className="text-white font-bold text-sm w-full md:w-auto">
                                                            Your Industry
                                                        </p>
                                                    </label>
                                                }
                                                options={[
                                                    {
                                                        text: "Select industry",
                                                        value: "Select industry",
                                                        disabled: false
                                                    },
                                                ]} />
                                            <TextAreaEl
                                                labelNode={
                                                    <label className="w-full flex items-center justify-between">
                                                        <p className="text-white text-sm font-bold">
                                                            Your target SEO search keywords (up to 5)
                                                        </p>
                                                    </label>
                                                }
                                                placeholder="Enter keyword and press enter" />
                                            <div className="flex justify-between">
                                                <div></div>
                                                <div>
                                                    <PrimaryBtn className="py-3 h-full px-6 md:w-auto">
                                                        Submit & Complete Sign up
                                                    </PrimaryBtn>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </GrBorderBox>
                                :
                                <Form {...form}>
                                    <form method="POST">
                                        <div className="px-4 md:px-8 py-[30px] ">
                                            {/* content */}
                                            <img src="/images/avatar.png" width={100} height={100} loading="lazy"
                                                className={cn(
                                                    "w-[100px] h-auto aspect-square rounded-full overflow-hidden mx-auto",
                                                    "block"
                                                )}
                                                alt="" />
                                            <div className="font-nebula text-white text-center text-2xl font-normal mt-5">
                                                Sign Up
                                            </div>
                                            <div className="lg:py-5 lg:pt-8 space-y-[10px] md:text-sm text-xs">
                                                <FormField
                                                    control={form.control}
                                                    name="name"
                                                    render={({ field, fieldState }) => (
                                                        <FormItem>
                                                            <FormLabel>Name</FormLabel>
                                                            <FormControl>
                                                                <Input type="text" autoComplete="name" {...field} />
                                                            </FormControl>
                                                            {
                                                                fieldState.error &&
                                                                <FormMessage>
                                                                    {fieldState.error?.message}
                                                                </FormMessage>
                                                            }
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="email"
                                                    render={({ field, fieldState }) => (
                                                        <FormItem>
                                                            <FormLabel>Email</FormLabel>
                                                            <FormControl>
                                                                <Input type="email" autoComplete="email" {...field} />
                                                            </FormControl>
                                                            {
                                                                fieldState.error &&
                                                                <FormMessage>
                                                                    {fieldState.error?.message}
                                                                </FormMessage>
                                                            }
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="phone"
                                                    render={({ field, fieldState }) => (
                                                        <FormItem>
                                                            <FormLabel>Phone</FormLabel>
                                                            <FormControl>
                                                                <Input type="number" autoComplete="tel" {...field} />
                                                            </FormControl>
                                                            {
                                                                fieldState.error &&
                                                                <FormMessage>
                                                                    {fieldState.error?.message}
                                                                </FormMessage>
                                                            }
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="password"
                                                    render={({ field, fieldState }) => (
                                                        <FormItem>
                                                            <FormLabel>Password</FormLabel>
                                                            <FormControl>
                                                                <Input type="password" autoComplete="password" {...field} />
                                                            </FormControl>
                                                            {
                                                                fieldState.error &&
                                                                <FormMessage>
                                                                    {fieldState.error?.message}
                                                                </FormMessage>
                                                            }
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <div className="flex justify-between mb-[30px] mt-5">
                                                <div className="">
                                                    <p className="font-jakarta text-xs md:text-sm font-bold text-white">
                                                        Already have an account?
                                                    </p>
                                                    <a href="" className="font-jakarta text-xs md:text-sm font-bold text-primary underline">
                                                        Login here
                                                    </a>
                                                </div>
                                                <div>
                                                    <PrimaryBtn
                                                        type="button"
                                                        onClick={() => setCurrentStep("ONBOARDING")}
                                                        className="py-3 h-full px-6 md:w-auto ">
                                                        Sign Up
                                                    </PrimaryBtn>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </Form>
                        }
                    </div>
                </GrBorderBox>
                {
                    currentStep === "SIGNUP" &&
                    <div className="max-w-sm mt-5">
                        <p className="text-sm text-center font-jakarta">
                            By signing up or using Zian AI service, you agree to be bound by the <Anchor href="/terms">Terms of Service</Anchor> and <Anchor href="/privacy">Privacy Policy</Anchor>
                        </p>
                    </div>
                }
            </div>
        </MainLayout>
    );
}


