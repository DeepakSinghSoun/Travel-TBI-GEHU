## WEEK - 1

# Forum Introduction Post

Hello everyone,

My name is Deepak Singh Soun. My project is StayNest – AI-Powered Travel & Homestay Platform.

One-Line Pitch:
A full-stack web application that helps travelers discover homestays, connect with hosts, and generate personalized travel plans using AI.

Tech Stack:
React.js, Tailwind CSS, Node.js, Express.js, MongoDB, JWT Authentication, Gemini API, Vercel, and Render.

One technical challenge I anticipate is designing an efficient booking workflow while integrating the AI trip planner feature. I also expect challenges in managing user authentication, property listings, and ensuring smooth communication between the frontend, backend, database, and Gemini API.

Looking forward to learning and collaborating with everyone throughout the internship.

# W1_ProjectBrief_[InternID].pdf

App Name: StayNest – AI-Powered Travel & Homestay Platform

One-Line Pitch:
A full-stack platform that helps travelers discover, book, and plan personalized homestay experiences with AI-powered travel assistance.

Target User:
StayNest is designed for travelers, students, backpackers, families, and remote workers looking for affordable and comfortable homestay accommodations. It also serves property owners who want to showcase their homes online and manage booking requests efficiently through a simple digital platform.

Core Features (3–5):
• User Authentication – Secure registration, login, and profile management using JWT authentication.
• Homestay Listings – Browse detailed property listings with images, pricing, amenities, and location information.
• Search and Filters – Search properties by city and filter results based on budget, amenities, and ratings.
• Booking Request System – Allow travelers to send booking requests and receive responses from hosts.
• Host Dashboard – Enable property owners to add, edit, and manage listings and booking requests.

AI Feature:
AI Trip Planner powered by the Gemini API. Users can enter their destination, budget, and trip duration to generate a personalized travel itinerary, recommended attractions, local food suggestions, and estimated travel expenses. Gemini is chosen for its strong text-generation capabilities and developer-friendly API integration.

Tech Stack:
Frontend: React.js
Styling: Tailwind CSS
Backend: Express.js
Database: MongoDB
Authentication: JWT
Deployment: Vercel (Frontend) and Render (Backend)

# GitHub Repository
https://github.com/DeepakSinghSoun/Travel-TBI-GEHU.git

# Forum Introduction Post
TBI-GEU LMS → Cohort Introductions Forum


# For your GitHub repository, create:

StayNest/
│
├── frontend/
│   └── .gitkeep
│
├── backend/
│   └── .gitkeep
│
├── README.md
├── .gitignore


# README.md

`StayNest`

AI-Powered Travel & Homestay Platform

StayNest helps travelers discover homestays, send booking requests, and generate personalized travel itineraries using AI.

`Tech Stack`

* React.js
* Tailwind CSS
* Node.js
* Express.js
* MongoDB Atlas
* JWT Authentication
* Gemini API
* Vercel & Render

`Setup`

Setup — coming soon.


## WEEK - 2

frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── PropertyCard.jsx
│   │   └── Footer.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Listings.jsx
│   │   ├── Login.jsx
│   │   └── Dashboard.jsx
│   │
│   ├── App.jsx
│   └── main.jsx


# README.md 

`StayNest`

AI-Powered Travel & Homestay Platform

StayNest helps travelers discover homestays, send booking requests, and generate personalized travel itineraries using AI.

`Project Overview`

StayNest is a full-stack travel and homestay platform designed for travelers seeking unique accommodations and property owners looking to manage listings efficiently. The platform aims to simplify travel planning through an intuitive booking experience and AI-assisted trip recommendations.

`Tech Stack`

* Frontend
React.js
React Router DOM
Tailwind CSS

* Backend
Node.js
Express.js

* Database
MongoDB Atlas

* Authentication
JWT Authentication

* AI Integration
Google Gemini API

* Deployment
Vercel (Frontend)
Render (Backend)

`Development Progress`
`Week 1 – Project Planning & Repository Setup`

`Completed:`

