import React from 'react'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image'
import { useTheme } from 'next-themes'
export default function DashboardCard() {
    const theme = useTheme()
    return (
        <div>
            <Card>
                <CardContent>


                    {theme && theme.theme === 'dark' && <Image src='https://i.imgur.com/60JQ95p.png' width={500} height={500} alt='dashboard' />}
                    {theme && theme.theme === 'light' && <Image src='https://i.imgur.com/2WCBFP7.png' width={500} height={500} alt='dashboard' />}
                </CardContent>
            </Card>

        </div>
    )
}
