import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Doctor } from '../types';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { EnhancedButton } from './ui/enhanced-button';
import { Star, MapPin, Clock, DollarSign } from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden hover:shadow-large transition-all duration-300 transform hover:-translate-y-1 bg-gradient-card">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="relative">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-20 h-20 rounded-full object-cover border-3 border-primary/20 shadow-soft"
            />
            <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
              doctor.available ? 'bg-success' : 'bg-muted-foreground'
            }`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground truncate">
                  {doctor.name}
                </h3>
                <p className="text-primary font-medium">{doctor.specialization}</p>
              </div>
              <Badge variant={doctor.available ? "default" : "secondary"} className="ml-2">
                {doctor.available ? 'Available' : 'Busy'}
              </Badge>
            </div>
            
            <div className="mt-3 space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
                <span className="font-medium">{doctor.rating}</span>
                <span className="mx-1">•</span>
                <span>{doctor.reviews} reviews</span>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-2" />
                <span>{doctor.experience} years experience</span>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mr-2" />
                <span className="truncate">{doctor.location}</span>
              </div>
              
              <div className="flex items-center text-sm text-success font-medium">
                <DollarSign className="w-4 h-4 mr-1" />
                <span>${doctor.fees} per consultation</span>
              </div>
            </div>
            
            <div className="mt-4 flex space-x-2">
              <EnhancedButton
                variant="outline"
                size="sm"
                onClick={() => navigate(`/doctor/${doctor.id}`)}
                className="flex-1"
              >
                View Profile
              </EnhancedButton>
              <EnhancedButton
                variant="medical"
                size="sm"
                onClick={() => navigate(`/book/${doctor.id}`)}
                disabled={!doctor.available}
                className="flex-1"
              >
                Book Now
              </EnhancedButton>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;