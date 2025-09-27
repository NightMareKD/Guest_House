'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  Calendar, Users, CreditCard, User, Mail, Phone, 
  MapPin, MessageSquare, Check, ArrowLeft, Shield,
  Clock, Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Link from 'next/link';

const mockRooms = [
  {
    id: '1',
    name: "Ocean Villa Suite",
    type: "SUITE",
    price: 850,
    capacity: 4,
    image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=400"
  }
];

export default function BookingPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [room, setRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [bookingData, setBookingData] = useState({
    roomId: searchParams?.get('roomId') || '',
    checkIn: searchParams?.get('checkIn') || '',
    checkOut: searchParams?.get('checkOut') || '',
    guests: parseInt(searchParams?.get('guests') || '1'),
    guestDetails: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      country: '',
      specialRequests: ''
    },
    paymentMethod: 'full'
  });

  useEffect(() => {
    if (bookingData.roomId) {
      const foundRoom = mockRooms.find(r => r.id === bookingData.roomId);
      setRoom(foundRoom);
    }
  }, [bookingData.roomId]);

  const calculateNights = () => {
    if (bookingData.checkIn && bookingData.checkOut) {
      const checkIn = new Date(bookingData.checkIn);
      const checkOut = new Date(bookingData.checkOut);
      return Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const calculateTotal = () => {
    if (room) {
      const nights = calculateNights();
      const subtotal = room.price * nights;
      const taxes = subtotal * 0.12;
      const serviceFee = 50;
      return {
        subtotal,
        taxes,
        serviceFee,
        total: subtotal + taxes + serviceFee
      };
    }
    return { subtotal: 0, taxes: 0, serviceFee: 0, total: 0 };
  };

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setBookingData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setBookingData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitBooking = async () => {
    setIsLoading(true);
    
    try {
      // Mock booking submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store booking data for confirmation page
      const bookingId = 'BK' + Date.now();
      const bookingConfirmation = {
        id: bookingId,
        ...bookingData,
        room,
        pricing: calculateTotal(),
        status: 'CONFIRMED',
        createdAt: new Date().toISOString()
      };
      
      localStorage.setItem('lastBooking', JSON.stringify(bookingConfirmation));
      router.push(`/booking/confirmation?id=${bookingId}`);
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsLoading(false);
    }
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

  const pricing = calculateTotal();
  const nights = calculateNights();

  return (
    <div className="min-h-screen luxury-gradient">
      <Header />
      
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <Link href={`/rooms/${room.id}`} className="inline-flex items-center text-primary hover:text-primary/80 mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to room details
            </Link>
            <h1 className="font-heading text-4xl text-slate-800 mb-2">Complete your booking</h1>
            <p className="luxury-text text-lg">Secure your stay at {room.name}</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-center space-x-8">
              {[
                { step: 1, title: 'Dates & Guests', icon: Calendar },
                { step: 2, title: 'Guest Details', icon: User },
                { step: 3, title: 'Payment', icon: CreditCard }
              ].map(({ step, title, icon: Icon }) => (
                <div key={step} className="flex items-center">
                  <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                    currentStep >= step 
                      ? 'bg-primary border-primary text-primary-foreground' 
                      : 'border-slate-300 text-slate-400'
                  }`}>
                    {currentStep > step ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
                  <span className={`ml-3 font-medium ${
                    currentStep >= step ? 'text-slate-800' : 'text-slate-400'
                  }`}>
                    {title}
                  </span>
                  {step < 3 && (
                    <div className={`w-16 h-0.5 ml-8 ${
                      currentStep > step ? 'bg-primary' : 'bg-slate-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Step 1: Dates & Guests */}
              {currentStep === 1 && (
                <Card className="luxury-card">
                  <CardHeader>
                    <CardTitle className="font-heading text-2xl">Booking Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="checkIn" className="flex items-center mb-2">
                          <Calendar className="w-4 h-4 mr-2" />
                          Check-in Date
                        </Label>
                        <Input
                          id="checkIn"
                          type="date"
                          value={bookingData.checkIn}
                          onChange={(e) => handleInputChange('checkIn', e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="h-12"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="checkOut" className="flex items-center mb-2">
                          <Calendar className="w-4 h-4 mr-2" />
                          Check-out Date
                        </Label>
                        <Input
                          id="checkOut"
                          type="date"
                          value={bookingData.checkOut}
                          onChange={(e) => handleInputChange('checkOut', e.target.value)}
                          min={bookingData.checkIn || new Date().toISOString().split('T')[0]}
                          className="h-12"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="guests" className="flex items-center mb-2">
                        <Users className="w-4 h-4 mr-2" />
                        Number of Guests
                      </Label>
                      <select
                        id="guests"
                        value={bookingData.guests}
                        onChange={(e) => handleInputChange('guests', parseInt(e.target.value))}
                        className="w-full h-12 px-3 border border-input rounded-md bg-background"
                      >
                        {[...Array(room.capacity)].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1} Guest{i + 1 > 1 ? 's' : ''}
                          </option>
                        ))}
                      </select>
                    </div>

                    {nights > 0 && (
                      <div className="p-4 bg-amber-50 rounded-lg">
                        <h3 className="font-semibold mb-2">Booking Summary</h3>
                        <div className="space-y-1 text-sm luxury-text">
                          <p>{nights} night{nights > 1 ? 's' : ''} • {bookingData.guests} guest{bookingData.guests > 1 ? 's' : ''}</p>
                          <p>{new Date(bookingData.checkIn).toLocaleDateString()} - {new Date(bookingData.checkOut).toLocaleDateString()}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end">
                      <Button 
                        onClick={handleNextStep}
                        disabled={!bookingData.checkIn || !bookingData.checkOut}
                        className="bg-primary hover:bg-primary/90"
                      >
                        Continue to Guest Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Guest Details */}
              {currentStep === 2 && (
                <Card className="luxury-card">
                  <CardHeader>
                    <CardTitle className="font-heading text-2xl">Guest Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="firstName" className="flex items-center mb-2">
                          <User className="w-4 h-4 mr-2" />
                          First Name
                        </Label>
                        <Input
                          id="firstName"
                          value={bookingData.guestDetails.firstName}
                          onChange={(e) => handleInputChange('guestDetails.firstName', e.target.value)}
                          className="h-12"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="mb-2 block">
                          Last Name
                        </Label>
                        <Input
                          id="lastName"
                          value={bookingData.guestDetails.lastName}
                          onChange={(e) => handleInputChange('guestDetails.lastName', e.target.value)}
                          className="h-12"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="email" className="flex items-center mb-2">
                          <Mail className="w-4 h-4 mr-2" />
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={bookingData.guestDetails.email}
                          onChange={(e) => handleInputChange('guestDetails.email', e.target.value)}
                          className="h-12"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="flex items-center mb-2">
                          <Phone className="w-4 h-4 mr-2" />
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={bookingData.guestDetails.phone}
                          onChange={(e) => handleInputChange('guestDetails.phone', e.target.value)}
                          className="h-12"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address" className="flex items-center mb-2">
                        <MapPin className="w-4 h-4 mr-2" />
                        Address
                      </Label>
                      <Input
                        id="address"
                        value={bookingData.guestDetails.address}
                        onChange={(e) => handleInputChange('guestDetails.address', e.target.value)}
                        className="h-12"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="city" className="mb-2 block">
                          City
                        </Label>
                        <Input
                          id="city"
                          value={bookingData.guestDetails.city}
                          onChange={(e) => handleInputChange('guestDetails.city', e.target.value)}
                          className="h-12"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="country" className="mb-2 block">
                          Country
                        </Label>
                        <Input
                          id="country"
                          value={bookingData.guestDetails.country}
                          onChange={(e) => handleInputChange('guestDetails.country', e.target.value)}
                          className="h-12"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="specialRequests" className="flex items-center mb-2">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Special Requests (Optional)
                      </Label>
                      <Textarea
                        id="specialRequests"
                        value={bookingData.guestDetails.specialRequests}
                        onChange={(e) => handleInputChange('guestDetails.specialRequests', e.target.value)}
                        placeholder="Any special requests or requirements..."
                        className="min-h-24"
                      />
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={handlePrevStep}>
                        Back
                      </Button>
                      <Button 
                        onClick={handleNextStep}
                        disabled={!bookingData.guestDetails.firstName || !bookingData.guestDetails.lastName || !bookingData.guestDetails.email}
                        className="bg-primary hover:bg-primary/90"
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <Card className="luxury-card">
                  <CardHeader>
                    <CardTitle className="font-heading text-2xl">Payment Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center mb-2">
                        <Shield className="w-5 h-5 text-green-600 mr-2" />
                        <span className="font-semibold text-green-800">Secure Payment</span>
                      </div>
                      <p className="text-sm text-green-700">
                        Your payment information is encrypted and secure. We use industry-standard SSL encryption.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-4">Payment Options</h3>
                      <div className="space-y-3">
                        <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-slate-50">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="full"
                            checked={bookingData.paymentMethod === 'full'}
                            onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                            className="mr-3"
                          />
                          <div>
                            <p className="font-medium">Pay Full Amount</p>
                            <p className="text-sm luxury-text">Pay ${pricing.total.toFixed(2)} now</p>
                          </div>
                        </label>
                        <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-slate-50">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="deposit"
                            checked={bookingData.paymentMethod === 'deposit'}
                            onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                            className="mr-3"
                          />
                          <div>
                            <p className="font-medium">Pay Deposit</p>
                            <p className="text-sm luxury-text">Pay ${(pricing.total * 0.3).toFixed(2)} now, rest at check-in</p>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="p-4 bg-amber-50 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Clock className="w-5 h-5 text-amber-600 mr-2" />
                        <span className="font-semibold text-amber-800">Cancellation Policy</span>
                      </div>
                      <p className="text-sm text-amber-700">
                        Free cancellation up to 48 hours before check-in. After that, the first night is non-refundable.
                      </p>
                    </div>

                    <div className="border-t pt-6">
                      <div className="flex items-center mb-4">
                        <input type="checkbox" id="terms" className="mr-3" required />
                        <label htmlFor="terms" className="text-sm luxury-text">
                          I agree to the{' '}
                          <Link href="/terms" className="text-primary hover:underline">
                            Terms of Service
                          </Link>{' '}
                          and{' '}
                          <Link href="/privacy" className="text-primary hover:underline">
                            Privacy Policy
                          </Link>
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" onClick={handlePrevStep}>
                        Back
                      </Button>
                      <Button 
                        onClick={handleSubmitBooking}
                        disabled={isLoading}
                        className="bg-primary hover:bg-primary/90 px-8"
                      >
                        {isLoading ? 'Processing...' : `Confirm Booking - $${(bookingData.paymentMethod === 'full' ? pricing.total : pricing.total * 0.3).toFixed(2)}`}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Booking Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card className="luxury-card">
                  <CardContent className="p-6">
                    <h3 className="font-heading text-xl mb-4">Booking Summary</h3>
                    
                    {/* Room Info */}
                    <div className="flex mb-6">
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-20 h-20 object-cover rounded-lg mr-4"
                      />
                      <div>
                        <h4 className="font-semibold">{room.name}</h4>
                        <p className="text-sm luxury-text">{room.type}</p>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-amber-500 fill-current" />
                          ))}
                        </div>
                      </div>
                    </div>

                    <Separator className="mb-4" />

                    {/* Booking Details */}
                    {bookingData.checkIn && bookingData.checkOut && (
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-sm">
                          <span>Check-in:</span>
                          <span>{new Date(bookingData.checkIn).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Check-out:</span>
                          <span>{new Date(bookingData.checkOut).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Guests:</span>
                          <span>{bookingData.guests}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Nights:</span>
                          <span>{nights}</span>
                        </div>
                      </div>
                    )}

                    <Separator className="mb-4" />

                    {/* Pricing */}
                    {nights > 0 && (
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>${room.price} × {nights} night{nights > 1 ? 's' : ''}</span>
                          <span>${pricing.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Service fee</span>
                          <span>${pricing.serviceFee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Taxes</span>
                          <span>${pricing.taxes.toFixed(2)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span>${pricing.total.toFixed(2)}</span>
                        </div>
                        {bookingData.paymentMethod === 'deposit' && (
                          <div className="flex justify-between text-sm text-primary">
                            <span>Due now (30%)</span>
                            <span>${(pricing.total * 0.3).toFixed(2)}</span>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Help Card */}
                <Card className="luxury-card mt-6">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-heading text-lg mb-2">Need Help?</h3>
                    <p className="luxury-text text-sm mb-4">
                      Our team is available 24/7 to assist you
                    </p>
                    <Button variant="outline" className="w-full">
                      Contact Support
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