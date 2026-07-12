export const stats = [
  {
    id: 1,
    title: "Active Vehicles",
    value: 53,
    color: "border-blue-500",
  },
  {
    id: 2,
    title: "Available Vehicles",
    value: 42,
    color: "border-green-500",
  },
  {
    id: 3,
    title: "Vehicles In Maintenance",
    value: "05",
    color: "border-amber-500",
  },
  {
    id: 4,
    title: "Active Trips",
    value: 18,
    color: "border-blue-500",
  },
  {
    id: 5,
    title: "Pending Trips",
    value: "09",
    color: "border-slate-500",
  },
  {
    id: 6,
    title: "Drivers On Duty",
    value: 26,
    color: "border-blue-500",
  },
  {
    id: 7,
    title: "Fleet Utilization",
    value: "81%",
    color: "border-green-500",
  },
];

export const recentTrips = [
  {
    id: "TR001",
    vehicle: "VAN-05",
    driver: "Alex",
    status: "On Trip",
    eta: "45 min",
  },
  {
    id: "TR002",
    vehicle: "TRUCK-12",
    driver: "John",
    status: "Completed",
    eta: "--",
  },
  {
    id: "TR003",
    vehicle: "MINI-03",
    driver: "Priya",
    status: "Dispatched",
    eta: "1 hr 10 min",
  },
  {
    id: "TR004",
    vehicle: "--",
    driver: "--",
    status: "Draft",
    eta: "Awaiting Vehicle",
  },
];

export const vehicleStatus = [
  {
    label: "Available",
    value: 81,
    color: "bg-green-500",
  },
  {
    label: "On Trip",
    value: 42,
    color: "bg-blue-500",
  },
  {
    label: "In Shop",
    value: 18,
    color: "bg-amber-500",
  },
  {
    label: "Retired",
    value: 10,
    color: "bg-red-500",
  },
];

export const vehicleTypes = ["All", "Van", "Truck", "Mini", "Trailer"];

export const regions = ["All", "North", "South", "East", "West"];

export const statuses = [
  "All",
  "Available",
  "On Trip",
  "Maintenance",
  "Retired",
];
