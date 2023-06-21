
import { DialogHeader, DialogContent } from '@/components/ui/dialog'
import type { Partner } from '@prisma/client'
import { motion } from 'framer-motion'
import React from 'react'

export default function CustomerEditModal({ partner }: { partner: Partner }) {

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
                    <h2 className='text-2xl font-semibold'>Edit Customer</h2>
                </DialogHeader>
            </motion.div>
        </DialogContent>
    )
}
