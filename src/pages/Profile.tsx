import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { EnhancedButton } from '../components/ui/enhanced-button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { User, Mail, Phone, Calendar, Clock, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  // Get user appointments from localStorage
  const getUserAppointments = () => {
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    return appointments.filter((apt: any) => apt.patientEmail === user?.email);
  };

  const userAppointments = getUserAppointments();

  const handleSave = () => {
    // In a real app, this would update the user data via API
    console.log('Updating user profile:', formData);
    setIsEditing(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <Card className="w-full max-w-md">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">Please log in to view your profile.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      <Navbar />
      <div className="max-w-4xl mx-auto p-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <Card className="shadow-large">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">{user.name}</h2>
                    <p className="text-muted-foreground">Patient</p>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Full Name
                    </Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                      />
                    ) : (
                      <p className="text-foreground font-medium">{user.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center">
                      <Mail className="w-4 h-4 mr-2" />
                      Email Address
                    </Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                      />
                    ) : (
                      <p className="text-foreground font-medium">{user.email}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center">
                      <Phone className="w-4 h-4 mr-2" />
                      Phone Number
                    </Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                      />
                    ) : (
                      <p className="text-foreground font-medium">{user.phone}</p>
                    )}
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  {isEditing ? (
                    <>
                      <EnhancedButton onClick={handleSave} variant="medical">
                        Save Changes
                      </EnhancedButton>
                      <EnhancedButton 
                        onClick={() => setIsEditing(false)} 
                        variant="outline"
                      >
                        Cancel
                      </EnhancedButton>
                    </>
                  ) : (
                    <EnhancedButton onClick={() => setIsEditing(true)} variant="outline">
                      Edit Profile
                    </EnhancedButton>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Appointments Summary */}
          <div className="lg:col-span-1">
            <Card className="shadow-large">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Recent Appointments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {userAppointments.length === 0 ? (
                  <p className="text-muted-foreground text-center py-4">
                    No appointments scheduled
                  </p>
                ) : (
                  userAppointments.slice(0, 3).map((appointment: any) => (
                    <div key={appointment.id} className="p-3 border border-border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-sm">{appointment.doctorName}</h4>
                        <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}>
                          {appointment.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {appointment.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {appointment.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {appointment.specialization}
                        </div>
                      </div>
                    </div>
                  ))
                )}
                
                {userAppointments.length > 0 && (
                  <EnhancedButton 
                    variant="outline" 
                    className="w-full mt-4"
                    onClick={() => window.location.href = '/appointments'}
                  >
                    View All Appointments
                  </EnhancedButton>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;