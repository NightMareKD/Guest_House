'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, CreditCard as Edit, Trash2, Eye, MoveHorizontal as MoreHorizontal, Bed, Users, DollarSign, Star, Wifi, Car, Coffee, Waves } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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

const mockRooms = [
  {
    id: '1',
    name: 'Ocean Villa Suite',
    type: 'SUITE',
    price: 850,
    capacity: 4,
    size: 120,
    isAvailable: true,
    image: 'https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=400',
    amenities: ['Ocean View', 'Private Pool', 'Butler Service', 'Wine Cellar'],
    bookings: 15,
    revenue: 12750,
    rating: 4.9
  },
  {
    id: '2',
    name: 'Garden Pavilion',
    type: 'DOUBLE',
    price: 450,
    capacity: 2,
    size: 65,
    isAvailable: true,
    image: 'https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=400',
    amenities: ['Garden View', 'Marble Bath', 'Private Terrace', 'Mini Bar'],
    bookings: 22,
    revenue: 9900,
    rating: 4.7
  },
  {
    id: '3',
    name: 'Presidential Suite',
    type: 'SUITE',
    price: 1200,
    capacity: 6,
    size: 200,
    isAvailable: false,
    image: 'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=400',
    amenities: ['Panoramic View', 'Two Bedrooms', 'Private Chef', 'Spa Access'],
    bookings: 8,
    revenue: 9600,
    rating: 5.0
  },
  {
    id: '4',
    name: 'Deluxe Ocean Room',
    type: 'DOUBLE',
    price: 380,
    capacity: 2,
    size: 45,
    isAvailable: true,
    image: 'https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=400',
    amenities: ['Ocean View', 'Mini Bar', 'Wifi', 'Coffee Machine'],
    bookings: 28,
    revenue: 10640,
    rating: 4.6
  },
  {
    id: '5',
    name: 'Family Villa',
    type: 'FAMILY',
    price: 750,
    capacity: 6,
    size: 150,
    isAvailable: true,
    image: 'https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=400',
    amenities: ['Three Bedrooms', 'Kitchen', 'Private Pool', 'Garden'],
    bookings: 12,
    revenue: 9000,
    rating: 4.8
  }
];

const amenityIcons = {
  'Wifi': Wifi,
  'Mini Bar': Coffee,
  'Coffee Machine': Coffee,
  'Private Pool': Waves,
  'Spa Access': Waves,
  'Ocean View': Waves,
  'Garden View': Waves,
  'Panoramic View': Waves,
  'Parking': Car
};

