import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Award, 
  Package, 
  PiggyBank, 
  Truck, 
  Brush, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Minus,
  MessageSquare,
  Send,
  Clock
} from 'lucide-react';
import { useProductStore } from '../store/useProductStore';
import ProductCard from '../components/ProductCard';
import SkeletonLoader from '../components/SkeletonLoader';
import SEO from '../components/SEO';

// Hero Slide Content
const HERO_SLIDES = [
  {
    image: '/hero banner/nilkanth quartz hero banner.png',
    link: '/products'
  },
  {
    image: '/hero banner/anchor clock banner.png',
    link: '/products'
  },
  {
    image: '/hero banner/decorative clock banner.png',
    link: '/products?category=Designer%20Clocks'
  },
  
];

// Why Choose Us Info
const WHY_CHOOSE_US = [
  {
    icon: <Award className="w-8 h-8 text-brand-red" />,
    title: 'Premium Quality',
    desc: 'Each clock goes through rigid 24-hour timekeeping accuracy calibration and material stress tests.'
  },
  {
    icon: <Package className="w-8 h-8 text-brand-red" />,
    title: 'Bulk Orders Available',
    desc: 'Direct-to-factory production routes allow us to deliver thousands of customized units in quick lead times.'
  },
  {
    icon: <PiggyBank className="w-8 h-8 text-brand-red" />,
    title: 'Competitive Pricing',
    desc: 'Morbi-based manufacturing cluster benefits enable us to quote wholesale prices directly to clients.'
  },
  {
    icon: <Truck className="w-8 h-8 text-brand-red" />,
    title: 'Fast Delivery',
    desc: 'Partnered with reliable domestic and ocean freight carriers ensuring safely packaged door-step deliveries.'
  },
  {
    icon: <Brush className="w-8 h-8 text-brand-red" />,
    title: 'Custom Branding',
    desc: 'Personalize dial faces with company logos, custom graphics, colors, and promotional messages.'
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-brand-red" />,
    title: 'Customer Satisfaction',
    desc: 'Highly responsive client support teams to assist through order design, transport, and warranty inquiries.'
  }
];

// Testimonials
const TESTIMONIALS = [
  {
    name: 'Rajesh Mehta',
    role: 'Procurement Head, Synergy Corporate',
    text: 'Nilkanth Quartz delivered 500 branded clocks for our annual gifting drive. The print clarity of our logo on the dials was immaculate, and the clocks feel extremely premium.',
    rating: 5
  },
  {
    name: 'Sarah Dsouza',
    role: 'Interior Designer',
    text: 'I regularly source their Acrylic and Gear wall clocks for my villa projects. They act as absolute statement pieces on empty wall backdrops. Highly recommended!',
    rating: 5
  },
  {
    name: 'Arjun Patel',
    role: 'Distributor, AP Electronics',
    text: 'Direct wholesale rates and extremely quick packaging. The silent-sweep quartz motors have received zero complaints from my retail customers in the last 2 years.',
    rating: 5
  }
];

// FAQs
const FAQS = [
  {
    q: 'Do your wall clocks have ticking sounds?',
    a: 'No, all Nilkanth Quartz wall clocks utilize premium silent-sweep quartz movements which move the second hand smoothly without any audible ticking sounds.'
  },
  {
    q: 'What is the minimum order quantity (MOQ) for corporate branding?',
    a: 'For customized logo printing on clock faces, the typical minimum order quantity starts from 100 units depending on the model chosen.'
  },
  {
    q: 'Can we order samples before locking in bulk purchase orders?',
    a: 'Yes! We can arrange prototype samples with your custom dial logo. Contact our sales desk directly to coordinate sample shipment.'
  },
  {
    q: 'What material are the clock frames made of?',
    a: 'We use high-grade ABS engineering plastics, premium wood, metals (aluminium), and laser-cut thick acrylic polymers to ensure lasting structural integrity.'
  }
];