* Finalized project idea: StayNest
* Prepared and submitted Project Brief
* Created GitHub repository
* Added README.md
* Configured .gitignore
* Created frontend and backend project structure
* Made initial repository commits
* Posted introduction on internship forum

`Repository Structure:`

StayNest/
├── frontend/
├── backend/
├── README.md
└── .gitignore


`Week 2 – Frontend Skeleton Development`

`Completed:`

* Set up React application
* Configured Tailwind CSS
* Created reusable Navbar component
* Created Hero section
* Created Property Card component
* Created Footer component
* Implemented routing
* Built Home page
* Built Listings page
* Built Login page
* Built Dashboard page
* Implemented responsive layout

`Current Features:`

* Responsive Navigation Bar
* Hero Banner
* Reusable Property Cards
* Footer Section
* Multi-Page Routing
* Mobile-Friendly UI
* Planned Features
* User Registration & Login
* Homestay Listings Management
* Search & Filters
* Booking Request System
* Host Dashboard
* AI Trip Planner
* User Profile Management

`Project Structure`

frontend/
├── src/
│ ├── components/
│ ├── pages/
│ ├── App.jsx
│ └── main.jsx

backend/
└── (Coming Soon)

## Week 3 – React State & Forms

`Completed:`

* Added state management using React Hooks
* Created login form UI
* Created registration form UI
* Built property search form
* Added search and filter functionality (frontend)
* Implemented controlled form inputs
* Added reusable Button component
* Added Loader component  
* Added Toast notification component  ` In Progress`
* Managed application state with useState
* Organized reusable utility functions

`Current Features:`

* Interactive Forms
* Search and Filter UI
* Loading Indicators
* Toast Notifications
* Component-based Architecture
* Responsive User Interface

`Planned Features:`

* Express.js backend
* REST APIs
* API integration
* CRUD operations
* Database connectivity
* Authentication


## Week 4 – Backend & API Development

`Completed:`

* Initialized Express.js backend
* Configured Express server
* Installed Express, CORS, dotenv, and Nodemon
* Created backend folder structure
* Configured environment variables
* Implemented REST API endpoints
* Added CRUD operations for homestays
* Implemented search endpoint
* Added error-handling middleware
* Tested APIs using Postman
* Exported Postman collection
* Connected frontend to backend
* Replaced mock data with live API data
* Configured CORS
* Implemented loading and error states

`Current Features:`

* Express.js Backend
* RESTful API
* CRUD Operations
* Search API
* Live Frontend-Backend Communication
* Error Handling
* Environment Configuration
* Postman Tested APIs

`Planned Features:`

* MongoDB Integration
* User Authentication
* Booking APIs
* AI Integration
* Secure Routes

# Week 5 - Database Integration (Full Stack Web Development)

`Completed:`

* Set up MongoDB Atlas database (M0 free tier)
* Created and configured database cluster
* Installed and configured Mongoose ODM
* Established secure MongoDB connection using dotenv
* Designed database schema for core entities (User / Homestay / Task)
* Created Mongoose models for data structure
* Migrated from in-memory storage to MongoDB
* Refactored all REST API endpoints to use database
* Implemented full CRUD operations using Mongoose
* Updated Create API to store data persistently
* Updated Read API to fetch live database data
* Updated Update API with findByIdAndUpdate
* Updated Delete API with findByIdAndDelete
* Verified data persistence after server restart
* Tested all APIs using Postman with database integration
* Updated frontend to consume database-driven APIs
* Fixed async/await issues in backend controllers
* Improved error handling for database operations
* Secured environment variables using .env and .env.example
* Verified end-to-end frontend → backend → database flow

---

`Current Features:`

* MongoDB Atlas Database Integration
* Mongoose ODM for schema modeling
* Full CRUD operations (Create, Read, Update, Delete)
* Persistent data storage (no data loss on refresh)
* RESTful API architecture
* Frontend-Backend-Database integration
* Search functionality (if applicable)
* Error handling middleware
* Environment-based configuration
* Postman-tested API endpoints

---

`Planned Features:`

