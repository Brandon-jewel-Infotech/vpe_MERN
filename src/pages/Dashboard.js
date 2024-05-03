import PrimaryLayout from "../Layout/PrimaryLayout";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";
import React, { PureComponent } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Dashboard = () => {
  const dashboardData = [
    {
      Icon: BsLayoutTextSidebarReverse,
      title: "Total Orders",
      value: "$10,000.00",
      className: "w-[53.7%] lg:w-[23.7%] bg-accent ",
    },
    {
      Icon: BsLayoutTextSidebarReverse,
      title: "Total Orders",
      value: "$10,000.00",
      className: "w-[53.7%] lg:w-[23.7%] bg-[#9937BC] ",
    },
    {
      Icon: BsLayoutTextSidebarReverse,
      title: "Total Orders",
      value: "$10,000.00",
      className: "w-[53.7%] lg:w-[23.7%] bg-primary ",
    },
    {
      Icon: BsLayoutTextSidebarReverse,
      title: "Total Orders",
      value: "$10,000.00",
      className: "w-[53.7%] lg:w-[23.7%] bg-[#FF7C7F]",
    },
    {
      Icon: BsLayoutTextSidebarReverse,
      title: "Total Orders",
      value: "$10,000.00",
      className: "w-[53.7%] lg:w-[32.2%] bg-[#FF7C7F]",
    },
    {
      Icon: BsLayoutTextSidebarReverse,
      title: "Total Orders",
      value: "$10,000.00",
      className: "w-[53.7%] lg:w-[32.2%] bg-accent",
    },
    {
      Icon: BsLayoutTextSidebarReverse,
      title: "Total Orders",
      value: "$10,000.00",
      className: "w-[53.7%] lg:w-[32.2%] bg-[#9937BC]",
    },
  ];

  const data01 = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 500 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];

  const COLORS = ["#0ea5e9", "#9937BC", "#fbbf24", "#FF7C7F"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <PrimaryLayout>
      <div className="flex flex-col gap-10">
        <div className="flex flex-wrap justify-center items-center gap-4 flex-col lg:flex-row">
          {dashboardData.map((item) => (
            <DashboardCard {...item} />
          ))}
        </div>
        <div className="lg:h-96 flex border gap-5 bg-white p-5 shadow-2xl rounded-xl flex-col lg:flex-row">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#852CFF"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={500} height={500}>
              <Pie
                data={data01}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </PrimaryLayout>
  );
};

const DashboardCard = ({ className, Icon, title, value }) => {
  return (
    <div className={`card text-primary-content shadow-xl ${className}`}>
      {/* <figure>
        <img
          src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt={title}
        />
      </figure> */}
      <div className="card-body flex flex-col items-center text-white">
        {Icon ? <Icon size={30} /> : <></>}
        <h2 className="card-title">{title}</h2>
        <p>{value}</p>
      </div>
    </div>
  );
};

export default Dashboard;
