# 🏥 HealthCare Connect - Appointment Booking System


**🔗 [Live Demo →](https://care-link-appointments.vercel.app/)**

A modern, full-stack healthcare appointment booking application built with React, TypeScript, Node.js, and Express.

## 🚀 Features

- **User Authentication** - Secure login and registration system
- **Doctor Directory** - Browse and search healthcare professionals
- **Real-time Booking** - Book appointments with available time slots
- **Professional UI** - Clean, medical-themed design system
- **Responsive Design** - Works seamlessly on all devices
- **Backend API** - Full Node.js/Express backend with data logging
- **Search & Filter** - Find doctors by specialization and availability

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Shadcn/ui** components
- **React Router** for navigation
- **React Query** for state management
- **Vite** for development and building

### Backend
- **Node.js** with Express
- **CORS** enabled for frontend communication
- **JSON** data storage (easily replaceable with database)
- **RESTful API** design

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Servers

#### Option A: Start Both Frontend and Backend (Recommended)
```bash
npm run dev
```
This will start:
- Frontend on http://localhost:8080
- Backend API on http://localhost:3001

#### Option B: Start Individually
```bash
# Terminal 1 - Backend API
npm run server

# Terminal 2 - Frontend
npm run client
```

### 3. Access the Application
- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:3001/api
- **Health Check**: http://localhost:3001/api/health

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Doctors
- `GET /api/doctors` - Get all doctors

### Appointments
- `POST /api/appointments` - Book appointment
- `GET /api/appointments/:userId` - Get user appointments

### System
- `GET /api/health` - Health check
- `GET /api/stats` - System statistics

## 🔍 Testing the Application

### 1. Registration/Login
- Visit http://localhost:8080
- Click "Get Started" or "Sign In"
- Register with any email/password or login
- Check browser console for authentication logs

### 2. Browse Doctors
- Use search and filter functionality
- View doctor profiles with detailed information
- Check availability status

### 3. Book Appointments
- Select a doctor and click "Book Now"
- Choose available time slots
- Fill in patient information
- Submit booking and check console/network tabs

### 4. Monitor Backend
- Check backend console for API logs
- Visit http://localhost:3001/api/health for status
- Monitor network tab in browser for API calls

## 📊 Data Logging

The application logs comprehensive data to both:
- **Browser Console** - User actions and responses
- **Backend Console** - API requests and database operations
- **Network Tab** - All HTTP requests and responses

## 🏗️ Project Structure

```
healthcare-booking-system/
├── src/
│   ├── components/        # Reusable UI components
│   ├── contexts/         # React contexts (Auth)
│   ├── data/            # Mock data and constants
│   ├── pages/           # Page components
│   ├── types/           # TypeScript interfaces
│   ├── assets/          # Images and static files
│   └── lib/             # Utility functions
├── server.js            # Node.js backend server
├── public/              # Static assets
└── package.json         # Dependencies and scripts
```

## 🎨 Design System

The application uses a professional medical design system with:
- **Medical Blue Primary** (#3b82f6)
- **Healing Green Accent** (#059669)
- **Professional Typography**
- **Subtle Shadows and Gradients**
- **Responsive Grid Layouts**

## 🔧 Production Deployment

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Environment Variables
Set these for production:
- `NODE_ENV=production`
- `PORT=3000` (or your preferred port)

## 📱 Features in Detail

### Authentication System
- Secure login/registration with form validation
- User session management with localStorage
- Protected routes and user context

### Doctor Management
- Professional doctor profiles with photos
- Specialization categories and filtering
- Experience, ratings, and reviews display
- Real-time availability status

### Appointment Booking
- Time slot selection with visual feedback
- Patient information forms with validation
- Booking confirmation and success messages
- Fee calculation and payment summary

### Search & Filter
- Real-time search across doctor names and specializations
- Filter by specialization and availability
- Results counter and clear filters option

## 🛡️ Security Features

- Input validation on both frontend and backend
- CORS configuration for secure API access
- Environment-based configuration
- Error handling and logging

## 🔮 Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- Email notifications and confirmations
- Payment gateway integration
- Video consultation features
- Admin panel for doctor management
- Advanced scheduling and calendar integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the browser console for detailed logs
- Monitor the backend console for API issues
- Verify network requests in browser dev tools

---

**Built with ❤️ for modern healthcare management**
