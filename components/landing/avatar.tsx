import React from "react";

import LandingDropdown from "./landing-dropdown";
import SidebarFooter from "../sidebar/sidebar-dropdown";

interface AvatarProps {
  first_name: string;
  last_name: string;
  email: string;
  type: string;
}
const Avatar = ({ first_name, last_name, email }: AvatarProps) => {
  return (
    <div className="relative">
      <LandingDropdown
        first_name={first_name}
        last_name={last_name}
        email={email}
      />
    </div>
  );
};

export default Avatar;
