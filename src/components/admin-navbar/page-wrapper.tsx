import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment, Suspense } from "react";
import { MaxWidthWrapper } from "../max-width-wrapper";
import { ThemeToggleButton } from "../providers/theme-toggle-button";
import { Card, CardContent } from "../ui/card";
import { SideNavbarToggleButton } from "./side-navbar-toggle-button";
import { SideNavbarMobileView } from "./sidebar-with-mobile-view";
import { AuthNav } from "./auth-nav";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export const PageWrapper = ({
  title,
  links,
  children,
}: {
  title: string;
  links: BreadcrumbLinkProps[];
  children?: React.ReactNode;
}) => {
  return (
    <>
      <PageHeader title={title} links={links} />
      <div className="px-2.5 md:px-4">
        <Card>
          {/* <Card className="mx-auto max-w-4xl"> */}
          <CardContent className="flex flex-col space-y-8 p-6">
            {children}
          </CardContent>
        </Card>
      </div>
      <AdminProtection />
    </>
  );
};

const AdminProtection = () => {
  return (
    <Suspense>
      <FetchAdmin />
    </Suspense>
  );
};
const FetchAdmin = async () => {
  const { user } = await validateRequest();
  if (user?.role !== "ADMIN") {
    {
      /* TODO: create admin unauth page */
    }
    redirect("/admin/unauthorized");
  }
  return null;
};

const PageHeader = ({
  title,
  links,
}: {
  title: string;
  links: BreadcrumbLinkProps[];
}) => {
  return (
    <header className="flex flex-col space-y-4 pb-4 pt-2">
      <MaxWidthWrapper className="flex items-center space-x-4 border-b pb-4 shadow-md">
        <>
          <SideNavbarToggleButton />
          <SideNavbarMobileView />
        </>
        <h1 className="hidden md:block">{title}</h1>
        {/* User Button */}
        <div className="flex-1">
          <div className="ml-auto mr-4 flex w-fit items-center space-x-2">
            <ThemeToggleButton />
            <AuthNav />
          </div>
        </div>
      </MaxWidthWrapper>
      {/* Breadcrumbs */}

      <MaxWidthWrapper className="pb-4">
        <Breadcrumb>
          <BreadcrumbList>
            {links.map((link, index) => (
              <Fragment key={index}>
                <BreadcrumbItem>
                  <BreadcrumbLink href={link.href}>{link.title}</BreadcrumbLink>
                </BreadcrumbItem>
                {index + 1 !== links.length && <BreadcrumbSeparator />}
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </MaxWidthWrapper>
    </header>
  );
};
export interface BreadcrumbLinkProps {
  href: string;
  title: string;
}
