// src/components/Hero.tsx

import { useState } from 'react';
import { Search, MapPin, Calendar } from 'lucide-react';
import heroImage from '@/assets/hero-healthcare.jpg';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface HeroProps {
  onSearch: (query: string, location: string) => void;
}

export const Hero = ({ onSearch }: HeroProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery, location);
  };

  return (
    <section className="relative flex items-center justify-center min-h-[600px] bg-hero-gradient overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/70" />

      {/* Content */}
      <div className="relative z-10 px-4 text-center text-white container mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Find & Book Your
          <span className="block text-accent-light">Perfect Doctor</span>
        </h1>
        <p className="text-xl md:text-2xl mb-12 text-primary-light max-w-3xl mx-auto">
          Connect with top-rated healthcare professionals in your area.
          Easy scheduling, verified doctors, and quality care at your fingertips.
        </p>

        {/* Search Box */}
        <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-doctor-card">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search doctors, specialties..."
                className="pl-10 h-12 border-0 bg-white shadow-sm focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Location Input */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location or zip code"
                className="pl-10 h-12 border-0 bg-white shadow-sm focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Search Button */}
            <Button onClick={handleSearch} variant="default" className="h-12 w-full">
              <Search className="mr-2 h-5 w-5" />
              Find Doctors
            </Button>
          </div>

          {/* Highlights */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Feature icon={<Calendar className="mr-2 h-4 w-4" />} label="Same-day appointments available" />
            <Feature dotColor="bg-success" label="Verified healthcare professionals" />
            <Feature dotColor="bg-accent" label="Secure online booking" />
          </div>
        </div>
      </div>
    </section>
  );
};

interface FeatureProps {
  icon?: React.ReactNode;
  dotColor?: string;
  label: string;
}

const Feature = ({ icon, dotColor, label }: FeatureProps) => {
  return (
    <div className="flex items-center text-foreground/70">
      {icon}
      {dotColor && <div className={`w-2 h-2 rounded-full mr-2 ${dotColor}`} />}
      {label}
    </div>
  );
};
