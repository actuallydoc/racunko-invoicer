import React from 'react'
import Login from '../Buttons/Login/Login';



const NavTabs = [
    "Home",
    "Features",
    "About"]


export default function Navbar() {
    return (
        <div>
            <div className='flex'>
                <div className='flex space-x-5 h-[70px] content-center text-[#161D1B] text-center text-3xl'>
                    {NavTabs.map((tab, index) => {
                        return (
                            <div key={index} className=' mt-3'>
                                {tab === "Home" && (
                                    <div className='cursor-pointer p-1 ml-72 hover:translate-x-4 duration-300'>{tab} </div>
                                )
                                }
                                {tab === "Features" && (
                                    <div className='cursor-pointer p-1 ml-10 hover:translate-x-4 duration-300'>{tab} </div>

                                )
                                }
                                {tab === "About" && (

                                    <div className='cursor-pointer p-1 ml-24 hover:translate-x-4 duration-300'>{tab} </div>

                                )
                                }

                            </div>
                        )
                    }
                    )}
                </div>
                <div className='ml-48 text-white mr-64'>
                    <Login />
                </div>

            </div>
        </div >
    )
}
