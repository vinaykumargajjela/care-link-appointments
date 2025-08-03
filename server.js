const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for demo (in production, use a database)
let appointments = [];
let users = [];

// API Routes

// Get all doctors
app.get('/api/doctors', (req, res) => {
  console.log('GET /api/doctors - Fetching all doctors');
  
  // Mock doctors data (in production, this would come from a database)
  const doctors = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      specialization: 'General Medicine',
      experience: 8,
      rating: 4.8,
      reviews: 127,
      location: 'Downtown Medical Center',
      fees: 150,
      available: true
    },
    {
      id: '2',
      name: 'Dr. James Wilson',
      specialization: 'Cardiologist',
      experience: 15,
      rating: 4.9,
      reviews: 203,
      location: 'Heart Care Institute',
      fees: 300,
      available: true
    }
    // Add more doctors as needed
  ];

  res.json({
    success: true,
    data: doctors,
    message: 'Doctors fetched successfully'
  });
});

// Book appointment
app.post('/api/appointments', (req, res) => {
  console.log('POST /api/appointments - Booking appointment');
  console.log('Request body:', req.body);

  const {
    doctorId,
    doctorName,
    specialization,
    patientName,
    patientEmail,
    patientPhone,
    selectedSlot,
    reason,
    fees
  } = req.body;

  // Validation
  if (!doctorId || !patientName || !patientEmail || !selectedSlot) {
    console.log('Validation failed - Missing required fields');
    return res.status(400).json({
      success: false,
      message: 'Missing required fields'
    });
  }

  // Create appointment
  const appointment = {
    id: `APT-${Date.now()}`,
    doctorId,
    doctorName,
    specialization,
    patientName,
    patientEmail,
    patientPhone,
    selectedSlot,
    reason: reason || 'General consultation',
    fees,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
    appointmentDate: new Date().toISOString()
  };

  // Store appointment (in production, save to database)
  appointments.push(appointment);

  console.log('Appointment created successfully:', appointment);
  console.log('Total appointments in system:', appointments.length);

  res.status(201).json({
    success: true,
    data: appointment,
    message: 'Appointment booked successfully'
  });
});

// Get user appointments
app.get('/api/appointments/:userId', (req, res) => {
  const { userId } = req.params;
  console.log(`GET /api/appointments/${userId} - Fetching user appointments`);

  const userAppointments = appointments.filter(apt => 
    apt.patientEmail === userId || apt.patientId === userId
  );

  console.log(`Found ${userAppointments.length} appointments for user`);

  res.json({
    success: true,
    data: userAppointments,
    message: 'Appointments fetched successfully'
  });
});

// User registration
app.post('/api/auth/register', (req, res) => {
  console.log('POST /api/auth/register - User registration');
  console.log('Request body:', req.body);

  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields'
    });
  }

  // Check if user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(409).json({
      success: false,
      message: 'User already exists'
    });
  }

  // Create user
  const user = {
    id: `USER-${Date.now()}`,
    name,
    email,
    phone,
    createdAt: new Date().toISOString()
  };

  users.push(user);

  console.log('User registered successfully:', user);

  res.status(201).json({
    success: true,
    data: user,
    message: 'User registered successfully'
  });
});

// User login
app.post('/api/auth/login', (req, res) => {
  console.log('POST /api/auth/login - User login');
  console.log('Request body:', req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Email and password are required'
    });
  }

  // Find user (in production, verify password hash)
  const user = users.find(user => user.email === email);
  
  if (!user) {
    // For demo purposes, create a user if not found
    const newUser = {
      id: `USER-${Date.now()}`,
      name: email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email,
      phone: '+1 (555) 123-4567',
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    console.log('User created during login:', newUser);
    
    return res.json({
      success: true,
      data: newUser,
      message: 'Login successful'
    });
  }

  console.log('User login successful:', user);

  res.json({
    success: true,
    data: user,
    message: 'Login successful'
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  console.log('GET /api/health - Health check');
  res.json({
    success: true,
    message: 'HealthCare Connect API is running',
    timestamp: new Date().toISOString(),
    stats: {
      totalAppointments: appointments.length,
      totalUsers: users.length
    }
  });
});

// Get system stats
app.get('/api/stats', (req, res) => {
  console.log('GET /api/stats - System statistics');
  
  const stats = {
    totalAppointments: appointments.length,
    totalUsers: users.length,
    appointmentsToday: appointments.filter(apt => {
      const today = new Date().toDateString();
      return new Date(apt.createdAt).toDateString() === today;
    }).length,
    recentAppointments: appointments.slice(-5)
  };

  console.log('System stats:', stats);

  res.json({
    success: true,
    data: stats,
    message: 'Statistics fetched successfully'
  });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log('=================================');
  console.log('🏥 HealthCare Connect API Server');
  console.log('=================================');
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📋 API Base URL: http://localhost:${PORT}/api`);
  console.log(`📊 Health Check: http://localhost:${PORT}/api/health`);
  console.log('=================================');
  console.log('Available Endpoints:');
  console.log('  GET  /api/health');
  console.log('  GET  /api/doctors');
  console.log('  GET  /api/stats');
  console.log('  POST /api/appointments');
  console.log('  GET  /api/appointments/:userId');
  console.log('  POST /api/auth/login');
  console.log('  POST /api/auth/register');
  console.log('=================================');
});

module.exports = app;