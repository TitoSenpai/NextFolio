# Portfolio & Dashboard Application

A modern Next.js 15 application with a clean separation between portfolio frontend and dashboard backend using route groups.

## 🏗️ Project Structure

```
src/
├── app/
│   ├── (frontend)/           # Portfolio route group
│   │   ├── layout.tsx       # Frontend-specific layout
│   │   ├── page.tsx         # Portfolio homepage
│   │   ├── about/
│   │   ├── projects/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   └── contact/
│   ├── (dashboard)/          # Dashboard route group
│   │   ├── layout.tsx       # Dashboard-specific layout
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   ├── analytics/
│   │   │   ├── projects/
│   │   │   └── settings/
│   │   └── api/             # API routes for dashboard
│   ├── globals.css
│   └── layout.tsx           # Root layout
├── components/
│   ├── frontend/            # Portfolio components
│   ├── dashboard/           # Dashboard components
│   ├── ui/                  # Shared ShadCN components
│   └── shared/              # Truly shared components
├── lib/
│   ├── auth/
│   ├── database/
│   ├── validations/
│   ├── constants/
│   └── utils.ts
├── hooks/
│   ├── frontend/
│   ├── dashboard/
│   └── shared/
├── types/
│   ├── frontend.ts
│   ├── dashboard.ts
│   └── shared.ts
├── config/
│   └── site.ts
└── styles/
```

## 🚀 Features

### Frontend (Portfolio)
- **Route Group**: `(frontend)` - doesn't affect URL structure
- **Pages**: Home, About, Projects, Contact
- **SEO Optimized**: Individual metadata for each page
- **Responsive Design**: Mobile-first approach
- **Modern UI**: Clean, professional design

### Dashboard (Admin)
- **Route Group**: `(dashboard)` - separate admin area
- **Protected Routes**: Authentication required
- **Analytics**: Portfolio performance metrics
- **Project Management**: CRUD operations
- **Real-time Updates**: Live data synchronization

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: ShadCN/UI
- **Icons**: Lucide React
- **Charts**: Recharts
- **Database**: (To be configured)
- **Authentication**: (To be implemented)

## 📁 Route Groups Benefits

### Why Route Groups?
1. **Organization**: Logical separation of concerns
2. **Layouts**: Different layouts for frontend vs dashboard
3. **Middleware**: Targeted protection for dashboard routes
4. **Scalability**: Easy to add new sections
5. **Clean URLs**: Route groups don't affect URL structure

### URL Structure
```
Frontend Routes:
/ → Portfolio homepage
/about → About page
/projects → Projects listing
/projects/[slug] → Individual project
/contact → Contact form

Dashboard Routes:
/dashboard → Dashboard home
/dashboard/analytics → Analytics page
/dashboard/projects → Project management
/dashboard/settings → Settings
```

## 🎨 Design Patterns

### Component Organization
- **Feature-based**: Components grouped by domain
- **Shared Components**: Truly reusable components
- **UI Components**: ShadCN components remain in `ui/`

### Type Safety
- **Domain Types**: Separate types for frontend/dashboard
- **Shared Types**: Common interfaces
- **API Types**: Structured API responses

### Configuration
- **Site Config**: Centralized site configuration
- **Environment**: Separate configs for different environments

## 🔧 Development

### Getting Started
```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

### Available Scripts
- `dev`: Start development server with Turbopack
- `build`: Build for production
- `start`: Start production server
- `lint`: Run ESLint

## 📝 Next Steps

1. **Authentication**: Implement auth for dashboard
2. **Database**: Set up database connection
3. **API Routes**: Create CRUD endpoints
4. **Forms**: Add contact form handling
5. **SEO**: Implement advanced SEO features
6. **Analytics**: Add real analytics integration
7. **Deployment**: Set up CI/CD pipeline

## 🔒 Security Considerations

- Dashboard routes should be protected
- API endpoints need authentication
- Environment variables for sensitive data
- Input validation on all forms
- Rate limiting for public APIs

## 📚 Documentation

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [ShadCN/UI Components](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details
