import { SideBar } from "../../components/Sidebar";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar />
      <div className="flex flex-col w-full h-full">
        <div className="pt-8 w-full h-full">{children}</div>
      </div>
    </div>
  );
}
