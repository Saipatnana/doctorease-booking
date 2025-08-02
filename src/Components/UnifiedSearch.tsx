import heroImage from "@/assets/hero-healthcare.jpg";
import { Calendar, ChevronDown, Filter, MapPin, Search, X } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export interface FilterState {
  specialization: string;
  availability: string;
  rating: string;
  priceRange: string;
  location: string;
}

interface UnifiedSearchProps {
  onSearch: (query: string, location: string) => void;
  onFilterChange: (filters: FilterState) => void;
}
const UnifiedSearch = ({ onSearch, onFilterChange }: UnifiedSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    specialization: "",
    availability: "",
    rating: "",
    priceRange: "",
    location: "",
  });
  const handleSearch = () => {
    onSearch(searchQuery, location);
  };
  const activeFiltersCount = Object.values(filters).filter(
    (value) => value !== ""
  ).length;
  const handleFilterChange = (key: keyof FilterState, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const specializations = [
    "Cardiologist",
    "Dermatologist",
    "Pediatrician",
    "Orthopedic Surgeon",
    "Psychiatrist",
    "General Practitioner",
  ];

  const clearAllFilters = () => {
    const clearedFilters: FilterState = {
      specialization: "",
      availability: "",
      rating: "",
      priceRange: "",
      location: "",
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };
  const clearFilter = (key: keyof FilterState) => {
    const newFilters = { ...filters, [key]: "" };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="relative min-h-[600px] flex items-center justify-center bg-hero-gradient overflow-hidden py-10">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat animate-fade-in"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/70" />
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Find & Book Your
            <span className="block text-accent-light animate-scale-in">
              Perfect Doctor
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-primary-light max-w-3xl mx-auto">
            Connect with top-rated healthcare professionals in your area. Easy
            scheduling, verified doctors, and quality care at your fingertips.
          </p>
        </div>
        <div className="max-w-5xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-doctor-card animate-scale-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 group-hover:text-primary transition-colors duration-200" />
              <Input
                placeholder="Search doctors, specialties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 border-0 bg-white shadow-sm focus:ring-2 focus:ring-primary hover:shadow-md transition-all duration-300"
              />
            </div>
            <div className="relative group">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 group-hover:text-primary transition-colors duration-200" />
              <Input
                placeholder="Location or zip code"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 h-12 border-0 bg-white shadow-sm focus:ring-2 focus:ring-primary hover:shadow-md transition-all duration-300"
              />
            </div>
            <Button
              onClick={handleSearch}
              variant="default"
              className="h-12 w-full hover-scale transition-all duration-300"
            >
              <Search className="mr-2 h-5 w-5" />
              Find Doctors
            </Button>
          </div>
          <div className="flex items-center justify-between mb-4 w-full ">
            <Collapsible
              open={isFiltersOpen}
              onOpenChange={setIsFiltersOpen}
              className="w-full"
            >
              <CollapsibleTrigger asChild className="w-full text-left">
                <Button
                  variant="ghost"
                  className="bg-transparent cursor-pointer hover:text-black text-left hover:bg-transparent text-black transition-all duration-300 hover-scale"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Advanced Filters
                  {activeFiltersCount > 0 && (
                    <Badge
                      variant="secondary"
                      className="ml-2 animate-scale-in"
                    >
                      {activeFiltersCount}
                    </Badge>
                  )}
                  <ChevronDown
                    className={`ml-2 h-4 w-4 transition-transform duration-300 ${
                      isFiltersOpen ? "rotate-180" : ""
                    }`}
                  />
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="animate-accordion-down border rounded-md mt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4  p-4 bg-muted/50 rounded-lg">
                  <div className="animate-fade-in">
                    <label className="text-sm font-medium mb-2 block text-foreground">
                      Specialization
                    </label>
                    <Select
                      value={filters.specialization}
                      onValueChange={(value) =>
                        handleFilterChange("specialization", value)
                      }
                    >
                      <SelectTrigger className="w-full hover:shadow-md transition-all duration-200 text-black">
                        <SelectValue
                          placeholder="All specializations"
                          className="text-black"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {specializations.map((spec) => (
                          <SelectItem
                            key={spec}
                            value={spec}
                            className="hover:bg-primary/10 transition-colors duration-200"
                          >
                            {spec}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div
                    className="animate-fade-in"
                    style={{ animationDelay: "0.1s" }}
                  >
                    <label className="text-sm font-medium mb-2 block text-foreground">
                      Availability
                    </label>
                    <Select
                      value={filters.availability}
                      onValueChange={(value) =>
                        handleFilterChange("availability", value)
                      }
                    >
                      <SelectTrigger className="w-full hover:shadow-md transition-all duration-200 text-black">
                        <SelectValue placeholder="Any availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          value="Available"
                          className="hover:bg-primary/10 transition-colors duration-200"
                        >
                          Available Today
                        </SelectItem>
                        <SelectItem
                          value="Tomorrow"
                          className="hover:bg-primary/10 transition-colors duration-200"
                        >
                          Available Tomorrow
                        </SelectItem>
                        <SelectItem
                          value="Week"
                          className="hover:bg-primary/10 transition-colors duration-200"
                        >
                          Available This Week
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div
                    className="animate-fade-in"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <label className="text-sm font-medium mb-2 block text-foreground">
                      Minimum Rating
                    </label>
                    <Select
                      value={filters.rating}
                      onValueChange={(value) =>
                        handleFilterChange("rating", value)
                      }
                    >
                      <SelectTrigger className="w-full hover:shadow-md transition-all duration-200 text-black">
                        <SelectValue placeholder="Any rating" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          value="4.5"
                          className="hover:bg-primary/10 transition-colors duration-200"
                        >
                          4.5+ stars
                        </SelectItem>
                        <SelectItem
                          value="4.0"
                          className="hover:bg-primary/10 transition-colors duration-200"
                        >
                          4.0+ stars
                        </SelectItem>
                        <SelectItem
                          value="3.5"
                          className="hover:bg-primary/10 transition-colors duration-200"
                        >
                          3.5+ stars
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div
                    className="animate-fade-in"
                    style={{ animationDelay: "0.3s" }}
                  >
                    <label className="text-sm font-medium mb-2 block text-foreground">
                      Price Range
                    </label>
                    <Select
                      value={filters.priceRange}
                      onValueChange={(value) =>
                        handleFilterChange("priceRange", value)
                      }
                    >
                      <SelectTrigger className="w-full hover:shadow-md transition-all duration-200 text-black">
                        <SelectValue placeholder="Any price" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem
                          value="0-150"
                          className="hover:bg-primary/10 transition-colors duration-200"
                        >
                          $0 - $150
                        </SelectItem>
                        <SelectItem
                          value="150-250"
                          className="hover:bg-primary/10 transition-colors duration-200"
                        >
                          $150 - $250
                        </SelectItem>
                        <SelectItem
                          value="250+"
                          className="hover:bg-primary/10 transition-colors duration-200"
                        >
                          $250+
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {activeFiltersCount > 0 && (
                  <div className="mt-4 p-4 bg-card/50 rounded-lg animate-fade-in">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-medium text-foreground">
                        Active Filters:
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllFilters}
                        className="text-muted-foreground hover:text-foreground h-6 px-2 hover-scale"
                      >
                        Clear All
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(filters).map(
                        ([key, value]) =>
                          value && (
                            <Badge
                              key={key}
                              variant="secondary"
                              className="flex items-center gap-1 animate-scale-in hover-scale pointer-events-auto"
                            >
                              {key}: {value}
                              <X
                                className="h-3 w-3 z-50 cursor-pointer hover:text-destructive transition-colors duration-200 pointer-events-auto"
                                onClick={() => {
                                  console.log("Clicked:", key);
                                  clearFilter(key as keyof FilterState);
                                }}
                              />
                            </Badge>
                          )
                      )}
                    </div>
                  </div>
                )}
              </CollapsibleContent>
            </Collapsible>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center text-foreground/70 hover:text-foreground transition-colors duration-200">
              <Calendar className="mr-2 h-4 w-4" />
              Same-day appointments available
            </div>
            <div className="flex items-center text-foreground/70 hover:text-foreground transition-colors duration-200">
              <div className="w-2 h-2 bg-success rounded-full mr-2 animate-pulse" />
              Verified healthcare professionals
            </div>
            <div className="flex items-center text-foreground/70 hover:text-foreground transition-colors duration-200">
              <div className="w-2 h-2 bg-accent rounded-full mr-2 animate-pulse" />
              Secure online booking
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedSearch;
