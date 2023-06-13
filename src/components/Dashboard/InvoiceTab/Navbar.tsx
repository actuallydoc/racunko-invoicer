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
import Link from 'next/link'
import { signOut } from 'next-auth/react'
import { toast } from 'react-toastify'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useTheme } from 'next-themes'
import { MoonIcon, SunIcon } from 'lucide-react'
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
    },
    {
        title: "Settings",
        description: "Settings page",
    },
    {
        title: "Logout",
        description: "Logout page",
    }


]

export default function Navbar({ activeItemCallback }: { activeItemCallback: React.Dispatch<React.SetStateAction<string>> }) {

    const { theme, setTheme } = useTheme()

    const handleSignOut = async () => {
        await signOut()
    }
    const handleItemClick = (item: Item) => {

        activeItemCallback(item.title)
        switch (item.title) {
            case "Home":
                // console.log("Home")
                break;
            case "Invoices":
                // console.log("Invoices")
                break;
            case "Customers":
                // console.log("Customers")
                break;
            case "Companies":
                // console.log("Companies")
                break;
            case "Services":
                // console.log("Services")
                break;
            case "Storage":
                // console.log("Storage")
                break;
            case "Folders":
                // console.log("Folders")
                break;
            case "Trash":
                // console.log("Trash")
                break;
            case "Settings":
                // console.log("Settings")
                break;
            case "Logout":
                handleSignOut().then(() => {
                    toast.success("Logged out successfully")
                }
                ).catch((err) => {
                    console.log(err)
                }
                )
                break;
            default:
                // console.log("Home")
                break;
        }
    }
    const handleTheme = () => {
        if (theme === "dark") {
            setTheme("light")
        } else {
            setTheme("dark")
        }
    }
    return (
        <NavigationMenu>
            <NavigationMenuList>

                {Items.map((item) => (
                    <NavigationMenuItem key={item.title}>
                        <NavigationMenuTrigger onClick={() => handleItemClick(item)}>{item.title}</NavigationMenuTrigger>
                    </NavigationMenuItem>
                ))}
                <NavigationMenuItem>
                    <div onClick={handleTheme} className="flex items-center space-x-2 cursor-pointer">
                        <Switch />
                        <Label>

                            {theme === "light" ? <SunIcon className="w-4 h-4" /> : <MoonIcon className="w-4 h-4" />}
                        </Label>
                    </div>

                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>)
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