* User Authentication (JWT-based login system)
* Role-based access control (Admin/User)
* Advanced filtering and pagination
* Booking / Feedback enhancement module
* Data validation and sanitization improvements
* API rate limiting and security hardening
* Deployment (Render / Vercel / Railway)
* Logging system for backend monitoring


`Setup`

Installation and setup instructions will be added as development progresses.

`Status`

🚧 Currently in Development

✅ Week 1 Completed

✅ Week 2 Completed

⏳ Week 3 In Progress


Frontend
│
├── User
│   ├── Home
│   ├── Listings
│   ├── Trip Planner
│   ├── Dashboard
│   ├── Profile
│   └── Booking History
│
├── Admin
│   ├── Dashboard
│   ├── Manage Users
│   ├── Manage Homestays
│   ├── Manage Bookings
│   └── Analytics
│
└── Shared
    ├── Login
    ├── Register
    └── Navbar


✅ Authentication
✅ JWT
✅ Protected Routes
✅ MongoDB
✅ Trips
✅ Profile
✅ Booking Backend
✅ Booking History
✅ Admin Dashboard
⬜ Homestay CRUD
⬜ Image Upload
⬜ Booking Approval
⬜ Payments
⬜ Email
⬜ AI Trip Planner
⬜ Deployment

1. Edit Homestay ✅
2. Trip CRUD
3. Booking CRUD
4. Booking Approval
5. User Management
6. Image Upload
7. Search & Filter
8. Payments
9. Emails
10. Charts


Travel-TBI-GEHU/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── bookingController.js
│   │   ├── adminController.js
│   │   ├── homestayController.js
│   │   └── tripController.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── adminMiddleware.js
│   │   └── validate.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Booking.js
│   │   ├── Homestay.js
│   │   └── Trip.js
│   │
│   ├── seed/
|   |   └── homestaySeed.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── tripRoutes.js
│   │   ├── adminRoutes.js
│   │   ├── homestayRoutes.js
│   │   └── bookingRoutes.js
│   │
│   ├── validations/
│   │   ├── authValidation.js
│   │   ├── BookingValidation.js
│   │   └── tripValidation.js
│   │
│   ├── index.js
│   ├── package.json
│   ├── package-lock.json
│   ├── node_modules
│   ├── .gitignore
│   └── .env
│
│
├── frontend/
│   ├── src/
│   │   ├── api.js
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── App.js
│   │   ├── index.css
│   │   │
│   │   ├── components/
│   │   │   ├── Button.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── HeroBanner.jsx
│   │   │   ├── Loader.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PropertyCard.jsx
│   │   │   ├── PropertySearch.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── Toast.jsx
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── data/
│   │   │   └── properties.js
│   │   │
│   │   ├── pages/
|   |   |   ├── admin/
|   |   |   |   └── AdminDashboard.jsx
|   |   |   |
│   │   │   ├── Home.jsx
│   │   │   ├── Listings.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── TripPlanner.jsx
│   │   │   ├── UserDashboard.jsx
│   │   │   ├── BookingRequest.jsx
│   │   │   ├── HomestayDetails.jsx
│   │   │   └── HomestayManagement.jsx
│   │   │
│   │   ├── utils/
│   │   │   ├── filterProperties.js
│   │   │   ├── formatCurrency.js
│   │   │   ├── formatDate.js
│   │   │   └── validators.js
│   │   |
│   │   └── assets
│   │
│   ├── package.json
│   ├── dist
│   ├── node_modules
│   ├── public
│   ├── .gitignore
│   ├── .oxlintrc.json
│   ├── package-lock.json
│   ├── README.md
│   ├── vite.config.js (implied)
│   └── index.html (implied)
│
├── .gitignore
├── .github
├── package-lock.json
├── package.json
└── README.md (optional)


