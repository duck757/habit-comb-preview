export function StoreButtons({ invert = false }: { invert?: boolean }) {
  const base = invert
    ? "bg-white text-foreground"
    : "bg-foreground text-white";

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <a
        href="#"
        className={`group inline-flex items-center gap-3 ${base} rounded-2xl px-5 py-3 hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-comb`}
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" aria-hidden>
          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
        </svg>
        <div className="text-left leading-tight">
          <div className="text-[10px] opacity-80">Download on the</div>
          <div className="text-lg font-bold -mt-0.5">App Store</div>
        </div>
      </a>

      <a
        href="#"
        className={`group inline-flex items-center gap-3 ${base} rounded-2xl px-5 py-3 hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-comb`}
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7" aria-hidden>
          <path fill="#34A853" d="M3.6 20.7c.3.5.7.9 1.2 1.1.5.2 1 .2 1.5.1l11.4-3.3-3.7-6.4L3.6 20.7z" />
          <path fill="#4285F4" d="M2.5 19.2L13 9.6 2.5 3.4c-.4.4-.6.9-.6 1.5v12.8c0 .6.2 1.1.6 1.5z" />
          <path fill="#FBBC04" d="M21.5 11l-3.6-2.1-3.6 3.1 3.6 3.1 3.6-2.1c1.1-.7 1.1-2.3 0-3z" />
          <path fill="#EA4335" d="M6.3 2.1c-.6-.2-1.1 0-1.5.2L15.4 8.6l3-2.6L6.3 2.1z" />
        </svg>
        <div className="text-left leading-tight">
          <div className="text-[10px] opacity-80">GET IT ON</div>
          <div className="text-lg font-bold -mt-0.5">Google Play</div>
        </div>
      </a>
    </div>
  );
}
