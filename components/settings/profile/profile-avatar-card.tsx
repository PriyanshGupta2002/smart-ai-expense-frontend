import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProfileAvatarCardProps } from "@/types/dashboard";
import { FC } from "react";

export const ProfileAvatarCard: FC<ProfileAvatarCardProps> = ({
  image_url,
  loading,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Picture</CardTitle>
      </CardHeader>

      <CardContent className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          {image_url ? (
            <AvatarImage src={image_url} />
          ) : (
            <AvatarFallback>PG</AvatarFallback>
          )}
        </Avatar>

        <div className="space-y-2">
          <Button>Upload New Photo</Button>

          <p className="text-muted-foreground text-sm">JPG, PNG up to 5MB</p>
        </div>
      </CardContent>
    </Card>
  );
};
