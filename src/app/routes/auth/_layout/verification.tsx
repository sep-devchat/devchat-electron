import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/app/components/ui/input-otp";
import { ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";

const formSchema = z.object({
  code: z.string().min(4, { message: "Verification code must be 4 digits" }),
});

type FormData = z.infer<typeof formSchema>;

export const Route = createFileRoute("/auth/_layout/verification")({
  component: RouteComponent,
});

function RouteComponent() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    // Handle form submission here
    toast.success("Code verified successfully!");
  };

  return (
    <div className="relative">
      {/* Back Icon - Positioned absolutely in top-left */}
      <Link
        to="/auth/login"
        className="absolute top-4 left-4 z-10 p-2 bg-[#133E87] hover:bg-gray-100 rounded-full transition-colors"
      >
        <ArrowLeft className="w-6 h-6 text-white hover:text-black" />
      </Link>

      <Card className="w-xl">
        <div className="flex flex-col gap-10 pl-30 pr-30 pt-6 pb-6">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-[#133E87]">
              Verification
            </CardTitle>
            <CardDescription className="text-center text-gray-500">
              Enter Verification Code
            </CardDescription>
          </CardHeader>

          <CardContent className="flex justify-center">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center">
                      <FormControl>
                        <InputOTP {...field} maxLength={4}>
                          <InputOTPGroup className="gap-5">
                            <InputOTPSlot
                              index={0}
                              className="w-12 h-12 border-2 rounded-xs"
                            />
                            <InputOTPSlot
                              index={1}
                              className="w-12 h-12 border-2"
                            />
                            <InputOTPSlot
                              index={2}
                              className="w-12 h-12 border-2"
                            />
                            <InputOTPSlot
                              index={3}
                              className="w-12 h-12 border-2"
                            />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button
              onClick={form.handleSubmit(onSubmit)}
              className="w-full bg-[#133E87] text-white p-3 rounded hover:bg-[#0f2f6b]"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Verifying..." : "Send"}
            </Button>

            <p className="text-center text-sm text-gray-500">
              If you didn't receive a code,{" "}
              <button
                type="button"
                className="text-[#133E87] hover:underline font-medium"
                onClick={() => toast.info("Resending code...")}
              >
                Resend
              </button>
            </p>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}
