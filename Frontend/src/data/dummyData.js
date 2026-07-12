// Dummy data — replace with real API calls once backend is available.

export const statCards = [
  { id: 1, label: "Total Vehicles", value: "128", change: "+4 this month", accent: "primary" },
  { id: 2, label: "Active Trips", value: "37", change: "+12% vs last week", accent: "secondary" },
  { id: 3, label: "Maintenance Due", value: "9", change: "3 overdue", accent: "danger" },
  { id: 4, label: "Fuel Cost (MTD)", value: "$12,480", change: "-6% vs last month", accent: "success" },
];

export const recentTrips = [
  { id: "TRP-1042", driver: "Ravi Kumar", vehicle: "MH12 AB 1234", status: "Completed", distance: "142 km" },
  { id: "TRP-1043", driver: "Sanya Mehta", vehicle: "DL8C XY 4521", status: "In Transit", distance: "88 km" },
  { id: "TRP-1044", driver: "Arjun Verma", vehicle: "KA05 MP 7789", status: "Delayed", distance: "215 km" },
  { id: "TRP-1045", driver: "Fatima Sheikh", vehicle: "GJ01 QR 3390", status: "Completed", distance: "60 km" },
  { id: "TRP-1046", driver: "Vikram Rao", vehicle: "TN22 ZT 5567", status: "Scheduled", distance: "175 km" },
];

export const driverStatusColors = {
  Completed: "success",
  "In Transit": "secondary",
  Delayed: "danger",
  Scheduled: "grey",
};
