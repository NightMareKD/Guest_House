'use client';

import { useState, useEffect } from 'react';
import { Calendar, Users, Search, Filter, MoveHorizontal as MoreHorizontal, Eye, CreditCard as Edit, Trash2, CircleCheck as CheckCircle, Circle as XCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Header from '@/components/common/Header';
import Link from 'next/link';

const mockBookings = [
  {
    id: 'BK001',
    guestName: 'John Smith',
    guestEmail: 'john.smith@email.com',
    roomName: 'Ocean Villa Suite',
    checkIn: '2025-01-25',
    checkOut: '2025-01-28',
    guests: 2,
    amount: 2550,
    status: 'CONFIRMED',
    createdAt: '2025-01-15T10:30:00Z',
    paymentStatus: 'PAID'
  },
  {
    id: 'BK002',
    guestName: 'Sarah Johnson',
    guestEmail: 'sarah.j@email.com',
    roomName: 'Garden Pavilion',
    checkIn: '2025-01-26',
    checkOut: '2025-01-29',
    guests: 2,
    amount: 1350,
    status: 'PENDING',
    createdAt: '2025-01-20T14:15:00Z',
    paymentStatus: 'PENDING'
  },
  {
    id: 'BK003',
    guestName: 'Michael Brown',
    guestEmail: 'mbrown@email.com',
    roomName: 'Presidential Suite',
    checkIn: '2025-01-27',
    checkOut: '2025-02-01',
    guests: 4,
    amount: 6000,
    status: 'CONFIRMED',
    createdAt: '2025-01-18T09:45:00Z',
    paymentStatus: 'PAID'
  },
  {
    id: 'BK004',
    guestName: 'Emily Davis',
    guestEmail: 'emily.davis@email.com',
    roomName: 'Deluxe Ocean Room',
    checkIn: '2025-02-05',
    checkOut: '2025-02-08',
    guests: 2,
    amount: 1140,
    status: 'PENDING',
    createdAt: '2025-01-22T16:20:00Z',
    paymentStatus: 'PENDING'
  },
  {
    id: 'BK005',
    guestName: 'Robert Wilson',
    guestEmail: 'rwilson@email.com',
    roomName: 'Family Villa',
    checkIn: '2025-02-10',
    checkOut: '2025-02-15',
    guests: 6,
    amount: 3750,
    status: 'CANCELLED',
    createdAt: '2025-01-10T11:30:00Z',
    paymentStatus: 'REFUNDED'
  }
];

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-green-100 text-green-800',
  COMPLETED: 'bg-blue-100 text-blue-800',
  CANCELLED: 'bg-red-100 text-red-800'
};

const paymentStatusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  PAID: 'bg-green-100 text-green-800',
  REFUNDED: 'bg-blue-100 text-blue-800',
  FAILED: 'bg-red-100 text-red-800'
};

