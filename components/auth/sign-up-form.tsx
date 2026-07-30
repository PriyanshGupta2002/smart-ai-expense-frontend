"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { z } from "zod";

import { useRegister } from "@/hooks/use-auth";

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
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const signUpSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(1, "First name is required.")
    .max(50, "First name is too long."),

  last_name: z
    .string()
    .trim()
    .min(1, "Last name is required.")
    .max(50, "Last name is too long."),

  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Enter a valid email address."),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(128, "Password is too long."),
});

type SignUpValues = z.infer<typeof signUpSchema>;

const SignUpForm = () => {
  const router = useRouter();

  const { mutate: register, isPending, error } = useRegister();

  const form = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),

    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: SignUpValues) => {
    register(data, {
      onSuccess: () => {
        router.push("/sign-in");
      },
    });
  };

  return (
    <Card className="w-full max-w-md shadow-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Create your account</CardTitle>

        <CardDescription>
          Start tracking and understanding your expenses.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form id="sign-up-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Controller
                name="first_name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>First name</FieldLabel>

                    <Input
                      {...field}
                      id={field.name}
                      placeholder="John"
                      autoComplete="given-name"
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
                name="last_name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Last name</FieldLabel>

                    <Input
                      {...field}
                      id={field.name}
                      placeholder="Doe"
                      autoComplete="family-name"
                      aria-invalid={fieldState.invalid}
                      disabled={isPending}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

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
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                  <Input
                    {...field}
                    id={field.name}
                    type="password"
                    placeholder="Create a password"
                    autoComplete="new-password"
                    aria-invalid={fieldState.invalid}
                    disabled={isPending}
                  />

                  {!fieldState.invalid && (
                    <FieldDescription>
                      Use at least 8 characters.
                    </FieldDescription>
                  )}

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {error && (
              <p className="text-sm text-destructive">
                Unable to create your account. Please try again.
              </p>
            )}
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-4">
        <Button
          type="submit"
          form="sign-up-form"
          className="w-full"
          disabled={isPending}
        >
          {isPending && <Loader2 className="size-4 animate-spin" />}

          {isPending ? "Creating account..." : "Create account"}
        </Button>

        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-foreground hover:underline"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignUpForm;
