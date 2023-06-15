import React from 'react'
import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { signIn, signOut, useSession } from 'next-auth/react'
import { toast } from 'react-toastify'
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
type Item = {
    title: string;
    description: string;
}
const Items: Item[] = [
    {
        title: "Home",
        description:
            "Summary dashboard page",
    },
    {
        title: "Guide",

        description:
            "Invoice management page",
    },
    {
        title: "Pricing",

        description:
            "Customer management page",
    },
    {
        title: "Contact",

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
            toast.success("Signed out successfully")
        }).catch(() => {
            toast.error("Error signing out")
        }
        )
    }
    const handleSignIn = () => {
        signIn().catch(() => {
            toast.error("Error signing in")
        })
    }
    return (
        <NavigationMenu className='mt-3'>
            <NavigationMenuList className='space-x-5'>

                {Items.map((item) => (
                    <NavigationMenuItem key={item.title}>
                        <Button variant={"link"}>{item.title}</Button>
                    </NavigationMenuItem>
                ))}
                {sessionData?.user?.image && (
                    <NavigationMenuItem className=''>
                        <Button variant={"link"}>Dashboard</Button>
                    </NavigationMenuItem>)}
                {sessionData?.user?.image ? (
                    <NavigationMenuItem className=''>
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar>
                                    <AvatarImage src={sessionData?.user.image} />
                                    <AvatarFallback>{sessionData?.user?.name}</AvatarFallback>
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
                    <div onClick={handleTheme} className="flex items-center space-x-2 cursor-pointer">
                        <Switch />
                        <Label>

                            {theme === "light" ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
                        </Label>
                    </div>

                </NavigationMenuItem>
            </NavigationMenuList >

        </NavigationMenu >)
}
