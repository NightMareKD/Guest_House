import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <h3 className="font-heading text-2xl mb-4">ISARA Guest House</h3>
            <p className="text-slate-300 mb-6">
              Experience the pinnacle of luxury hospitality, where every detail 
              is crafted to create unforgettable memories.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/rooms" className="text-slate-300 hover:text-primary transition-colors">
                  Rooms & Suites
                </Link>
              </li>
              <li>
                <Link href="/dining" className="text-slate-300 hover:text-primary transition-colors">
                  Dining
                </Link>
              </li>
              <li>
                <Link href="/spa" className="text-slate-300 hover:text-primary transition-colors">
                  Spa & Wellness
                </Link>
              </li>
              <li>
                <Link href="/activities" className="text-slate-300 hover:text-primary transition-colors">
                  Activities
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/concierge" className="text-slate-300 hover:text-primary transition-colors">
                  Concierge
                </Link>
              </li>
              <li>
                <Link href="/transfers" className="text-slate-300 hover:text-primary transition-colors">
                  Airport Transfers
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-slate-300 hover:text-primary transition-colors">
                  Private Events
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="text-slate-300 hover:text-primary transition-colors">
                  Experiences
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-3 text-primary" />
                <span className="text-slate-300">
                  123 Paradise Island<br />
                  Luxury Resort District
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-primary" />
                <span className="text-slate-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-primary" />
                <span className="text-slate-300">info@isaraguest.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-slate-400 text-sm">
              © 2025 ISARA Guest House. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-slate-400 hover:text-primary text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-slate-400 hover:text-primary text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}