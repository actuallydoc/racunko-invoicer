import { useSession, signOut } from 'next-auth/react';
import React from 'react'
import { toast } from 'react-toastify';


const Items = [
    "Home",
    "Invoices",
    "Customers",
    "Companies",
    "Services",
    "Storage",
    "Folders",
    "Trash",
    "Settings",
    "Logout",

]
export default function Sidebar({ activeItemCallback }: { activeItemCallback: React.Dispatch<React.SetStateAction<string>> }) {
    const { data: Session } = useSession({ required: true })
    const [activeItem, setActiveItem] = React.useState(Items[0]);

    const handleSignOut = async () => {
        await signOut()
    }

    const handleItemClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        e.preventDefault();
        setActiveItem(e.currentTarget.innerText);
        activeItemCallback(e.currentTarget.innerText)
        switch (e.currentTarget.innerText) {
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

    return (
        <div className="flex h-screen">
            <div className="bg-[##030610] text-slate-400 py-6 px-4 w-48 rounded-3xl mb-28 content-center justify-center text-center drop-shadow-2xl ">
                <div className='flex'>
                    {/* <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="30" cy="30" r="29" fill="white" />
                        <circle cx="30" cy="30" r="29.5" stroke="#9A989C" strokeOpacity="0.23" />
                        <path d="M32.2817 55.3473C26.9124 34.0946 31.8404 27.657 53.2823 24.9056C39.9996 15.425 25.8866 12.6671 19.7908 20.6227C13.6949 28.5784 19.2243 45.0533 32.2817 55.3473Z" fill="#08D110" />
                        <path d="M6.31933 39.1347C28.0661 36.3806 32.2621 29.4436 27.0015 8.47585C40.6745 17.3844 48.391 29.5185 43.2075 38.0966C38.0241 46.6747 20.6674 47.5367 6.31933 39.1347Z" fill="#4F3CC0" />
                    </svg> */}
                </div>
                {/* Sidebar content */}
                <h1 className="text-2xl font-bold  mb-24">Dashboard</h1>
                <ul className="space-y-2 border-slate-400">
                    {Items.map((item, index) => (
                        <li key={index}>
                            <a
                                onClick={(e) => handleItemClick(e)}
                                href="#"
                                className={`block py-2 px-4 rounded-lg hover:text-white ${item === activeItem ? "text-white font-bold " : ""} `}
                            >
                                {item}
                            </a>
                        </li>
                    )

                    )}

                </ul>
            </div>
        </div >
    );
}
