export default function About() {
  return (
    <section 
      id="sobre" 
      className="relative overflow-visible"
      style={{
        backgroundImage: 'url(https://plotcenter.com.ar/wp-content/uploads/2026/01/Recurso-1-3.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        paddingTop: '80px'
      }}
    >
      {/* Efecto de huellas de autos que se superponen a la sección anterior */}
      <div className="absolute -top-24 left-0 right-0 h-48 z-30 overflow-visible pointer-events-none">
        {/* Huellas de neumáticos - Patrón SVG */}
        <svg 
          className="w-full h-full opacity-30"
          viewBox="0 0 1200 200" 
          preserveAspectRatio="none"
          style={{ transform: 'translateY(-20px)' }}
        >
          {/* Huella izquierda */}
          <g transform="translate(100, 50)">
            {/* Rueda delantera */}
            <ellipse cx="0" cy="0" rx="35" ry="20" fill="#333" opacity="0.4" />
            <ellipse cx="0" cy="0" rx="25" ry="15" fill="#555" opacity="0.3" />
            {/* Patrón de neumático */}
            <path d="M -30 -10 Q -20 -15 -10 -10 T 10 -10 Q 20 -15 30 -10" stroke="#222" strokeWidth="2" fill="none" opacity="0.5" />
            <path d="M -30 10 Q -20 15 -10 10 T 10 10 Q 20 15 30 10" stroke="#222" strokeWidth="2" fill="none" opacity="0.5" />
            
            {/* Rueda trasera */}
            <ellipse cx="120" cy="0" rx="35" ry="20" fill="#333" opacity="0.4" />
            <ellipse cx="120" cy="0" rx="25" ry="15" fill="#555" opacity="0.3" />
            <path d="M 90 -10 Q 100 -15 110 -10 T 130 -10 Q 140 -15 150 -10" stroke="#222" strokeWidth="2" fill="none" opacity="0.5" />
            <path d="M 90 10 Q 100 15 110 10 T 130 10 Q 140 15 150 10" stroke="#222" strokeWidth="2" fill="none" opacity="0.5" />
            
            {/* Línea de conexión */}
            <line x1="35" y1="0" x2="85" y2="0" stroke="#333" strokeWidth="3" opacity="0.3" />
          </g>
          
          {/* Huella central */}
          <g transform="translate(500, 80)">
            <ellipse cx="0" cy="0" rx="40" ry="22" fill="#333" opacity="0.4" />
            <ellipse cx="0" cy="0" rx="28" ry="16" fill="#555" opacity="0.3" />
            <path d="M -35 -12 Q -25 -18 -15 -12 T 15 -12 Q 25 -18 35 -12" stroke="#222" strokeWidth="2.5" fill="none" opacity="0.5" />
            <path d="M -35 12 Q -25 18 -15 12 T 15 12 Q 25 18 35 12" stroke="#222" strokeWidth="2.5" fill="none" opacity="0.5" />
            
            <ellipse cx="130" cy="0" rx="40" ry="22" fill="#333" opacity="0.4" />
            <ellipse cx="130" cy="0" rx="28" ry="16" fill="#555" opacity="0.3" />
            <path d="M 95 -12 Q 105 -18 115 -12 T 145 -12 Q 155 -18 165 -12" stroke="#222" strokeWidth="2.5" fill="none" opacity="0.5" />
            <path d="M 95 12 Q 105 18 115 12 T 145 12 Q 155 18 165 12" stroke="#222" strokeWidth="2.5" fill="none" opacity="0.5" />
            
            <line x1="40" y1="0" x2="90" y2="0" stroke="#333" strokeWidth="4" opacity="0.3" />
          </g>
          
          {/* Huella derecha */}
          <g transform="translate(900, 30)">
            <ellipse cx="0" cy="0" rx="38" ry="21" fill="#333" opacity="0.4" />
            <ellipse cx="0" cy="0" rx="27" ry="15" fill="#555" opacity="0.3" />
            <path d="M -33 -11 Q -23 -16 -13 -11 T 13 -11 Q 23 -16 33 -11" stroke="#222" strokeWidth="2" fill="none" opacity="0.5" />
            <path d="M -33 11 Q -23 16 -13 11 T 13 11 Q 23 16 33 11" stroke="#222" strokeWidth="2" fill="none" opacity="0.5" />
            
            <ellipse cx="125" cy="0" rx="38" ry="21" fill="#333" opacity="0.4" />
            <ellipse cx="125" cy="0" rx="27" ry="15" fill="#555" opacity="0.3" />
            <path d="M 92 -11 Q 102 -16 112 -11 T 138 -11 Q 148 -16 158 -11" stroke="#222" strokeWidth="2" fill="none" opacity="0.5" />
            <path d="M 92 11 Q 102 16 112 11 T 138 11 Q 148 16 158 11" stroke="#222" strokeWidth="2" fill="none" opacity="0.5" />
            
            <line x1="38" y1="0" x2="87" y2="0" stroke="#333" strokeWidth="3" opacity="0.3" />
          </g>
        </svg>
      </div>
    </section>
  );
}
