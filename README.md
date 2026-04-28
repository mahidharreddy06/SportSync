# SportSync: Sports Tournament Management System

**Live Demo**: [https://sportsync-delta.vercel.app/](https://sportsync-delta.vercel.app/)

SportSync is a comprehensive MERN-stack application designed for the professional administration and coordination of sports tournaments. The platform facilitates a streamlined workflow for organizers to create events, manage match scheduling, and maintain real-time scoring, while providing athletes with a unified interface for team registration and performance tracking.

---

## Technical Specifications

### Authentication and Security
- **Google OAuth 2.0 Integration**: Authentication is exclusively handled via Google OAuth to ensure secure and verified user access.
- **Role-Based Access Control**: Users are categorized into 'Athlete' or 'Organizer' roles upon initial registration, dictating their permissions within the system.

### Tournament Administration
- **Event Creation**: Authorized users can initialize tournaments, specifying sport types and competitive formats.
- **Organizer Authority**: Tournament creators possess exclusive administrative rights to:
  - Coordinate match schedules between participating teams.
  - Oversee real-time score updates and match status transitions (Scheduled, Ongoing, Completed).
- **Team Management**: Scalable registration system allowing participants to enroll teams and manage roster details.

### Interface and Experience
- **Administrative Console**: A personalized dashboard for monitoring authorized events and system-wide statistics.
- **Global Arena**: A centralized view of all active and upcoming matches across the platform.
- **Dynamic Data Visualization**: Real-time standings and schedules generated through dynamic database queries.

### System Configuration
- **Profile Management**: Profile oversight integrated with Google account data.
- **Interface Customization**: Options for theme selection and notification management.

---

## Technology Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Lucide Icons, Wouter, Axios, Sonner.
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT.
- **Authentication**: Google OAuth 2.0.

---

## Project Structure

```text
SportSync/
├── backend/            # Express server and MongoDB integration
│   ├── src/routes/     # API endpoint definitions
│   └── src/models/     # Database schema definitions
├── frontend/           # React frontend application
│   ├── src/pages/      # View components
│   └── src/components/ # Reusable UI architecture
├── videos/             # Project demonstration and overview videos
├── start_mern.bat      # Local environment initialization script
└── git_push.bat        # Automated repository synchronization script
```

---

## Installation and Deployment

### 1. Repository Initialization
Clone the repository to your local environment:
```bash
git clone <repository-link>
```

### 2. Environment Configuration

#### Backend (.env or Render.com Environment Variables)
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
```

#### Frontend (Vercel.com Environment Variables)
```env
VITE_API_URL=your_deployed_backend_url (e.g., https://sportsync-api.onrender.com)
```

### 3. Dependency Management
Install the necessary packages for both subsystems:
```bash
# Backend dependencies
cd backend && npm install

# Frontend dependencies
cd ../frontend && npm install
```

### 4. System Execution
Execute the initialization script from the root directory:
```bash
start_mern.bat
```

---

## Project Submission Documentation

- **Technical Explanation Video**: [Link to be provided]
- **Operational Overview Video**: [Link to be provided]
- **Source Code Repository**: https://github.com/mahidharreddy06/SportSync

---

### Acknowledgments
**Mahi Reddy** - Lead Developer, SportSync Platform

*Developed for the Smartbridge/SportSync Final Project Evaluation.*
