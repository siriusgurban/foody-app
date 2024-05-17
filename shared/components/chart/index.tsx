
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

interface DataItem {
    name: string;
    value: number;
}

const data: DataItem[] = [
    { name: 'KFC', value: 29 },
    { name: 'KLM', value: 23 },
    { name: 'American Express', value: 15 },
    { name: 'MC', value: 12 },
    { name: 'Burger King', value: 10 },
    { name: 'Unknown', value: 11 },
];

const COLORS = ['#8D43FF', '#4CD964', '#BB6BD9', '#A84069', '#EAAB00', '#00B2A9'];

const DonutChart: React.FC = () => (
    <div className="flex flex-col items-start  bg-admin-secondary p-4 rounded-lg shadow-lg w-[430px] h-[400px] " >
        <h2 className="text-xl font-semibold mb-4 text-admin-text       font-medium" >Orders</h2>
        <div className="w-full h-full ">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={90}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
        <div className="mt-4 flex flex-wrap justify-center">
            {data.map((entry, index) => (
                <div key={`legend-${index}`} className="flex items-center mr-4 mb-2">
                    <div
                        className="w-3 h-3 mr-2"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="  text-admin-text font-normal">{entry.name}</span>
                </div>
            ))}
        </div>
    </div>
);

export default DonutChart;


