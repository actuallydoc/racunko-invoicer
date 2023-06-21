import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { motion } from 'framer-motion'

export default function GetStartedCard() {
    return (
        <motion.div
            className="box"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01]
            }}>
            <Card>
                <CardHeader>
                    <h1>Get Started</h1>
                </CardHeader>
                <CardContent>
                    <p>Get started in simple steps.</p>
                    <ul>
                        <li className='font-bold'>1. Create an account</li>
                        <li className='font-bold'>2. Create a company</li>
                        <li className='font-bold'>3. Create a partner</li>
                        <li className='font-bold'>4. Start creating invoices</li>

                    </ul>
                    <p>Its easy as that!</p>
                </CardContent>
            </Card>
        </motion.div>
    )
}
