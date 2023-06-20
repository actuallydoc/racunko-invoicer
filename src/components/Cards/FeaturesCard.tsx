import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "@/components/ui/button"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { LineChartIcon, MoonIcon, Paperclip, PersonStanding, TruckIcon, User } from "lucide-react"
import { BiDrink, BiMobile, BiPaperPlane } from "react-icons/bi"

type Feature = {
    title: string
    description: string
    icon: JSX.Element
}

const Features: Feature[] = [
    {
        title: "Invoice management",
        description: "Create, edit, delete and view invoices",
        icon: (
            <BiPaperPlane className="w-6 h-6 text-gray-400" aria-hidden="true" />
        )
    },
    {
        title: "Customer management",
        description: "Create, edit, delete and view customers",
        icon: (
            <PersonStanding className="w-6 h-6 text-gray-400" aria-hidden="true" />
        )
    },
    {
        title: "Product management",
        description: "Create, edit, delete and view products",
        icon: (
            <BiDrink className="w-6 h-6 text-gray-400" aria-hidden="true" />
        )
    },
    {
        title: "Service management",
        description: "Create, edit, delete and view services",
        icon: (
            <TruckIcon className="w-6 h-6 text-gray-400" aria-hidden="true" />
        )
    },
    {
        title: "Reports",
        description: "Generate reports",
        icon: (
            <Paperclip className="w-6 h-6 text-gray-400" aria-hidden="true" />
        )
    },
    {
        title: "Multi-user support",
        description: "Create multiple users",
        icon: (
            <User className="w-6 h-6 text-gray-400" aria-hidden="true" />
        )
    },
    {
        title: "Dark mode",
        description: "Dark mode support",
        icon: (
            <MoonIcon className="w-6 h-6 text-gray-400" aria-hidden="true" />
        )
    },
    {
        title: "Mobile friendly",
        description: "Mobile friendly",
        icon: (
            <BiMobile className="w-6 h-6 text-gray-400" aria-hidden="true" />
        )
    },
    {
        title: "Responsive",
        description: "Responsive design",
        icon: (
            <BiMobile className="w-6 h-6 text-gray-400" aria-hidden="true" />
        )
    },
    {
        "title": "Analytics",
        "description": "Analytics dashboard",
        "icon": (
            <LineChartIcon className="w-6 h-6 text-gray-400" aria-hidden="true" />
        )
    }
]

const FeaturesCard: React.FC = () => {
    return (
        <Card className="">
            <CardHeader>
                <CardTitle className="text-center">Features</CardTitle>
                <CardDescription className="text-center">Available Features!</CardDescription>
            </CardHeader>
            <CardContent>
                <div className='space-x-10'>
                    <div className='grid grid-cols-2'>
                        {Features.map((feature, index) => {
                            return (
                                <div key={index}>
                                    <TooltipProvider >
                                        <Tooltip>
                                            <TooltipTrigger className="flex">
                                                <span className="">{feature.icon}</span>
                                                <span className="">{feature.title}</span>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{feature.description}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>

                            )
                        })}

                    </div>
                </div>
            </CardContent>
            <CardFooter className="justify-center">
                <p className="font-bold">More features are coming soon...</p>
            </CardFooter>
        </Card>
    )
}

export default FeaturesCard