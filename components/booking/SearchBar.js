'use client';

import { useState } from 'react';
import { CalendarDays, Users, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function SearchBar({ onSearch }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('1');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (checkIn && checkOut) {
      onSearch({
        checkIn,
        checkOut,
        guests: parseInt(guests)
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="space-y-2">
          <Label htmlFor="checkIn" className="text-slate-700 flex items-center">
            <CalendarDays className="w-4 h-4 mr-2" />
            Check-in
          </Label>
          <Input
            id="checkIn"
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="checkOut" className="text-slate-700 flex items-center">
            <CalendarDays className="w-4 h-4 mr-2" />
            Check-out
          </Label>
          <Input
            id="checkOut"
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            min={checkIn || new Date().toISOString().split('T')[0]}
            className="w-full"
            required
          />
        </div>

        <div className="space-y-2">
          <Label className="text-slate-700 flex items-center">
            <Users className="w-4 h-4 mr-2" />
            Guests
          </Label>
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger>
              <SelectValue placeholder="Select guests" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Guest</SelectItem>
              <SelectItem value="2">2 Guests</SelectItem>
              <SelectItem value="3">3 Guests</SelectItem>
              <SelectItem value="4">4 Guests</SelectItem>
              <SelectItem value="5">5 Guests</SelectItem>
              <SelectItem value="6">6+ Guests</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          type="submit"
          size="lg"
          className="bg-primary hover:bg-primary/90 h-10"
        >
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>
    </form>
  );
}