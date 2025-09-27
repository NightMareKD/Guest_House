'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Calendar, CreditCard as Edit, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import Link from 'next/link';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    dateOfBirth: ''
  });

  useEffect(() => {
    // Get user data from localStorage (in real app, fetch from API)
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setFormData({
        firstName: parsedUser.firstName || '',
        lastName: parsedUser.lastName || '',
        email: parsedUser.email || '',
        phone: parsedUser.phone || '',
        address: parsedUser.address || '',
        city: parsedUser.city || '',
        country: parsedUser.country || '',
        dateOfBirth: parsedUser.dateOfBirth || ''
      });
    }
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // In real app, send to API
    const updatedUser = { ...user, ...formData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data
    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || '',
      city: user.city || '',
      country: user.country || '',
      dateOfBirth: user.dateOfBirth || ''
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen luxury-gradient">
        <Header />
        <div className="pt-24 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h2 className="font-heading text-2xl mb-4">Please sign in to view your profile</h2>
            <Link href="/login">
              <Button>Sign In</Button>
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
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-heading text-4xl text-slate-800 mb-2">My Profile</h1>
            <p className="luxury-text text-lg">Manage your account information and preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Summary */}
            <div className="lg:col-span-1">
              <Card className="luxury-card">
                <CardContent className="p-6 text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                      {user.firstName?.[0]}{user.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="font-heading text-xl mb-2">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="luxury-text mb-4">{user.email}</p>
                  <div className="flex items-center justify-center text-sm luxury-text mb-6">
                    <Calendar className="w-4 h-4 mr-2" />
                    Member since {new Date().getFullYear()}
                  </div>
                  
                  <div className="space-y-3">
                    <Link href="/profile/bookings" className="block">
                      <Button variant="outline" className="w-full">
                        My Bookings
                      </Button>
                    </Link>
                    <Link href="/profile/preferences" className="block">
                      <Button variant="outline" className="w-full">
                        Preferences
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2">
              <Card className="luxury-card">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="font-heading text-2xl">Personal Information</CardTitle>
                  {!isEditing ? (
                    <Button 
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      size="sm"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button 
                        onClick={handleSave}
                        size="sm"
                        className="bg-primary hover:bg-primary/90"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button 
                        onClick={handleCancel}
                        variant="outline"
                        size="sm"
                      >
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName" className="flex items-center mb-2">
                        <User className="w-4 h-4 mr-2" />
                        First Name
                      </Label>
                      {isEditing ? (
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange('firstName', e.target.value)}
                          className="h-11"
                        />
                      ) : (
                        <p className="h-11 flex items-center px-3 bg-slate-50 rounded-md luxury-text">
                          {user.firstName || 'Not provided'}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="mb-2 block">
                        Last Name
                      </Label>
                      {isEditing ? (
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange('lastName', e.target.value)}
                          className="h-11"
                        />
                      ) : (
                        <p className="h-11 flex items-center px-3 bg-slate-50 rounded-md luxury-text">
                          {user.lastName || 'Not provided'}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="flex items-center mb-2">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Address
                    </Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="h-11"
                      />
                    ) : (
                      <p className="h-11 flex items-center px-3 bg-slate-50 rounded-md luxury-text">
                        {user.email}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone" className="flex items-center mb-2">
                        <Phone className="w-4 h-4 mr-2" />
                        Phone Number
                      </Label>
                      {isEditing ? (
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="h-11"
                        />
                      ) : (
                        <p className="h-11 flex items-center px-3 bg-slate-50 rounded-md luxury-text">
                          {user.phone || 'Not provided'}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth" className="flex items-center mb-2">
                        <Calendar className="w-4 h-4 mr-2" />
                        Date of Birth
                      </Label>
                      {isEditing ? (
                        <Input
                          id="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                          className="h-11"
                        />
                      ) : (
                        <p className="h-11 flex items-center px-3 bg-slate-50 rounded-md luxury-text">
                          {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : 'Not provided'}
                        </p>
                      )}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-4 flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      Address Information
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="address" className="mb-2 block">
                          Street Address
                        </Label>
                        {isEditing ? (
                          <Input
                            id="address"
                            value={formData.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            className="h-11"
                          />
                        ) : (
                          <p className="h-11 flex items-center px-3 bg-slate-50 rounded-md luxury-text">
                            {user.address || 'Not provided'}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="city" className="mb-2 block">
                            City
                          </Label>
                          {isEditing ? (
                            <Input
                              id="city"
                              value={formData.city}
                              onChange={(e) => handleInputChange('city', e.target.value)}
                              className="h-11"
                            />
                          ) : (
                            <p className="h-11 flex items-center px-3 bg-slate-50 rounded-md luxury-text">
                              {user.city || 'Not provided'}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="country" className="mb-2 block">
                            Country
                          </Label>
                          {isEditing ? (
                            <Input
                              id="country"
                              value={formData.country}
                              onChange={(e) => handleInputChange('country', e.target.value)}
                              className="h-11"
                            />
                          ) : (
                            <p className="h-11 flex items-center px-3 bg-slate-50 rounded-md luxury-text">
                              {user.country || 'Not provided'}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Account Settings */}
              <Card className="luxury-card mt-8">
                <CardHeader>
                  <CardTitle className="font-heading text-2xl">Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">Password</h3>
                      <p className="text-sm luxury-text">Last updated 3 months ago</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Change Password
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">Email Notifications</h3>
                      <p className="text-sm luxury-text">Manage your email preferences</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">Privacy Settings</h3>
                      <p className="text-sm luxury-text">Control your data and privacy</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Settings
                    </Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                    <div>
                      <h3 className="font-semibold text-red-800">Delete Account</h3>
                      <p className="text-sm text-red-600">Permanently delete your account and all data</p>
                    </div>
                    <Button variant="destructive" size="sm">
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}