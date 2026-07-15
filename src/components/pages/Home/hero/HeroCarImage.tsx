export function HeroCarImage() {
  return (
    <div className="relative flex min-h-[320px] w-full items-center justify-center overflow-visible pt-2 lg:min-h-[500px] lg:justify-end lg:self-start lg:pt-4 xl:min-h-[560px] xl:pt-6">
      <div className="hero-drive-stage" aria-hidden="true">
        <div className="hero-speed-lines">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="hero-road-glow" />
        <svg
          viewBox="0 0 980 520"
          role="img"
          aria-label="Animated neon outline of a car driving forward"
          className="hero-wire-car"
        >
          <defs>
            <linearGradient id="hero-car-stroke" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#31f3ff" />
              <stop offset="48%" stopColor="#127fb4" />
              <stop offset="100%" stopColor="#b64dff" />
            </linearGradient>
            <radialGradient id="hero-car-core" cx="50%" cy="44%" r="55%">
              <stop offset="0%" stopColor="#39eaff" stopOpacity="0.34" />
              <stop offset="58%" stopColor="#0f6f94" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>
            <filter id="hero-car-glow" x="-35%" y="-35%" width="170%" height="170%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="0 0 0 0 0.05 0 0 0 0 0.82 0 0 0 0 1 0 0 0 0.7 0"
              />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <ellipse cx="510" cy="255" rx="390" ry="190" fill="url(#hero-car-core)" />
          <path
            className="hero-car-body-line hero-car-line"
            d="M102 324 C130 250 203 219 310 211 L395 126 C430 91 488 78 566 86 L674 104 C727 114 771 145 813 198 L896 222 C932 233 951 258 952 294 L948 333 C945 354 929 367 900 369 L806 369 C790 321 759 297 714 297 C668 297 633 323 619 369 L360 369 C343 321 309 297 262 297 C217 297 183 323 169 369 L128 369 C90 369 74 350 84 319 Z"
            fill="none"
            stroke="url(#hero-car-stroke)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="7"
            filter="url(#hero-car-glow)"
          />
          <path
            className="hero-car-line hero-car-line-delay-1"
            d="M328 209 L407 136 C438 108 482 100 543 105 L642 120 C687 128 725 155 763 203 L331 203"
            fill="none"
            stroke="url(#hero-car-stroke)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="5"
          />
          <path
            className="hero-car-line hero-car-line-delay-2"
            d="M438 136 L420 202 M558 107 L571 202 M650 122 L621 202 M203 259 C320 268 515 269 799 247 M152 313 L292 313 M389 315 L607 315 M810 312 L934 302"
            fill="none"
            stroke="#59efff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity="0.7"
            strokeWidth="3"
          />
          <path
            className="hero-car-line hero-car-line-delay-3"
            d="M837 224 C857 241 867 263 864 290 M875 240 L931 252 M133 322 C164 301 196 289 231 286 M320 214 C392 238 517 242 768 217"
            fill="none"
            stroke="#c65aff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity="0.55"
            strokeWidth="3"
          />
          <g className="hero-wheel hero-front-wheel" transform="translate(714 369)">
            <circle r="68" fill="#03141a" stroke="url(#hero-car-stroke)" strokeWidth="7" />
            <circle r="31" fill="none" stroke="#80f7ff" strokeOpacity="0.85" strokeWidth="5" />
            <path d="M0 -55 L0 55 M-55 0 L55 0 M-39 -39 L39 39 M39 -39 L-39 39" stroke="#6ff6ff" strokeOpacity="0.48" strokeWidth="3" />
          </g>
          <g className="hero-wheel hero-rear-wheel" transform="translate(262 369)">
            <circle r="68" fill="#03141a" stroke="url(#hero-car-stroke)" strokeWidth="7" />
            <circle r="31" fill="none" stroke="#80f7ff" strokeOpacity="0.85" strokeWidth="5" />
            <path d="M0 -55 L0 55 M-55 0 L55 0 M-39 -39 L39 39 M39 -39 L-39 39" stroke="#6ff6ff" strokeOpacity="0.48" strokeWidth="3" />
          </g>
          <path
            className="hero-headlight"
            d="M875 280 C923 274 956 280 976 296 C951 309 914 313 862 306"
            fill="#68f4ff"
            fillOpacity="0.16"
            stroke="#8dfcff"
            strokeWidth="3"
          />
        </svg>
      </div>
    </div>
  );
}
