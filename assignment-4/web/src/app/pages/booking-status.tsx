'use client'
import React, { useEffect, useState } from 'react';
import Layout from '../components/layout';
import axios from 'axios';
import { useSession } from 'next-auth/react';

type Booking = {
  _id: string;
  service: string;
  status: string;
  date: string;
};

const BookingStatus: React.FC = () => {
  const { data: session } = useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    if (session) {
      fetchBookings();
    }
  }, [session]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('/api/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  if (!session) {
    return (
      <Layout>
        <p>Please log in to view your booking status.</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Booking Status</h1>
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          <ul className="space-y-4">
            {bookings.map((booking) => (
              <li key={booking._id} className="border p-4 rounded">
                <p><strong>Service:</strong> {booking.service}</p>
                <p><strong>Status:</strong> {booking.status}</p>
                <p><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Layout>
  );
};

export default BookingStatus;