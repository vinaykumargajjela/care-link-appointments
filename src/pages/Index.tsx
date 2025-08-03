import React, { useState, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { doctors } from '../data/doctors';
import Navbar from '../components/Navbar';
import SearchBar from '../components/SearchBar';
import DoctorCard from '../components/DoctorCard';
import { EnhancedButton } from '../components/ui/enhanced-button';
import { Card, CardContent } from '../components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, Users, Calendar, Clock, ArrowRight } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [specialization, setSpecialization] = useState('All Specializations');
  const [availableOnly, setAvailableOnly] = useState(false);

  const filteredDoctors = useMemo(() => {
    return doctors.filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           doctor.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSpecialization = specialization === 'All Specializations' || 
                                   doctor.specialization === specialization;
      
      const matchesAvailability = !availableOnly || doctor.available;
      
      return matchesSearch && matchesSpecialization && matchesAvailability;
    });
  }, [searchTerm, specialization, availableOnly]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="max-w-3xl mx-auto">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <Stethoscope className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Your Health, Our Priority
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Connect with trusted healthcare professionals and book appointments instantly. 
                Quality healthcare made simple and accessible.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <EnhancedButton 
                  variant="medical" 
                  size="lg" 
                  onClick={() => navigate('/login')}
                  className="px-8 py-3"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </EnhancedButton>
                <EnhancedButton 
                  variant="outline" 
                  size="lg" 
                  onClick={() => navigate('/login')}
                  className="px-8 py-3"
                >
                  Sign In
                </EnhancedButton>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center shadow-medium hover:shadow-large transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Expert Doctors</h3>
                <p className="text-muted-foreground">Access to board-certified specialists across multiple medical fields</p>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-medium hover:shadow-large transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Easy Booking</h3>
                <p className="text-muted-foreground">Book appointments instantly with real-time availability checking</p>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-medium hover:shadow-large transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-success" />
                </div>
                <h3 className="text-xl font-semibold mb-3">24/7 Support</h3>
                <p className="text-muted-foreground">Round-the-clock customer support for all your healthcare needs</p>
              </CardContent>
            </Card>
          </div>

          {/* Sample Doctors Preview */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-8">Meet Our Doctors</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {doctors.slice(0, 3).map(doctor => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
            <EnhancedButton 
              variant="outline" 
              onClick={() => navigate('/login')}
              className="px-6"
            >
              View All Doctors
            </EnhancedButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-muted-foreground">
            Find and book appointments with trusted healthcare professionals
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            specialization={specialization}
            onSpecializationChange={setSpecialization}
            availableOnly={availableOnly}
            onAvailableOnlyChange={setAvailableOnly}
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center shadow-soft">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-primary">{doctors.length}</div>
              <div className="text-sm text-muted-foreground">Total Doctors</div>
            </CardContent>
          </Card>
          <Card className="text-center shadow-soft">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-accent">{doctors.filter(d => d.available).length}</div>
              <div className="text-sm text-muted-foreground">Available Today</div>
            </CardContent>
          </Card>
          <Card className="text-center shadow-soft">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-success">{new Set(doctors.map(d => d.specialization)).size}</div>
              <div className="text-sm text-muted-foreground">Specializations</div>
            </CardContent>
          </Card>
          <Card className="text-center shadow-soft">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-warning">{filteredDoctors.length}</div>
              <div className="text-sm text-muted-foreground">Search Results</div>
            </CardContent>
          </Card>
        </div>

        {/* Doctors Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">
              {searchTerm || specialization !== 'All Specializations' || availableOnly 
                ? 'Search Results' 
                : 'All Doctors'
              }
            </h2>
            <p className="text-muted-foreground">
              {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} found
            </p>
          </div>
          
          {filteredDoctors.length === 0 ? (
            <Card className="text-center shadow-medium">
              <CardContent className="p-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Stethoscope className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No doctors found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or filters
                </p>
                <EnhancedButton 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setSpecialization('All Specializations');
                    setAvailableOnly(false);
                  }}
                >
                  Clear Filters
                </EnhancedButton>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map(doctor => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
