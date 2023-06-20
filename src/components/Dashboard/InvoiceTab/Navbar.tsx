import React from 'react'
import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { signOut, useSession } from 'next-auth/react'
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
import { toast } from '@/components/ui/use-toast'
import Link from 'next/link'
type Item = {
    title: string;
    description: string;
}
const Items: Item[] = [
    {
        title: "Dashboard",
        description:
            "Summary dashboard page",
    },
    {
        title: "Invoices",

        description:
            "Invoice management page",
    },
    {
        title: "Customers",

        description:
            "Customer management page",
    },
    {
        title: "Companies",

        description: "Company management page",
    },
    {
        title: "Services",

        description:
            "Service management page",
    },
    {
        title: "Storage",

        description:
            "Storage management page",
    }

]

export default function Navbar({ activeItemCallback }: { activeItemCallback: React.Dispatch<React.SetStateAction<string>> }) {
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
                "title": "Success",
                "description": "You have been logged out",
            })
        }).catch(() => {
            toast({
                "title": "Error",
                "description": "Something went wrong",
            })
        }
        )
    }
    const handleActiveItem = (item: string) => {
        activeItemCallback(item)
    }
    return (
        <NavigationMenu className=''>
            <NavigationMenuList className='space-x-12 '>
                <NavigationMenuItem>
                    <Link href='/'>
                        <p className='text-lg font-semibold'>Home page</p>
                    </Link>
                </NavigationMenuItem>

                {Items.map((item) => (
                    <NavigationMenuItem key={item.title}>
                        <NavigationMenuTrigger onClick={() => handleActiveItem(item.title)}>{item.title}</NavigationMenuTrigger>
                    </NavigationMenuItem>
                ))}

                <NavigationMenuItem className='mt-2'>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar>
                                <AvatarImage src={sessionData?.user.image as string} />
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
const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"