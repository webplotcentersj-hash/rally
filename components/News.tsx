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
  const [expandedId, setExpandedId] = useState<string | null>(null);
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
            {newsItems.map((item, index) => {
              const isExpanded = expandedId === item.id;
              const firstImage = item.images?.[0];

              return (
                <article
                  key={item.id}
                  className={`bg-white/5 border border-white/10 rounded-xl overflow-hidden transition-all duration-300 scroll-animate ${
                    isVisible ? 'animate' : ''
                  } ${isExpanded ? 'border-[#65b330]/50' : 'hover:border-[#65b330]/30'}`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  {/* Una sola foto: la primera */}
                  {firstImage && (
                    <div className="relative aspect-video w-full overflow-hidden bg-white/5">
                      <Image
                        src={firstImage}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 896px"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <time
                      dateTime={item.date}
                      className="text-sm text-[#65b330] font-semibold uppercase tracking-wide block mb-2"
                    >
                      {formatDate(item.date)}
                    </time>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-4">{item.title}</h3>

                    {!isExpanded ? (
                      <>
                        <p className="text-gray-400 leading-relaxed line-clamp-3">{item.excerpt}</p>
                        <button
                          type="button"
                          onClick={() => setExpandedId(item.id)}
                          className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#65b330] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#4a8a26]"
                        >
                          Leer más
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                          {item.body || item.excerpt}
                        </div>
                        {/* Resto de fotos solo cuando está expandido */}
                        {item.images && item.images.length > 1 && (
                          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {item.images.slice(1).map((src, i) => (
                              <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden bg-white/5">
                                <Image
                                  src={src}
                                  alt={`${item.title} - imagen ${i + 2}`}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 640px) 50vw, 33vw"
                                  unoptimized
                                />
                              </div>
                            ))}
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => setExpandedId(null)}
                          className="mt-6 inline-flex items-center gap-1.5 text-[#65b330] font-medium text-sm hover:underline"
                        >
                          Ver menos
                          <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
