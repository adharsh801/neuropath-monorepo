<<<<<<< HEAD
# NeuroPath - Neuroscience Education Platform

A comprehensive full-stack monorepo for neuroscience education with interactive quizzes, user management, and admin tools.

## 🚀 Features

### Frontend (Next.js + Tailwind + shadcn/ui)
- **Landing Page** - Beautiful hero section with features showcase
- **Authentication** - Login/Register with JWT tokens
- **Dashboard** - User progress tracking and statistics
- **Interactive Quiz** - Timed quizzes with real-time feedback
- **Results Page** - Detailed performance analysis
- **Admin Panel** - Question and user management
- **Dark Mode** - System-aware theme switching
- **Responsive Design** - Mobile-first approach

### Backend (Next.js API Routes)
- **Authentication API** - JWT-based auth system
- **Quiz API** - Question delivery and submission
- **Admin API** - CRUD operations for questions and users
- **Secure Routes** - Protected endpoints with middleware
- **Password Hashing** - bcrypt for secure password storage

### Database Models
- **User** - Authentication and profile data
- **Question** - Quiz questions with multiple choice answers
- **Result** - Quiz results and performance tracking

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes, JWT, bcrypt
- **Database**: Mock data (easily replaceable with MongoDB/PostgreSQL)
- **Deployment**: Vercel-ready configuration

## 📦 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd neuropath-monorepo
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.local.example .env.local
   # Edit .env.local with your configuration
   \`\`\`

4. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔐 Default Credentials

### Admin Account
- **Email**: admin@neuropath.com
- **Password**: password123

### Test User Account
- **Email**: user@test.com
- **Password**: password123

## 📁 Project Structure

\`\`\`
neuropath-monorepo/
├── app/                    # Next.js App Router
│   ├── api/               # Backend API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── quiz/          # Quiz-related endpoints
│   │   └── admin/         # Admin management endpoints
│   ├── dashboard/         # User dashboard
│   ├── quiz/             # Quiz interface
│   ├── results/          # Results display
│   ├── admin/            # Admin panel
│   ├── login/            # Login page
│   ├── register/         # Registration page
│   └── page.tsx          # Landing page
├── components/           # Reusable UI components
│   └── ui/              # shadcn/ui components
├── lib/                 # Utility functions
└── public/              # Static assets
\`\`\`

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Quiz
- `GET /api/quiz/questions` - Fetch quiz questions
- `POST /api/quiz/submit` - Submit quiz answers

### Admin
- `GET /api/admin/questions` - Get all questions
- `POST /api/admin/add-question` - Add new question
- `PUT /api/admin/question/:id` - Update question
- `DELETE /api/admin/question/:id` - Delete question
- `GET /api/admin/users` - Get all users

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
- **Netlify**: Use `npm run build` and deploy the `out` folder
- **Railway**: Connect GitHub repo and deploy
- **Docker**: Create Dockerfile for containerized deployment

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - bcrypt with salt rounds
- **Protected Routes** - Middleware for API protection
- **Input Validation** - Server-side validation
- **CORS Configuration** - Secure cross-origin requests

## 🎨 Customization

### Adding New Question Categories
1. Update the category field in question models
2. Add category filters in admin panel
3. Implement category-based quiz selection

### Database Integration
Replace mock data with real database:
1. Install database driver (mongoose, pg, etc.)
2. Create database models
3. Update API routes to use database operations
4. Add connection configuration

### Styling
- Modify `tailwind.config.js` for custom themes
- Update CSS variables in `globals.css`
- Customize shadcn/ui components

## 📊 Features Roadmap

- [ ] Real-time multiplayer quizzes
- [ ] Advanced analytics dashboard
- [ ] Question difficulty levels
- [ ] Study materials integration
- [ ] Mobile app (React Native)
- [ ] Social features (leaderboards, sharing)
- [ ] AI-powered question generation
- [ ] Video explanations for answers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Email: support@neuropath.com
- Documentation: [docs.neuropath.com](https://docs.neuropath.com)

---

Built with ❤️ for neuroscience education
=======
# neuropath-monorepo
>>>>>>> 12cf6a3af9c0234b397529d74b6955209bf5e8f8
