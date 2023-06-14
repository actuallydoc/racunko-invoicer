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
import { signOut, useSession } from 'next-auth/react'
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
import { Button } from 'react-day-picker'
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
            toast.success("Signed out successfully")
        }).catch(() => {
            toast.error("Error signing out")
        }
        )
    }
    const handleActiveItem = (item: string) => {
        activeItemCallback(item)
    }
    return (
        <NavigationMenu>
            <NavigationMenuList>

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
                                <AvatarFallback>{sessionData?.user?.name[0]}</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem>Company</DropdownMenuItem>
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