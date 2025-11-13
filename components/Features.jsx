import { Shield, Globe, Zap, Users, FileCheck, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Certified Inspectors',
    description: 'Access a network of pre-vetted, certified quality inspectors across 150+ countries.',
    gradient: 'from-purple-400 to-pink-400',
  },
  {
    icon: Globe,
    title: 'Global Marketplace',
    description: 'Connect with inspection providers worldwide in seconds. Real-time availability and instant booking.',
    gradient: 'from-blue-400 to-cyan-400',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Get inspection reports within 24-48 hours. AI-powered quality analysis for instant insights.',
    gradient: 'from-pink-400 to-orange-400',
  },
  {
    icon: FileCheck,
    title: 'Comprehensive Reports',
    description: 'Detailed inspection reports with photos, videos, and compliance documentation.',
    gradient: 'from-green-400 to-emerald-400',
  },
  {
    icon: Users,
    title: 'Transparent Process',
    description: 'Track every step of your inspection in real-time. Full visibility from booking to completion.',
    gradient: 'from-violet-400 to-purple-400',
  },
  {
    icon: TrendingUp,
    title: 'Data Analytics',
    description: 'Make informed decisions with quality trends, supplier scorecards, and predictive insights.',
    gradient: 'from-orange-400 to-red-400',
  },
];

export function Features() {
  return (
    <section className="py-18 bg-gradient-to-b from-black to-zinc-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="mb-4 font-medium text-4xl">
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Everything You Need
            </span>
            <span className="block text-white mt-2">To Ensure Quality at Scale</span>
          </h2>
          <p className="text-xl text-gray-400">
            Streamline your quality control process with cutting-edge technology and global expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map(({ icon: Icon, title, description, gradient }, i) => (
            <div
              key={i}
              className="group p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${gradient} mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white mb-3 font-semibold">{title}</h3>
              <p className="text-gray-400">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}