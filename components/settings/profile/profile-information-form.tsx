"use client";

import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

import { useUserUpdateProfile } from "@/hooks/use-user";

import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/toast";
import { ProfileInformationFormProps } from "@/types/dashboard";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export const PersonalInformationForm: React.FC<ProfileInformationFormProps> = ({
  first_name,
  last_name,
  email,
  loading,
}) => {
  const updateUserProfile = useUserUpdateProfile();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    values: {
      firstName: first_name ?? "",
      lastName: last_name ?? "",
      email: email ?? "",
    },
  });

  async function onSubmit(values: ProfileFormValues) {
    await updateUserProfile.mutateAsync({
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
    });
    return toast.add({
      description: "User profile updated successfully",
    });
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="py-8">Loading profile...</CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Update your account details.</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="profile-form"
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Controller
              name="firstName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel htmlFor="profile-form-firstName">
                      First Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id="profile-form-firstName"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />

            <Controller
              name="lastName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldContent>
                    <FieldLabel htmlFor="profile-form-lastName">
                      Last Name
                    </FieldLabel>
                    <Input
                      {...field}
                      id="profile-form-lastName"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldContent>
                </Field>
              )}
            />
          </div>

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldContent>
                  <FieldLabel htmlFor="profile-form-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="profile-form-email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                  />
                  <FieldDescription>
                    This email is used for account notifications.
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </FieldContent>
              </Field>
            )}
          />

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {form.formState.isDirty
                ? "You have unsaved changes"
                : "Profile is up to date"}
            </p>

            <Button
              type="submit"
              form="profile-form"
              disabled={!form.formState.isDirty || form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
