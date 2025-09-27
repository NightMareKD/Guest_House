'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CalendarDays, MapPin, Star, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import SearchBar from '@/components/booking/SearchBar';

export default function Home() {
  const [searchData, setSearchData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1
  });

  const featuredRooms = [
    {
      id: 1,
      name: "Ocean Villa Suite",
      type: "SUITE",
      price: 850,
      capacity: 4,
      image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800",
      amenities: ["Ocean View", "Private Pool", "Butler Service", "Wine Cellar"]
    },
    {
      id: 2,
      name: "Garden Pavilion",
      type: "DOUBLE",
      price: 450,
      capacity: 2,
      image: "https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=800",
      amenities: ["Garden View", "Marble Bath", "Private Terrace", "Mini Bar"]
    },
    {
      id: 3,
      name: "Presidential Suite",
      type: "SUITE",
      price: 1200,
      capacity: 6,
      image: "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800",
      amenities: ["Panoramic View", "Two Bedrooms", "Private Chef", "Spa Access"]
    }
  ];

  const handleSearch = (data) => {
    setSearchData(data);
    // Navigate to rooms page with search parameters
    window.location.href = `/rooms?checkIn=${data.checkIn}&checkOut=${data.checkOut}&guests=${data.guests}`;
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1200)'
          }}
        />
        <div className="absolute inset-0 hero-gradient opacity-70" />
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="font-heading text-5xl md:text-7xl mb-6 animate-fade-in">
            ISARA Guest House
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-slide-up">
            Where luxury meets tranquility in an unforgettable experience
          </p>
          
          <div className="bg-white/95 backdrop-blur-sm p-6 rounded-lg shadow-2xl animate-slide-up">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Featured Rooms Section */}
      <section className="py-20 luxury-gradient">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl text-slate-800 mb-4">
              Exceptional Accommodations
            </h2>
            <p className="text-xl luxury-text max-w-3xl mx-auto">
              Each room is a sanctuary of comfort, designed with meticulous attention to detail 
              and equipped with world-class amenities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRooms.map((room) => (
              <Card key={room.id} className="luxury-card hover:scale-105 transition-all duration-300">
                <div className="relative h-64 overflow-hidden rounded-t-lg">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    ${room.price}/night
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-heading text-xl text-slate-800">
                      {room.name}
                    </h3>
                    <div className="flex items-center text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center text-muted-foreground mb-4">
                    <Users className="w-4 h-4 mr-2" />
                    <span>Up to {room.capacity} guests</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-6">
                    {room.amenities.slice(0, 4).map((amenity) => (
                      <span key={amenity} className="text-sm luxury-text">
                        • {amenity}
                      </span>
                    ))}
                  </div>
                  
                  <Link href={`/rooms/${room.id}`}>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      View Details
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/rooms">
              <Button variant="outline" size="lg" className="border-2 hover:bg-primary hover:text-primary-foreground">
                Explore All Rooms
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading text-2xl mb-4">Prime Location</h3>
              <p className="luxury-text">
                Nestled in the heart of paradise, offering easy access to pristine beaches, 
                cultural attractions, and world-class dining.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading text-2xl mb-4">Five-Star Service</h3>
              <p className="luxury-text">
                Our dedicated team ensures every moment of your stay is extraordinary, 
                with personalized service that exceeds expectations.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CalendarDays className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-heading text-2xl mb-4">Seamless Booking</h3>
              <p className="luxury-text">
                Book your perfect getaway with our intuitive reservation system, 
                designed for convenience and peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}