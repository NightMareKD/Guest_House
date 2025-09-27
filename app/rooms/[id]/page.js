'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  Star, Users, Maximize, Wifi, Car, Coffee, Waves, Bath, 
  Tv, Wind, Shield, Calendar, ArrowLeft, ArrowRight,
  ChevronLeft, ChevronRight, Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import SearchBar from '@/components/booking/SearchBar';
import Link from 'next/link';

const mockRooms = [
  {
    id: '1',
    name: "Ocean Villa Suite",
    type: "SUITE",
    price: 850,
    originalPrice: 950,
    capacity: 4,
    size: 120,
    bedrooms: 2,
    bathrooms: 2,
    images: [
      "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/2029667/pexels-photo-2029667.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1743229/pexels-photo-1743229.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    amenities: [
      { name: "Ocean View", icon: Waves },
      { name: "Private Pool", icon: Waves },
      { name: "Butler Service", icon: Shield },
      { name: "Wine Cellar", icon: Coffee },
      { name: "Spa Access", icon: Bath },
      { name: "Mini Bar", icon: Coffee },
      { name: "WiFi", icon: Wifi },
      { name: "Air Conditioning", icon: Wind },
      { name: "Smart TV", icon: Tv },
      { name: "Parking", icon: Car }
    ],
    description: "Experience the pinnacle of luxury in our Ocean Villa Suite, where panoramic ocean views meet unparalleled comfort. This expansive suite features a private infinity pool, dedicated butler service, and access to our exclusive wine cellar. The master bedroom opens directly onto a private terrace, while the second bedroom offers garden views. Every detail has been carefully curated to provide an unforgettable stay.",
    longDescription: "The Ocean Villa Suite represents the epitome of luxury accommodation at ISARA Guest House. Spanning 120 square meters of meticulously designed space, this suite offers an unparalleled experience of comfort and elegance. The main living area features floor-to-ceiling windows that frame breathtaking ocean views, while the private infinity pool seems to merge seamlessly with the horizon. The suite includes two beautifully appointed bedrooms, each with its own en-suite bathroom featuring marble finishes and premium amenities. Guests enjoy exclusive access to our wine cellar, featuring a curated selection of vintage wines, and dedicated butler service available 24/7. The private terrace, complete with outdoor dining area and lounging space, provides the perfect setting for intimate meals or quiet contemplation as you watch the sunset over the ocean.",
    isAvailable: true,
    featured: true,
    policies: {
      checkIn: "3:00 PM",
      checkOut: "12:00 PM",
      cancellation: "Free cancellation up to 48 hours before check-in",
      smoking: "Non-smoking room",
      pets: "Pets allowed with prior arrangement"
    }
  }
];

const amenityIcons = {
  "WiFi": Wifi,
  "Mini Bar": Coffee,
  "Coffee Machine": Coffee,
  "Private Pool": Waves,
  "Spa Access": Bath,
  "Ocean View": Waves,
  "Garden View": Waves,
  "Panoramic View": Waves,
  "Parking": Car,
  "Air Conditioning": Wind,
  "Smart TV": Tv,
  "Butler Service": Shield,
  "Wine Cellar": Coffee
};

