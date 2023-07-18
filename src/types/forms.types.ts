import * as z from 'zod'

export const signUpFormSchema = z.object({
    name: z.string().nonempty("Name required."),
    email: z.string().nonempty("Email required.").email("Please enter a valid email address."),
    phone: z.string().nonempty("Phone number required."),
    password: z.string().nonempty("Password required.").min(8, "Password must contain atleast 8 characters."),
})

export type SignUpFormSchema = z.infer<typeof signUpFormSchema>

export const loginFormSchema = z.object({
    email: z.string().nonempty("Email required.").email("Please enter a valid email address."),
    password: z.string().nonempty("Password required.").min(7, "Password must contain atleast 8 characters."),
})
export type LoginFormSchema = z.infer<typeof loginFormSchema>
