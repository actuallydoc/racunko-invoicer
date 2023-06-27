import { type RootState } from '@/stores/invoiceSlice';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
interface MonthlyData {
    name: string;
    total: number;
}
export default function CompanyRevenue() {
    const invoiceSelector = useSelector((state: RootState) => state.items);
    const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
    useEffect(() => {
        const calculateMonthlyData = () => {
            const monthlyData: MonthlyData[] = invoiceSelector.reduce(
                (acc: MonthlyData[], invoice) => {
                    const invoiceDate = new Date(invoice.invoiceDate);
                    const month = invoiceDate.getMonth();
                    // Iterate over invoice services and sum the total
                    if (invoice.Services.length === 0) return acc;
                    const total = invoice.Services.reduce(
                        (acc, service) => acc + service.price * service.quantity,
                        0
                    );

                    // If the month is not present in the accumulator, create a new entry
                    const existingMonthData = acc.find((data) => data.name === getMonthName(month));
                    if (!existingMonthData) {
                        acc.push({
                            name: getMonthName(month), // Custom function to get month name from month number
                            total: 0
                        });
                    }

                    // Update the properties of the existing month's data
                    const updatedMonthData = acc.find((data) => data.name === getMonthName(month));
                    if (updatedMonthData) {
                        updatedMonthData.total += total;
                    }

                    return acc;
                },
                []
            );

            return monthlyData;
        };
        const getMonthName = (month: number): string => {
            const monthNames: string[] = [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ];
            return monthNames[month] as string;
        };

        const updatedMonthlyData = calculateMonthlyData();
        setMonthlyData(updatedMonthlyData);
    }, [invoiceSelector]);
    return (
        <ResponsiveContainer className="w-auto h-auto" height={500}>
            {monthlyData.length === 0 ? (
                <div className="flex items-center justify-center">No data</div>
            ) : (
                <BarChart data={monthlyData}>
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={true} axisLine={false} />
                    <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={true}
                        axisLine={false}
                        tickFormatter={(value) => `${value as number} €`}
                    />
                    <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
                </BarChart>
            )}
        </ResponsiveContainer>
    );
}