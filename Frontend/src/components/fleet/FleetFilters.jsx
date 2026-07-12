import React from "react";
import Input from "../Input.jsx";
import Select from "../Select.jsx";
import Button from "../Button.jsx";

const FleetFilters = ({
  search,
  setSearch,
  status,
  setStatus,
  vehicleType,
  setVehicleType,
  fuelType = "All",
  setFuelType = () => {},
  capacity = "",
  setCapacity = () => {},
  location = "",
  setLocation = () => {},
  onAddVehicle,
  onReset,
}) => {
  const statusOptions = [
    { label: "All", value: "All" },
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
    { label: "Maintenance", value: "Maintenance" },
  ];

  const vehicleTypeOptions = [
    { label: "All", value: "All" },
    { label: "Bus", value: "Bus" },
    { label: "Truck", value: "Truck" },
    { label: "Van", value: "Van" },
    { label: "Car", value: "Car" },
  ];

  const fuelTypeOptions = [
    { label: "All", value: "All" },
    { label: "Diesel", value: "Diesel" },
    { label: "Petrol", value: "Petrol" },
    { label: "Electric", value: "Electric" },
  ];

  return (
    <div className="glass rounded-2xl p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-8 gap-4 items-end">
        <div className="xl:col-span-2">
          <Input
            label="Search"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by vehicle number or name"
          />
        </div>

        <Select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          options={statusOptions}
        />

        <Select
          label="Vehicle Type"
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value)}
          options={vehicleTypeOptions}
        />

        <Select
          label="Fuel Type"
          value={fuelType}
          onChange={(e) => setFuelType(e.target.value)}
          options={fuelTypeOptions}
        />

        <Input
          label="Capacity"
          name="capacity"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
          placeholder="Minimum seats/tons"
        />

        <Input
          label="Location"
          name="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Depot/City"
        />

        <div className="flex gap-2 xl:justify-end xl:col-span-1">
          <Button type="button" variant="outline" onClick={onReset} className="h-10">
            Reset
          </Button>
          <Button type="button" onClick={onAddVehicle} className="h-10">
            Add Vehicle
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FleetFilters;