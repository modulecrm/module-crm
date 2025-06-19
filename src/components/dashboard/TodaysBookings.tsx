
import React from 'react';
import { Calendar, Clock, Users, MapPin } from 'lucide-react';

interface Booking {
  id: number;
  title: string;
  customer: string;
  time: string;
  duration: string;
  room: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  attendees: number;
}

const TodaysBookings = () => {
  // Mock data - in a real app, this would come from your booking database
  const todaysBookings: Booking[] = [
    {
      id: 1,
      title: 'Meeting Room A - Client Meeting',
      customer: 'John Smith',
      time: '09:00 - 10:30',
      duration: '1.5 hours',
      room: 'Meeting Room A',
      status: 'Confirmed',
      attendees: 4
    },
    {
      id: 2,
      title: 'Conference Hall - Presentation',
      customer: 'Sarah Wilson', 
      time: '14:00 - 16:00',
      duration: '2 hours',
      room: 'Conference Hall',
      status: 'Pending',
      attendees: 12
    },
    {
      id: 3,
      title: 'Workspace 15 - Day Rental',
      customer: 'Mike Johnson',
      time: '08:00 - 17:00',
      duration: '9 hours',
      room: 'Flexible Workspace',
      status: 'Confirmed',
      attendees: 1
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Today's Bookings</h2>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="h-4 w-4 mr-1" />
          {new Date().toLocaleDateString()}
        </div>
      </div>
      
      <div className="space-y-4">
        {todaysBookings.length > 0 ? (
          todaysBookings.map((booking) => (
            <div key={booking.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-gray-900">{booking.title}</h3>
                  <p className="text-sm text-gray-600">Customer: {booking.customer}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {booking.time}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-3 w-3 mr-1" />
                  {booking.room}
                </div>
                <div className="flex items-center">
                  <Users className="h-3 w-3 mr-1" />
                  {booking.attendees} people
                </div>
                <div className="text-xs text-gray-500">
                  Duration: {booking.duration}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Calendar className="h-8 w-8 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">No bookings scheduled for today</p>
          </div>
        )}
      </div>
      
      {todaysBookings.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Total bookings today: {todaysBookings.length}</span>
            <span>
              {todaysBookings.filter(b => b.status === 'Confirmed').length} confirmed, 
              {todaysBookings.filter(b => b.status === 'Pending').length} pending
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodaysBookings;
