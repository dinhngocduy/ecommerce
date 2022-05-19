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
  AreaChart,
  Area,
} from "recharts";
import moment from "moment";
import DataContext from "../context/DataContext";

import React, { useState, useEffect, useContext } from "react";
function SoldProductsPerDay() {
  const currentDate = new Date();
  const { allSoldProducts } = useContext(DataContext);

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

  const [totalSoldProductsDay1, setTotalSoldProductsDay1] = useState(0);
  const [totalSoldProductsDay2, setTotalSoldProductsDay2] = useState(0);

  const [totalSoldProductsDay3, setTotalSoldProductsDay3] = useState(0);

  const [totalSoldProductsDay4, setTotalSoldProductsDay4] = useState(0);

  const [totalSoldProductsDay5, setTotalSoldProductsDay5] = useState(0);

  const [totalSoldProductsDay6, setTotalSoldProductsDay6] = useState(0);

  const [totalSoldProductsYesterday, setTotalSoldProductsYesterday] =
    useState(0);
  const [totalSoldProductsToday, setTotalSoldProductsToday] = useState(0);

  const data = [
    {
      date: day1,
      totalSoldProducts: totalSoldProductsDay1,
    },
    {
      date: day2,
      totalSoldProducts: totalSoldProductsDay2,
    },
    {
      date: day3,
      totalSoldProducts: totalSoldProductsDay3,
    },
    {
      date: day4,
      totalSoldProducts: totalSoldProductsDay4,
    },
    {
      date: day5,
      totalSoldProducts: totalSoldProductsDay5,
    },
    {
      date: day6,
      totalSoldProducts: totalSoldProductsDay6,
    },
    {
      date: yesterday,
      totalSoldProducts: totalSoldProductsYesterday,
    },
    { date: today, totalSoldProducts: totalSoldProductsToday },
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
    let newSoldProductsArray1 = 0;
    let newSoldProductsArray2 = 0;
    let newSoldProductsArray3 = 0;

    let newSoldProductsArray4 = 0;
    let newSoldProductsArray5 = 0;
    let newSoldProductsArray6 = 0;
    let newSoldProductsArray7 = 0;
    let newSoldProductsArray8 = 0;
    allSoldProducts.map((soldProduct) => {
      if (
        (day1 - soldProduct.created) / (1000 * 3600 * 24) > 0 &&
        (day1 - soldProduct.created) / (1000 * 3600 * 24) < 1
      ) {
        newSoldProductsArray1 = newSoldProductsArray1 + soldProduct.quantity;
        setTotalSoldProductsDay1(newSoldProductsArray1);
      } else if (
        (day2 - soldProduct.created) / (1000 * 3600 * 24) > 0 &&
        (day2 - soldProduct.created) / (1000 * 3600 * 24) < 1
      ) {
        newSoldProductsArray2 = newSoldProductsArray2 + soldProduct.quantity;
        setTotalSoldProductsDay2(newSoldProductsArray2);
      } else if (
        (day3 - soldProduct.created) / (1000 * 3600 * 24) > 0 &&
        (day3 - soldProduct.created) / (1000 * 3600 * 24) < 1
      ) {
        newSoldProductsArray3 = newSoldProductsArray3 + soldProduct.quantity;
        setTotalSoldProductsDay3(newSoldProductsArray3);
      } else if (
        (day4 - soldProduct.created) / (1000 * 3600 * 24) > 0 &&
        (day4 - soldProduct.created) / (1000 * 3600 * 24) < 1
      ) {
        newSoldProductsArray4 = newSoldProductsArray4 + soldProduct.quantity;
        setTotalSoldProductsDay4(newSoldProductsArray4);
      } else if (
        (day5 - soldProduct.created) / (1000 * 3600 * 24) > 0 &&
        (day5 - soldProduct.created) / (1000 * 3600 * 24) < 1
      ) {
        newSoldProductsArray5 = newSoldProductsArray5 + soldProduct.quantity;
        setTotalSoldProductsDay5(newSoldProductsArray5);
      } else if (
        (day6 - soldProduct.created) / (1000 * 3600 * 24) > 0 &&
        (day6 - soldProduct.created) / (1000 * 3600 * 24) < 1
      ) {
        newSoldProductsArray6 = newSoldProductsArray6 + soldProduct.quantity;
        setTotalSoldProductsDay6(newSoldProductsArray6);
      } else if (
        (yesterday - soldProduct.created) / (1000 * 3600 * 24) > 0 &&
        (yesterday - soldProduct.created) / (1000 * 3600 * 24) < 1
      ) {
        newSoldProductsArray7 = newSoldProductsArray7 + soldProduct.quantity;
        setTotalSoldProductsYesterday(newSoldProductsArray7);
      } else if (
        (today - soldProduct.created) / (1000 * 3600 * 24) > 0 &&
        (today - soldProduct.created) / (1000 * 3600 * 24) < 1
      ) {
        newSoldProductsArray8 = newSoldProductsArray8 + soldProduct.quantity;
        setTotalSoldProductsToday(newSoldProductsArray8);
      }
    });
  }, []);
  return (
    <div className="soldProductsPerDay">
      <h3>Total Sold Products This Week</h3>
      <ResponsiveContainer
        width="100%"
        height={300}
        data={data}
        key={`rc_${data.length}`}
      >
        <AreaChart data={data} key={`lc_${data.length}`}>
          <Line
            dataKey="totalSoldProducts"
            stroke="#8884d8"
            key={`l_${data.length}`}
          />
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
          <Area
            type="monotone"
            dataKey="totalSoldProducts"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <XAxis
            dataKey="date"
            scale="time"
            type="number"
            domain={[date_min, date_max]}
            tickFormatter={dateFormatter}
          />
          <YAxis />
          <Bar dataKey="totalSoldProducts" fill="#8884d8" barSize={30} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SoldProductsPerDay;
