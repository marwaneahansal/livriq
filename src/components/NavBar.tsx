import type { User } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { Loading } from "./Loading";
import { useRouter } from "next/router";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "./ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { buttonVariants } from "./ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { LayoutDashboard, LayoutDashboardIcon, LogOut, Menu, Settings, UserRound } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
interface RouteProps {
  name: string;
  href: string;
  variant?: "default" | "link" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined;
}

const routeList: RouteProps[] = [
  { name: "Sign In", href: "/signin", variant: "outline" },
  { name: "Sign Up", href: "/signup" },
]

export const NavBar = () => {
  const { data: sessionData, status } = useSession();

  return (
    <header className="w-full sticky border-b-[1px] top-0 z-40 bg-white">
      {status === "loading" && <Loading />}
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between">
          <NavigationMenuItem className="font-bold flex">
            <Link className="text-xl font-bold text-inherit" href={"/"}>
              Livriq
            </Link>
          </NavigationMenuItem>

          <MobileNav user={sessionData?.user} />

          <nav className="hidden md:flex gap-2">
            {sessionData?.user ? (
              <UserDropdown user={sessionData.user} />
            ) : (
              <NavbarItems routeList={routeList} />
            )}
          </nav>

        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

function MobileNav({ user }: { user: User | undefined }) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (<span className="flex md:hidden">
    <Sheet
      open={isMenuOpen}
      onOpenChange={setIsMenuOpen}
    >
      <SheetTrigger className="px-2">
        <Menu className="mr-2 h-4 w-4" />
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle className="font-bold text-xl">
            Livriq
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col justify-center items-center gap-2 mt-4">
          {user ? (
            <UserDropdown user={user} />
          ) : (
            <NavbarItems routeList={routeList} />
          )}
        </nav>
      </SheetContent>
    </Sheet>
  </span>)
}

function UserDropdown({ user }: { user: User }) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Avatar>
          <AvatarImage src={user.image ?? ""} alt={user.name ?? ""} />
          <AvatarFallback>{user.name}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator></DropdownMenuSeparator>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <LayoutDashboard className="mr-2 h-5 w-5" />
            <Link href="/dashboard" className="text-md">Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UserRound className="mr-2 h-5 w-5" />
            <Link href="/dashboard" className="text-md">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-5 w-5" />
            <Link href="/dashboard" className="text-md">Settings</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator></DropdownMenuSeparator>
        <DropdownMenuItem className="cursor-pointer text-red-500 font-semibold" onClick={() =>
          void signOut({ callbackUrl: "http://localhost:3000/" })
        }>
          <LogOut className="mr-2 h-5 w-5" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function NavbarItems({ routeList }: { routeList: RouteProps[] }) {
  return (
    <>
      {routeList.map((route) => (
        <Link key={route.name} href={route.href} className={`text-lg font-bold text-inherit ${buttonVariants({ variant: route.variant })}`}>
          {route.name}
        </Link>
      ))}
    </>
  );
}
