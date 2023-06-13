import React, { useEffect, useState } from 'react'

import type { Company, Invoice } from '@prisma/client'
import CompanyRevenue from '@/components/Dashboard/HomeTab/Charts/CompanyRevenue'
import RecentInvoices from '@/components/Dashboard/HomeTab/RecentInvoices'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Activity, CreditCard, DollarSign, Users } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useSelector } from 'react-redux'
import { RootState } from '@/stores/invoiceSlice'
interface HomeTabProps {
    Invoices: Invoice[] | undefined;
    Companies: Company[] | undefined;
}

export default function HomeTab({ Companies }: HomeTabProps) {
    const invoiceSelector = useSelector((state: RootState) => state.items);
    const [totalRevenueThisMonth, setTotalRevenueThisMonth] = useState<number>(0);
    const [totalRevenue, setTotalRevenue] = useState<number>(0);

    const [revenueDifferencePercentage, setRevenueDifferencePercentage] = useState<number>(0);
    const [percentageInvoicesThisMonth, setPercentageInvoicesThisMonth] = useState<number>(0);
    useEffect(() => {

        const calculateInvoicesThisMonth = () => {
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth();

            const invoicesThisMonth = invoiceSelector.filter(invoice => {
                const invoiceDate = new Date(invoice.invoiceDate);
                const invoiceMonth = invoiceDate.getMonth();
                return invoiceMonth === currentMonth;
            });

            return invoicesThisMonth.length;
        };

        // Calculate the percentage of invoices created this month compared to the total invoices
        const calculateInvoicePercentage = () => {
            const totalInvoicesThisMonth = calculateInvoicesThisMonth();
            const totalInvoices = invoiceSelector.length;

            if (totalInvoices === 0) {
                // Handle division by zero case
                return 0;
            }

            const percentage = (totalInvoicesThisMonth / totalInvoices) * 100;
            return percentage;
        };

        const percentageInvoicesThisMonth = calculateInvoicePercentage();
        setPercentageInvoicesThisMonth(percentageInvoicesThisMonth);

        const calculateTotalRevenue = () => {
            const totalRevenue = invoiceSelector.reduce((acc, invoice) => {
                const invoiceTotal = invoice.Services.reduce(
                    (acc, service) => acc + service.price * service.quantity,
                    0
                )
                return acc + invoiceTotal;
            }, 0);
            return totalRevenue;
        }
        const calculateTotalRevenueThisMonth = () => {
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth();

            const totalRevenue = invoiceSelector.reduce((acc, invoice) => {
                const invoiceDate = new Date(invoice.invoiceDate);
                const invoiceYear = invoiceDate.getFullYear();
                const invoiceMonth = invoiceDate.getMonth();
                console.log(invoice)
                if (invoiceYear === currentYear && invoiceMonth === currentMonth) {
                    const invoiceTotal = invoice.Services.reduce(
                        (acc, service) => acc + service.price * service.quantity,
                        0
                    )
                    console.log(invoiceTotal)
                    return acc + invoiceTotal;
                }

                return acc;
            }, 0);

            return totalRevenue;
        };
        // Calculate total revenue for the previous month
        const calculateTotalRevenueLastMonth = () => {
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth();

            const lastMonthDate = new Date(currentYear, currentMonth - 1);
            const lastMonthYear = lastMonthDate.getFullYear();
            const lastMonthMonth = lastMonthDate.getMonth();

            const totalRevenue = invoiceSelector.reduce((acc, invoice) => {
                const invoiceDate = new Date(invoice.invoiceDate);
                const invoiceYear = invoiceDate.getFullYear();
                const invoiceMonth = invoiceDate.getMonth();

                if (invoiceYear === lastMonthYear && invoiceMonth === lastMonthMonth) {
                    const invoiceTotal = invoice.Services.reduce(
                        (acc, service) => acc + service.price * service.quantity,
                        0
                    );
                    return acc + invoiceTotal;
                }

                return acc;
            }, 0);

            return totalRevenue;
        };

        // Calculate the percentage difference between current month and previous month revenue
        const calculateRevenueDifferencePercentage = () => {
            const currentMonthRevenue = calculateTotalRevenueThisMonth();
            const lastMonthRevenue = calculateTotalRevenueLastMonth();
            if (lastMonthRevenue === 0) {
                // Handle division by zero case
                return 0;
            }
            const difference = currentMonthRevenue - lastMonthRevenue;
            const percentageDifference = (difference / lastMonthRevenue) * 100;

            return percentageDifference;
        };

        const totalRevenue = calculateTotalRevenueThisMonth();
        setTotalRevenueThisMonth(totalRevenue);

        const differencePercentage = calculateRevenueDifferencePercentage();
        setRevenueDifferencePercentage(differencePercentage);
        setTotalRevenueThisMonth(calculateTotalRevenueThisMonth());
        setTotalRevenue(calculateTotalRevenue());
    }, [invoiceSelector, totalRevenueThisMonth]);
    return (

        <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analytics" disabled>
                    Analytics
                </TabsTrigger>
                <TabsTrigger value="reports" disabled>
                    Reports
                </TabsTrigger>
                <TabsTrigger value="notifications" disabled>
                    Notifications
                </TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Revenue
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${totalRevenue}</div>
                            <p className="text-xs text-muted-foreground">
                                +{revenueDifferencePercentage.toFixed(2)}% from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Revenue This Month
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">${totalRevenueThisMonth.toFixed(2)}</div>
                            <p className="text-xs text-muted-foreground">
                                +180.1% from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Invoices created</CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+{invoiceSelector.length}</div>
                            <p className="text-xs text-muted-foreground">
                                +{percentageInvoicesThisMonth.toFixed(2)}% from last month
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Active Now
                            </CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">+573</div>
                            <p className="text-xs text-muted-foreground">
                                +201 since last hour
                            </p>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4">
                        <CardHeader>
                            <CardTitle>Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <CompanyRevenue />
                        </CardContent>
                    </Card>
                    <Card className="col-span-3">
                        <CardHeader>
                            <CardTitle>Recent Sales</CardTitle>
                            <CardDescription>
                                You made 265 sales this month.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <RecentInvoices />
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>
        </Tabs>


    )
}
