import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { EnhancedButton } from '../components/ui/enhanced-button';
import { Appointment } from '../types';
import { Calendar, Clock, User, MapPin, DollarSign, FileText } from 'lucide-react';

const Appointments: React.FC = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load appointments from localStorage (simulating database)
    const loadAppointments = () => {
      try {
        const savedAppointments = localStorage.getItem('user_appointments');
        if (savedAppointments) {
          const parsedAppointments = JSON.parse(savedAppointments);
          // Filter appointments for current user
          const userAppointments = parsedAppointments.filter(
            (apt: Appointment) => apt.patientEmail === user?.email
          );
          setAppointments(userAppointments);
          console.log('Loaded user appointments:', userAppointments);
        }
      } catch (error) {
        console.error('Error loading appointments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      loadAppointments();
    }
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-success text-success-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'cancelled':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  const formatTime = (timeString: string) => {
    return timeString || 'Time not specified';
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
        <Navbar />
        <div className="max-w-4xl mx-auto p-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">Please log in to view your appointments.</p>
          <EnhancedButton variant="medical" onClick={() => window.location.href = '/login'}>
            Sign In
          </EnhancedButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-accent/5">
      <Navbar />
      <div className="max-w-6xl mx-auto p-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Appointments</h1>
          <p className="text-muted-foreground">
            Manage your upcoming and past medical appointments
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading appointments...</p>
          </div>
        ) : appointments.length === 0 ? (
          <Card className="text-center shadow-medium">
            <CardContent className="p-12">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No Appointments Yet</h3>
              <p className="text-muted-foreground mb-6">
                You haven't booked any appointments yet. Browse our doctors and book your first consultation.
              </p>
              <EnhancedButton variant="medical" onClick={() => window.location.href = '/'}>
                Browse Doctors
              </EnhancedButton>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <Card className="text-center shadow-soft">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-primary">{appointments.length}</div>
                  <div className="text-sm text-muted-foreground">Total Appointments</div>
                </CardContent>
              </Card>
              <Card className="text-center shadow-soft">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-success">
                    {appointments.filter(apt => apt.status === 'confirmed').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Confirmed</div>
                </CardContent>
              </Card>
              <Card className="text-center shadow-soft">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-warning">
                    {appointments.filter(apt => apt.status === 'pending').length}
                  </div>
                  <div className="text-sm text-muted-foreground">Pending</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-6">
              {appointments.map((appointment) => (
                <Card key={appointment.id} className="shadow-medium hover:shadow-large transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center text-lg">
                          <User className="w-5 h-5 mr-2 text-primary" />
                          Appointment with {appointment.doctorName || 'Doctor'}
                        </CardTitle>
                        <p className="text-primary font-medium mt-1">
                          {appointment.specialization || 'Medical Consultation'}
                        </p>
                      </div>
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status?.charAt(0).toUpperCase() + appointment.status?.slice(1) || 'Confirmed'}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-3 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{formatDate(appointment.date)}</p>
                          <p className="text-sm text-muted-foreground">Appointment Date</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-3 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{formatTime(appointment.time)}</p>
                          <p className="text-sm text-muted-foreground">Time Slot</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-3 text-success" />
                        <div>
                          <p className="font-medium text-success">${appointment.fees || 'N/A'}</p>
                          <p className="text-sm text-muted-foreground">Consultation Fee</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-3 text-muted-foreground" />
                        <div>
                          <p className="font-medium">In-Person Visit</p>
                          <p className="text-sm text-muted-foreground">Visit Type</p>
                        </div>
                      </div>
                    </div>
                    
                    {appointment.reason && (
                      <div className="flex items-start pt-2 border-t">
                        <FileText className="w-4 h-4 mr-3 text-muted-foreground mt-1" />
                        <div>
                          <p className="font-medium mb-1">Reason for Visit</p>
                          <p className="text-sm text-muted-foreground">{appointment.reason}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="text-xs text-muted-foreground">
                        Booked on: {formatDate(appointment.createdAt)}
                      </div>
                      <div className="flex space-x-2">
                        {appointment.status === 'confirmed' && (
                          <EnhancedButton variant="outline" size="sm">
                            Reschedule
                          </EnhancedButton>
                        )}
                        <EnhancedButton 
                          variant={appointment.status === 'cancelled' ? 'secondary' : 'destructive'} 
                          size="sm"
                          disabled={appointment.status === 'cancelled'}
                        >
                          {appointment.status === 'cancelled' ? 'Cancelled' : 'Cancel'}
                        </EnhancedButton>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;