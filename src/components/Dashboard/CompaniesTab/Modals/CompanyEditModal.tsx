/* eslint-disable @typescript-eslint/no-misused-promises */
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { toast } from "@/components/ui/use-toast"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription } from "@/components/ui/card"
import { motion } from "framer-motion"
import type { Company } from "@prisma/client"
import { api } from "@/utils/api"
import { useSession } from "next-auth/react"
import { useDispatch } from "react-redux"
import { invoiceSlice } from "@/stores/invoiceSlice"

const FormSchema = z.object({
    companyName: z.string().min(3, {
        message: "Compay name must be at least 3 characters.",
    }),
    companyAddress: z.string().min(3, {
        message: "Compay address must be at least 3 characters.",
    }),
    companyCity: z.string().min(3, {
        message: "Compay city must be at least 3 characters.",
    }),
    companyZip: z.string().min(3, {
        message: "Compay zip must be at least 3 characters.",
    }),
    companyCountry: z.string().min(3, {
        message: "Compay country must be at least 3 characters.",
    }),
    companyPhone: z.string().min(3, {
        message: "Compay phone must be at least 3 characters.",
    }),
    companyEmail: z.string().email({
        message: "Invalid email address.",
    }),
    companyWebsite: z.string().url({
        message: "Invalid website url.",
    }).optional(),
    companyVat: z.string().min(3, {
        message: "Compay vat must be at least 3 characters.",
    }),
    companyId: z.string().min(3, {
        message: "Compay id must be at least 3 characters.",
    }),

})

export function CompanyEditModal({ company }: { company: Company }) {
    const updateCompany = api.company.updateCompany.useMutation()
    const deleteCompany = api.company.deleteCompany.useMutation()
    const { data: sessionData } = useSession();
    const { data: companyData, refetch: refetchCompanies } = api.company.getAll.useQuery({
        id: sessionData?.user?.id as string
    })
    const companyDispatch = useDispatch();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            companyId: company.id,
            companyName: company.name,
            companyAddress: company.address,
            companyCity: company.city,
            companyZip: company.zip,
            companyCountry: company.country,
            companyPhone: company.phone,
            companyEmail: company.email,
            companyWebsite: company.website as string,
            companyVat: company.vat,

        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
        try {
            await updateCompany.mutateAsync({
                id: company.id,
                name: data.companyName,
                address: data.companyAddress,
                city: data.companyCity,
                zip: data.companyZip,
                country: data.companyCountry,
                phone: data.companyPhone,
                email: data.companyEmail,
                website: data.companyWebsite as string,
                vat: data.companyVat,
            }, {
                onSuccess: () => {
                    toast({
                        title: "Success",
                        description: "Company updated.",
                    })
                    form.reset()
                    refetchCompanies().then(() => {
                        companyDispatch(invoiceSlice.actions.initCompanies(companyData as Company[]))
                    }).catch(() => {
                        toast({
                            title: "Error",
                            description: "Something went wrong.",
                            variant: "destructive"
                        })
                    })
                }
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong.",
                variant: "destructive"
            })
        }

    }
    const handleDelete = async () => {
        try {
            await deleteCompany.mutateAsync({
                id: company.id
            }, {
                onSuccess: () => {
                    toast({
                        title: "Success",
                        description: "Company deleted.",
                    })
                    form.reset()
                    refetchCompanies().then(() => {
                        companyDispatch(invoiceSlice.actions.initCompanies(companyData as Company[]))
                    }).catch(() => {
                        toast({
                            title: "Error",
                            description: "Something went wrong.",
                            variant: "destructive"
                        })
                    }
                    )
                }
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong.",
                variant: "destructive"
            })
        }
    }
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
            > <DialogHeader>
                    <DialogTitle>Edit Company</DialogTitle>
                    <DialogDescription>
                        After pressing Edit button you will edit an existing Company.
                    </DialogDescription>
                </DialogHeader>
                <Card className="p-2">
                    <CardDescription>
                        <h3 className="text-lg text-white  leading-6">Edit Company</h3>
                    </CardDescription>
                    <CardContent className="space-y-5">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3  space-y-6">
                                <div className="grid grid-cols-2 gap-3">
                                    <FormField
                                        control={form.control}
                                        name="companyName"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Company Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Name" {...field} />
                                                </FormControl>
                                                {/* <FormDescription>
                                    This is your public display name.
                                </FormDescription> */}
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="companyAddress"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Company Address</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Address" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="companyCity"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Company City</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="City" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="companyZip"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Company Zip</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Zip" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="companyCountry"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Company Country</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Country" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="companyEmail"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Company Email</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Email" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="companyPhone"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Company Phone</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Phone" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="companyWebsite"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Company Website</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Website" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="companyVat"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Company Vat</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Vat" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <Button type="submit">Submit</Button>


                            </form>
                        </Form>
                        <Button onClick={handleDelete} variant={"destructive"}>Delete</Button>
                    </CardContent>
                </Card>
            </motion.div>
        </DialogContent>
    )
}