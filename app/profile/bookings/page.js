'use client';

import { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Star, Clock, CreditCard, Download, MessageSquare, MoveHorizontal as MoreHorizontal, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
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
import Footer from '@/components/common/Footer';
import Link from 'next/link';

const mockBookings = [
  {
    id: 'BK1234567890',
    roomName: 'Ocean Villa Suite',
    roomType: 'SUITE',
    roomImage: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=400',
    checkIn: '2025-02-15',
    checkOut: '2025-02-18',
    guests: 2,
    totalAmount: 2550,
    status: 'CONFIRMED',
    createdAt: '2025-01-15T10:30:00Z',
    nights: 3
  },
  {
    id: 'BK1234567891',
    roomName: 'Garden Pavilion',
    roomType: 'DOUBLE',
    roomImage: 'https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=400',
    checkIn: '2024-12-20',
    checkOut: '2024-12-23',
    guests: 2,
    totalAmount: 1350,
    status: 'COMPLETED',
    createdAt: '2024-11-20T14:15:00Z',
    nights: 3
  },
  {
    id: 'BK1234567892',
    roomName: 'Presidential Suite',
    roomType: 'SUITE',
    roomImage: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400',
    checkIn: '2025-03-10',
    checkOut: '2025-03-15',
    guests: 4,
    totalAmount: 6000,
    status: 'PENDING',
    createdAt: '2025-01-20T09:45:00Z',
    nights: 5
  },
  {
    id: 'BK1234567893',
    roomName: 'Deluxe Ocean Room',
    roomType: 'DOUBLE',
    roomImage: 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=400',
    checkIn: '2024-10-05',
    checkOut: '2024-10-07',
    guests: 2,
    totalAmount: 760,
    status: 'CANCELLED',
    createdAt: '2024-09-15T16:20:00Z',
    nights: 2
  }
];

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-green-100 text-green-800',
  COMPLETED: 'bg-blue-100 text-blue-800',
  CANCELLED: 'bg-red-100 text-red-800'
};

