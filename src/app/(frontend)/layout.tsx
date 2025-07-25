import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Paul's Hub",
  description: "Paul's hub showcasing projects and experience",
  keywords: ["portfolio", "developer", "projects", "web development"],
};

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* <MainNavigation /> */}
      <main className="relative">{children}</main>
    </div>
  );
}
