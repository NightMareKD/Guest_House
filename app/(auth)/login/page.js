'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/common/Header';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Mock authentication - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (formData.email === 'admin@isara.com' && formData.password === 'admin') {
        const adminUser = {
          id: '1',
          email: 'admin@isara.com',
          firstName: 'Admin',
          lastName: 'User',
          role: 'ADMIN'
        };
        localStorage.setItem('user', JSON.stringify(adminUser));
        window.location.href = '/admin';
      } else if (formData.email && formData.password) {
        const user = {
          id: '2',
          email: formData.email,
          firstName: 'Guest',
          lastName: 'User',
          role: 'GUEST'
        };
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = '/';
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen luxury-gradient">
      <Header />
      
      <div className="pt-24 pb-16 px-4">
        <div className="max-w-md mx-auto">
          <Card className="luxury-card">
            <CardHeader className="text-center">
              <CardTitle className="font-heading text-3xl text-slate-800">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-lg luxury-text">
                Sign in to your ISARA account
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center text-slate-700">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="h-11"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="flex items-center text-slate-700">
                    <Lock className="w-4 h-4 mr-2" />
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="h-11 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 text-sm">
                    <input type="checkbox" className="rounded border-slate-300" />
                    <span className="luxury-text">Remember me</span>
                  </label>
                  <Link href="/forgot-password" className="text-sm text-primary hover:text-primary/80">
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 bg-primary hover:bg-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="luxury-text">
                  Don't have an account?{' '}
                  <Link href="/register" className="text-primary hover:text-primary/80 font-semibold">
                    Create account
                  </Link>
                </p>
              </div>

              <div className="mt-4 p-3 bg-amber-50 rounded-lg">
                <p className="text-xs text-slate-600">
                  <strong>Demo Accounts:</strong><br />
                  Admin: admin@isara.com / admin<br />
                  Guest: any email / any password
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}