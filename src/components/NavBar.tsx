import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuToggle } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'

export const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    // const menuItems = [
    //     "Login",
    //     "Sign Up",
    //   ];
    return (
        <div className='w-full'>
            <Navbar onMenuOpenChange={setIsMenuOpen} isBordered isBlurred className='py-2 px-[6.5rem]' maxWidth='full'>
                <NavbarMenuToggle
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    className="sm:hidden"
                />
                <NavbarBrand>
                    <p className="font-bold text-inherit text-lg">Livriq</p>
                </NavbarBrand>
                <NavbarContent justify="end">
                    <NavbarItem className="hidden lg:flex">
                        <Link href="#">Login</Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Button as={Link} color="primary" href="#" variant="flat">
                            Sign Up
                        </Button>
                    </NavbarItem>
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
