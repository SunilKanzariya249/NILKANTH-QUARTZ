import React, { useEffect, useRef, useState } from 'react';
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
  Clock,
  ArrowUpRight,
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
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
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);
  
  // Quick contact form state
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [formSent, setFormSent] = useState(false);

  // Cloned slides array for infinite carousel
  const slidesWithClones = [
    HERO_SLIDES[HERO_SLIDES.length - 1],
    ...HERO_SLIDES,
    HERO_SLIDES[0]
  ];

  useEffect(() => {
    fetchCategories();
    fetchFeaturedProducts();
  }, [fetchCategories, fetchFeaturedProducts]);

  // Re-enable transition after snap jumps
  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  // Auto scroll Hero Slider (only auto scroll when not dragging)
  useEffect(() => {
    if (isDragging) return;
    const slideInterval = setInterval(() => {
      handleNextSlide();
    }, 6000);
    return () => clearInterval(slideInterval);
  }, [isTransitioning, currentSlide, isDragging]);

  const handleNextSlide = () => {
    if (!isTransitioning) return;
    if (currentSlide >= HERO_SLIDES.length + 1) return;
    setCurrentSlide((prev) => prev + 1);
  };

  const handlePrevSlide = () => {
    if (!isTransitioning) return;
    if (currentSlide <= 0) return;
    setCurrentSlide((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    if (currentSlide === 0) {
      setIsTransitioning(false);
      setCurrentSlide(HERO_SLIDES.length);
    } else if (currentSlide === HERO_SLIDES.length + 1) {
      setIsTransitioning(false);
      setCurrentSlide(1);
    }
  };

  const handleDragStart = (clientX) => {
    if (!isTransitioning) return;

    // Safety snap if dragging starts directly on a boundary
    if (currentSlide === 0) {
      setIsTransitioning(false);
      setCurrentSlide(HERO_SLIDES.length);
    } else if (currentSlide === HERO_SLIDES.length + 1) {
      setIsTransitioning(false);
      setCurrentSlide(1);
    }

    setStartX(clientX);
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleDragMove = (clientX) => {
    if (!isDragging) return;
    setDragOffset(clientX - startX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 80; // pixels to trigger slide change
    if (dragOffset < -threshold) {
      handleNextSlide();
    } else if (dragOffset > threshold) {
      handlePrevSlide();
    }
    setDragOffset(0);
  };

  // Category Slider State & Refs
  const categoryPosters = [
    { src: "/category poster/anchor clock poster .png", link: "/category/anchor-clocks" },
    { src: "/category poster/antique clock poster.png", link: "/category/antique-clocks" },
    { src: "/category poster/corporate clock poster.png", link: "/category/corporate-clocks" },
    { src: "/category poster/designer clock poster.png", link: "/category/designer-clocks" },
    { src: "/category poster/office clock poster.png", link: "/category/office-clocks" },
  ];
  const trackPosters = [...categoryPosters, ...categoryPosters, ...categoryPosters];

  const [catIndex, setCatIndex] = useState(5);
  const [catTransition, setCatTransition] = useState(true);
  const [catItemsPerPage, setCatItemsPerPage] = useState(4);
  const [catIsInteracting, setCatIsInteracting] = useState(false);

  const catTrackRef = useRef(null);
  const catIsAnimating = useRef(false);
  const catIsDownRef = useRef(false);
  const catInteractionTimeoutRef = useRef(null);
  const catStartX = useRef(0);
  const catHasDragged = useRef(false);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth >= 1280) {
        setCatItemsPerPage(4);
      } else if (window.innerWidth >= 1024) {
        setCatItemsPerPage(3);
      } else if (window.innerWidth >= 768) {
        setCatItemsPerPage(2);
      } else {
        setCatItemsPerPage(1);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const startCatInteraction = () => {
    setCatIsInteracting(true);
    if (catInteractionTimeoutRef.current) {
      clearTimeout(catInteractionTimeoutRef.current);
    }
  };

  const endCatInteraction = () => {
    if (catInteractionTimeoutRef.current) {
      clearTimeout(catInteractionTimeoutRef.current);
    }
    catInteractionTimeoutRef.current = setTimeout(() => {
      setCatIsInteracting(false);
    }, 4000);
  };

  const nextCatSlide = () => {
    if (catIsAnimating.current) return;
    catIsAnimating.current = true;
    setCatTransition(true);
    setCatIndex((p) => p + 1);
  };

  const prevCatSlide = () => {
    if (catIsAnimating.current) return;
    catIsAnimating.current = true;
    setCatTransition(true);
    setCatIndex((p) => p - 1);
  };

  const handleCatTouchStart = (e) => {
    startCatInteraction();
    catStartX.current = e.touches[0].clientX;
    catHasDragged.current = false;
  };

  const handleCatTouchMove = (e) => {
    const diff = Math.abs(catStartX.current - e.touches[0].clientX);
    if (diff > 10) {
      catHasDragged.current = true;
    }
  };

  const handleCatTouchEnd = (e) => {
    const diff = catStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) nextCatSlide();
    else if (diff < -50) prevCatSlide();
    endCatInteraction();
  };

  const handleCatMouseDown = (e) => {
    if (e.button !== 0) return;
    startCatInteraction();
    catIsDownRef.current = true;
    catStartX.current = e.clientX;
    catHasDragged.current = false;
  };

  const handleCatMouseMove = (e) => {
    if (!catIsDownRef.current) return;
    e.preventDefault();
    const diff = Math.abs(catStartX.current - e.clientX);
    if (diff > 10) {
      catHasDragged.current = true;
    }
  };

  const handleCatMouseUpOrLeave = (e) => {
    if (catIsDownRef.current) {
      catIsDownRef.current = false;
      const diff = catStartX.current - e.clientX;
      if (diff > 50) nextCatSlide();
      else if (diff < -50) prevCatSlide();
      endCatInteraction();
    }
  };

  useEffect(() => {
    if (catIsInteracting) return;

    const interval = setInterval(() => {
      if (!catIsAnimating.current) {
        catIsAnimating.current = true;
        setCatTransition(true);
        setCatIndex((p) => p + 1);
      }
    }, 3500);

    return () => clearInterval(interval);
  }, [catIsInteracting]);

  useEffect(() => {
    const track = catTrackRef.current;
    if (!track) return;

    const handleEnd = () => {
      catIsAnimating.current = false;
      if (catIndex >= categoryPosters.length * 2) {
        setCatTransition(false);
        setCatIndex(categoryPosters.length);
      }
      if (catIndex <= 0) {
        setCatTransition(false);
        setCatIndex(categoryPosters.length);
      }
    };

    track.addEventListener("transitionend", handleEnd);
    return () => track.removeEventListener("transitionend", handleEnd);
  }, [catIndex]);

  useEffect(() => {
    if (!catTransition) {
      catIsAnimating.current = false;
      requestAnimationFrame(() => {
        setCatTransition(true);
      });
    }
  }, [catTransition]);

  const handleCatLinkClick = (e) => {
    if (catHasDragged.current) {
      e.preventDefault();
      e.stopPropagation();
    }
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
      <section 
        className="relative aspect-[16/9] w-full overflow-hidden bg-brand-dark cursor-grab active:cursor-grabbing select-none"
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
      >
        {/* Sliding Track */}
        <div 
          className={`flex h-full ${isTransitioning && !isDragging ? 'transition-transform duration-1000 ease-in-out' : ''}`}
          style={{ transform: `translateX(calc(-${currentSlide * 100}% + ${dragOffset}px))` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slidesWithClones.map((slide, idx) => (
            <div
              key={idx}
              className="w-full h-full flex-shrink-0 block select-none"
              draggable="false"
            >
              <img 
                src={slide.image} 
                alt={`Hero banner ${idx + 1}`} 
                className="w-full h-full object-cover object-center select-none pointer-events-none"
                draggable="false"
              />
            </div>
          ))}
        </div>
      </section>

      

      {/* 2. ABOUT COMPANY SECTION */}
      <section className="relative py-20 bg-[#F7F7F5] overflow-hidden">
        {/* Subtle decorative geometric line accents */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04] text-brand-dark">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="15%" x2="100%" y2="15%" stroke="currentColor" strokeWidth="1" />
            <line x1="0" y1="85%" x2="100%" y2="85%" stroke="currentColor" strokeWidth="1" />
            <line x1="30%" y1="0" x2="30%" y2="100%" stroke="currentColor" strokeWidth="1" />
            <line x1="70%" y1="0" x2="70%" y2="100%" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start"
          >
            {/* Left Side */}
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red block">
               Who We Are
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-[70px] xl:text-[80px] font-semibold text-[#1C1C1C] leading-[1.05] tracking-tighter">
                Leading Wall Clock Manufacturers & Suppliers
              </h2>
            </div>

            {/* Right Side */}
            <div className="space-y-8 lg:pt-8">
              <div className="max-w-[550px] space-y-6">
                <p className="text-[#555555] font-normal text-lg sm:text-xl leading-relaxed">
                  Based in Morbi, Gujarat, Nilkanth Quartz is a leading manufacturer and supplier of high-quality wall clocks for homes, offices, institutions, and corporate gifting needs. We offer a wide range of innovative designs that blend style, precision, and durability.
                </p>
                <p className="text-[#666666] font-normal text-base sm:text-lg leading-relaxed">
                  With a focus on quality manufacturing, competitive pricing, and dependable service, we proudly serve customers across India and continue to deliver timepieces that inspire trust and elevate every space.
                </p>
              </div>

              {/* Bottom CTA */}
              <div className="pt-4">
                <Link 
                  to="/about" 
                  className="inline-flex items-center gap-4 group"
                >
                  <span className="text-sm font-bold uppercase tracking-[0.2em] text-[#1C1C1C] transition-colors group-hover:text-brand-red">
                    About Us
                  </span>
                  <span className="w-12 h-12 rounded-full border border-[#1C1C1C]/20 flex items-center justify-center transition-all duration-300 group-hover:border-brand-red group-hover:bg-brand-red text-[#1C1C1C] group-hover:text-white">
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
{/* INFINITE TEXT MARQUEE SLIDER */}
      <section className="relative w-full  overflow-hidden bg-white/10 pt-5 mt-5 select-none">
        {/* Infinite Scroll */}
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="flex items-center gap-20 px-10">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-10 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold uppercase tracking-[6px]"
                >
                  {/* Filled Text */}
                  <span className="text-black/90">Nilkanth</span>

                  {/* Outline Text */}
                  <span
                    className="text-black/10"
                    style={{
                      WebkitTextStroke: "",
                    }}
                  >
                    Quartz
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Animation */}
        <style>
          {`
            @keyframes marquee {
              from {
                transform: translateX(0%);
              }
              to {
                transform: translateX(-50%);
              }
            }

            .animate-marquee {
              width: max-content;
              animation: marquee 200s linear infinite;
            }

            .animate-marquee:hover {
              animation-play-state: paused;
            }
          `}
        </style>
      </section>

      {/* CATEGORY POSTER SLIDER SECTION */}
      <section className="relative bg-[#F3F4F6] py-20 overflow-hidden select-none">
        {/* Subtle decorative geometric line accents */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] text-brand-dark">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="20%" x2="100%" y2="20%" stroke="currentColor" strokeWidth="1" />
            <line x1="0" y1="80%" x2="100%" y2="80%" stroke="currentColor" strokeWidth="1" />
            <line x1="20%" y1="0" x2="20%" y2="100%" stroke="currentColor" strokeWidth="1" />
            <line x1="80%" y1="0" x2="80%" y2="100%" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        <div className="relative max-w-full mx-auto px-0 sm:px-8 lg:px-1 z-10">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3 pl-5 md:pl-40">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#666666]">
                COLLECTION
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[#1E293B] tracking-tight leading-tight max-w-2xl">
                Exploring the Craftsmanship of Luxury Clocks
              </h2>
            </div>
            <div className=' pl-5 md:pr-16 '>
              <Link 
                to="/products"
                className="inline-block px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#1E293B] border border-[#1E293B]/20 rounded-md hover:bg-[#1E293B] hover:text-white hover:border-[#1E293B] transition-all duration-300 active:scale-95"
              >
                MORE COLLECTION
              </Link>
            </div>
          </div>

          {/* Carousel Viewport Container */}
          <div
            className="relative overflow-hidden w-full cursor-grab active:cursor-grabbing"
            onTouchStart={handleCatTouchStart}
            onTouchMove={handleCatTouchMove}
            onTouchEnd={handleCatTouchEnd}
            onMouseDown={handleCatMouseDown}
            onMouseMove={handleCatMouseMove}
            onMouseUp={handleCatMouseUpOrLeave}
            onMouseLeave={handleCatMouseUpOrLeave}
          >
            {/* Translate Track */}
            <div
              ref={catTrackRef}
              className={`flex w-full ${
                catTransition ? "transition-transform duration-700 ease-in-out" : ""
              }`}
              style={{
                transform: `translate3d(calc(-${catIndex} * 100% / ${catItemsPerPage}), 0, 0)`,
              }}
            >
              {trackPosters.map((item, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 select-none"
                >
                  <div className="relative group overflow-hidden bg-neutral-50  shadow-md transition-all duration-300 hover:shadow-xl">
                    <Link
                      to={item.link}
                      onClick={handleCatLinkClick}
                      onDragStart={(e) => e.preventDefault()}
                      draggable="false"
                      className="block w-full h-auto cursor-pointer select-none"
                    >
                      <img
                        src={item.src}
                        alt={`Category Poster ${(idx % categoryPosters.length) + 1}`}
                        className="w-full h-auto aspect-[3/4] object-cover pointer-events-none block rounded-none select-none transform transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        draggable="false"
                      />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DESIGNED TO REFLECT YOUR STYLE SECTION */}
      <section className="relative w-full bg-white py-12 md:py-16 lg:py-24 border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-0">
            {/* Left Column: Poster Image */}
            <div className="col-span-1 lg:col-span-7 relative z-0">
              <div className="overflow-hidden rounded-none shadow-lg h-[320px] sm:h-[450px] lg:h-[580px]">
                <img
                  src="/design to rys poster .png"
                  alt="Designed to Reflect Your Style"
                  className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-102"
                />
              </div>
            </div>

            {/* Right Column: Overlapping Card Container */}
            <div className="col-span-1 lg:col-span-5 relative z-10 mt-6 lg:mt-0 lg:-ml-28 px-4 sm:px-6 lg:px-0">
              <div className="bg-[#f5f5f5] p-2 sm:p-10 lg:p-12 w-full max-w-lg rounded-none shadow-xl flex flex-col justify-between min-h-[320px] border border-white/20">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight leading-tight">
                    Designed to Reflect Your Style
                  </h3>
                  <div className="w-16 h-[2px] bg-brand-red my-5"></div>
                  <p className="text-md sm:text-md text-neutral-600 font-light leading-relaxed mb-8">
                    Looking for a unique timepiece that perfectly matches your style or brand? At <strong className="font-semibold text-neutral-800">Nilkanth Quartz</strong>, we offer customized designer wall clocks tailored to your preferences. Whether for corporate branding, personalized gifting, or exclusive interior designs, our custom wall clocks bring a personal touch to every space.
                  </p>
                </div>
                <div>
                  <Link
                    to="/category/designer-clocks"
                    className="relative inline-flex items-center h-10 rounded-full group overflow-hidden"
                  >
                    {/* Expanding background element */}
                    <span className="absolute inset-y-0 left-0 w-10 bg-white rounded-full shadow-md border border-neutral-100 transition-all duration-500 ease-in-out group-hover:w-full z-0" />
                    
                    {/* Arrow icon */}
                    <span className="w-10 h-10 flex items-center justify-center relative z-10 text-neutral-700 group-hover:translate-x-0.5 transition-transform duration-300">
                      <ArrowRight size={16} />
                    </span>
                    
                    {/* Button text */}
                    <span className="pl-2 pr-6 font-semibold text-xs uppercase tracking-widest text-neutral-500 group-hover:text-neutral-800 relative z-10 transition-colors duration-300">
                      Read More
                    </span>
                  </Link>
                </div>
              </div>
            </div>
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
