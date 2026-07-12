import { useEffect, useState } from "react";
import TripModal from "../components/TripModal";

import {
  getTrips,
  createTrip,
  updateTrip,
  completeTrip,
  deleteTrip,
} from "../utils/tripApi";

export default function Trip() {
  const [trips, setTrips] = useState([]);
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const fetchTrips = async () => {
    try {
      const res = await getTrips();
      setTrips(res.data.trips || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const handleSubmit = async (data) => {
    try {
      if (selectedTrip) {
        await updateTrip(selectedTrip._id, data);
      } else {
        await createTrip(data);
      }

      setOpenModal(false);
      setSelectedTrip(null);
      fetchTrips();
    } catch (err) {
      console.log(err);
    }
  };

  const handleComplete = async (id) => {
    await completeTrip(id);
    fetchTrips();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete Trip?")) return;

    await deleteTrip(id);
    fetchTrips();
  };

  return (
    <div className="p-6">

      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold">
            Trip Management
          </h1>

          <p className="text-gray-500">
            Manage fleet trips
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedTrip(null);
            setOpenModal(true);
          }}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          + Create Trip
        </button>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">Vehicle</th>
              <th className="p-4 text-left">Driver</th>
              <th className="p-4 text-left">Source</th>
              <th className="p-4 text-left">Destination</th>
              <th className="p-4 text-left">Distance</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Action</th>

            </tr>

          </thead>

          <tbody>

            {trips.map((trip) => (

              <tr key={trip._id} className="border-t">

                <td className="p-4">
                  {trip.vehicle?.vehicleNumber}
                </td>

                <td className="p-4">
                  {trip.driver?.name}
                </td>

                <td className="p-4">
                  {trip.source}
                </td>

                <td className="p-4">
                  {trip.destination}
                </td>

                <td className="p-4">
                  {trip.distance} km
                </td>

                <td className="p-4">

                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700">
                    {trip.status}
                  </span>

                </td>

                <td className="p-4">

                  <button
                    onClick={() => {
                      setSelectedTrip(trip);
                      setOpenModal(true);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleComplete(trip._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                  >
                    Complete
                  </button>

                  <button
                    onClick={() => handleDelete(trip._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <TripModal
        open={openModal}
        selectedTrip={selectedTrip}
        onSubmit={handleSubmit}
        onClose={() => {
          setSelectedTrip(null);
          setOpenModal(false);
        }}
      />

    </div>
  );
}