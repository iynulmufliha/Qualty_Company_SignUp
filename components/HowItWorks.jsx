import { Search, Calendar, ClipboardCheck, Download } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Find an Inspector',
    description: 'Search our global marketplace for certified inspectors in your target location. Filter by specialty, certifications, and ratings.',
    number: '01',
  },
  {
    icon: Calendar,
    title: 'Book & Schedule',
    description: 'Select your preferred inspector, choose inspection type, and schedule at your convenience. Instant confirmation with transparent pricing.',
    number: '02',
  },
  {
    icon: ClipboardCheck,
    title: 'Inspection Conducted',
    description: 'Our certified inspector performs thorough quality checks on-site. Track progress in real-time through our platform.',
    number: '03',
  },
  {
    icon: Download,
    title: 'Receive Report',
    description: 'Get detailed inspection reports with photos, videos, and compliance data. Make informed decisions with actionable insights.',
    number: '04',
  },
];

export function HowItWorks() {
  return (
    <section className="py-18 bg-zinc-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="mb-4 font-medium text-4xl">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            Quality inspections made simple in four easy steps
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 relative">
            {steps.map(({ icon: Icon, title, description, number }, i) => (
              <div key={i} className="relative">
                
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-4xl bg-gradient-to-r from-white to-white bg-clip-text text-transparent font-medium select-none">
                      {number}
                    </span>
                  </div>
                  <h3 className="text-white mb-3 font-semibold">{title}</h3>
                  <p className="text-gray-400 text-sm">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}