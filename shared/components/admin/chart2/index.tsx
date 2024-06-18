import React from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface DataItem {
  month: string
  'year 2022': number
  'year 2023': number
  'year 2024': number
}

const data: DataItem[] = [
  { month: 'Jan', 'year 2022': 40, 'year 2023': 24, 'year 2024': 35 },
  { month: 'Feb', 'year 2022': 30, 'year 2023': 13, 'year 2024': 45 },
  { month: 'Mar', 'year 2022': 20, 'year 2023': 98, 'year 2024': 20 },
  { month: 'Apr', 'year 2022': 27, 'year 2023': 39, 'year 2024': 30 },
  { month: 'May', 'year 2022': 18, 'year 2023': 48, 'year 2024': 40 },
  { month: 'Jun', 'year 2022': 23, 'year 2023': 38, 'year 2024': 50 },
  { month: 'Jul', 'year 2022': 34, 'year 2023': 43, 'year 2024': 60 },
  { month: 'Aug', 'year 2022': 44, 'year 2023': 38, 'year 2024': 70 },
  { month: 'Sep', 'year 2022': 25, 'year 2023': 40, 'year 2024': 80 },
  { month: 'Oct', 'year 2022': 28, 'year 2023': 45, 'year 2024': 90 },
  { month: 'Nov', 'year 2022': 19, 'year 2023': 42, 'year 2024': 100 },
  { month: 'Dec', 'year 2022': 30, 'year 2023': 54, 'year 2024': 110 },
]

const COLORS = ['#914DF0', '#3FAEA3', '#F4A26C']

const MountainAreaChart: React.FC = () => (
  <div className="flex flex-col items-start bg-admin-secondary p-4 rounded-lg shadow-lg w-[630px] h-[400px]">
    <h2 className="text-xl font-semibold mb-4 text-admin-text">Total Salary</h2>
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <defs>
            <linearGradient id="color2022" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS[0]} stopOpacity={0.8} />
              <stop offset="95%" stopColor={COLORS[0]} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="color2023" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS[1]} stopOpacity={0.8} />
              <stop offset="95%" stopColor={COLORS[1]} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="color2024" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={COLORS[2]} stopOpacity={0.8} />
              <stop offset="95%" stopColor={COLORS[2]} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="year 2022"
            stroke={COLORS[0]}
            fill="url(#color2022)"
          />
          <Area
            type="monotone"
            dataKey="year 2023"
            stroke={COLORS[1]}
            fill="url(#color2023)"
          />
          <Area
            type="monotone"
            dataKey="year 2024"
            stroke={COLORS[2]}
            fill="url(#color2024)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
)
export default MountainAreaChart
