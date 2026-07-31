import AppSidebar from "@/components/layout/app-sidebar";
import { Toaster } from "@/components/ui/toast";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger />
        </header>

        <main className="flex-1 p-4 md:p-6">{children}</main>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