export default function AdminRoomsPage() {
  const [user, setUser] = useState(null);
  const [rooms, setRooms] = useState(mockRooms);
  const [filteredRooms, setFilteredRooms] = useState(mockRooms);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');

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
    let filtered = [...rooms];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(room => 
        room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(room => room.type === typeFilter);
    }

    // Availability filter
    if (availabilityFilter !== 'all') {
      const isAvailable = availabilityFilter === 'available';
      filtered = filtered.filter(room => room.isAvailable === isAvailable);
    }

    setFilteredRooms(filtered);
  }, [rooms, searchTerm, typeFilter, availabilityFilter]);

  const handleToggleAvailability = (roomId) => {
    setRooms(prev => 
      prev.map(room => 
        room.id === roomId 
          ? { ...room, isAvailable: !room.isAvailable }
          : room
      )
    );
  };

  const handleDeleteRoom = (roomId) => {
    if (confirm('Are you sure you want to delete this room?')) {
      setRooms(prev => prev.filter(room => room.id !== roomId));
    }
  };

  const getRoomStats = () => {
    return {
      total: rooms.length,
      available: rooms.filter(r => r.isAvailable).length,
      unavailable: rooms.filter(r => !r.isAvailable).length,
      totalBookings: rooms.reduce((sum, r) => sum + r.bookings, 0),
      totalRevenue: rooms.reduce((sum, r) => sum + r.revenue, 0),
      averageRating: rooms.reduce((sum, r) => sum + r.rating, 0) / rooms.length
    };
  };

  if (!user || user.role !== 'ADMIN') {
    return null;
  }

  const stats = getRoomStats();

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
              <span className="ml-2 text-slate-800">Rooms</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="font-heading text-4xl text-slate-800 mb-2">Manage Rooms</h1>
                <p className="luxury-text text-lg">View and manage all room inventory</p>
              </div>
              <Button className="bg-primary hover:bg-primary/90 mt-4 sm:mt-0">
                <Plus className="w-4 h-4 mr-2" />
                Add New Room
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
            <Card className="luxury-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-slate-800">{stats.total}</div>
                <div className="text-sm luxury-text">Total Rooms</div>
              </CardContent>
            </Card>
            <Card className="luxury-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{stats.available}</div>
                <div className="text-sm luxury-text">Available</div>
              </CardContent>
            </Card>
            <Card className="luxury-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{stats.unavailable}</div>
                <div className="text-sm luxury-text">Unavailable</div>
              </CardContent>
            </Card>
            <Card className="luxury-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{stats.totalBookings}</div>
                <div className="text-sm luxury-text">Total Bookings</div>
              </CardContent>
            </Card>
            <Card className="luxury-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">${stats.totalRevenue.toLocaleString()}</div>
                <div className="text-sm luxury-text">Revenue</div>
              </CardContent>
            </Card>
            <Card className="luxury-card">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-amber-600">{stats.averageRating.toFixed(1)}</div>
                <div className="text-sm luxury-text">Avg Rating</div>
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
                      placeholder="Search rooms..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="SINGLE">Single</SelectItem>
                    <SelectItem value="DOUBLE">Double</SelectItem>
                    <SelectItem value="SUITE">Suite</SelectItem>
                    <SelectItem value="FAMILY">Family</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                  <SelectTrigger className="w-full lg:w-48">
                    <SelectValue placeholder="Filter by availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Rooms</SelectItem>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="unavailable">Unavailable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Rooms Grid */}
          {filteredRooms.length === 0 ? (
            <Card className="luxury-card">
              <CardContent className="p-12 text-center">
                <Bed className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-heading text-2xl mb-2">No rooms found</h3>
                <p className="luxury-text">Try adjusting your search or filter criteria.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRooms.map((room) => (
                <Card key={room.id} className="luxury-card">
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={room.image}
                      alt={room.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={room.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {room.isAvailable ? 'Available' : 'Unavailable'}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="secondary" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Room
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleToggleAvailability(room.id)}
                          >
                            <Bed className="mr-2 h-4 w-4" />
                            {room.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => handleDeleteRoom(room.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Room
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-heading text-xl text-slate-800 mb-1">
                          {room.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {room.type} • {room.size}m²
                        </p>
                      </div>
                      <div className="flex items-center text-amber-500">
                        <Star className="w-4 h-4 fill-current mr-1" />
                        <span className="text-sm font-medium">{room.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-muted-foreground mb-4">
                      <Users className="w-4 h-4 mr-2" />
                      <span className="text-sm">Up to {room.capacity} guests</span>
                      <DollarSign className="w-4 h-4 ml-4 mr-1" />
                      <span className="text-sm font-medium">${room.price}/night</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {room.amenities.slice(0, 4).map((amenity) => {
                        const IconComponent = amenityIcons[amenity];
                        return (
                          <div key={amenity} className="flex items-center text-xs luxury-text">
                            {IconComponent && <IconComponent className="w-3 h-3 mr-1" />}
                            <span className="truncate">{amenity}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-slate-50 rounded-lg">
                      <div className="text-center">
                        <p className="text-lg font-bold text-slate-800">{room.bookings}</p>
                        <p className="text-xs luxury-text">Bookings</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-primary">${room.revenue.toLocaleString()}</p>
                        <p className="text-xs luxury-text">Revenue</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                      <Link href={`/rooms/${room.id}`} className="flex-1">
                        <Button variant="outline" className="w-full" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}