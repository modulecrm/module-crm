
import React, { useState } from 'react';
import { Calendar, Clock, Users, MapPin, Plus, Filter } from 'lucide-react';

const BookingModule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  const bookings = [
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

  const resources = [
    { name: 'Meeting Room A', capacity: 6, available: true },
    { name: 'Meeting Room B', capacity: 8, available: false },
    { name: 'Conference Hall', capacity: 20, available: true },
    { name: 'Workspaces', capacity: 50, available: true }
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
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Booking Management</h1>
          <p className="text-gray-600 mt-2">Manage bookings and resources</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center transition-colors">
          <Plus className="h-5 w-5 mr-2" />
          New Booking
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Today</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">This Week</p>
              <p className="text-2xl font-bold text-gray-900">87</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Available Spots</p>
              <p className="text-2xl font-bold text-gray-900">23</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <MapPin className="h-8 w-8 text-orange-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Resources</p>
              <p className="text-2xl font-bold text-gray-900">4</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Bookings List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Today's Bookings</h2>
              <div className="flex items-center space-x-3">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Filter className="h-4 w-4 mr-2 text-gray-400" />
                  Filter
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{booking.title}</h3>
                      <p className="text-gray-600 text-sm">Customer: {booking.customer}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {booking.time}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      {booking.room}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {booking.attendees} people
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {booking.duration}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resources Panel */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Resource Overview</h2>
          </div>
          
          <div className="p-6 space-y-4">
            {resources.map((resource, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-900">{resource.name}</h3>
                  <div className={`w-3 h-3 rounded-full ${resource.available ? 'bg-green-500' : 'bg-red-500'}`}></div>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Capacity: {resource.capacity} people</p>
                  <p className={resource.available ? 'text-green-600' : 'text-red-600'}>
                    {resource.available ? 'Available' : 'Occupied'}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="px-6 py-4 border-t border-gray-200">
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors">
              View all resources
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModule;
