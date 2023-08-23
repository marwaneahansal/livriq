import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuToggle } from '@nextui-org/react'
import type { User } from 'next-auth';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link'
import React from 'react'
import { Loading } from './Loading';

export const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const { data: sessionData, status } = useSession();

    // const menuItems = [
    //     "Login",
    //     "Sign Up",
    //   ];
    return (
        <div className='w-full'>
            { status === 'loading' && <Loading /> }
            <Navbar onMenuOpenChange={setIsMenuOpen} isBordered isBlurred className='py-2 px-[6.5rem]' maxWidth='full'>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <Link className="font-bold text-inherit text-lg" href={"/"}>Livriq</Link>
                </NavbarBrand>
                <NavbarContent justify="end">
                    {sessionData 
                        ? <UserDropdown user={sessionData.user} />
                        : <NavbarItems />
                    }
                </NavbarContent>
                <NavbarMenu>
                    {/* {menuItems.map((item, index) => (
                        <NavbarMenuItem key={`${item}-${index}`}>
                            <Link
                            color={
                                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            className="w-full"
                            href="#"
                            >
                            {item}
                            </Link>
                        </NavbarMenuItem>
                    ))} */}
                </NavbarMenu>
            </Navbar>
        </div>
    )
}

function UserDropdown({ user } : { user: User }) {
    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={user.name ?? ""}
                size="sm"
                src={user.image ?? ""}
                />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat" color='primary'>
                <DropdownItem key="profile" className="h-14 gap-2">
                    <p className="font-semibold">Signed in as</p>
                    <p className="font-semibold">{ user.name }</p>
                    <p className="font-semibold">{ user.email }</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="logout" color="danger" onClick={() => void signOut({ callbackUrl: 'http://localhost:3000/' })}>
                    Log Out
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

function NavbarItems() {
    return (
        <> 
            <NavbarItem className="hidden lg:flex">
                <Link href={"signin"}>Sign In</Link>
            </NavbarItem>
            <NavbarItem>
                <Button as={Link} color="primary" href={"signup"} variant="flat">
                    Sign Up
                </Button>
            </NavbarItem> 
        </>
    );
}