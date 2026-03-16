# CookMate 🍳

**CookMate** is a modern, full-stack MERN application designed for food enthusiasts to discover, save, and track their favorite recipes. Powered by the Spoonacular API, it offers a premium user experience with a focus on speed, security, and aesthetics.

---

## 🌟 Key Features

### 🔍 Recipe Discovery
- **Real-time Search**: Search through thousands of recipes by ingredients, categories, or names.
- **Recipe Details**: Comprehensive view of ingredients, instructions, and preparation time.

### 🔐 Secure Authentication
- **JWT-based Auth**: Secure login and signup using HttpOnly cookies for session management.
- **OTP Password Reset**: Robust password recovery system integrated with **Resend API**.
- **Auto-Verification**: Smart user verification logic that marks accounts as verified upon successful authentication or recovery.

### 👤 Personalized Experience
- **Favorites**: Save your must-try recipes with a single click.
- **Recently Viewed**: Automatically tracks your viewed recipes in a searchable history.
- **Modern UI**: Full Dark Mode support with smooth micro-animations powered by **Framer Motion**.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React](https://reactjs.org/) (Vite)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **API Client**: Axios with custom interceptors.
- **Notifications**: React Hot Toast.

### Backend
- **Environment**: [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) (Mongoose ODM)
- **Email Service**: [Resend](https://resend.com/) for OTP delivery.
- **Security**: bcryptjs for hashing, JWT for token management, and Cookie-parser for secure transport.

---

## 📂 Project Structure

```text
├── backend/            # Express server, MongoDB models, & API routes
│   ├── src/
│   │   ├── controllers/ # Logic for Auth, OTP, and User features
│   │   ├── models/      # Mongoose schemas (User, Recipe)
│   │   ├── routes/      # endpoint definitions
│   │   └── server.js    # Application entry point
├── frontend/           # React application (Vite-powered)
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page views (Favorites, History, Search)
│   │   └── context/     # Auth and Theme state management
└── README.md           # You are here!
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account or local instance.
- Resend API key (for email features).
- Spoonacular API key (for recipe data).

### Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd "CookMate project antigravity"
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend/` directory:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   RESEND_API_KEY=your_resend_api_key
   SPOONACULAR_API_KEY=your_spoonacular_api_key
   CLIENT_URL=http://localhost:5173
   ```
   Start the server:
   ```bash
   npm run dev
   ```

3. **Frontend Setup**:
   ```bash
   cd ../frontend
   npm install
   ```
   Start the development server:
   ```bash
   npm run dev
   ```

---

## 🎨 UI & Design
CookMate features a responsive, mobile-first design with a custom-generated favicon and high-contrast typography. 

- **Primary Color**: `#FF6B6B` (Coral Red)
- **Secondary Color**: `#4ECDC4` (Turquoise)
- **Dark Mode**: Optimized for reduced eye strain with deep slate backgrounds.

---

## 📄 License
This project is open source and available for personal use.
