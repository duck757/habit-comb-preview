export function StoreButtons({ invert = false }: { invert?: boolean }) {
  const base = invert
    ? "bg-background text-foreground"
    : "bg-foreground text-background";
  const ghost = invert
    ? "border border-background/40 text-background/70"
    : "border border-foreground/30 text-foreground/60";

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <a
        href="#"
        className={`group flex items-center gap-3 ${base} px-6 py-4 hover:opacity-90 transition-opacity`}
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden>
          <path d="M3.6 20.7c.3.5.7.9 1.2 1.1.5.2 1 .2 1.5.1l11.4-3.3-3.7-6.4L3.6 20.7zM2.5 19.2L13 9.6 2.5 3.4c-.4.4-.6.9-.6 1.5v12.8c0 .6.2 1.1.6 1.5zM21.5 11l-3.6-2.1-3.6 3.1 3.6 3.1 3.6-2.1c1.1-.7 1.1-2.3 0-3zM6.3 2.1c-.6-.2-1.1 0-1.5.2L15.4 8.6l3-2.6L6.3 2.1z"/>
        </svg>
        <div className="text-left leading-none">
          <div className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-70">Get it on</div>
          <div className="text-base font-bold uppercase tracking-wide mt-1">Google Play</div>
        </div>
      </a>

      <div className={`relative flex items-center gap-3 ${ghost} px-6 py-4`}>
        <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden>
          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
        </svg>
        <div className="text-left leading-none">
          <div className="text-[9px] font-bold uppercase tracking-[0.2em] opacity-70">Coming soon</div>
          <div className="text-base font-bold uppercase tracking-wide mt-1">App Store</div>
        </div>
      </div>
    </div>
  );
}
