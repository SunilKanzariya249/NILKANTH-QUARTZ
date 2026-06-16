import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Phone, ArrowUp } from "lucide-react"; // icon library
import { FaWhatsapp } from "react-icons/fa";

const StickyContactButtons = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const phoneNumber = "+919898693626"; // change your number
  const whatsappNumber = "919898693626"; // without + (country code required)
  const message = "Hello sir, I want product inquiry from website";

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <>
      {/* Left side Sticky Buttons - Only shown on Home Page */}
      {isHomePage && (
        <div className="fixed bottom-5 left-5 z-50 flex flex-col gap-3">
          {/* Call Button */}
          <a
            href={`tel:${phoneNumber}`}
            className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
          >
            <Phone size={22} />
          </a>

          {/* WhatsApp Button */}
          <a
            href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20b858] text-white p-2 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center"
          >
            <FaWhatsapp size={29} />
          </a>
        </div>
      )}

      {/* Right side Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-5 right-5 z-50 bg-black hover:bg-brand-red text-white p-3.5 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center border border-white/10"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </>
  );
};

export default StickyContactButtons;
