# UniTracker - University Application Tracker

A modern web application built with Next.js, TypeScript, and Supabase to help students track their university applications, deadlines, and scholarship opportunities. 
Check it out here -->  [uni-tracker-five.vercel.app](https://uni-tracker-five.vercel.app)

## Demo Video


https://github.com/user-attachments/assets/ef18c08e-f490-4d55-a45b-8179f0b00cf5



## 🚀 Features

- **User Authentication**: Secure signup and login with Supabase Auth
- **University Management**: Add, edit, and delete university applications
- **Application Tracking**: Track application status (Applying, Waiting, Accepted, Waitlisted, Rejected)
- **Financial Tracking**: Monitor application fees and scholarship percentages
- **Analytics Dashboard**: View statistics and insights about your applications
- **Responsive Design**: Beautiful, modern UI that works on all devices
- **Real-time Updates**: Instant updates across all pages

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, React
- **Styling**: Tailwind CSS with custom design system
- **Authentication & Database**: Supabase
- **Icons**: Lucide React
- **UI Components**: Custom components with Headless UI

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 18 or higher)
- npm or yarn
- A Supabase account

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd chocolate
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to your project settings and copy your project URL and anon key
3. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Set up the database

Run the following SQL in your Supabase SQL editor to create the universities table:

```sql
-- Create universities table
CREATE TABLE universities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  deadline DATE NOT NULL,
  scholarship_percentage DECIMAL(5,2) NOT NULL,
  application_fees DECIMAL(10,2) NOT NULL,
  notes TEXT,
  status TEXT NOT NULL CHECK (status IN ('Applying', 'Waiting', 'Accepted', 'Waitlisted', 'Rejected')),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE universities ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to only see their own universities
CREATE POLICY "Users can view own universities" ON universities
  FOR SELECT USING (auth.uid() = user_id);

-- Create policy to allow users to insert their own universities
CREATE POLICY "Users can insert own universities" ON universities
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policy to allow users to update their own universities
CREATE POLICY "Users can update own universities" ON universities
  FOR UPDATE USING (auth.uid() = user_id);

-- Create policy to allow users to delete their own universities
CREATE POLICY "Users can delete own universities" ON universities
  FOR DELETE USING (auth.uid() = user_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_universities_updated_at 
    BEFORE UPDATE ON universities 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   │   ├── login/         # Login page
│   │   └── signup/        # Signup page
│   ├── dashboard/         # Dashboard pages
│   │   ├── add/           # Add university form
│   │   ├── edit/          # Edit university form
│   │   ├── analytics/     # Analytics page
│   │   ├── settings/      # Settings page
│   │   ├── layout.tsx     # Dashboard layout
│   │   └── page.tsx       # Main dashboard
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # Reusable components
│   ├── ui/               # UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   └── Textarea.tsx
│   └── layout/           # Layout components
│       └── Sidebar.tsx
└── lib/                  # Utility functions
    ├── supabase.ts       # Supabase client
    └── utils.ts          # Utility functions
```

## 🎨 Design System

The application uses a custom design system with:

- **Colors**: Primary blue (#1E88E5), accent colors for status indicators
- **Typography**: Inter font family with consistent sizing
- **Spacing**: 8px base unit system
- **Components**: Consistent button, input, and card styles
- **Responsive**: Mobile-first approach with breakpoints

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔒 Security Features

- Row Level Security (RLS) in Supabase
- User authentication required for all dashboard routes
- Input validation and sanitization
- Secure API routes

## 📱 Features Overview

### Landing Page
- Modern hero section with feature highlights
- Call-to-action buttons for signup/login
- Responsive design with gradient backgrounds

### Authentication
- Email/password authentication
- Form validation and error handling
- Secure session management

### Dashboard
- Overview statistics cards
- University applications table
- Status indicators with color coding
- Edit and delete functionality

### Add/Edit University
- Form with all required fields
- Real-time validation
- Status selection dropdown
- Notes field for additional information

### Analytics
- Application status distribution
- Financial summaries
- Country breakdown
- Upcoming deadlines

### Settings
- User profile information
- Account management options
- App information and support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Contact the development team

## 🔮 Future Enhancements

- Email notifications for deadlines
- File upload for documents
- Advanced filtering and search
- Export to PDF/Excel
- Mobile app version
- Multi-language support
- Dark mode theme
