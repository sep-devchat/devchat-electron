import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormRow } from '@/app/components/ui/form'
import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/app/components/ui/card'

const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(50, { message: "Username must be at most 50 characters" }),

  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be at most 255 characters" }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(128, { message: "Password must be at most 128 characters" })
    .refine((val) => /[a-z]/.test(val), {
      message: "Password must contain at least 1 lowercase letter",
    })
    .refine((val) => /[A-Z]/.test(val), {
      message: "Password must contain at least 1 uppercase letter",
    })
    .refine((val) => /\d/.test(val), {
      message: "Password must contain at least 1 number",
    })
    .refine((val) => /[^A-Za-z0-9]/.test(val), {
      message: "Password must contain at least 1 symbol",
    }),

  firstName: z
    .string()
    .trim()
    .min(1, { message: "First name is required" })
    .max(100, { message: "First name must be at most 100 characters" }),

  lastName: z
    .string()
    .trim()
    .min(1, { message: "Last name is required" })
    .max(100, { message: "Last name must be at most 100 characters" }),

  avatarUrl: z
    .string()
    .trim()
    .url({ message: "avatarUrl must be a valid URL" })
    .optional()
    .or(z.literal("").transform(() => undefined)),

  timezone: z
    .string()
    .trim()
    .max(50, { message: "Timezone must be at most 50 characters" })
    .optional()
    .or(z.literal("").transform(() => undefined)),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const Route = createFileRoute('/auth/register')({
  component: RouteComponent,
})

function RouteComponent() {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = form.handleSubmit((values) => {
    // TODO: wire to backend register API
    console.log('Register submit', values)
  })

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/40 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>Fill in the details below to register.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="jane.doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormRow names={["firstName", "lastName"]} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input placeholder="Jane" {...field} />
                      </FormControl>
                      <FormMessage reserveSpace="row" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage reserveSpace="row" />
                    </FormItem>
                  )}
                />
              </FormRow>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="jane@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="P@ssw0rd!" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="avatarUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Avatar URL (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="https://cdn.example.com/avatars/jane.png" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="timezone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Timezone (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="America/Los_Angeles" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end pt-2">
                <Button type="submit">Create account</Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  )
}
