import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'

import { Button } from '@/components/ui/button'

const Pricing = [
    {
        title: "Basic",
        description: "Basic plan for smaller businesses",
        features: [
            {
                title: "All the features",
                description: "Up to 25 invoices per month",
            },
        ],
        price: "Free",
    },
    {
        title: "Standard",
        description: "Standard plan for medium sized businesses",
        features: [
            {
                title: "All the features",
                description: "Up to 100 invoices per month",
            },
        ],
        price: "€10 Monthly",
    },
    {
        title: "Premium",
        description: "Premium plan for larger businesses",
        features: [
            {
                title: "All the features",
                description: "Unlimited invoices per month",
            },
        ],
        price: "€20 Monthly",
    },
]




export default function PricingCard() {
    return (
        <div className='mt-10 opacity-90'>
            <Card>
                <CardHeader>
                    <CardTitle className="text-center">Pricing</CardTitle>
                    <CardDescription className="text-center">Available Pricing!</CardDescription>
                </CardHeader>
                <CardContent className='flex space-x-5'>
                    {Pricing.map((pricing, index) => {
                        return (
                            <Card key={index}>
                                <CardHeader className='text-center content-center justify-center'>
                                    <CardTitle>{pricing.title}</CardTitle>
                                    <CardDescription>{pricing.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className='space-x-10'>
                                        <div className='grid grid-cols- text-center content-center justify-center'>
                                            {pricing.features.map((feature, index) => {
                                                return (
                                                    <div key={index}>
                                                        <ul>
                                                            <li>{feature.title}</li>
                                                            <li>{feature.description}</li>
                                                        </ul>
                                                    </div>

                                                )
                                            })}
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className='flex space-x-5 content-center  text-center justify-center'>
                                    <p className="font-bold">{pricing.price}</p>
                                    <Button variant={"secondary"} className=''>Buy</Button>
                                </CardFooter>
                            </Card>
                        )
                    })}
                </CardContent>
            </Card>
        </div>
    )
}
