import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doctors } from '../data/doctors';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { EnhancedButton } from '../components/ui/enhanced-button';
import { Separator } from '../components/ui/separator';
import { Star, MapPin, Clock, DollarSign, GraduationCap, Languages, ArrowLeft } from 'lucide-react';

const DoctorDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const doctor = doctors.find(d => d.id === id);

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Doctor not found</h1>
          <EnhancedButton onClick={() => navigate('/')}>
            Back to Home
          </EnhancedButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="max-w-4xl mx-auto p-4 py-8">
        <EnhancedButton
          variant="outline"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Doctors
        </EnhancedButton>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Doctor Info Card */}
          <div className="lg:col-span-2">
            <Card className="shadow-large">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start space-y-4 md:space-y-0 md:space-x-6">
                  <div className="relative mx-auto md:mx-0">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-32 h-32 rounded-full object-cover border-4 border-primary/20 shadow-medium"
                    />
                    <div className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full border-3 border-white ${
                      doctor.available ? 'bg-success' : 'bg-muted-foreground'
                    }`} />
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">
                          {doctor.name}
                        </h1>
                        <p className="text-xl text-primary font-semibold mb-3">
                          {doctor.specialization}
                        </p>
                      </div>
                      <Badge variant={doctor.available ? "default" : "secondary"} className="w-fit">
                        {doctor.available ? 'Available Today' : 'Currently Busy'}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center justify-center md:justify-start">
                        <Star className="w-5 h-5 text-yellow-400 mr-2" fill="currentColor" />
                        <span className="font-semibold">{doctor.rating}</span>
                        <span className="text-muted-foreground ml-1">({doctor.reviews} reviews)</span>
                      </div>
                      
                      <div className="flex items-center justify-center md:justify-start">
                        <Clock className="w-5 h-5 text-muted-foreground mr-2" />
                        <span>{doctor.experience} years experience</span>
                      </div>
                      
                      <div className="flex items-center justify-center md:justify-start">
                        <MapPin className="w-5 h-5 text-muted-foreground mr-2" />
                        <span>{doctor.location}</span>
                      </div>
                      
                      <div className="flex items-center justify-center md:justify-start">
                        <DollarSign className="w-5 h-5 text-success mr-2" />
                        <span className="font-semibold text-success">${doctor.fees} consultation</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                      <GraduationCap className="w-5 h-5 mr-2" />
                      About Dr. {doctor.name.split(' ')[1]}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {doctor.bio}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3">
                      Qualifications
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {doctor.qualifications.map((qual, index) => (
                        <Badge key={index} variant="secondary">
                          {qual}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
                      <Languages className="w-5 h-5 mr-2" />
                      Languages
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {doctor.languages.map((lang, index) => (
                        <Badge key={index} variant="outline">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="shadow-large sticky top-24">
              <CardHeader>
                <CardTitle className="text-center">Book Appointment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">Consultation Fee</p>
                  <p className="text-2xl font-bold text-success">${doctor.fees}</p>
                </div>
                
                <EnhancedButton
                  variant="medical"
                  className="w-full py-3"
                  onClick={() => navigate(`/book/${doctor.id}`)}
                  disabled={!doctor.available}
                >
                  {doctor.available ? 'Book Appointment' : 'Currently Unavailable'}
                </EnhancedButton>
                
                {doctor.available && (
                  <p className="text-sm text-muted-foreground text-center">
                    Available slots today: {doctor.availableSlots.filter(slot => slot.available).length}
                  </p>
                )}
                
                <div className="text-xs text-muted-foreground text-center pt-2 border-t">
                  <p>• Instant confirmation</p>
                  <p>• Secure payment</p>
                  <p>• 24/7 support</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;