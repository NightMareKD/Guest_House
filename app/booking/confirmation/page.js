'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { CircleCheck as CheckCircle, Calendar, Users, MapPin, Mail, Phone, Download, Share2, Star, Clock, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Link from 'next/link';

export default function BookingConfirmationPage() {
  const searchParams = useSearchParams();
  const [booking, setBooking] = useState(null);
  const bookingId = searchParams?.get('id');

  useEffect(() => {
    // In a real app, fetch booking data from API
    const storedBooking = localStorage.getItem('lastBooking');
    if (storedBooking) {
      setBooking(JSON.parse(storedBooking));
    }
  }, [bookingId]);

  const handleDownloadConfirmation = () => {
    // Mock download functionality
    alert('Booking confirmation downloaded!');
  };

  const handleShareBooking = () => {
    if (navigator.share) {
      navigator.share({
        title: 'ISARA Guest House Booking Confirmation',
        text: `My booking at ${booking?.room?.name} is confirmed!`,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Booking link copied to clipboard!');
    }
  };

  if (!booking) {
    return (
      <div className="min-h-screen luxury-gradient">
        <Header />
        <div className="pt-24 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="font-heading text-2xl mb-4">Booking not found</h2>
            <Link href="/">
              <Button>Return Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const nights = Math.ceil((new Date(booking.checkOut) - new Date(booking.checkIn)) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen luxury-gradient">
      <Header />
      
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="font-heading text-4xl text-slate-800 mb-4">
              Booking Confirmed!
            </h1>
            <p className="text-xl luxury-text mb-2">
              Thank you for choosing ISARA Guest House
            </p>
            <p className="luxury-text">
              Your booking confirmation number is <strong>{booking.id}</strong>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button onClick={handleDownloadConfirmation} variant="outline" className="flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Download Confirmation
            </Button>
            <Button onClick={handleShareBooking} variant="outline" className="flex items-center">
              <Share2 className="w-4 h-4 mr-2" />
              Share Booking
            </Button>
            <Link href="/profile/bookings">
              <Button className="bg-primary hover:bg-primary/90 w-full sm:w-auto">
                View All Bookings
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Booking Details */}
            <Card className="luxury-card">
              <CardHeader>
                <CardTitle className="font-heading text-2xl flex items-center">
                  <Calendar className="w-6 h-6 mr-3 text-primary" />
                  Booking Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Room Info */}
                <div className="flex">
                  <img
                    src={booking.room.image}
                    alt={booking.room.name}
                    className="w-24 h-24 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{booking.room.name}</h3>
                    <p className="luxury-text">{booking.room.type}</p>
                    <div className="flex items-center mt-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-amber-500 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Stay Details */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Check-in</p>
                    <p className="font-semibold">{new Date(booking.checkIn).toLocaleDateString()}</p>
                    <p className="text-sm luxury-text">After 3:00 PM</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Check-out</p>
                    <p className="font-semibold">{new Date(booking.checkOut).toLocaleDateString()}</p>
                    <p className="text-sm luxury-text">Before 12:00 PM</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Duration</p>
                    <p className="font-semibold">{nights} night{nights > 1 ? 's' : ''}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Guests</p>
                    <p className="font-semibold">{booking.guests} guest{booking.guests > 1 ? 's' : ''}</p>
                  </div>
                </div>

                {booking.guestDetails.specialRequests && (
                  <>
                    <Separator />
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Special Requests</p>
                      <p className="luxury-text">{booking.guestDetails.specialRequests}</p>
                    </div>
                  </>
                )}

                <Separator />

                {/* Status */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge className="bg-green-100 text-green-800">
                    {booking.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Guest & Payment Info */}
            <div className="space-y-8">
              {/* Guest Information */}
              <Card className="luxury-card">
                <CardHeader>
                  <CardTitle className="font-heading text-2xl flex items-center">
                    <Users className="w-6 h-6 mr-3 text-primary" />
                    Guest Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Primary Guest</p>
                    <p className="font-semibold">
                      {booking.guestDetails.firstName} {booking.guestDetails.lastName}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-3 text-muted-foreground" />
                      <span className="luxury-text">{booking.guestDetails.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 mr-3 text-muted-foreground" />
                      <span className="luxury-text">{booking.guestDetails.phone}</span>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="w-4 h-4 mr-3 text-muted-foreground mt-1" />
                      <div className="luxury-text">
                        <p>{booking.guestDetails.address}</p>
                        <p>{booking.guestDetails.city}, {booking.guestDetails.country}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Summary */}
              <Card className="luxury-card">
                <CardHeader>
                  <CardTitle className="font-heading text-2xl flex items-center">
                    <CreditCard className="w-6 h-6 mr-3 text-primary" />
                    Payment Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="luxury-text">Room rate ({nights} night{nights > 1 ? 's' : ''})</span>
                      <span>${booking.pricing.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="luxury-text">Service fee</span>
                      <span>${booking.pricing.serviceFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="luxury-text">Taxes & fees</span>
                      <span>${booking.pricing.taxes.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${booking.pricing.total.toFixed(2)}</span>
                    </div>
                    
                    {booking.paymentMethod === 'deposit' && (
                      <>
                        <Separator />
                        <div className="bg-amber-50 p-4 rounded-lg">
                          <div className="flex justify-between text-sm mb-2">
                            <span>Paid now (30%)</span>
                            <span className="font-semibold">${(booking.pricing.total * 0.3).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Due at check-in</span>
                            <span className="font-semibold">${(booking.pricing.total * 0.7).toFixed(2)}</span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Important Information */}
          <Card className="luxury-card mt-8">
            <CardHeader>
              <CardTitle className="font-heading text-2xl flex items-center">
                <Clock className="w-6 h-6 mr-3 text-primary" />
                Important Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Before Your Arrival</h3>
                  <ul className="space-y-2 luxury-text text-sm">
                    <li>• Check-in begins at 3:00 PM</li>
                    <li>• Valid photo ID required at check-in</li>
                    <li>• Contact us 24 hours before arrival for special arrangements</li>
                    <li>• Complimentary airport transfer available (advance booking required)</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Cancellation Policy</h3>
                  <ul className="space-y-2 luxury-text text-sm">
                    <li>• Free cancellation up to 48 hours before check-in</li>
                    <li>• Late cancellations subject to first night charge</li>
                    <li>• No-shows will be charged the full amount</li>
                    <li>• Modifications subject to availability</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="text-center mt-12 p-8 bg-slate-900 text-white rounded-lg">
            <h3 className="font-heading text-2xl mb-4">Questions about your booking?</h3>
            <p className="mb-6 opacity-90">
              Our concierge team is available 24/7 to assist you with any questions or special requests.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-slate-900">
                Call +1 (555) 123-4567
              </Button>
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-slate-900">
                Email Concierge
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}