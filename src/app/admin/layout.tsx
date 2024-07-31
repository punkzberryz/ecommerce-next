import { ClientSideNavWrapper } from "@/components/admin-navbar";
import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return <ClientSideNavWrapper>{children}</ClientSideNavWrapper>;
};

export default AdminLayout;
