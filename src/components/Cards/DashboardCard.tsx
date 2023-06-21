import React, { useEffect } from 'react'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image'
import { motion } from "framer-motion";
import { useTheme } from 'next-themes'
export default function DashboardCard() {
    const { theme } = useTheme()
    // Had to do this because i was getting a hydration error
    const [mounted, setMounted] = React.useState(false)
    useEffect(() => setMounted(true), [])
    return (
        <motion.div
            className="box"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 1,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01]
            }}
        >
            <Card>
                <CardContent>

                    {mounted && theme === 'dark' ? (<Image quality={75} src='https://i.imgur.com/60JQ95p.png' width={500} height={500} alt='dashboard' />) :
                        <Image quality={75} src='https://i.imgur.com/2WCBFP7.png' width={500} height={500} alt='dashboard' />}

                </CardContent>
            </Card>
        </motion.div>


    )
}
