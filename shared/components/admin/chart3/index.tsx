import React from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

interface DataItem {
  month: string
  KFC: number
  BurgerKing: number
  McDonalds: number
}

const data: DataItem[] = [
  { month: 'Jan', KFC: 4000, BurgerKing: 3000, McDonalds: 2500 },
  { month: 'Feb', KFC: 3500, BurgerKing: 3200, McDonalds: 2700 },
  { month: 'Mar', KFC: 4200, BurgerKing: 3100, McDonalds: 2600 },
  { month: 'Apr', KFC: 3800, BurgerKing: 2800, McDonalds: 2400 },
  { month: 'May', KFC: 4100, BurgerKing: 2900, McDonalds: 2300 },
  { month: 'Jun', KFC: 3800, BurgerKing: 3100, McDonalds: 2200 },
  { month: 'Jul', KFC: 3900, BurgerKing: 3300, McDonalds: 2100 },
  { month: 'Aug', KFC: 4200, BurgerKing: 3500, McDonalds: 2400 },
  { month: 'Sep', KFC: 4400, BurgerKing: 3600, McDonalds: 2500 },
  { month: 'Oct', KFC: 4600, BurgerKing: 3700, McDonalds: 2600 },
  { month: 'Nov', KFC: 4800, BurgerKing: 3800, McDonalds: 2700 },
  { month: 'Dec', KFC: 5000, BurgerKing: 4000, McDonalds: 2800 },
]

const COLORS = ['#4CD964', '#8D43FF', '#EB5757']

const FastFoodSalesBarChart: React.FC = () => (
  <div className="flex flex-col items-start bg-admin-secondary p-4 rounded-lg shadow-lg w-[500px] h-[400px]">
    <h2 className="text-xl font-semibold mb-4 text-admin-text">
      Fast Food Sales
    </h2>
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          {Object.keys(data[0])
            .slice(1)
            .map((restaurant, index) => (
              <Bar
                key={`bar-${restaurant}`}
                dataKey={restaurant}
                fill={COLORS[index]}
              />
            ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
)

export default FastFoodSalesBarChart