export default function BookingsPage() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState(mockBookings);
  const [filteredBookings, setFilteredBookings] = useState(mockBookings);
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    let filtered = [...bookings];

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }

    // Sort bookings
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'checkin':
        filtered.sort((a, b) => new Date(a.checkIn) - new Date(b.checkIn));
        break;
      case 'amount':
        filtered.sort((a, b) => b.totalAmount - a.totalAmount);
        break;
    }

    setFilteredBookings(filtered);
  }, [bookings, statusFilter, sortBy]);

  const handleDownloadReceipt = (bookingId) => {
    alert(`Downloading receipt for booking ${bookingId}`);
  };

  const handleCancelBooking = (bookingId) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: 'CANCELLED' }
            : booking
        )
      );
    }
  };

  const handleModifyBooking = (bookingId) => {
    alert(`Modify booking ${bookingId} - This would open a modification form`);
  };

  const getBookingStats = () => {
    const stats = {
      total: bookings.length,
      upcoming: bookings.filter(b => new Date(b.checkIn) > new Date() && b.status !== 'CANCELLED').length,
      completed: bookings.filter(b => b.status === 'COMPLETED').length,
      totalSpent: bookings.filter(b => b.status !== 'CANCELLED').reduce((sum, b) => sum + b.totalAmount, 0)
    };
    return stats;
  };

  if (!user) {
    return (
      <div className="min-h-screen luxury-gradient">
        <Header />
        <div className="pt-24 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="font-heading text-2xl mb-4">Please sign in to view your bookings</h2>
            <Link href="/login">
              <Button>Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
    );
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
              <Link href="/profile" className="text-primary hover:text-primary/80 mr-2">
                Profile
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="ml-2 text-slate-800">My Bookings</span>
            </div>
            <h1 className="font-heading text-4xl text-slate-800 mb-2">My Bookings</h1>
            <p className="luxury-text text-lg">Manage your reservations and booking history</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="luxury-card">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-2">{stats.total}</div>
                <div className="text-sm luxury-text">Total Bookings</div>
              </CardContent>
            </Card>
            <Card className="luxury-card">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{stats.upcoming}</div>
                <div className="text-sm luxury-text">Upcoming Stays</div>
              </CardContent>
            </Card>
            <Card className="luxury-card">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stats.completed}</div>
                <div className="text-sm luxury-text">Completed Stays</div>
              </CardContent>
            </Card>
            <Card className="luxury-card">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-slate-800 mb-2">${stats.totalSpent.toLocaleString()}</div>
                <div className="text-sm luxury-text">Total Spent</div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Bookings</SelectItem>
                <SelectItem value="PENDING">Pending</SelectItem>
                <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="checkin">Check-in Date</SelectItem>
                <SelectItem value="amount">Amount (High to Low)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bookings List */}
          {filteredBookings.length === 0 ? (
            <Card className="luxury-card">
              <CardContent className="p-12 text-center">
                <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-heading text-2xl mb-2">No bookings found</h3>
                <p className="luxury-text mb-6">
                  {statusFilter === 'all' 
                    ? "You haven't made any bookings yet. Start planning your perfect getaway!"
                    : `No ${statusFilter.toLowerCase()} bookings found. Try adjusting your filters.`
                  }
                </p>
                <Link href="/rooms">
                  <Button className="bg-primary hover:bg-primary/90">
                    Explore Rooms
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {filteredBookings.map((booking) => (
                <Card key={booking.id} className="luxury-card">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* Room Image */}
                      <div className="lg:w-48 h-32 lg:h-40 relative rounded-lg overflow-hidden">
                        <img
                          src={booking.roomImage}
                          alt={booking.roomName}
                          className="w-full h-full object-cover"
                        />
                        <Badge className={`absolute top-2 right-2 ${statusColors[booking.status]}`}>
                          {booking.status}
                        </Badge>
                      </div>

                      {/* Booking Details */}
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                          <div>
                            <h3 className="font-heading text-xl mb-1">{booking.roomName}</h3>
                            <p className="luxury-text text-sm mb-2">
                              Booking ID: {booking.id}
                            </p>
                            <div className="flex items-center text-amber-500 mb-3">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-current" />
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-slate-800">
                              ${booking.totalAmount.toLocaleString()}
                            </p>
                            <p className="text-sm luxury-text">
                              {booking.nights} night{booking.nights > 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                            <div className="text-sm">
                              <p className="font-medium">Check-in</p>
                              <p className="luxury-text">{new Date(booking.checkIn).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                            <div className="text-sm">
                              <p className="font-medium">Check-out</p>
                              <p className="luxury-text">{new Date(booking.checkOut).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2 text-muted-foreground" />
                            <div className="text-sm">
                              <p className="font-medium">Guests</p>
                              <p className="luxury-text">{booking.guests} guest{booking.guests > 1 ? 's' : ''}</p>
                            </div>
                          </div>
                        </div>

                        <Separator className="mb-4" />

                        {/* Actions */}
                        <div className="flex flex-wrap gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadReceipt(booking.id)}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Receipt
                          </Button>

                          {booking.status === 'CONFIRMED' && new Date(booking.checkIn) > new Date() && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleModifyBooking(booking.id)}
                              >
                                <Clock className="w-4 h-4 mr-2" />
                                Modify
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleCancelBooking(booking.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                Cancel
                              </Button>
                            </>
                          )}

                          {booking.status === 'COMPLETED' && (
                            <Button variant="outline" size="sm">
                              <Star className="w-4 h-4 mr-2" />
                              Review
                            </Button>
                          )}

                          <Button variant="outline" size="sm">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Contact
                          </Button>

                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="outline" size="sm">
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                Share Booking
                              </DropdownMenuItem>
                              {booking.status === 'CONFIRMED' && (
                                <DropdownMenuItem>
                                  Add to Calendar
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Help Section */}
          <Card className="luxury-card mt-12">
            <CardContent className="p-8 text-center">
              <h3 className="font-heading text-2xl mb-4">Need assistance with your booking?</h3>
              <p className="luxury-text mb-6">
                Our concierge team is available 24/7 to help you with any questions or modifications.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Live Chat
                </Button>
                <Button variant="outline">
                  Call +1 (555) 123-4567
                </Button>
                <Button variant="outline">
                  Email Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}