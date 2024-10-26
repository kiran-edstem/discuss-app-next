'use client'

import { NavbarItem } from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Avatar } from "@nextui-org/avatar";
import { signIn, signOut } from "@/actions";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { useSession } from "next-auth/react";
import { signOut as nextAuthSignOut } from "next-auth/react";


export default function HeaderAuth() {
    const session = useSession();
    let authContent: React.ReactNode;
    if (session?.data?.user) {
        authContent = <Popover>
            <PopoverTrigger>
                <Avatar src={session?.data?.user.image || ""} />
            </PopoverTrigger>
            <PopoverContent>
                <form action={async () => {
                    await signOut();
                    await nextAuthSignOut({ redirect: false });
                }}>
                    <Button type="submit">
                        Signout
                    </Button>
                </form>
            </PopoverContent>
        </Popover>

    } else {
        authContent = <>
            <NavbarItem>
                <form action={signIn}>
                    <Button
                        type="submit"
                        color="secondary"
                        variant="bordered"
                    >
                        Sign In
                    </Button>
                </form>
            </NavbarItem>
            <NavbarItem>
                <form action={signOut}>
                    <Button
                        type="submit"
                        color="primary"
                        variant="flat"
                    >
                        Sign Up
                    </Button>
                </form>
            </NavbarItem>
        </>
    }

    return authContent
}