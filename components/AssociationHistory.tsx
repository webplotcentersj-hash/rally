'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function AssociationHistory() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={`relative w-full bg-black py-12 md:py-16 overflow-hidden section-transition ${
        isVisible ? 'animate' : ''
      }`}
    >
      <div className="container mx-auto px-4">
        <div className={`flex justify-center items-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <div className="relative w-full max-w-7xl">
            <Image
              src="http://plotcenter.com.ar/wp-content/uploads/2026/01/asociacion-con-historia_1.png"
              alt="Una Asociación con Historia"
              width={1200}
              height={600}
              className="w-full h-auto object-contain rounded-lg shadow-2xl"
              unoptimized
              priority
            />
            {/* Efecto de brillo sutil al hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 rounded-lg pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
