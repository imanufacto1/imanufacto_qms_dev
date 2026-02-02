import { UserButton, OrganizationSwitcher } from "@clerk/nextjs";
import { Search, LogOut } from "lucide-react";
import { cookies } from "next/headers";
import { logoutAction } from "@/app/actions/auth";
import { ThemeToggle } from "./ThemeToggle";

export async function Header() {
  const cookieStore = await cookies();
  const internalSession = cookieStore.get("internal_session");

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div className="flex flex-1 items-center">
        <div className="relative w-full max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            className="block w-full rounded-md border-0 bg-gray-100 py-2 pl-10 pr-3 text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#4285F4] sm:text-sm sm:leading-6"
            placeholder="Search..."
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {internalSession ? (
          <div className="flex items-center gap-4">
             <span className="text-sm font-medium text-gray-700">Internal User</span>
             <form action={logoutAction}>
                <button type="submit" className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700">
                    <LogOut className="h-4 w-4" />
                    Logout
                </button>
             </form>
          </div>
        ) : (
          <>
            <OrganizationSwitcher 
              afterCreateOrganizationUrl="/"
              afterSelectOrganizationUrl="/"
              appearance={{
                elements: {
                  organizationSwitcherTrigger: "py-2 px-3 border border-gray-300 rounded-md hover:bg-gray-50"
                }
              }}
            />
            <UserButton afterSignOutUrl="/" />
          </>
        )}
      </div>
    </header>
  );
}
