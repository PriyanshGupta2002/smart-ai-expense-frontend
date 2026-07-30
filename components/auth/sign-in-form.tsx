"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { z } from "zod";

import { useLogin } from "@/hooks/use-auth";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const signInSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Enter a valid email address."),

  password: z.string().min(1, "Password is required."),
});

type SignInValues = z.infer<typeof signInSchema>;

const SignInForm = () => {
  const router = useRouter();

  const { mutate: login, isPending, error } = useLogin();

  const form = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SignInValues) => {
    login(data, {
      onSuccess: () => {
        router.push("/dashboard");
      },
    });
  };

  return (
    <Card className="w-full max-w-md shadow-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Welcome back</CardTitle>

        <CardDescription>
          Sign in to continue managing your expenses.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form id="sign-in-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email</FieldLabel>

                  <Input
                    {...field}
                    id={field.name}
                    type="email"
                    placeholder="john@example.com"
                    autoComplete="email"
                    aria-invalid={fieldState.invalid}
                    disabled={isPending}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex items-center justify-between">
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                    <Link
                      href="/forgot-password"
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <Input
                    {...field}
                    id={field.name}
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    aria-invalid={fieldState.invalid}
                    disabled={isPending}
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {error && (
              <p className="text-sm text-destructive">
                Invalid email or password.
              </p>
            )}
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        <Button
          type="submit"
          form="sign-in-form"
          className="w-full"
          disabled={isPending}
        >
          {isPending && <Loader2 className="size-4 animate-spin" />}

          {isPending ? "Signing in..." : "Sign in"}
        </Button>

        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-foreground hover:underline"
          >
            Create account
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignInForm;
