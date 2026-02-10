'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { newsItems } from '@/lib/news-data';

function formatDate(iso: string): string {
  const d = new Date(iso);
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export default function News() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <section
      id="noticias"
      ref={sectionRef}
      className={`bg-black py-16 md:py-24 relative overflow-hidden section-transition ${isVisible ? 'animate' : ''}`}
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className={`text-center mb-10 scroll-animate ${isVisible ? 'animate' : ''}`}>
            <h2 className="title-section font-bold text-white uppercase tracking-tight mb-4">
              Noticias
            </h2>
            <div className="w-32 h-0.5 bg-[#65b330] mx-auto mb-6" />
            <p className="text-lg md:text-xl text-gray-300">
              Últimas novedades del Safari Tras las Sierras
            </p>
          </div>

          <div className="space-y-8">
            {newsItems.map((item, index) => (
              <article
                key={item.id}
                className={`bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-[#65b330]/50 transition-all duration-300 scroll-animate ${
                  isVisible ? 'animate' : ''
                }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                {item.images && item.images.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 p-4">
                    {item.images.map((src, i) => (
                      <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden bg-white/5">
                        <Image
                          src={src}
                          alt={`${item.title} - imagen ${i + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          unoptimized
                        />
                      </div>
                    ))}
                  </div>
                )}
                <div className="p-6 pt-0">
                  <time
                    dateTime={item.date}
                    className="text-sm text-[#65b330] font-semibold uppercase tracking-wide block mb-2"
                  >
                    {formatDate(item.date)}
                  </time>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4">{item.title}</h3>
                  {item.body ? (
                    <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                      {item.body}
                    </div>
                  ) : (
                    <p className="text-gray-400 leading-relaxed">{item.excerpt}</p>
                  )}
                  {item.href && (
                    <a
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center gap-1 mt-4 text-[#65b330] font-medium text-sm hover:underline"
                    >
                      Leer más
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
