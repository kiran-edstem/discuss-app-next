import Link from "next/link";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import { Input } from "@nextui-org/input";
import HeaderAuth from "./header-auth";


export default async function Header() {

    return (
        <Navbar className="shadow mb-6">
            <NavbarBrand>
                <Link href="/" className="font-bold">
                    Discuss
                </Link>
            </NavbarBrand>
            <NavbarContent justify="center">
                <NavbarItem>
                    <Input />
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                <HeaderAuth />
            </NavbarContent>
        </Navbar>
    )
}