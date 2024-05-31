import SignInForm from "@/helper/components/forms/SignIn";
import Navbar from "../shared/Navbar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/helper/components/ui/card";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/helper/components/ui/form";
import { Input } from "@/helper/components/ui/input";
import { Form, useForm } from "react-hook-form";
import { signInFormSchema } from "@/helper/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export default function Page() {
    const form = useForm<z.infer<typeof signInFormSchema>>({
        resolver: zodResolver(signInFormSchema),
        defaultValues: {
          username: "",
          password: "",
        },
      });
    return (
        <Card className="dark:background-light700_dark300 w-[500px] dark:text-light-900">
            <CardHeader>
                <CardTitle className="text-xl">Sign In</CardTitle>
                <CardDescription className="pt-5">
                    Enter your username and password below to login to your account.
                </CardDescription>
            </CardHeader>
            <CardContent className="mt-[-1.5rem]">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex w-full flex-col items-center gap-2"
                    >
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem className="flex w-full flex-col">
                                    <FormLabel className="paragraph-semibold">Username</FormLabel>
                                    <FormControl className="mt-2 mb-3">
                                        <Input
                                            type="username"
                                            className="no-focus paragraph-regular background-light700_dark300 light-border-2 text-dark300_light700 min-h-[56px] border dark:border-4 dark:border-white p-2"
                                            placeholder="Enter your username"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-red-500" />
                                </FormItem>
                            )}
                        />
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}