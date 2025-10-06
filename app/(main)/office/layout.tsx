import { ReactNode } from "react";

import { UserSidebarMenu } from "@/components/ui/user/UserSidebarMenu";

export default async function OfficeLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <section>
      <div className="container">
        <div className="officePageContainer">
          <UserSidebarMenu />
          {children}
        </div>
      </div>
    </section>
  );
}