const Home = () => {
  const { categories, featuredProducts, fetchCategories, fetchFeaturedProducts, loading } = useProductStore();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  
  // Quick contact form state
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchFeaturedProducts();
  }, [fetchCategories, fetchFeaturedProducts]);

  // Auto scroll Hero Slider
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(slideInterval);
  }, []);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.message) return;
    
    // Redirect to WhatsApp
    const whatsappMessage = `Hello Nilkanth Quartz,\nMy Name: ${contactForm.name}\nEmail: ${contactForm.email || 'N/A'}\nMessage: ${contactForm.message}`;
    const url = `https://wa.me/919426842751?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, '_blank');
    
    setFormSent(true);
    setContactForm({ name: '', email: '', message: '' });
    setTimeout(() => setFormSent(false), 5000);
  };

  return (
    <div className="bg-brand-light">
      <SEO 
        title="Nilkanth Quartz | Premium Wall Clock Manufacturers" 
        description="Premium silent-sweep wall clocks for designer homes, modern offices, and custom corporate branding. Crafted directly in Morbi, India."
      />

      {/* 1. HERO SECTION */}
      <section className="relative aspect-[16/9] w-full overflow-hidden bg-brand-dark">
        {HERO_SLIDES.map((slide, idx) => (
          <Link
            key={idx}
            to={slide.link}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <img 
              src={slide.image} 
              alt={`Hero banner ${idx + 1}`} 
              className="w-full h-full object-cover md:object-cover object-center"
            />
          </Link>
        ))}

        {/* Navigation Arrows */}
        <button 
          onClick={handlePrevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-brand-red text-white p-2.5 rounded-full transition-colors backdrop-blur-md"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={handleNextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/30 hover:bg-brand-red text-white p-2.5 rounded-full transition-colors backdrop-blur-md"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </section>

      

      {/* 2. ABOUT COMPANY SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            {/* Ambient visual decorations */}
            <div className="absolute -inset-4 bg-brand-red/5 rounded-3xl blur-xl" />
            <img 
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop" 
              alt="Premium Interior Wall Clock Decor" 
              className="relative rounded-2xl shadow-xl w-full object-cover aspect-[4/3] transform group-hover:scale-[1.01] transition-transform duration-500"
            />
            <div className="absolute -bottom-6 -right-6 bg-brand-dark text-white p-6 rounded-2xl shadow-xl max-w-xs hidden sm:block">
              <div className="flex items-center gap-3 mb-2">
                <Clock className="w-6 h-6 text-brand-red animate-spin-slow" />
                <span className="font-extrabold text-2xl">40+ Years</span>
              </div>
              <p className="text-xs text-gray-400">Of clock manufacturing, precision assembly, and global exporting heritage.</p>
            </div>
          </div>

          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-red">Who We Are</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
              Crafting Excellence In Every Second
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              Welcome to **Nilkanth Quartz**, a premier name in modern wall clock designs. Headquartered in Morbi, Gujarat, our manufacturing operations blend traditional quality standards with avant-garde interior aesthetics.
            </p>
            <p className="text-gray-600 leading-relaxed text-sm">
              We specialize in custom bulk orders for corporate gifting, brand marketing drives, and retail distribution partnerships. Every single timepiece is fitted with our signature silent sweep mechanism, ensuring your space is filled with style, not noise.
            </p>
            <div className="pt-4">
              <Link 
                to="/about" 
                className="inline-flex items-center gap-2 text-brand-red font-bold text-sm hover:underline"
              >
                Read Our Story & Journey <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
{/* INFINITE TEXT MARQUEE SLIDER */}
      <section className="bg-[#f5f5f5] overflow-hidden py-8 select-none">
        <div className="flex w-full overflow-hidden">
          <div className="animate-marquee whitespace-nowrap flex items-center">
            {/* Block 1 */}
            {[...Array(6)].map((_, i) => (
              <span key={`b1-${i}`} className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tight mx-8 flex items-center">
                <span className="text-black font-extrabold">NILKANTH</span>
                <span className="text-stroke-black font-light ml-4">QUARTZ</span>
              </span>
            ))}
            {/* Block 2 (Duplicate for seamless loop) */}
            {[...Array(6)].map((_, i) => (
              <span key={`b2-${i}`} className="text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-tight mx-8 flex items-center">
                <span className="text-black font-extrabold">NILKANTH</span>
                <span className="text-stroke-black font-light ml-4">QUARTZ</span>
              </span>
            ))}
          </div>
        </div>
      </section>
      {/* 3. WHY CHOOSE US SECTION */}
      <section className="py-24 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-red">Our Pillars</span>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Engineered for Perfection</h2>
            <p className="text-gray-500 text-sm">Why businesses and designers choose Nilkanth Quartz timepieces worldwide.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_CHOOSE_US.map((item, idx) => (
              <div 
                key={idx} 
                className="p-8 bg-brand-light rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 space-y-4 flex flex-col items-start"
              >
                <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-50">
                  {item.icon}
                </div>
                <h3 className="font-bold text-lg text-gray-900">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. OUR CATEGORIES SECTION */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-red">Collections</span>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Explore Dynamic Categories</h2>
          <p className="text-gray-500 text-sm">Browse our wide variety of industrial and domestic wall clock models.</p>
        </div>

        {categories.length === 0 ? (
          <SkeletonLoader type="categories" />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/category/${cat.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                state={{ categoryName: cat }}
                className="bg-white rounded-2xl p-6 text-center border border-gray-100 hover:border-brand-red shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center group"
              >
                <div className="w-16 h-16 rounded-full bg-brand-light flex items-center justify-center mb-4 group-hover:bg-brand-red/10 transition-colors">
                  <Clock className="w-7 h-7 text-brand-dark group-hover:text-brand-red transition-colors" />
                </div>
                <span className="font-bold text-gray-900 group-hover:text-brand-red text-sm transition-colors line-clamp-1">
                  {cat}
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* 5. OUR COLLECTION (FEATURED PRODUCTS) */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-16 gap-6">
            <div className="space-y-3 text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-red">Curated Collection</span>
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Featured Showpieces</h2>
              <p className="text-gray-500 text-sm">Take a look at our highly sought after designer and office clock models.</p>
            </div>
            <Link
              to="/products"
              className="bg-brand-dark hover:bg-brand-red text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all duration-300 active:scale-95"
            >
              View Full Catalog
            </Link>
          </div>

          {loading ? (
            <SkeletonLoader count={4} />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {featuredProducts.slice(0, 4).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
              {featuredProducts.length === 0 && (
                <div className="col-span-full py-12 text-center text-gray-400">
                  No featured products available. Try seeding the database.
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 6. CUSTOMER REVIEWS (TESTIMONIALS SLIDER) */}
      <section className="py-24 bg-brand-dark text-white overflow-hidden relative">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-brand-red/5 blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-red">Testimonials</span>
          <h2 className="text-3xl font-extrabold tracking-tight">Delighted Customer Feedback</h2>
          
          <div className="relative min-h-[180px] flex items-center justify-center">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className={`transition-all duration-500 transform ${
                  idx === activeTestimonial 
                    ? 'opacity-100 scale-100 relative' 
                    : 'opacity-0 scale-95 absolute pointer-events-none'
                }`}
              >
                <p className="text-lg sm:text-xl font-medium leading-relaxed italic text-gray-200 max-w-2xl mx-auto">
                  "{t.text}"
                </p>
                <div className="mt-6">
                  <h4 className="font-bold text-brand-red">{t.name}</h4>
                  <span className="text-xs text-gray-500">{t.role}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Slider Controls */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setActiveTestimonial((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
              className="p-2 rounded-full border border-white/10 hover:border-brand-red hover:bg-brand-red text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-1.5">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTestimonial(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === activeTestimonial ? 'bg-brand-red w-4' : 'bg-white/20'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length)}
              className="p-2 rounded-full border border-white/10 hover:border-brand-red hover:bg-brand-red text-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. FAQ ACCORDION SECTION */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-red">Got Questions?</span>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = idx === openFaq;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                  className="w-full flex items-center justify-between p-6 font-bold text-gray-900 text-left hover:text-brand-red transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <Minus className="w-5 h-5 text-brand-red shrink-0" />
                  ) : (
                    <Plus className="w-5 h-5 text-gray-400 shrink-0" />
                  )}
                </button>
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-40 border-t border-gray-50' : 'max-h-0'
                  }`}
                >
                  <p className="p-6 text-sm text-gray-500 leading-relaxed bg-gray-50/50">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. QUICK CONTACT INQUIRY */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-red">Let's Connect</span>
              <h2 className="text-3xl font-extrabold text-brand-dark tracking-tight">
                Interested in Custom Bulk Orders?
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Whether you need promotional gifting, hotel customization, wholesale dealership contracts, or specific clock dimensions, drop your message here. We will redirect you to discuss directly on WhatsApp.
              </p>
              
              <div className="flex items-center gap-3 text-sm font-semibold text-brand-red">
                <MessageSquare className="w-5 h-5 animate-pulse" />
                <span>Response Time: Usually under 15 minutes</span>
              </div>
            </div>

            <div className="lg:col-span-7 bg-brand-light p-8 sm:p-10 rounded-3xl border border-gray-100 shadow-sm relative">
              {formSent ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-500">
                    <Send className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Inquiry Redirected!</h3>
                  <p className="text-sm text-gray-500">We opened WhatsApp web/app. Check your window to complete sending.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                        Your Name
                      </label>
                      <input 
                        type="text" 
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-brand-red"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                        Email Address (Optional)
                      </label>
                      <input 
                        type="email" 
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-brand-red"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                      Inquiry Details
                    </label>
                    <textarea 
                      rows="4"
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Hi, I am interested in ordering 200 promotional wall clocks. Please share quotes."
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:border-brand-red resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-brand-dark hover:bg-brand-red text-white font-bold uppercase tracking-wider text-xs py-4 rounded-xl shadow-md transition-all active:scale-[0.99]"
                  >
                    Send Inquiry via WhatsApp
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
