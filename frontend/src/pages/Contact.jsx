import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import SEO from '../components/SEO';

const Contact = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

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
    <div className="bg-brand-light py-16">
      <SEO 
        title="Contact Us | Nilkanth Quartz Wall Clocks" 
        description="Get in touch with Nilkanth Quartz sales desk for wholesale dealership pricing, custom dial logo printing, or direct factory tours in Morbi, Gujarat."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-red">Get In Touch</span>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">Connect With Our Office</h1>
          <p className="text-gray-500 text-sm">
            Interested in bulk pricing, retail distribution rights, or custom orders? Reach out to us.
          </p>
        </div>

        {/* Contact info split grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Details & Google Map */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm space-y-6">
              <h2 className="font-extrabold text-gray-900 text-lg">Sales Desk</h2>
              
              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex items-start gap-4">
                  <div className="bg-brand-red/10 p-2.5 rounded-xl text-brand-red mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-gray-400 font-bold block text-xs uppercase tracking-wider mb-0.5">Factory Location</span>
                    <p className="font-medium">Lati Road, Near Railway Crossing, Morbi - 363641, Gujarat, India.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-emerald-500/10 p-2.5 rounded-xl text-emerald-600 mt-0.5">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-gray-400 font-bold block text-xs uppercase tracking-wider mb-0.5">WhatsApp Inquiry</span>
                    <a href="https://wa.me/919426842751" target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-600 hover:underline">
                      +91 94268 42751
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-brand-red/10 p-2.5 rounded-xl text-brand-red mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-gray-400 font-bold block text-xs uppercase tracking-wider mb-0.5">Call Helpline</span>
                    <a href="tel:+919426842751" className="font-semibold text-gray-900 hover:underline">
                      +91 94268 42751
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-brand-red/10 p-2.5 rounded-xl text-brand-red mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-gray-400 font-bold block text-xs uppercase tracking-wider mb-0.5">Email Support</span>
                    <a href="mailto:info@nilkanthquartz.com" className="font-semibold text-gray-900 hover:underline">
                      info@nilkanthquartz.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="rounded-3xl border border-gray-150 overflow-hidden shadow-sm h-80 bg-gray-100">
              <iframe
                title="Nilkanth Factory Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117409.95758253165!2d70.78183141151601!3d22.81878028795415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc0ba9f4931a5%3A0x861ca0d3b664d4b1!2sMorbi%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1716949392095!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-sm relative">
            {submitted ? (
              <div className="text-center py-20 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-500">
                  <Send className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Thank You!</h3>
                <p className="text-sm text-gray-500">
                  We have successfully redirected your inquiry message to our WhatsApp sales line.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="font-extrabold text-gray-900 text-lg">Send Factory Inquiry</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="Jane Doe"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full bg-brand-light border border-gray-200 rounded-xl px-4 py-3 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                      Phone Number
                    </label>
                    <input 
                      type="tel" 
                      placeholder="+91 94268 42751"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full bg-brand-light border border-gray-200 rounded-xl px-4 py-3 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    placeholder="jane@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-brand-light border border-gray-200 rounded-xl px-4 py-3 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                    Message Details
                  </label>
                  <textarea 
                    rows="6"
                    required
                    placeholder="Describe your design customisation, dimensions, color preferences, or bulk order quantity inquiries here."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-brand-light border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-dark hover:bg-brand-red text-white font-bold uppercase tracking-wider text-xs py-4 rounded-xl shadow-md transition-all active:scale-[0.99]"
                >
                  Send Message via WhatsApp
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;
