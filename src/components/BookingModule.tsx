
import React, { useState } from 'react';
import { Calendar, Clock, Users, MapPin, Plus, Filter } from 'lucide-react';

const BookingModule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  const bookings = [
    {
      id: 1,
      title: 'Møderum A - Kundemøde',
      customer: 'Lars Hansen',
      time: '09:00 - 10:30',
      duration: '1.5 timer',
      room: 'Møderum A',
      status: 'Bekræftet',
      attendees: 4
    },
    {
      id: 2,
      title: 'Konferencesal - Præsentation',
      customer: 'Maria Andersen', 
      time: '14:00 - 16:00',
      duration: '2 timer',
      room: 'Konferencesal',
      status: 'Afventer',
      attendees: 12
    },
    {
      id: 3,
      title: 'Arbejdsplads 15 - Dagsleje',
      customer: 'Peter Nielsen',
      time: '08:00 - 17:00',
      duration: '9 timer',
      room: 'Fleksibel arbejdsplads',
      status: 'Bekræftet',
      attendees: 1
    }
  ];

  const resources = [
    { name: 'Møderum A', capacity: 6, available: true },
    { name: 'Møderum B', capacity: 8, available: false },
    { name: 'Konferencesal', capacity: 20, available: true },
    { name: 'Arbejdspladser', capacity: 50, available: true }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Bekræftet':
        return 'bg-green-100 text-green-800';
      case 'Afventer':
        return 'bg-yellow-100 text-yellow-800';
      case 'Aflyst':
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
          <p className="text-gray-600 mt-2">Administrer bookinger og ressourcer</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center transition-colors">
          <Plus className="h-5 w-5 mr-2" />
          Ny Booking
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">I dag</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Denne uge</p>
              <p className="text-2xl font-bold text-gray-900">87</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Ledige pladser</p>
              <p className="text-2xl font-bold text-gray-900">23</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <MapPin className="h-8 w-8 text-orange-500 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-600">Ressourcer</p>
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
              <h2 className="text-lg font-semibold text-gray-900">Dagens Bookinger</h2>
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
                      <p className="text-gray-600 text-sm">Kunde: {booking.customer}</p>
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
                      {booking.attendees} personer
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
            <h2 className="text-lg font-semibold text-gray-900">Ressourceoversigt</h2>
          </div>
          
          <div className="p-6 space-y-4">
            {resources.map((resource, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-900">{resource.name}</h3>
                  <div className={`w-3 h-3 rounded-full ${resource.available ? 'bg-green-500' : 'bg-red-500'}`}></div>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Kapacitet: {resource.capacity} personer</p>
                  <p className={resource.available ? 'text-green-600' : 'text-red-600'}>
                    {resource.available ? 'Tilgængelig' : 'Optaget'}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="px-6 py-4 border-t border-gray-200">
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors">
              Se alle ressourcer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModule;
