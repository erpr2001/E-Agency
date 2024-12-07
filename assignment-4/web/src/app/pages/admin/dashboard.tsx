import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Layout from '@/app/components/layout';
import axios from 'axios';

type Booking = {
  _id: string;
  service: string;
  status: string;
  date: string;
  userId: string;
};

const AdminDashboard: React.FC = () => {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (session?.user?.role === 'admin') {
      fetchAllBookings();
    }
  }, [session]);

  const fetchAllBookings = async () => {
    try {
      const response = await axios.get('/api/admin/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      await axios.put(`/api/admin/bookings/${bookingId}`, { status: newStatus });
      fetchAllBookings();
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  if (!session || session.user.role !== 'admin') {
    return (
      <Layout>
        <p>Access denied. Admin only.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Service</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">User ID</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td className="border p-2">{booking.service}</td>
                <td className="border p-2">{booking.status}</td>
                <td className="border p-2">{new Date(booking.date).toLocaleDateString()}</td>
                <td className="border p-2">{booking.userId}</td>
                <td className="border p-2">
                  <select
                    value={booking.status}
                    onChange={(e) => updateBookingStatus(booking._id, e.target.value)}
                    className="p-1 border rounded"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default AdminDashboard;