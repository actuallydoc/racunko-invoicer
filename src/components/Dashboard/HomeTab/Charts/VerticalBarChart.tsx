import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { fakerDE as faker } from '@faker-js/faker';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Storage Information',
        },
    },
};
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', "November", "December"];
export const data = {
    labels,
    datasets: [
        {
            label: 'Items',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },

    ],
};
export default function VerticalBarChart() {
    return (
        <div className="box-border w-96 h-full bg-white rounded-3xl p-4 border-4 ...">
            <div className=''>
                <Bar options={options} data={data} />
            </div>

        </div>
    )
}
