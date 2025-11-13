import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';

export function CTA() {
  return (
    <section className="py-18 bg-gradient-to-b from-zinc-950 to-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto relative rounded-3xl overflow-hidden bg-gradient-to-br from-purple-600/20 via-blue-600/20 to-pink-600/20 border border-white/10 backdrop-blur-sm p-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/30 rounded-full blur-3xl"></div>

          <div className="relative z-10 text-center">
            <h2 className="mb-6 text-3xl font-medium">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Ready to Transform Your Quality Control?
              </span>
            </h2>

            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses ensuring quality across their global supply chains
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-10">
              
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-0">
             Start Free Trial
            
          </Button>
              <Button size="lg" variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
                Schedule Demo
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 justify-center text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>14-day free trial</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}