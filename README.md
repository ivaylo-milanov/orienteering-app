# Orienteering Events Website

This project is a web application for managing orienteering events, allowing users to browse, filter, add, edit, and delete events. It also includes authentication features such as login, registration, and logout. The application is built with **React**, styled using **Tailwind CSS & Tailwind UI**, and uses the **SoftUni Practice Server** as the backend.

## Features

- **Home Page**: Displays the latest events.
- **Event Management**:
  - List all events with **pagination**.
  - **Filter** events based on different criteria.
  - **View details** of each event.
  - **Create**, **edit**, and **delete** events (for authorized users).
- **Authentication**:
  - Register new users.
  - Login and logout functionality.
  - Secure routes for managing events.

## Technologies Used

- **Frontend**:
  - React
  - React Router
  - Tailwind CSS
  - Tailwind UI

- **Backend**:
  - SoftUni Practice Server

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/orienteering-app.git
   cd orienteering-app
   ```

2. **Install dependencies:**
   ```bash
   cd client
   npm install
   ```

3. **Run the server:**
   ```bash
   cd server
   node server
   ```
4. **Run the client:**
   ```bash
   cd client
   npm run dev
   ```

## API Endpoints (SoftUni Practice Server)

- **Authentication**:
  - `POST /users/register` - Register a new user
  - `POST /users/login` - Login user
  - `GET /users/logout` - Logout user

- **Events**:
  - `GET /data/events` - Get all events
  - `GET /data/events/:id` - Get event details
  - `POST /data/events` - Create an event
  - `PUT /data/events/:id` - Edit an event
  - `DELETE /data/events/:id` - Delete an event