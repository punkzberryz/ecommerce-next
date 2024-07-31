import { PageWrapper } from "@/components/admin-navbar";
import React from "react";

const AdminHomePage = () => {
  return (
    <PageWrapper
      links={[{ href: "#", title: "Dashboard" }]}
      title="หน้าหลัก | Dashboard"
    >
      <div>Dashboard page...</div>
    </PageWrapper>
  );
};

export default AdminHomePage;