export default function AdminBookingsPage() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState(mockBookings);
  const [filteredBookings, setFilteredBookings] = useState(mockBookings);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      if (parsedUser.role !== 'ADMIN') {
        window.location.href = '/';
      }
    } else {
      window.location.href = '/login';
    }
  }, []);

  useEffect(() => {
    let filtered = [...bookings];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(booking => 
        booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.guestEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.roomName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }

    // Payment filter
    if (paymentFilter !== 'all') {
      filtered = filtered.filter(booking => booking.paymentStatus === paymentFilter);
    }

    setFilteredBookings(filtered);
  }, [bookings, searchTerm, statusFilter, paymentFilter]);

  const handleStatusChange = (bookingId, newStatus) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: newStatus }
          : booking
      )
    );
  };

  const handleDeleteBooking = (bookingId) => {
    if (confirm('Are you sure you want to delete this booking?')) {
      setBookings(prev => prev.filter(booking => booking.id !== bookingId));
    }
  };

  const getBookingStats = () => {
    return {
      total: bookings.length,
      pending: bookings.filter(b => b.status === 'PENDING').length,
      confirmed: bookings.filter(b => b.status === 'CONFIRMED').length,
      completed: bookings.filter(b => b.status === 'COMPLETED').length,
      cancelled: bookings.filter(b => b.status === 'CANCELLED').length,
      totalRevenue: bookings.filter(b => b.status !== 'CANCELLED').reduce((sum, b) => sum + b.amount, 0)
    };
  };

  if (!user || user.role !== 'ADMIN') {
    return null;
  }

  const stats = getBookingStats();

  return (
    <div className="min-h-screen luxury-gradient">
      <Header />
      
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center mb-4">
              <Link href="/admin" className="text-primary hover:text-primary/80 mr-2">
                Admin Dashboard
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="ml-2 text-slate-800">Bookings</span>
            </div>
            <h1 className="font-heading text-4xl text-slate-800 mb-2">Manage Bookings</h1>
            <p className="luxury-text text-lg">View and manage all guest reservations</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
            <Card className="luxury-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-slate-800">{stats.total}</div>
                <div className="text-sm luxury-text">Total</div>
              </CardContent>
            </Card>
            <Card className="luxury-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
                <div className="text-sm luxury-text">Pending</div>
              </CardContent>
            </Card>
            <Card className="luxury-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{stats.confirmed}</div>
                <div className="text-sm luxury-text">Confirmed</div>
              </CardContent>
            </Card>
            <Card className="luxury-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.completed}</div>
                <div className="text-sm luxury-text">Completed</div>
              </CardContent>
            </Card>
            <Card className="luxury-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{stats.cancelled}</div>
                <div className="text-sm luxury-text">Cancelled</div>
              </CardContent>
            </Card>
            <Card className="luxury-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">${stats.totalRevenue.toLocaleString()}</div>
                <div className="text-sm luxury-text">Revenue</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="luxury-card mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search bookings..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                    <SelectItem value="CANCELLED">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Filter by payment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Payments</SelectItem>
                    <SelectItem value="PENDING">Pending</SelectItem>
                    <SelectItem value="PAID">Paid</SelectItem>
                    <SelectItem value="REFUNDED">Refunded</SelectItem>
                    <SelectItem value="FAILED">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Bookings Table */}
          <Card className="luxury-card">
            <CardHeader>
              <CardTitle className="font-heading text-xl">All Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Guest</TableHead>
                      <TableHead>Room</TableHead>
                      <TableHead>Dates</TableHead>
                      <TableHead>Guests</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Payment</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{booking.guestName}</p>
                            <p className="text-sm text-muted-foreground">{booking.guestEmail}</p>
                          </div>
                        </TableCell>
                        <TableCell>{booking.roomName}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{new Date(booking.checkIn).toLocaleDateString()}</p>
                            <p className="text-muted-foreground">to {new Date(booking.checkOut).toLocaleDateString()}</p>
                          </div>
                        </TableCell>
                        <TableCell>{booking.guests}</TableCell>
                        <TableCell className="font-medium">${booking.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className={statusColors[booking.status]}>
                            {booking.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={paymentStatusColors[booking.paymentStatus]}>
                            {booking.paymentStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Booking
                              </DropdownMenuItem>
                              {booking.status === 'PENDING' && (
                                <DropdownMenuItem 
                                  onClick={() => handleStatusChange(booking.id, 'CONFIRMED')}
                                >
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Confirm
                                </DropdownMenuItem>
                              )}
                              {booking.status !== 'CANCELLED' && (
                                <DropdownMenuItem 
                                  onClick={() => handleStatusChange(booking.id, 'CANCELLED')}
                                >
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Cancel
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem 
                                onClick={() => handleDeleteBooking(booking.id)}
                                className="text-red-600"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredBookings.length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-heading text-xl mb-2">No bookings found</h3>
                  <p className="luxury-text">Try adjusting your search or filter criteria.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}