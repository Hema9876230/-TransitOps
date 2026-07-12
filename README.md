# 🚚 TransportOps - Smart Fleet Management System

<p align="center">
  <img src="https://img.shields.io/badge/MERN-Stack-green" />
  <img src="https://img.shields.io/badge/React-Frontend-blue" />
  <img src="https://img.shields.io/badge/Node.js-Backend-brightgreen" />
  <img src="https://img.shields.io/badge/MongoDB-Database-success" />
  <img src="https://img.shields.io/badge/Express.js-API-lightgrey" />
  <img src="https://img.shields.io/badge/License-MIT-orange" />
</p>

A full-stack **Fleet Management System** built using the **MERN Stack** that helps organizations efficiently manage vehicles, drivers, trips, maintenance, fuel expenses, and analytics through an intuitive dashboard.

---

# 📖 Overview

TransportOps is designed to simplify fleet operations by providing a centralized platform to manage:

- Fleet Vehicles
- Drivers
- Trips
- Maintenance
- Fuel Expenses
- Fleet Analytics
- User Authentication
- Settings & Profile Management

The application enables fleet managers to monitor their operations in real time and maintain complete records.

---

# ✨ Features

## 🔐 Authentication

- User Registration
- Secure Login
- JWT Authentication
- Protected Routes
- Logout
- Role-based Authentication Ready

---

## 📊 Dashboard

Live Dashboard displaying:

- Total Vehicles
- Available Vehicles
- Total Drivers
- Active Trips
- Completed Trips
- Maintenance Due
- Fuel Cost Summary
- Recent Trips

---

## 🚚 Vehicle Management

- Add Vehicle
- Edit Vehicle
- Delete Vehicle
- Vehicle Status
- Vehicle Capacity
- Fuel Type
- Mileage Tracking
- Search Vehicles

---

## 👨 Driver Management

- Add Driver
- Edit Driver
- Delete Driver
- Driver License Details
- Contact Information
- Driver Status
- Search Drivers

---

## 🛣 Trip Management

- Create Trip
- Assign Driver
- Assign Vehicle
- Trip Source & Destination
- Distance Tracking
- Trip Status
- Trip History
- Update Trip
- Delete Trip

---

## 🔧 Maintenance Management

- Schedule Maintenance
- Vehicle Selection
- Service Type
- Maintenance Cost
- Service Date
- Next Service Date
- Maintenance Status
- Maintenance Notes

---

## ⛽ Fuel & Expense Management

- Fuel Logs
- Fuel Quantity
- Fuel Type
- Fuel Cost
- Odometer Reading
- Fuel Station
- Expense Tracking
- Search Fuel Logs

---

## 📈 Analytics

Interactive Charts using Recharts

- Vehicle Status
- Trip Status
- Monthly Trips
- Fuel Cost
- Maintenance Cost
- Driver Availability

---

## ⚙ Settings

- Update Profile
- Change Password
- User Preferences
- Notification Settings
- Dark Mode Ready

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router DOM
- Tailwind CSS
- Axios
- Recharts
- React Icons

---

## Backend

- Node.js
- Express.js
- JWT Authentication
- bcryptjs

---

## Database

- MongoDB
- Mongoose

---

# 📁 Project Structure

```
TransportOps
│
├── Frontend
│   ├── src
│   │
│   ├── assets
│   ├── components
│   ├── config
│   ├── context
│   ├── layouts
│   ├── pages
│   ├── routes
│   ├── utils
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── package.json
│
├── Backend
│   ├── src
│   │
│   ├── config
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routers
│   ├── utils
│   │
│   ├── index.js
│   └── package.json
│
└── README.md
```

---

# 📦 Modules

- Authentication
- Dashboard
- Fleet Management
- Driver Management
- Trip Management
- Maintenance Management
- Fuel & Expense Management
- Analytics Dashboard
- Settings

---

# 📊 Database Collections

```
Users

Vehicles

Drivers

Trips

Maintenance

Fuel
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/TransportOps.git
```

---

## Frontend

```bash
cd Frontend
npm install
npm run dev
```

Runs on

```
http://localhost:5173
```

---

## Backend

```bash
cd Backend
npm install
npm run dev
```

Runs on

```
http://localhost:4500
```

---

# 🔑 Environment Variables

Create a `.env` file inside the Backend folder.

```env
PORT=4500

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

# 📡 API Endpoints

## Authentication

```
POST /api/auth/register

POST /api/auth/login
```

---

## Vehicles

```
GET /api/vehicles

POST /api/vehicles

PUT /api/vehicles/:id

DELETE /api/vehicles/:id
```

---

## Drivers

```
GET /api/drivers

POST /api/drivers

PUT /api/drivers/:id

DELETE /api/drivers/:id
```

---

## Trips

```
GET /api/trips

POST /api/trips

PUT /api/trips/:id

DELETE /api/trips/:id
```

---

## Maintenance

```
GET /api/maintenance

POST /api/maintenance

PUT /api/maintenance/:id

DELETE /api/maintenance/:id
```

---

## Fuel

```
GET /api/fuel

POST /api/fuel

PUT /api/fuel/:id

DELETE /api/fuel/:id
```

---

## Analytics

```
GET /api/analytics
```

---

## Dashboard

```
GET /api/dashboard
```

---

## Settings

```
GET /api/settings/profile

PUT /api/settings/profile

PUT /api/settings/change-password
```

---

# 📷 Screenshots

You can add screenshots here after deployment.

```
Login Page

Dashboard

Vehicle Module

Driver Module

Trip Module

Maintenance Module

Fuel Module

Analytics

Settings
```

---

# 🎯 Future Enhancements

- Google Maps Integration
- Live Vehicle Tracking
- Email Notifications
- SMS Alerts
- PDF Report Generation
- Excel Export
- Role-Based Access Control
- Driver License Expiry Reminder
- Maintenance Reminder
- Fuel Cost Forecasting
- Real-Time Notifications
- Socket.IO Integration
- Mobile Responsive Enhancements

---

# 🎓 Learning Outcomes

This project demonstrates:

- MERN Stack Development
- REST API Development
- JWT Authentication
- CRUD Operations
- MongoDB Relationships
- React Hooks
- React Context API
- Axios API Integration
- Tailwind CSS
- Dashboard Development
- Data Visualization with Recharts
- Clean Project Architecture

---

# 👩‍💻 Author

**Hema Rani**

B.Tech CSE (AI & ML)

Full Stack MERN Developer

GitHub: https://github.com/yourusername

LinkedIn: https://linkedin.com/in/yourprofile

---

# ⭐ Support

If you found this project helpful, please consider giving it a ⭐ on GitHub.

It helps others discover the project and supports future improvements.

---

# 📄 License

This project is licensed under the MIT License.

Feel free to use, modify, and learn from this project.
