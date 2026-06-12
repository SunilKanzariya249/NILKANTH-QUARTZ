import React from 'react';
import { ShieldCheck, Cpu, Target, Eye, Settings } from 'lucide-react';
import SEO from '../components/SEO';

const TIMELINE_STEPS = [
  {
    step: '01',
    title: 'Research & CAD Design',
    desc: 'Our design office creates blueprints using 3D rendering. Dials, hands, and frames are mocked to match modern home trends.'
  },
  {
    step: '02',
    title: 'Precision Plastic Molding',
    desc: 'High-speed injection molding machines press raw ABS granules into robust, uniform clock frames and back cases.'
  },
  {
    step: '03',
    title: 'Vacuum Metallizing & Paint',
    desc: 'Frames pass through dust-free painting chambers and vacuum metallizers to apply premium wood finishes and chrome metallics.'
  },
  {
    step: '04',
    title: 'Glass Cutting & Dial Printing',
    desc: 'Durable float glass sheets are auto-cut and polished. Custom graphic dial faces are printed using UV-curing inks.'
  },
  {
    step: '05',
    title: 'Movement & Hand Fitment',
    desc: 'Every timepiece is fit with a high-accuracy, silent quartz motor and aluminum hands under static-free conditions.'
  },
  {
    step: '06',
    title: '24H Inspection & Dispatch',
    desc: 'Assembled clocks undergo a 24-hour timekeeping calibration check. Items passing QA are packed in drop-resistant carton cases.'
  }
];

const About = () => {
  return (
    <div className="bg-brand-light py-16">
      <SEO 
        title="About Us | Nilkanth Quartz Wall Clocks" 
        description="Learn about Nilkanth Quartz history, our mission, vision, and our state-of-the-art wall clock manufacturing processes in Morbi, Gujarat."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-red">Our Profile</span>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">The Legacy of Nilkanth Quartz</h1>
          <p className="text-gray-500 text-base leading-relaxed">
            Delivering precision, elegance, and reliability to empty walls for over four decades.
          </p>
        </div>

        {/* Story & Heritage */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Our Story</h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Founded in Morbi, Gujarat, the heart of India's clock and ceramic manufacturing cluster, **Nilkanth Quartz** started as a small assembly workshop under Dimple Enterprises. Through uncompromised engineering and responsive service, we grew into a modern manufacturing hub.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              We operate an integrated facility housing heavy-duty plastic injection molding, automated glass polishing, vacuum metallizing chambers, and static-free QA testing labs. Our capacity allows us to manage wholesale requests ranging from boutique interior projects to corporate gifting drives exceeding 100,000 units.
            </p>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop" 
              alt="Clock craftsmanship close-up" 
              className="rounded-3xl shadow-lg w-full object-cover aspect-[4/3]"
            />
          </div>
        </section>

        {/* Vision & Mission */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm space-y-4 flex flex-col items-start">
            <div className="bg-brand-red/10 p-3.5 rounded-2xl text-brand-red">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-gray-900">Our Mission</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              To produce highly durable, aesthetic, and silent-sweep wall clocks that bring style and punctuality to houses and workplaces, while offering competitive wholesale value directly from the factory.
            </p>
          </div>

          <div className="bg-white p-10 rounded-3xl border border-gray-100 shadow-sm space-y-4 flex flex-col items-start">
            <div className="bg-brand-red/10 p-3.5 rounded-2xl text-brand-red">
              <Eye className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-gray-900">Our Vision</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              To become India's most trusted global partner for OEM clock customization and wholesale supply, by continuously incorporating smart industrial automation and fresh contemporary clock face blueprints.
            </p>
          </div>
        </section>

        {/* Manufacturing Strength Timeline (Ariel Quartz inspired workflow) */}
        <section className="space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-red">Industrial Workflow</span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Our Manufacturing Process</h2>
            <p className="text-gray-500 text-sm">A look inside how raw plastics and quartz crystals are turned into luxury wall clocks.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TIMELINE_STEPS.map((step, idx) => (
              <div 
                key={idx}
                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group space-y-4"
              >
                {/* Big watermark step count */}
                <div className="absolute right-4 top-2 text-7xl font-black text-gray-50 opacity-60 group-hover:text-brand-red/5 transition-colors select-none">
                  {step.step}
                </div>
                <div className="w-8 h-8 rounded-full bg-brand-red text-white flex items-center justify-center font-bold text-xs">
                  {step.step}
                </div>
                <h3 className="font-extrabold text-gray-900 text-base relative z-10">{step.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed relative z-10">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quality Standards Summary */}
        <section className="bg-brand-dark text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute right-0 bottom-0 w-[400px] h-[400px] rounded-full bg-brand-red/5 blur-3xl pointer-events-none" />
          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-brand-red" />
              <h3 className="text-xl sm:text-2xl font-extrabold">ISO 9001:2015 Compliant Quality Assurance</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              We employ strict Quality Assurance protocols at every stage. Our testing room subjects every single sweep motor to continuous 24-hour timing checks, temperature stress tests, and battery consumption reviews. Dials are checked for dust specks under pressurized clean benches before frame sealing.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
};

export default About;
