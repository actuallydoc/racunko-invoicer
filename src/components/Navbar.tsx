import React from 'react'
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { signIn, signOut, useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button'
import { toast } from './ui/use-toast'
import Link from 'next/link'
type Item = {
    title: string;
    description: string;
    ref: string;
}
const Items: Item[] = [
    {
        title: "Home",
        description:
            "Summary dashboard page",
        ref: "#",
    },
    {
        title: "Guide",
        ref: "#guide",

        description:
            "Invoice management page",
    },
    {
        title: "Pricing",
        ref: "#pricing",

        description:
            "Customer management page",
    },
    {
        title: "Contact",
        ref: "#contact",

        description: "Contact us",
    }
]
export default function Navbar() {
    const { data: sessionData } = useSession();
    const { theme, setTheme } = useTheme()
    const handleTheme = () => {
        if (theme === "dark") {
            setTheme("light")
        } else {
            setTheme("dark")
        }
    }
    const handleSignout = () => {
        signOut().then(() => {
            toast({
                title: "Signed out",
                description: "You have been signed out",
            })
        }).catch(() => {
            toast({
                title: "Error",
                description: "Error signing out",
            })
        }
        )
    }
    const handleSignIn = () => {
        signIn().catch(() => {
            toast({
                title: "Error",
                description: "Error signing in",
            })
        })
    }

    return (
        <div>
            <NavigationMenu className='mt-3'>
                <NavigationMenuList className='space-x-5'>

                    {Items.map((item) => (
                        <NavigationMenuItem key={item.title}>
                            <Button variant={"link"}>{item.title}</Button>
                        </NavigationMenuItem>
                    ))}
                    {sessionData?.user?.image && (
                        <NavigationMenuItem className=''>
                            <Link href={'/dashboard'}>
                                <Button variant={"link"}>Dashboard</Button>
                            </Link>
                        </NavigationMenuItem>)}
                    {sessionData?.user?.image ? (
                        <NavigationMenuItem className=''>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <Avatar>
                                        <AvatarImage src={sessionData?.user.image} />
                                        <AvatarFallback>{sessionData?.user?.name ? sessionData?.user?.name?.length > 5 ? `${sessionData?.user?.name?.slice(0, 3)}..` : sessionData?.user?.name : <h1>No name</h1>}</AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                    <DropdownMenuItem>Billing</DropdownMenuItem>
                                    <DropdownMenuItem>Settings</DropdownMenuItem>
                                    <DropdownMenuItem onClick={handleSignout}>Logout</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </NavigationMenuItem>
                    ) : (
                        <NavigationMenuItem className=''>
                            <Button onClick={handleSignIn} variant={"outline"}>Sign in</Button>
                        </NavigationMenuItem>
                    )}
                    <NavigationMenuItem>
                        <div className="flex items-center space-x-2 cursor-pointer">
                            <Switch onClick={handleTheme} value={"dark"} checked={theme === "dark" ? true : false} />
                            <Label>
                                {theme === "light" ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
                            </Label>
                        </div>

                    </NavigationMenuItem>
                </NavigationMenuList >

            </NavigationMenu >
        </div>)

}
