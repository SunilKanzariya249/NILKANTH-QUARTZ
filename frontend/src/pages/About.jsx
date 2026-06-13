import React from 'react';
import { Target, Eye, Clock, ShieldCheck, Award, Layers, Zap, Gift, Building2, Palette, CheckCircle2, Factory, Handshake } from 'lucide-react';
import SEO from '../components/SEO';

const About = () => {
  return (
    <div className="bg-[#FCFCFC] py-0 min-h-screen select-none">
      <SEO 
        title="About Us | Nilkanth Quartz Wall Clocks" 
        description="Learn about Nilkanth Quartz wall clock manufacturing history, our corporate mission, vision, core values, and our wide range of custom commercial clocks."
      />

      {/* About Page Header Banner */}
      <div className="bg-brand-dark text-white pt-32 pb-16 sm:pt-40 sm:pb-20 border-b border-white/10 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="text-left space-y-3">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 bg-brand-red"></span>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#AAAAAA]">
                ABOUT US
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight leading-tight uppercase">
              CRAFTING TIME, INSPIRING SPACES
            </h1>
          </div>
          <p className="text-[#AAAAAA] text-xs sm:text-sm font-medium uppercase tracking-wider max-w-sm lg:text-right leading-relaxed">
            Crafting Quality Timepieces with Precision, Passion, and Trust.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pb-24 space-y-20">
        
        {/* Section 1: Who We Are / Profile Story */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-block w-2.5 h-2.5 bg-black"></span>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#888888]">
              COMPANY PROFILE
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div className="space-y-6">
              <h2 className="text-3xl font-extrabold uppercase tracking-tight text-gray-950">
                Nilkanth Quartz
              </h2>
              <p className="text-gray-800 text-base sm:text-lg leading-relaxed font-semibold uppercase tracking-wide">
                Nilkanth Quartz is a trusted manufacturer and supplier of premium wall clocks based in the renowned manufacturing hub of Morbi, Gujarat, India. With a passion for quality craftsmanship and innovative design, we specialize in creating wall clocks that combine functionality, durability, and aesthetic appeal.
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Over the years, we have established ourselves as a reliable partner for wholesalers, retailers, distributors, corporate buyers, and interior businesses across India. Our commitment to quality, timely delivery, and customer satisfaction has helped us build long-term relationships with clients from diverse industries.
              </p>
            </div>
            <div className="space-y-6">
              <div className="bg-[#FAFAFA] border border-[#EEEEEE] p-8 rounded-none relative">
                <div className="absolute top-0 right-0 w-24 h-24 bg-brand-red/5 blur-xl pointer-events-none" />
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                  At Nilkanth Quartz, every clock is designed with precision and manufactured using quality materials to ensure long-lasting performance. Whether for homes, offices, hotels, schools, hospitals, showrooms, or corporate spaces, our products are crafted to enhance every environment while delivering accurate timekeeping.
                </p>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  We continuously invest in modern manufacturing techniques, design innovation, and quality control processes to meet the evolving demands of the market. Our goal is simple: to provide stylish, reliable, and affordable wall clocks that create lasting value for our customers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="bg-white p-8 sm:p-10 border border-[#EEEEEE] border-l-4 border-l-brand-red rounded-none shadow-sm space-y-4 flex flex-col items-start">
            <div className="bg-[#FAFAFA] p-3 border border-[#EEEEEE] text-brand-red">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold uppercase tracking-wider text-gray-900">Our Mission</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              To manufacture and deliver high-quality wall clocks that combine innovative design, reliable performance, and exceptional value while maintaining the highest standards of customer satisfaction and business integrity.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white p-8 sm:p-10 border border-[#EEEEEE] border-l-4 border-l-black rounded-none shadow-sm space-y-4 flex flex-col items-start">
            <div className="bg-[#FAFAFA] p-3 border border-[#EEEEEE] text-black">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold uppercase tracking-wider text-gray-900">Our Vision</h3>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              To become one of India's most trusted and recognized wall clock manufacturers by continuously innovating, expanding our product range, and building lasting relationships with customers worldwide.
            </p>
          </div>
        </div>

        {/* Section 3: What We Manufacture */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-block w-2.5 h-2.5 bg-black"></span>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#888888]">
              WHAT WE MANUFACTURE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Decorative Clocks", desc: "Elegant and stylish designs that enhance living rooms, bedrooms, and interior spaces.", icon: Award },
              { title: "Designer Clocks", desc: "Modern and contemporary clocks crafted to complement premium interiors.", icon: Clock },
              { title: "Acrylic Clocks", desc: "Lightweight, durable, and stylish clocks with modern aesthetics.", icon: Layers },
              { title: "Gear Clocks", desc: "Unique moving-gear and industrial-style clocks that create a striking visual appeal.", icon: Zap },
              { title: "Promotional Clocks", desc: "Customized clocks for brand promotions, marketing campaigns, and giveaways.", icon: Gift },
              { title: "Corporate Clocks", desc: "Professional wall clocks designed for offices, institutions, and business environments.", icon: Building2 },
              { title: "Customized Clocks", desc: "Tailor-made clocks featuring company logos, branding, custom artwork, and personalized designs.", icon: Palette },
              { title: "Premium Wall Clocks", desc: "Luxury collections crafted for modern homes, hotels, showrooms, and commercial projects.", icon: Factory }
            ].map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white border border-[#EEEEEE] p-6 rounded-none hover:border-black hover:shadow-sm transition-all duration-300 flex flex-col justify-between group space-y-4"
                >
                  <div className="space-y-3">
                    <div className="bg-[#FAFAFA] p-3 border border-[#EEEEEE] text-black w-fit group-hover:bg-brand-red group-hover:text-white group-hover:border-brand-red transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-bold text-sm uppercase tracking-wider text-gray-900">
                      {cat.title}
                    </h4>
                    <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 4: Why Choose Nilkanth Quartz */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-block w-2.5 h-2.5 bg-black"></span>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#888888]">
              WHY CHOOSE US
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Premium Quality Manufacturing", desc: "Every product undergoes strict quality checks to ensure durability and consistent performance." },
              { title: "Wide Product Range", desc: "A diverse collection of designs, sizes, colors, and styles for every requirement." },
              { title: "Customization Expertise", desc: "Customized solutions for corporate gifting, promotional campaigns, and bulk branding projects." },
              { title: "Competitive Pricing", desc: "Factory-direct pricing without compromising on quality." },
              { title: "Timely Delivery", desc: "Efficient production and logistics processes ensure on-time order fulfillment." },
              { title: "Bulk Order Capability", desc: "Capable of handling large-scale wholesale and corporate orders with consistency and reliability." },
              { title: "Customer-Centric Approach", desc: "Dedicated support and personalized service for every client." }
            ].map((pillar, idx) => (
              <div 
                key={idx}
                className="bg-white border border-[#EEEEEE] p-6 rounded-none hover:border-black hover:shadow-sm transition-all duration-300 space-y-2"
              >
                <div className="flex items-center gap-2 text-brand-red">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <h4 className="font-bold text-sm uppercase tracking-wider text-gray-900">
                    {pillar.title}
                  </h4>
                </div>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed pl-6">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Industries We Serve */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-block w-2.5 h-2.5 bg-black"></span>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#888888]">
              INDUSTRIES WE SERVE
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            {[
              "Retail Stores", "Wholesale Dealers", "Distributors", "Corporate Offices", 
              "Educational Institutions", "Hotels & Hospitality", "Interior Designers", 
              "Promotional Agencies", "Government Organizations", "Corporate Gifting Companies", 
              "E-commerce Sellers"
            ].map((ind, idx) => (
              <span 
                key={idx}
                className="bg-white border border-[#EEEEEE] hover:border-black px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-gray-800 transition-colors"
              >
                {ind}
              </span>
            ))}
          </div>
        </div>

        {/* Section 6: Our Core Values */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-block w-2.5 h-2.5 bg-black"></span>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#888888]">
              OUR CORE VALUES
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { title: "Quality First", desc: "We never compromise on product quality and manufacturing standards.", icon: ShieldCheck },
              { title: "Innovation", desc: "Continuously developing new designs that align with changing market trends.", icon: Zap },
              { title: "Trust & Transparency", desc: "Building long-term relationships through honesty and reliability.", icon: Handshake },
              { title: "Customer Satisfaction", desc: "Delivering products and services that exceed customer expectations.", icon: Award },
              { title: "Excellence", desc: "Striving for excellence in every product we manufacture and every order we fulfill.", icon: CheckCircle2 }
            ].map((val, idx) => {
              const Icon = val.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white border border-[#EEEEEE] p-6 rounded-none text-center hover:border-black hover:shadow-sm transition-all duration-300 flex flex-col items-center space-y-3"
                >
                  <div className="bg-[#FAFAFA] p-3.5 border border-[#EEEEEE] text-black rounded-none">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm uppercase tracking-wider text-gray-900">
                    {val.title}
                  </h4>
                  <p className="text-gray-500 text-xs leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 7: Our Commitment */}
        <div className="bg-brand-dark text-white p-8 sm:p-12 rounded-none relative overflow-hidden border border-white/10">
          <div className="absolute right-0 bottom-0 w-80 h-80 bg-brand-red/5 blur-3xl pointer-events-none" />
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 bg-brand-red"></span>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#AAAAAA]">
                OUR COMMITMENT
              </span>
            </div>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              At Nilkanth Quartz, we believe a wall clock is more than just a timekeeping device—it is a statement of style, craftsmanship, and reliability. Through innovative designs, superior manufacturing, and dedicated customer service, we continue to help businesses and customers across India find the perfect wall clock solutions for every space.
            </p>
            <div className="pt-4 border-t border-white/10 text-sm sm:text-base font-semibold tracking-wider text-white uppercase italic">
              "Crafting Quality Timepieces with Precision, Passion, and Trust."
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
