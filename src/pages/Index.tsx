import AppointmentBooking from "@/Components/AppointmentBooking";
import DoctorCard from "@/Components/DoctorCard";
import { DoctorProfile } from "@/Components/DoctorProfile";
import UnifiedSearch, { type FilterState } from "@/Components/UnifiedSearch";
import { doctors } from "@/data/doctors";
import type { Doctor } from "@/types/doctor";
import { useMemo, useState } from "react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    specialization: "",
    availability: "",
    rating: "",
    priceRange: "",
    location: "",
  });
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleSearch = (query: string, location: string) => {
    setSearchQuery(query);
    setFilters((prev) => ({ ...prev, location }));
  };

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      // Search filter
      if (
        searchQuery &&
        !doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Specialization filter
      if (
        filters.specialization &&
        doctor.specialization !== filters.specialization
      ) {
        return false;
      }

      // Availability filter
      if (filters.availability) {
        if (
          filters.availability === "Available" &&
          doctor.availabilityStatus !== "Available"
        ) {
          return false;
        }
      }

      // Rating filter
      if (filters.rating) {
        const minRating = parseFloat(filters.rating);
        if (doctor.rating < minRating) {
          return false;
        }
      }

      // Price range filter
      if (filters.priceRange) {
        const [min, max] = filters.priceRange
          .split("-")
          .map((p) => p.replace("+", ""));
        const minPrice = parseInt(min);
        const maxPrice = max ? parseInt(max) : Infinity;

        if (
          doctor.consultationFee < minPrice ||
          doctor.consultationFee > maxPrice
        ) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, filters]);

  const handleViewProfile = (doctorId: string) => {
    const doctor = doctors.find((d) => d.id === doctorId);
    if (doctor) {
      setSelectedDoctor(doctor);
      setIsProfileOpen(true);
    }
  };

  const handleBookAppointment = (doctorId: string) => {
    const doctor = doctors.find((d) => d.id === doctorId);
    if (doctor) {
      setSelectedDoctor(doctor);
      setIsBookingOpen(true);
    }
  };

  const handleBookingSuccess = () => {
    // Here you could refresh data, show success message, etc.
    console.log("Booking successful!");
  };

  return (
    <div className="min-h-screen bg-background">
      <UnifiedSearch onSearch={handleSearch} onFilterChange={setFilters} />
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold mb-2">Available Doctors</h2>
          <p className="text-muted-foreground">
            {filteredDoctors.length} doctors found
          </p>
        </div>
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-12 animate-fade-in">
            <p className="text-xl text-muted-foreground mb-4">
              No doctors found matching your criteria
            </p>
            <p className="text-muted-foreground">
              Try adjusting your filters or search terms
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor, index) => (
              <div
                key={doctor.id}
                className="animate-fade-in hover-scale"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <DoctorCard
                  doctor={doctor}
                  onViewProfile={handleViewProfile}
                  onBookAppointment={handleBookAppointment}
                />
              </div>
            ))}
          </div>
        )}
      </div>
      <DoctorProfile
        doctor={selectedDoctor}
        isOpen={isProfileOpen}
        onClose={() => {
          setIsProfileOpen(false);
          setSelectedDoctor(null);
        }}
        onBookAppointment={handleBookAppointment}
      />
      <AppointmentBooking
        doctor={selectedDoctor}
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setSelectedDoctor(null);
        }}
        onBookingSuccess={handleBookingSuccess}
      />
    </div>
  );
};

export default Index;
