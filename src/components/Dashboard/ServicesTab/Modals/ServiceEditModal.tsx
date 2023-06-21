import React from 'react'
import type { Service } from '@prisma/client'
import { DialogContent, DialogHeader } from '@/components/ui/dialog'
import { motion } from 'framer-motion'

export default function ServiceEditModal({ service }: { service: Service }) {
    return (
        <DialogContent>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                }}
            >
                <DialogHeader>
                    <h2 className='text-2xl font-semibold'>Edit Service</h2>
                </DialogHeader>
            </motion.div>
        </DialogContent>
    )
}