export default function RoomDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [room, setRoom] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [searchData, setSearchData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1
  });

  useEffect(() => {
    // In a real app, fetch room data from API
    const foundRoom = mockRooms.find(r => r.id === params.id);
    setRoom(foundRoom);
  }, [params.id]);

  const handleSearch = (data) => {
    setSearchData(data);
  };

  const nextImage = () => {
    if (room) {
      setCurrentImageIndex((prev) => 
        prev === room.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (room) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? room.images.length - 1 : prev - 1
      );
    }
  };

  const handleBookNow = () => {
    const params = new URLSearchParams();
    params.set('roomId', room.id);
    if (searchData.checkIn) params.set('checkIn', searchData.checkIn);
    if (searchData.checkOut) params.set('checkOut', searchData.checkOut);
    params.set('guests', searchData.guests.toString());
    router.push(`/booking?${params.toString()}`);
  };

  if (!room) {
    return (
      <div className="min-h-screen luxury-gradient">
        <Header />
        <div className="pt-24 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="font-heading text-2xl mb-4">Room not found</h2>
            <Link href="/rooms">
              <Button>Back to Rooms</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen luxury-gradient">
      <Header />
      
      <div className="pt-20">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center text-sm luxury-text">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href="/rooms" className="hover:text-primary">Rooms</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-slate-800">{room.name}</span>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="relative h-96 md:h-[500px] overflow-hidden">
          <img
            src={room.images[currentImageIndex]}
            alt={room.name}
            className="w-full h-full object-cover"
          />
          
          {/* Image Navigation */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {room.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="absolute top-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
          >
            <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-slate-600'}`} />
          </button>

          {/* Room Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
            {room.featured && (
              <Badge className="bg-primary text-primary-foreground">
                Featured
              </Badge>
            )}
            <Badge variant="secondary" className="bg-white/90 text-slate-800">
              {room.type}
            </Badge>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Room Header */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="font-heading text-4xl text-slate-800 mb-2">
                      {room.name}
                    </h1>
                    <div className="flex items-center text-amber-500 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                      <span className="ml-2 text-slate-600">(4.9/5 from 127 reviews)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    {room.originalPrice && (
                      <p className="text-lg text-slate-500 line-through">
                        ${room.originalPrice}
                      </p>
                    )}
                    <p className="text-3xl font-bold text-slate-800">
                      ${room.price}
                      <span className="text-lg text-muted-foreground">/night</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    <span>Up to {room.capacity} guests</span>
                  </div>
                  <div className="flex items-center">
                    <Maximize className="w-5 h-5 mr-2" />
                    <span>{room.size}m²</span>
                  </div>
                  <div className="flex items-center">
                    <span>{room.bedrooms} bedroom{room.bedrooms > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center">
                    <span>{room.bathrooms} bathroom{room.bathrooms > 1 ? 's' : ''}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <h2 className="font-heading text-2xl mb-4">About this room</h2>
                <p className="luxury-text text-lg leading-relaxed mb-4">
                  {room.description}
                </p>
                <p className="luxury-text leading-relaxed">
                  {room.longDescription}
                </p>
              </div>

              <Separator />

              {/* Amenities */}
              <div>
                <h2 className="font-heading text-2xl mb-6">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {room.amenities.map((amenity) => {
                    const IconComponent = amenity.icon;
                    return (
                      <div key={amenity.name} className="flex items-center p-3 bg-white rounded-lg shadow-sm">
                        <IconComponent className="w-5 h-5 text-primary mr-3" />
                        <span className="luxury-text">{amenity.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Separator />

              {/* Policies */}
              <div>
                <h2 className="font-heading text-2xl mb-6">Policies</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Check-in / Check-out</h3>
                    <p className="luxury-text">Check-in: {room.policies.checkIn}</p>
                    <p className="luxury-text">Check-out: {room.policies.checkOut}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Cancellation</h3>
                    <p className="luxury-text">{room.policies.cancellation}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Smoking Policy</h3>
                    <p className="luxury-text">{room.policies.smoking}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Pet Policy</h3>
                    <p className="luxury-text">{room.policies.pets}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="luxury-card">
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <h3 className="font-heading text-xl mb-4">Reserve your stay</h3>
                      <SearchBar onSearch={handleSearch} />
                    </div>

                    {searchData.checkIn && searchData.checkOut && (
                      <div className="mb-6 p-4 bg-amber-50 rounded-lg">
                        <h4 className="font-semibold mb-2">Booking Summary</h4>
                        <div className="space-y-2 text-sm luxury-text">
                          <div className="flex justify-between">
                            <span>Check-in:</span>
                            <span>{new Date(searchData.checkIn).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Check-out:</span>
                            <span>{new Date(searchData.checkOut).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Guests:</span>
                            <span>{searchData.guests}</span>
                          </div>
                          <Separator />
                          <div className="flex justify-between font-semibold">
                            <span>Total:</span>
                            <span>${room.price * Math.ceil((new Date(searchData.checkOut) - new Date(searchData.checkIn)) / (1000 * 60 * 60 * 24))}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <Button 
                      onClick={handleBookNow}
                      className="w-full bg-primary hover:bg-primary/90 h-12 text-lg"
                      disabled={!room.isAvailable}
                    >
                      {room.isAvailable ? 'Book Now' : 'Unavailable'}
                    </Button>

                    <p className="text-xs text-center luxury-text mt-4">
                      You won't be charged yet
                    </p>
                  </CardContent>
                </Card>

                {/* Contact Card */}
                <Card className="luxury-card mt-6">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-heading text-lg mb-2">Need assistance?</h3>
                    <p className="luxury-text mb-4">Our concierge team is here to help</p>
                    <Button variant="outline" className="w-full">
                      Contact Concierge
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}