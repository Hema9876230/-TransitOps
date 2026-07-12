import { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { getAnalytics } from "../utils/analyticsApi";

const COLORS = [
  "#2563eb",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
];

export default function Analytics() {

  const [data, setData] = useState(null);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {

    const res = await getAnalytics();

    setData(res.data);

  };

  if (!data)
    return <h2 className="p-6">Loading...</h2>;

  return (

    <div className="p-6 space-y-8">

      <h1 className="text-3xl font-bold">
        Fleet Analytics
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white rounded-xl shadow p-5">

          <h2 className="font-bold mb-4">
            Trip Status
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <PieChart>

              <Pie
                data={data.tripStatus}
                dataKey="value"
                nameKey="_id"
                outerRadius={100}
              >

                {data.tripStatus.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={
                      COLORS[index % COLORS.length]
                    }
                  />

                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        <div className="bg-white rounded-xl shadow p-5">

          <h2 className="font-bold mb-4">
            Trips Per Month
          </h2>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={data.monthlyTrips}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="_id" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="trips" fill="#2563eb" />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="font-bold">
            Total Fuel Cost
          </h2>

          <h1 className="text-4xl mt-4 font-bold text-green-600">

            ₹{data.fuelCost[0]?.total || 0}

          </h1>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <h2 className="font-bold">
            Maintenance Cost
          </h2>

          <h1 className="text-4xl mt-4 font-bold text-red-600">

            ₹{data.maintenanceCost[0]?.total || 0}

          </h1>

        </div>

      </div>

    </div>

  );
}