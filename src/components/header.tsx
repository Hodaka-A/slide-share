import { Button } from "@/components/ui/button";
import { LayoutDashboardIcon, UploadIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center justify-between px-8">

        <div className="flex items-center gap-2">
          <Link to="/home" className="flex items-center gap-2">
            <div className="rounded-lg bg-primary p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-primary-foreground"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" />
                <path d="M7 7h10M7 12h10M7 17h10" />
              </svg>
            </div>
            <span className="text-xl font-bold">Slide管理</span>
          </Link>
        </div>

        <nav className="flex items-center gap-4">
          <Link to="/home">
            <Button
              variant={pathname === "/home" ? "default" : "ghost"}
              size="sm"
              className="gap-2"
            >
              <LayoutDashboardIcon className="h-4 w-4" />
              ファイル一覧
            </Button>
          </Link>

          <Link to="/upload">
            <Button
              variant={pathname === "/upload" ? "default" : "secondary"}
              size="sm"
              className="gap-2"
            >
              <UploadIcon className="h-4 w-4" />
              アップロード
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
