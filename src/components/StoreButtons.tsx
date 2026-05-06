export function StoreButtons({ invert = false }: { invert?: boolean }) {
  const base = invert
    ? "bg-white text-foreground"
    : "bg-foreground text-white";

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {/* Google Play — available now */}
      <a
        href="https://play.google.com/store/apps/details?id=com.plensync.habitcomb&pcampaignid=web_share"
        target="_blank"
        rel="noopener noreferrer"
        className={`group inline-flex items-center gap-3 ${base} rounded-2xl px-5 py-3 hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-comb`}
      >
        <svg viewBox="0 0 512 512" className="w-7 h-7" aria-hidden>
          <path
            fill="#34A853"
            d="M325.3 234.3 104.6 13l280.8 161.2-60.1 60.1z"
          />
          <path
            fill="#FBBC04"
            d="M104.6 499 325.3 277.7l60.1 60.1L104.6 499z"
          />
          <path
            fill="#4285F4"
            d="M86 16.1c-9.7 5.4-15.7 15.4-15.7 28.7v422.4c0 13.3 6 23.3 15.7 28.7l239.3-243.6L86 16.1z"
          />
          <path
            fill="#EA4335"
            d="M484.3 226.6 385.4 174.2l-60.1 60.1 60.1 60.1 99.8-52.4c19.6-15.4 19.6-31.4-.9-45.4z"
          />
        </svg>
        <div className="text-left leading-tight">
          <div className="text-[10px] opacity-80">GET IT ON</div>
          <div className="text-lg font-bold -mt-0.5">Google Play</div>
        </div>
      </a>

      {/* App Store — coming soon */}
      <a
        href="#"
        aria-disabled="true"
        className={`relative group inline-flex items-center gap-3 ${base} rounded-2xl px-5 py-3 opacity-60 cursor-not-allowed shadow-comb`}
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" aria-hidden>
          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
        </svg>
        <div className="text-left leading-tight">
          <div className="text-[10px] opacity-80">COMING SOON TO</div>
          <div className="text-lg font-bold -mt-0.5">App Store</div>
        </div>
        <span className="absolute -top-2 -right-2 bg-accent text-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
          SOON
        </span>
      </a>
    </div>
  );
}
