import PrimaryLayout from "../../Layout/PrimaryLayout";
import { BsLayoutTextSidebarReverse } from "react-icons/bs";
import React, { PureComponent, useEffect, useState } from "react";
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
import { logout } from "../../redux/slice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import truncateString from "../../utils/stringTruncate";
import currencyFormatter from "../../utils/currencyFormatter";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { tok } = useSelector((state) => state.user);
  const [loadingStatisticsData, setLoadingStatisticsData] = useState(false);
  const [loadingChartData, setLoadingChartData] = useState(false);
  const [dashboardData, setDashboardData] = useState([
    {
      Icon: BsLayoutTextSidebarReverse,
      title: "Total Seller",
      value: 0,
      className: "w-[95%] w-[53.7%] lg:w-[23.7%] bg-accent ",
    },
    {
      Icon: BsLayoutTextSidebarReverse,
      title: "Total Orders",
      value: 0,
      className: "w-[95%] w-[53.7%] lg:w-[23.7%] bg-[#9937BC] ",
    },
    {
      Icon: BsLayoutTextSidebarReverse,
      title: "Total Categories",
      value: 0,
      className: "w-[95%] w-[53.7%] lg:w-[23.7%] bg-primary ",
    },
    {
      Icon: BsLayoutTextSidebarReverse,
      title: "Total Brands",
      value: 0,
      className: "w-[95%] w-[53.7%] lg:w-[23.7%] bg-[#FF7C7F]",
    },
    {
      Icon: BsLayoutTextSidebarReverse,
      title: "Weekly Sale",
      value: 0,
      className: "w-[95%] w-[53.7%] lg:w-[32.2%] bg-[#FF7C7F]",
    },
    {
      Icon: BsLayoutTextSidebarReverse,
      title: "Monthly Sale",
      value: 0,
      className: "w-[95%] w-[53.7%] lg:w-[32.2%] bg-accent",
    },
    {
      Icon: BsLayoutTextSidebarReverse,
      title: "Yearly Sale",
      value: 0,
      className: "w-[95%] w-[53.7%] lg:w-[32.2%] bg-[#9937BC]",
    },
  ]);
  const [chartData, setChartData] = useState({});

  const getSalesStatistics = async () => {
    setLoadingStatisticsData(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/statistics`,
        {
          headers: {
            Authorization: tok,
          },
        }
      );

      setDashboardData((currData) =>
        currData.map((dt, i) => {
          dt.value = (i > 3 ? "₹ " : "") + currencyFormatter(data[i] || 0);
          return dt;
        })
      );
    } catch (error) {
      if (error?.response?.status === 401) {
        toast.dismiss();
        toast.error("Session Expired");
        dispatch(logout());
      }
    }
    setLoadingStatisticsData(false);
  };

  const getChartData = async () => {
    setLoadingChartData(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/chart-data`,
        {
          headers: {
            Authorization: tok,
          },
        }
      );

      data.pieChartData = data.pieChartData.map((item) => ({
        name: truncateString(item.name),
        value: item.value,
      }));

      setChartData(data);
    } catch (error) {
      if (error?.response?.status === 401) {
        toast.dismiss();
        toast.error("Session Expired");
        dispatch(logout());
      }
      // console.log(error);
      // navigate("/logout");
    }
    setLoadingChartData(false);
  };

  useEffect(() => {
    getSalesStatistics();
    getChartData();
  }, []);

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

  return (
    <PrimaryLayout>
      <div className="flex flex-col gap-10">
        <div className="flex flex-wrap justify-center items-center gap-4 flex-col lg:flex-row">
          {dashboardData.map((item, i) => (
            <DashboardCard key={i} {...item} loading={loadingStatisticsData} />
          ))}
        </div>
        <div className="h-[40rem] lg:h-96 flex border gap-5 bg-white p-5 shadow-2xl rounded-xl flex-col lg:flex-row">
          {loadingChartData ? (
            <div className="w-52 h-52 m-auto">
              <Loading />
            </div>
          ) : (
            <>
              {" "}
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={chartData?.lineChartData}
                  margin={{
                    top: 10,
                    right: 30,
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
                    dataKey="Sale"
                    stroke="#852CFF"
                    // activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={500} height={500}>
                  <Pie
                    data={chartData?.pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData?.pieChartData?.map((entry, index) => (
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
            </>
          )}
        </div>
      </div>
    </PrimaryLayout>
  );
};

const DashboardCard = ({ className, Icon, title, value, loading }) => {
  return (
    <div className={`card text-primary-content shadow-xl ${className}`}>
      <div className="card-body flex flex-col items-center text-white">
        {Icon ? <Icon size={30} /> : <></>}
        <h2 className="card-title">{title}</h2>
        <p>
          {loading ? (
            <div className="w-10 h-10 ">
              <Loading />
            </div>
          ) : (
            value
          )}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
