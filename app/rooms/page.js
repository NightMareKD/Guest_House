'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, Grid2x2 as Grid, List, Star, Users, Wifi, Car, Coffee, Waves } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import SearchBar from '@/components/booking/SearchBar';
import Link from 'next/link';

const mockRooms = [
  {
    id: 1,
    name: "Ocean Villa Suite",
    type: "SUITE",
    price: 850,
    originalPrice: 950,
    capacity: 4,
    size: 120,
    images: [
      "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    amenities: ["Ocean View", "Private Pool", "Butler Service", "Wine Cellar", "Spa Access", "Mini Bar"],
    description: "Luxurious oceanfront suite with panoramic views and private pool",
    isAvailable: true,
    featured: true
  },
  {
    id: 2,
    name: "Garden Pavilion",
    type: "DOUBLE",
    price: 450,
    capacity: 2,
    size: 65,
    images: [
      "https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    amenities: ["Garden View", "Marble Bath", "Private Terrace", "Mini Bar", "Wifi", "Coffee Machine"],
    description: "Elegant pavilion surrounded by tropical gardens with marble bathroom",
    isAvailable: true,
    featured: false
  },
  {
    id: 3,
    name: "Presidential Suite",
    type: "SUITE",
    price: 1200,
    capacity: 6,
    size: 200,
    images: [
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    amenities: ["Panoramic View", "Two Bedrooms", "Private Chef", "Spa Access", "Butler Service", "Wine Cellar"],
    description: "The ultimate luxury experience with dedicated staff and exclusive amenities",
    isAvailable: true,
    featured: true
  },
  {
    id: 4,
    name: "Deluxe Ocean Room",
    type: "DOUBLE",
    price: 380,
    capacity: 2,
    size: 45,
    images: [
      "https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    amenities: ["Ocean View", "Mini Bar", "Wifi", "Coffee Machine", "Spa Access"],
    description: "Comfortable room with stunning ocean views and modern amenities",
    isAvailable: true,
    featured: false
  },
  {
    id: 5,
    name: "Family Villa",
    type: "FAMILY",
    price: 750,
    capacity: 6,
    size: 150,
    images: [
      "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    amenities: ["Three Bedrooms", "Kitchen", "Private Pool", "Garden", "Kids Area", "Wifi"],
    description: "Spacious family villa with multiple bedrooms and private pool",
    isAvailable: false,
    featured: false
  },
  {
    id: 6,
    name: "Classic Single",
    type: "SINGLE",
    price: 280,
    capacity: 1,
    size: 30,
    images: [
      "https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=800"
    ],
    amenities: ["City View", "Wifi", "Coffee Machine", "Mini Bar"],
    description: "Cozy single room perfect for solo travelers",
    isAvailable: true,
    featured: false
  }
];

const amenityIcons = {
  "Wifi": Wifi,
  "Mini Bar": Coffee,
  "Coffee Machine": Coffee,
  "Private Pool": Waves,
  "Spa Access": Waves,
  "Ocean View": Waves,
  "Garden View": Waves,
  "Panoramic View": Waves,
  "Parking": Car
};

export default function RoomsPage() {
  const searchParams = useSearchParams();
  const [rooms, setRooms] = useState(mockRooms);
  const [filteredRooms, setFilteredRooms] = useState(mockRooms);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [filterType, setFilterType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  // Get search parameters from URL
  const checkIn = searchParams?.get('checkIn') || '';
  const checkOut = searchParams?.get('checkOut') || '';
  const guests = searchParams?.get('guests') || '1';

  useEffect(() => {
    let filtered = [...rooms];

    // Filter by availability (mock logic)
    if (checkIn && checkOut) {
      filtered = filtered.filter(room => room.isAvailable);
    }

    // Filter by room type
    if (filterType !== 'all') {
      filtered = filtered.filter(room => room.type === filterType);
    }

    // Filter by price range
    if (priceRange !== 'all') {
      switch (priceRange) {
        case 'budget':
          filtered = filtered.filter(room => room.price < 400);
          break;
        case 'mid':
          filtered = filtered.filter(room => room.price >= 400 && room.price < 700);
          break;
        case 'luxury':
          filtered = filtered.filter(room => room.price >= 700);
          break;
      }
    }

    // Filter by guest capacity
    if (guests) {
      filtered = filtered.filter(room => room.capacity >= parseInt(guests));
    }

    // Sort rooms
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'capacity':
        filtered.sort((a, b) => b.capacity - a.capacity);
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    setFilteredRooms(filtered);
  }, [rooms, filterType, priceRange, sortBy, checkIn, checkOut, guests]);

  const handleSearch = (searchData) => {
    const params = new URLSearchParams();
    params.set('checkIn', searchData.checkIn);
    params.set('checkOut', searchData.checkOut);
    params.set('guests', searchData.guests.toString());
    window.location.search = params.toString();
  };

  const getAmenityIcon = (amenity) => {
    const IconComponent = amenityIcons[amenity];
    return IconComponent ? <IconComponent className="w-4 h-4" /> : null;
  };

  return (
    <div className="min-h-screen luxury-gradient">
      <Header />
      
      <div className="pt-20 pb-16">
        {/* Hero Section with Search */}
        <div className="bg-slate-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-8">
              <h1 className="font-heading text-4xl md:text-5xl mb-4">
                Luxury Accommodations
              </h1>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                Discover our collection of meticulously designed rooms and suites, 
                each offering unparalleled comfort and breathtaking views
              </p>
            </div>

            <div className="bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-2xl">
              <SearchBar onSearch={handleSearch} />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Search Results Info */}
          {(checkIn || checkOut || guests !== '1') && (
            <div className="bg-white p-4 rounded-lg shadow-sm mb-8 border-l-4 border-primary">
              <h3 className="font-semibold mb-2">Search Results</h3>
              <div className="text-sm luxury-text space-y-1">
                {checkIn && <p>Check-in: {new Date(checkIn).toLocaleDateString()}</p>}
                }
                {checkOut && <p>Check-out: {new Date(checkOut).toLocaleDateString()}</p>}
                }
                {guests !== '1' && <p>Guests: {guests}</p>}
                }
                <p className="text-primary font-semibold">
                  {filteredRooms.length} room{filteredRooms.length !== 1 ? 's' : ''} available
                </p>
              </div>
            </div>
          )}

          {/* Filters and Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div className="flex flex-wrap items-center gap-4">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Room Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="SINGLE">Single</SelectItem>
                  <SelectItem value="DOUBLE">Double</SelectItem>
                  <SelectItem value="SUITE">Suite</SelectItem>
                  <SelectItem value="FAMILY">Family</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="budget">Under $400</SelectItem>
                  <SelectItem value="mid">$400 - $700</SelectItem>
                  <SelectItem value="luxury">$700+</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured First</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="capacity">Guest Capacity</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Rooms Grid/List */}
          {filteredRooms.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="font-heading text-2xl mb-4">No rooms found</h3>
              <p className="luxury-text mb-8">
                Try adjusting your search criteria or dates
              </p>
              <Button onClick={() => window.location.href = '/rooms'}>
                Clear Filters
              </Button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRooms.map((room) => (
                <Card key={room.id} className="luxury-card hover:scale-105 transition-all duration-300 overflow-hidden">
                  <div className="relative h-64">
                    <img
                      src={room.images[0]}
                      alt={room.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      {room.featured && (
                        <Badge className="bg-primary text-primary-foreground">
                          Featured
                        </Badge>
                      )}
                      {!room.isAvailable && (
                        <Badge variant="destructive" className="ml-2">
                          Unavailable
                        </Badge>
                      )}
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      {room.originalPrice && (
                        <span className="text-xs text-slate-500 line-through mr-2">
                          ${room.originalPrice}
                        </span>
                      )}
                      <span className="text-sm font-bold text-slate-800">
                        ${room.price}/night
                      </span>
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
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                    </div>
                    
                    <p className="luxury-text text-sm mb-4 line-clamp-2">
                      {room.description}
                    </p>
                    
                    <div className="flex items-center text-muted-foreground mb-4">
                      <Users className="w-4 h-4 mr-2" />
                      <span className="text-sm">Up to {room.capacity} guests</span>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 mb-6">
                      {room.amenities.slice(0, 6).map((amenity) => (
                        <div key={amenity} className="flex items-center text-xs luxury-text">
                          {getAmenityIcon(amenity)}
                          <span className="ml-1 truncate">{amenity}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Link href={`/rooms/${room.id}`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          View Details
                        </Button>
                      </Link>
                      <Link 
                        href={`/booking?roomId=${room.id}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}
                        className="flex-1"
                      >
                        <Button 
                          className="w-full bg-primary hover:bg-primary/90"
                          disabled={!room.isAvailable}
                        >
                          {room.isAvailable ? 'Book Now' : 'Unavailable'}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredRooms.map((room) => (
                <Card key={room.id} className="luxury-card overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3 h-64 md:h-48 relative">
                      <img
                        src={room.images[0]}
                        alt={room.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        {room.featured && (
                          <Badge className="bg-primary text-primary-foreground">
                            Featured
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <CardContent className="md:w-2/3 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-heading text-2xl text-slate-800 mb-2">
                            {room.name}
                          </h3>
                          <p className="luxury-text mb-2">{room.description}</p>
                          <div className="flex items-center text-muted-foreground text-sm">
                            <span>{room.type}</span>
                            <span className="mx-2">•</span>
                            <span>{room.size}m²</span>
                            <span className="mx-2">•</span>
                            <Users className="w-4 h-4 mr-1" />
                            <span>Up to {room.capacity} guests</span>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          {room.originalPrice && (
                            <p className="text-sm text-slate-500 line-through">
                              ${room.originalPrice}
                            </p>
                          )}
                          <p className="text-2xl font-bold text-slate-800">
                            ${room.price}
                            <span className="text-sm text-muted-foreground">/night</span>
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                        {room.amenities.slice(0, 8).map((amenity) => (
                          <div key={amenity} className="flex items-center text-sm luxury-text">
                            {getAmenityIcon(amenity)}
                            <span className="ml-2">{amenity}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex gap-3">
                        <Link href={`/rooms/${room.id}`}>
                          <Button variant="outline">
                            View Details
                          </Button>
                        </Link>
                        <Link 
                          href={`/booking?roomId=${room.id}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`}
                        >
                          <Button 
                            className="bg-primary hover:bg-primary/90"
                            disabled={!room.isAvailable}
                          >
                            {room.isAvailable ? 'Book Now' : 'Unavailable'}
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}