Travel-TBI-GEHU/
│
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── cloudinary.js                (Later)
│   │
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   ├── bookingController.js
│   │   ├── homestayController.js
│   │   ├── tripController.js
│   │   └── userController.js            (Later)
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── adminMiddleware.js
│   │   ├── uploadMiddleware.js          (Later)
│   │   ├── validate.js
│   │   └── errorMiddleware.js           (Later)
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Booking.js
│   │   ├── Homestay.js
│   │   ├── Trip.js
│   │   └── Review.js                    (Later)
│   │
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── homestayRoutes.js
│   │   ├── tripRoutes.js
│   │   └── userRoutes.js                (Later)
│   │
│   ├── validations/
│   │   ├── authValidation.js
│   │   ├── bookingValidation.js
│   │   ├── homestayValidation.js        (Later)
│   │   ├── tripValidation.js
│   │   └── userValidation.js            (Later)
│   │
│   ├── services/                        (Later)
│   │   ├── bookingService.js
│   │   ├── tripService.js
│   │   └── authService.js
│   │
│   ├── utils/
│   │   ├── generateToken.js
│   │   ├── calculatePrice.js
│   │   ├── sendEmail.js                 (Later)
│   │   └── logger.js                    (Later)
│   │
│   ├── seed/
│   │   ├── homestaySeed.js
│   │   └── tripSeed.js
│   │
│   ├── uploads/                         (Later)
│   │
│   ├── index.js
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
│
├── frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── api/
│   │   │   ├── axios.js
│   │   │   ├── authApi.js
│   │   │   ├── bookingApi.js
│   │   │   ├── homestayApi.js
│   │   │   ├── tripApi.js
│   │   │   └── adminApi.js
│   │   |
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   └── logo/
│   │   |
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Button.jsx
│   │   │   │   ├── Loader.jsx
│   │   │   │   ├── Toast.jsx
│   │   │   │   ├── Modal.jsx
│   │   │   │   ├── Input.jsx
│   │   │   │   └── Card.jsx
│   │   │   │
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── HeroBanner.jsx
│   │   │   │   └── PageLayout.jsx
│   │   │   │
│   │   │   ├── admin/
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   ├── Topbar.jsx
│   │   │   │   ├── StatCard.jsx
│   │   │   │   ├── AdminLayout.jsx
│   │   │   │   ├── UserTable.jsx
│   │   │   │   ├── BookingTable.jsx
│   │   │   │   ├── TripTable.jsx
│   │   │   │   └── HomestayTable.jsx
│   │   │   │
│   │   │   └── homestay/
│   │   │       ├── PropertyCard.jsx
│   │   │       ├── PropertySearch.jsx
│   │   │       └── BookingCard.jsx
│   │   |
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   |
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useBookings.js
│   │   │   └── useTrips.js
│   │   |
│   │   ├── layouts/
│   │   │   ├── AdminLayout.jsx
│   │   │   └── UserLayout.jsx
│   │   |
│   │   ├── pages/
│   │   │   |
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   │
│   │   │   ├── admin/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── Users.jsx
│   │   │   │   ├── Bookings.jsx
│   │   │   │   ├── Trips.jsx
│   │   │   │   ├── Homestays.jsx
│   │   │   │   ├── Reviews.jsx
│   │   │   │   └── Settings.jsx
│   │   │   │
│   │   │   ├── user/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── Profile.jsx
│   │   │   │   ├── BookingHistory.jsx
│   │   │   │   ├── Wishlist.jsx
│   │   │   │   └── MyTrips.jsx
│   │   │   │
│   │   │   ├── homestay/
│   │   │   │   ├── Listings.jsx
│   │   │   │   ├── HomestayDetails.jsx
│   │   │   │   ├── BookingRequest.jsx
│   │   │   │   └── HomestayManagement.jsx
│   │   │   │
│   │   │   ├── trip/
│   │   │   │   └── TripPlanner.jsx
│   │   │   │
│   │   │   └── Home.jsx
│   │   |
│   │   ├── routes/
│   │   │   ├── AdminRoute.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── PublicRoute.jsx
│   │   |
│   │   ├── utils/
│   │   │   ├── filterProperties.js
│   │   │   ├── formatCurrency.js
│   │   │   ├── formatDate.js
│   │   │   ├── validators.js
│   │   │   └── constants.js
│   │   |
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── .github/
├── .gitignore
├── package.json
├── package-lock.json
└── README.md