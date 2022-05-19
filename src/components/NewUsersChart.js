import {
  ResponsiveContainer,
  BarChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  Legend,
  LineChart,
  AreaChart,
  Area,
  LabelList,
} from "recharts";
import moment from "moment";
import React, { useState, useEffect } from "react";
import "../css/NewUsersChart.css";
function NewUsersChart({ allUsers }) {
  const currentDate = new Date();

  const day1 = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - 7
  ).setHours(23, 59, 59, 999);
  const day2 = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - 6
  ).setHours(23, 59, 59, 999);
  const day3 = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - 5
  ).setHours(23, 59, 59, 999);

  const day4 = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - 4
  ).setHours(23, 59, 59, 999);
  const day5 = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - 3
  ).setHours(23, 59, 59, 999);
  const day6 = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - 2
  ).setHours(23, 59, 59, 999);

  const yesterday = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - 1
  ).setHours(23, 59, 59, 999);
  const today = new Date().setHours(23, 59, 59, 999);

  const [totalUsersDay1, setTotalUsersDay1] = useState(0);
  const [totalUsersDay2, setTotalUsersDay2] = useState(0);

  const [totalUsersDay3, setTotalUsersDay3] = useState(0);

  const [totalUsersDay4, setTotalUsersDay4] = useState(0);

  const [totalUsersDay5, setTotalUsersDay5] = useState(0);

  const [totalUsersDay6, setTotalUsersDay6] = useState(0);

  const [totalUsersYesterday, setTotalUsersYesterday] = useState(0);
  const [totalUsersToday, setTotalUsersToday] = useState(0);

  const data = [
    {
      date: day1,
      totalNewUsers: totalUsersDay1,
    },
    {
      date: day2,
      totalNewUsers: totalUsersDay2,
    },
    {
      date: day3,
      totalNewUsers: totalUsersDay3,
    },
    {
      date: day4,
      totalNewUsers: totalUsersDay4,
    },
    {
      date: day5,
      totalNewUsers: totalUsersDay5,
    },
    {
      date: day6,
      totalNewUsers: totalUsersDay6,
    },
    {
      date: yesterday,
      totalNewUsers: totalUsersYesterday,
    },
    { date: today, totalNewUsers: totalUsersToday },
  ];
  let date_min = 0;
  let date_max = 0;

  if (data.length > 0) {
    date_min = data[0]["date"] - 1000 * 60 * 60 * 24;
    date_max = data.slice(-1)[0]["date"] + 1000 * 60 * 60 * 24;
  }
  const dateFormatter = (date) => {
    // return moment(date).unix();
    return moment(date).format("DD-MMM-YY");
  };

  useEffect(() => {
    const newUsersArray1 = [];
    const newUsersArray2 = [];
    const newUsersArray3 = [];

    const newUsersArray4 = [];
    const newUsersArray5 = [];
    const newUsersArray6 = [];
    const newUsersArray7 = [];
    const newUsersArray8 = [];
    allUsers.map((user) => {
      if (
        (day1 - user.created) / (1000 * 3600 * 24) > 0 &&
        (day1 - user.created) / (1000 * 3600 * 24) < 1
      ) {
        newUsersArray1.push({ created: user.Email });
        setTotalUsersDay1(newUsersArray1.length);
      } else if (
        (day2 - user.created) / (1000 * 3600 * 24) > 0 &&
        (day2 - user.created) / (1000 * 3600 * 24) < 1
      ) {
        newUsersArray2.push({ created: user.Email });
        setTotalUsersDay2(newUsersArray2.length);
      } else if (
        (day3 - user.created) / (1000 * 3600 * 24) > 0 &&
        (day3 - user.created) / (1000 * 3600 * 24) < 1
      ) {
        newUsersArray3.push({ created: user.created });
        setTotalUsersDay3(newUsersArray3.length);
      } else if (
        (day4 - user.created) / (1000 * 3600 * 24) > 0 &&
        (day4 - user.created) / (1000 * 3600 * 24) < 1
      ) {
        newUsersArray4.push({ created: user.created });
        setTotalUsersDay4(newUsersArray4.length);
      } else if (
        (day5 - user.created) / (1000 * 3600 * 24) > 0 &&
        (day5 - user.created) / (1000 * 3600 * 24) < 1
      ) {
        newUsersArray5.push({ created: user.created });
        setTotalUsersDay5(newUsersArray5.length);
      } else if (
        (day6 - user.created) / (1000 * 3600 * 24) > 0 &&
        (day6 - user.created) / (1000 * 3600 * 24) < 1
      ) {
        newUsersArray6.push({ created: user.Email });
        setTotalUsersDay6(newUsersArray6.length);
      } else if (
        (yesterday - user.created) / (1000 * 3600 * 24) > 0 &&
        (yesterday - user.created) / (1000 * 3600 * 24) < 1
      ) {
        newUsersArray7.push({ created: user.Email });
        setTotalUsersYesterday(newUsersArray7.length);
      } else if (
        (today - user.created) / (1000 * 3600 * 24) > 0 &&
        (today - user.created) / (1000 * 3600 * 24) < 1
      ) {
        newUsersArray8.push({ created: user.Email });
        setTotalUsersToday(newUsersArray8.length);
      }
    });
  }, []);
  return (
    <div className="newUsersChart">
      <h3>Total Users Registered This Week</h3>
      <ResponsiveContainer
        width="100%"
        height={300}
        data={data}
        key={`rc_${data.length}`}
      >
        <AreaChart data={data} key={`lc_${data.length}`}>
          <CartesianGrid stroke="#ccc" />
          <Tooltip wrapperStyle={{ width: "10%", backgroundColor: "#ccc" }} />
          <Legend
            width={200}
            wrapperStyle={{
              top: -50,
              right: 20,
              backgroundColor: "#f5f5f5",
              border: "1px solid #d5d5d5",
              borderRadius: 3,
              lineHeight: "40px",
            }}
          />
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="1" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={1} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0.15} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            scale="time"
            type="number"
            domain={[date_min, date_max]}
            tickFormatter={dateFormatter}
          />
          <YAxis />
          <Bar dataKey="totalNewUsers" fill="#8884d8" barSize={30} />
          <Line
            dataKey="totalNewUsers"
            stroke="#8884d8"
            key={`l_${data.length}`}
          />
          <Area
            type="monotone"
            dataKey="totalNewUsers"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default NewUsersChart;
