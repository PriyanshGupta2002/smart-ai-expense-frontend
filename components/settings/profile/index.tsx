"use client";

import { useDashboardMe } from "@/hooks/use-dashboard";
import { AccountInformationCard } from "./account-information-card";
import { ProfileAvatarCard } from "./profile-avatar-card";
import { ProfileHeader } from "./profile-header";
import { PersonalInformationForm } from "./profile-information-form";
import { dateTimeFormatter } from "@/lib/utils";
import { useGoogleConnectionStatus } from "@/hooks/use-google";

export default function Profile() {
  const { data, isLoading } = useDashboardMe();
  const { data: statusData, isLoading: statusLoading } =
    useGoogleConnectionStatus();
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <ProfileHeader />

      <ProfileAvatarCard loading={isLoading} image_url={data?.image_url} />

      <PersonalInformationForm
        first_name={data?.first_name}
        last_name={data?.last_name}
        email={data?.email}
        loading={isLoading}
      />

      <AccountInformationCard
        created_at={dateTimeFormatter(data?.created_at)}
        loading={isLoading}
        connectionStatus={statusData?.connected}
        authorizationStatus={statusData?.authorization_status}
        connectionStatusLoading={statusLoading}
      />
    </div>
  );
}
