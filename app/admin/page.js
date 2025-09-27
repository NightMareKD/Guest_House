'use client';

import { useState, useEffect } from 'react';
import { ChartBar as BarChart3, Users, Calendar, DollarSign, TrendingUp, Bed, Star, Clock, CircleAlert as AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Header from '@/components/common/Header';
import Link from 'next/link';

const mockStats = {
  totalRevenue: 125000,
  totalBookings: 342,
  occupancyRate: 78,
  averageRating: 4.8,
  revenueGrowth: 12.5,
  bookingGrowth: 8.3,
  occupancyGrowth: 5.2,
  ratingGrowth: 0.3
};

const mockRecentBookings = [
  {
    id: 'BK001',
    guestName: 'John Smith',
    roomName: 'Ocean Villa Suite',
    checkIn: '2025-01-25',
    checkOut: '2025-01-28',
    amount: 2550,
    status: 'CONFIRMED'
  },
  {
    id: 'BK002',
    guestName: 'Sarah Johnson',
    roomName: 'Garden Pavilion',
    checkIn: '2025-01-26',
    checkOut: '2025-01-29',
    amount: 1350,
    status: 'PENDING'
  },
  {
    id: 'BK003',
    guestName: 'Michael Brown',
    roomName: 'Presidential Suite',
    checkIn: '2025-01-27',
    checkOut: '2025-02-01',
    amount: 6000,
    status: 'CONFIRMED'
  }
];

const mockRoomStatus = [
  { name: 'Ocean Villa Suite', status: 'OCCUPIED', guest: 'John Doe', checkOut: '2025-01-25' },
  { name: 'Garden Pavilion', status: 'AVAILABLE', guest: null, checkOut: null },
  { name: 'Presidential Suite', status: 'MAINTENANCE', guest: null, checkOut: null },
  { name: 'Deluxe Ocean Room', status: 'AVAILABLE', guest: null, checkOut: null },
  { name: 'Family Villa', status: 'OCCUPIED', guest: 'Smith Family', checkOut: '2025-01-26' }
];

const statusColors = {
  CONFIRMED: 'bg-green-100 text-green-800',
  PENDING: 'bg-yellow-100 text-yellow-800',
  CANCELLED: 'bg-red-100 text-red-800',
  OCCUPIED: 'bg-blue-100 text-blue-800',
  AVAILABLE: 'bg-green-100 text-green-800',
  MAINTENANCE: 'bg-orange-100 text-orange-800'
};

export default function AdminDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      // Redirect if not admin
      if (parsedUser.role !== 'ADMIN') {
        window.location.href = '/';
      }
    } else {
      window.location.href = '/login';
    }
  }, []);

  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="min-h-screen luxury-gradient">
        <Header />
        <div className="pt-24 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="font-heading text-2xl mb-4">Access Denied</h2>
            <p className="luxury-text mb-6">You need admin privileges to access this page.</p>
            <Link href="/">
              <Button>Return Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen luxury-gradient">
      <Header />
      
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-heading text-4xl text-slate-800 mb-2">Admin Dashboard</h1>
            <p className="luxury-text text-lg">Welcome back, {user.firstName}. Here's your property overview.</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Link href="/admin/bookings">
              <Button className="w-full h-12 bg-primary hover:bg-primary/90">
                Manage Bookings
              </Button>
            </Link>
            <Link href="/admin/rooms">
              <Button variant="outline" className="w-full h-12">
                Manage Rooms
              </Button>
            </Link>
            <Link href="/admin/users">
              <Button variant="outline" className="w-full h-12">
                Manage Users
              </Button>
            </Link>
            <Link href="/admin/reports">
              <Button variant="outline" className="w-full h-12">
                View Reports
              </Button>
            </Link>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="luxury-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${mockStats.totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+{mockStats.revenueGrowth}%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card className="luxury-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.totalBookings}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+{mockStats.bookingGrowth}%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card className="luxury-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.occupancyRate}%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+{mockStats.occupancyGrowth}%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card className="luxury-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockStats.averageRating}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+{mockStats.ratingGrowth}</span> from last month
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Bookings */}
            <Card className="luxury-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-heading text-xl">Recent Bookings</CardTitle>
                <Link href="/admin/bookings">
                  <Button variant="outline" size="sm">View All</Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-semibold">{booking.guestName}</p>
                        <p className="text-sm luxury-text">{booking.roomName}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${booking.amount.toLocaleString()}</p>
                        <Badge className={statusColors[booking.status]}>
                          {booking.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Room Status */}
            <Card className="luxury-card">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-heading text-xl">Room Status</CardTitle>
                <Link href="/admin/rooms">
                  <Button variant="outline" size="sm">Manage Rooms</Button>
                </Link>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRoomStatus.map((room, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center">
                        <Bed className="w-5 h-5 mr-3 text-muted-foreground" />
                        <div>
                          <p className="font-semibold">{room.name}</p>
                          {room.guest && (
                            <p className="text-sm luxury-text">Guest: {room.guest}</p>
                          )}
                          {room.checkOut && (
                            <p className="text-xs text-muted-foreground">
                              Check-out: {new Date(room.checkOut).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                      <Badge className={statusColors[room.status]}>
                        {room.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alerts & Notifications */}
          <Card className="luxury-card mt-8">
            <CardHeader>
              <CardTitle className="font-heading text-xl flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-amber-500" />
                Alerts & Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <Clock className="w-5 h-5 mr-3 text-amber-600" />
                  <div>
                    <p className="font-semibold text-amber-800">Maintenance Required</p>
                    <p className="text-sm text-amber-700">Presidential Suite needs maintenance check</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <Users className="w-5 h-5 mr-3 text-blue-600" />
                  <div>
                    <p className="font-semibold text-blue-800">New Booking</p>
                    <p className="text-sm text-blue-700">Sarah Johnson booked Garden Pavilion for Jan 26-29</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg">
                  <TrendingUp className="w-5 h-5 mr-3 text-green-600" />
                  <div>
                    <p className="font-semibold text-green-800">Revenue Milestone</p>
                    <p className="text-sm text-green-700">Monthly revenue target achieved 5 days early!</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}