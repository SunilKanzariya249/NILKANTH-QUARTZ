import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import SEO from '../components/SEO';

const WhatsAppIcon = ({ className = "w-4 h-4" }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const Contact = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.productInquiry) {
      const prod = location.state.productInquiry;
      setForm(prev => ({
        ...prev,
        message: `Hi, I would like to inquire about the following product:
- Model No: ${prod.modelNo || 'N/A'}
- Price: ₹${prod.price}
- Available Colors: ${prod.colors || 'N/A'}
- MOQ: ${prod.moq || 'N/A'} pcs

Please share more details and wholesale quotes.`
      }));
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.message) return;

    // Prefill WhatsApp text
    const text = `Hello Nilkanth Quartz,

I am writing an inquiry from your website Contact Page.
Name: ${form.name}
Phone: ${form.phone || 'N/A'}
Email: ${form.email || 'N/A'}
Message: ${form.message}`;

    const encodedText = encodeURIComponent(text);
    const url = `https://wa.me/919426842751?text=${encodedText}`;
    window.open(url, '_blank');

    setSubmitted(true);
    setForm({ name: '', phone: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="bg-[#FCFCFC] py-0 min-h-screen select-none">
      <SEO 
        title="Contact Us | Nilkanth Quartz Wall Clocks" 
        description="Get in touch with Nilkanth Quartz sales desk for wholesale dealership pricing, custom dial logo printing, or direct factory tours in Morbi, Gujarat."
      />

      {/* Contact Page Header Banner */}
      <div className="bg-brand-dark text-white pt-32 pb-16 sm:pt-40 sm:pb-20 border-b border-white/10 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="text-left space-y-3">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 bg-brand-red"></span>
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#AAAAAA]">
                GET IN TOUCH
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white tracking-tight leading-tight uppercase">
              CONNECT WITH OUR OFFICE
            </h1>
          </div>
          <p className="text-[#AAAAAA] text-xs font-medium uppercase tracking-wider max-w-sm lg:text-right leading-relaxed">
            Interested in bulk pricing, retail distribution rights, or custom orders? Reach out to us.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 pb-24 space-y-16">
        
        {/* Section 1: Reach Out To Us Container (Email and Mobile Number) */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-block w-2.5 h-2.5 bg-black"></span>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#888888]">
              REACH OUT TO US
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mobile Contact Card */}
            <div className="bg-white border border-[#EEEEEE] p-6 sm:p-8 rounded-none hover:border-black hover:shadow-sm transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="bg-[#FAFAFA] p-4 border border-[#EEEEEE] rounded-none text-black flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div className="space-y-1 min-w-0 w-full">
                <span className="text-gray-400 font-bold block text-[10px] uppercase tracking-widest">Mobile Number</span>
                <a href="tel:+919426842751" className="font-bold text-base sm:text-lg uppercase tracking-wider text-gray-900 hover:text-brand-red transition-colors block break-all">
                  +91 94268 42751
                </a>
                <span className="text-[10px] font-semibold text-emerald-600 uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Available for Calls & WhatsApp
                </span>
              </div>
            </div>

            {/* Email Contact Card */}
            <div className="bg-white border border-[#EEEEEE] p-6 sm:p-8 rounded-none hover:border-black hover:shadow-sm transition-all duration-300 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="bg-[#FAFAFA] p-4 border border-[#EEEEEE] rounded-none text-black flex-shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1 min-w-0 w-full">
                <span className="text-gray-400 font-bold block text-[10px] uppercase tracking-widest">Email Address</span>
                <a href="mailto:info@nilkanthquartz.com" className="font-bold text-base sm:text-lg uppercase tracking-wider text-gray-900 hover:text-brand-red transition-colors block break-all">
                  info@nilkanthquartz.com
                </a>
                <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
                  24/7 Corporate Inquiry Support
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Inquiry Form */}
        <div className="bg-[#FAFAFA] p-6 sm:p-12 rounded-none border border-[#EEEEEE] relative shadow-sm max-w-4xl mx-auto w-full">
          {submitted ? (
            <div className="text-center py-20 space-y-4">
              <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600 rounded-none">
                <Send className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Thank You!</h3>
              <p className="text-xs text-gray-500 uppercase tracking-wider leading-relaxed">
                We have successfully redirected your inquiry message to our WhatsApp sales line.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-block w-2.5 h-2.5 bg-brand-red"></span>
                <h2 className="font-bold text-xs uppercase tracking-widest text-[#111111]">Send Factory Inquiry</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#888888] mb-2">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    required
                    placeholder="Jane Doe"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-white border border-[#CCCCCC] rounded-none px-4 py-3.5 text-xs font-bold uppercase tracking-wider placeholder-gray-400 focus:border-black focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-[#888888] mb-2">
                    Phone Number
                  </label>
                  <input 
                    type="tel" 
                    placeholder="+91 94268 42751"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-white border border-[#CCCCCC] rounded-none px-4 py-3.5 text-xs font-bold uppercase tracking-wider placeholder-gray-400 focus:border-black focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#888888] mb-2">
                  Email Address
                </label>
                <input 
                  type="email" 
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-white border border-[#CCCCCC] rounded-none px-4 py-3.5 text-xs font-bold uppercase tracking-wider placeholder-gray-400 focus:border-black focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-[#888888] mb-2">
                  Message Details
                </label>
                <textarea 
                  rows="6"
                  required
                  placeholder="Describe your design customisation, dimensions, color preferences, or bulk order quantity inquiries here."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-white border border-[#CCCCCC] rounded-none px-4 py-3.5 text-xs font-bold uppercase tracking-wider placeholder-gray-400 focus:border-black focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold uppercase tracking-widest text-[10px] py-4.5 rounded-none shadow-md shadow-emerald-500/10 transition-all active:scale-[0.99] duration-200"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current" />
                Send Message via WhatsApp
              </button>
            </form>
          )}
        </div>

        {/* Section 3: Left Side Factory Address & Right Side Google Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Column: Factory Address */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-[#EEEEEE] p-6 sm:p-12 rounded-none shadow-sm space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 bg-black"></span>
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#888888]">
                  FACTORY LOCATION
                </span>
              </div>
              
              <div className="space-y-4">
                <div className="bg-[#FAFAFA] p-4 border border-[#EEEEEE] rounded-none text-black inline-block">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-xl sm:text-2xl text-gray-900 tracking-tight leading-tight uppercase">
                  OUR MANUFACTURING PLANT
                </h3>
                <p className="text-[#555555] text-sm font-medium uppercase tracking-wider leading-relaxed">
                  Lati Road, Near Railway Crossing, Morbi - 363641, Gujarat, India.
                </p>
              </div>
            </div>
            
            <div className="border-t border-[#EEEEEE] pt-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Nilkanth Quartz © Industrial Manufacturing Plant
            </div>
          </div>

          {/* Right Column: Google Map */}
          <div className="lg:col-span-7 rounded-none border border-[#EEEEEE] overflow-hidden shadow-sm min-h-[350px] bg-gray-100">
            <iframe
              title="Nilkanth Factory Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117409.95758253165!2d70.78183141151601!3d22.81878028795415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc0ba9f4931a5%3A0x861ca0d3b664d4b1!2sMorbi%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1716949392095!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '350px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
