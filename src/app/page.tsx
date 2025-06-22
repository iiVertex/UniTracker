import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { GraduationCap, Globe, Calendar, DollarSign, CheckCircle, BarChart3 } from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: GraduationCap,
      title: 'Track Applications',
      description: 'Keep track of all your university applications in one place with detailed status updates.'
    },
    {
      icon: Globe,
      title: 'Global Universities',
      description: 'Apply to universities worldwide and manage applications from different countries.'
    },
    {
      icon: Calendar,
      title: 'Deadline Management',
      description: 'Never miss important deadlines with our smart notification system.'
    },
    {
      icon: DollarSign,
      title: 'Scholarship Tracking',
      description: 'Monitor scholarship opportunities and track your financial aid applications.'
    },
    {
      icon: CheckCircle,
      title: 'Application Status',
      description: 'Track your application status from applying to acceptance with real-time updates.'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Get insights into your application progress with detailed analytics and reports.'
    }
  ]

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="relative z-10 px-6 py-4 bg-white border-b border-black">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-black" />
            <span className="text-2xl font-bold text-black">UniTracker</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-black hover:text-red transition-colors">
              Features
            </Link>
            <Link href="#about" className="text-black hover:text-red transition-colors">
              About
            </Link>
            <Link href="/auth/login" className="text-black hover:text-red transition-colors">
              Login
            </Link>
            <Link href="/auth/signup">
              <Button variant="secondary" size="sm" className="border-black text-black hover:bg-black/80 hover:text-white">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-6 leading-tight">
            Track Your University
            <span className="block text-red">Applications</span>
          </h1>
          <p className="text-xl md:text-2xl text-black/80 mb-8 max-w-3xl mx-auto leading-relaxed">
            Stay organized and never miss a deadline. Manage all your university applications, 
            track scholarships, and monitor your progress in one beautiful dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/signup">
              <Button variant="secondary" size="lg" className="border-black text-black hover:bg-black/80 hover:text-white">Start Tracking Now</Button>
            </Link>
            <Link href="#features">
              <Button variant="secondary" size="lg" className="border-black text-black hover:bg-black/80 hover:text-white">Learn More</Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="secondary" size="lg" className="border-black text-black hover:bg-black/80 hover:text-white">Demo Login</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-white max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools you need to manage your university applications effectively.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-card hover:shadow-card-hover transition-all duration-300 border border-black">
                <div className="w-12 h-12 bg-black/10 rounded-lg flex items-center justify-center mb-6">
                  <feature.icon className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-xl font-semibold text-black mb-3">
                  {feature.title}
                </h3>
                <p className="text-black leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-red">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of students who are already tracking their university applications with UniTracker.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="bg-red text-white border-2 border-white hover:bg-red-dark">Create Your Account</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 bg-black text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <GraduationCap className="h-6 w-6 text-red" />
            <span className="text-xl font-bold">UniTracker</span>
          </div>
          <p className="text-white/70">
            © 2024 UniTracker. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
