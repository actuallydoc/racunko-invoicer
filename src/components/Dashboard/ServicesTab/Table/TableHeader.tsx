import React from 'react'
const HeaderNames = [
    "Service Name",
    "Service Price",
    "Service Description",
]
export default function TableHeader() {
    return (
        <tr>
            {HeaderNames.map((name) => (
                <th
                    key={name}
                    className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider"
                >
                    {name}
                </th>
            ))}
        </tr>
    )
}
