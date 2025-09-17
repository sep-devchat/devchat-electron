import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/components/ui/form";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.email({ message: "Invalid email address" }),
});

type FormData = z.infer<typeof formSchema>;

export const Route = createFileRoute("/auth/_layout/forgotPassword")({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    // Handle form submission here
    toast.success("If an account with that email exists, a reset link has been sent.");
  };

  return (
    <Card className="flex flex-col w-full gap-[40px]">
      <CardHeader>
        <CardTitle className="text-center text-4xl font-bold">
          Forgot Password?
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-gray-700">
                    Your email <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="example@email.com"
                      className="mt-1"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>

      <CardFooter className="flex flex-col gap-[40px]">
        <Button 
          onClick={form.handleSubmit(onSubmit)}
          className="w-full bg-[#133E87] text-white p-3 rounded hover:bg-[#0f2f6b]"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Sending..." : "Send Reset Link"}
        </Button>
        <Button variant="ghost">
          <a href="/auth/_layout/login">Back to Sign In</a>
        </Button>
      </CardFooter>
    </Card>
  );
}