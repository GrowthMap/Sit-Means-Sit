/**
 * Sit Means Sit Dog Training Atlanta — Landing Page
 * Design: Direct-Response Conversion Machine
 * Colors: Royal Blue (#1a5fa8) + Signal Yellow (#f5c518) + Near-Black (#1a1a1a)
 * Typography: Oswald (headlines) + Source Sans 3 (body)
 * Goal: Single conversion — book the $47 consultation
 */

import { useEffect, useRef, useState } from "react";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310419663030816436/Ux7SXir7gHH4sW62VAeAr6/hero-dog-training-VnaM7GAGPFW5DVxdwi8CR6.webp";

const REVIEWS = [
  {
    name: "m d",
    meta: "6 reviews · 1 photo",
    date: "1 month ago",
    text: "We did a board-and-train program for our puppy and had an excellent experience. The trainer (Peyton) was professional, patient, and very knowledgeable. When our puppy came home, we saw a huge improvement with leash pulling, jumping, and so much more. Reasonable price for the results we got.",
    initial: "M",
  },
  {
    name: "Mr. Williams",
    meta: "9 reviews · 4 photos",
    date: "6 months ago",
    text: "I can't say enough great things about our experience with Peyton and the entire team! From the very beginning, they treated our dog like family and made the whole process feel so comforting. The kindness, patience, and genuine love they showed was incredible.",
    initial: "W",
  },
  {
    name: "Sarah Anthony",
    meta: "2 reviews · 2 photos",
    date: "3 months ago",
    text: "Sit Means Sit has been an incredible experience for our family and our puppy, Jasper. They started by training Jasper on key commands like place, sit, come, and stay, and the results were amazing. After that, they trained us on how to maintain everything at home. Great price too!",
    initial: "S",
  },
  {
    name: "Kayla Paige",
    meta: "8 reviews · 8 photos",
    date: "1 year ago",
    text: "Amazing place! My boyfriend and I sent our Frenchie to the 3-week program after having some issues with aggression and reactiveness. She came back with a whole different attitude and so many new skills. They kept us updated almost daily with videos and photos.",
    initial: "K",
  },
  {
    name: "Laura Johnston",
    meta: "Local Guide · 33 reviews · 117 photos",
    date: "9 months ago",
    text: "I've been a client for about 8 years. 3 of my large dogs and my daughter's 2 large dogs have gone through their program. The owner Gema is the most caring and honest individual. She goes over and beyond for the dogs' training and teaching the owners.",
    initial: "L",
  },
  {
    name: "Leslie",
    meta: "5 reviews · 4 photos",
    date: "1 year ago",
    text: "Our experience at Sit Means Sit has been nothing short of miraculous. We came to them with a 21-month-old Morkie who had high energy, was untrained, had no manners and acted completely on impulse. The transformation has been absolutely incredible.",
    initial: "L",
  },
  {
    name: "Darby Richardson",
    meta: "2 reviews",
    date: "2 months ago",
    text: "Our Doodle is currently training with Sit Means Sit in the one-month boarded program. Just 2 weeks in he is a totally different dog! We get report cards, videos, and pictures every day and he is having the best time! Reasonable price for the transformation we're seeing.",
    initial: "D",
  },
  {
    name: "Taylor Nelson",
    meta: "2 reviews",
    date: "5 months ago",
    text: "Jade has done amazing with my 6-month-old Doberman. She is so informative and always has an answer to our questions. She has gone out of her way to help us in any and every way she can. It is obvious she's in this field because she genuinely loves dogs.",
    initial: "T",
  },
];

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <span className="text-yellow-400 tracking-wide">
      {"★".repeat(count)}
    </span>
  );
}

function useFadeUp() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function ReviewCard({ review, delay }: { review: typeof REVIEWS[0]; delay: number }) {
  const ref = useFadeUp();
  return (
    <div
      ref={ref}
      className="fade-up bg-white rounded-lg border border-gray-100 shadow-sm p-6 flex flex-col gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[oklch(0.42_0.15_250)] text-white font-bold text-base flex items-center justify-center flex-shrink-0">
          {review.initial}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-sm text-gray-900 truncate">{review.name}</div>
          <div className="text-xs text-gray-400 truncate">{review.meta}</div>
        </div>
        <StarRating />
      </div>
      <p className="text-sm text-gray-600 leading-relaxed italic flex-1">"{review.text}"</p>
      <span className="text-xs text-gray-400">{review.date}</span>
    </div>
  );
}

function BookingPlaceholder({ label }: { label: string }) {
  return (
    <div className="border-2 border-dashed border-blue-200 rounded-lg bg-blue-50 p-6 text-center">
      <div className="text-3xl mb-2">📅</div>
      <p className="font-bold text-[oklch(0.42_0.15_250)] text-sm">{label}</p>
      <p className="text-xs text-gray-400 mt-1 leading-relaxed">
        Embed your scheduling tool here<br />(Calendly, Acuity, GHL Calendar, etc.)
      </p>
    </div>
  );
}

function GHLCalendarEmbed({ iframeId }: { iframeId: string }) {
  const [height, setHeight] = useState(600);

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (!e.data) return;
      const data = typeof e.data === "string" ? (() => { try { return JSON.parse(e.data); } catch { return null; } })() : e.data;
      if (data && data.iframeId === iframeId && typeof data.height === "number" && data.height > 0) {
        setHeight(data.height);
      }
    };
    window.addEventListener("message", handler);

    // Load the GHL embed script once
    const scriptId = "ghl-form-embed-js";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://link.atlantadog.training/js/form_embed.js";
      script.async = true;
      document.body.appendChild(script);
    }

    return () => window.removeEventListener("message", handler);
  }, [iframeId]);

  return (
    <div className="w-full">
      <iframe
        src="https://link.atlantadog.training/widget/booking/ZA6duYQa93TtVPM1OwXJ"
        style={{ width: "100%", border: "none", height, display: "block", transition: "height 0.3s ease" }}
        scrolling="no"
        id={iframeId}
      />
    </div>
  );
}

function VideoPlaceholder({ caption, driveUrl }: { caption: string; driveUrl: string }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden border-2 border-[oklch(0.42_0.15_250)]">
        {/* 
          TO EMBED YOUR VIDEO: Replace this div with an iframe:
          <iframe 
            src="https://drive.google.com/file/d/YOUR_FILE_ID/preview"
            className="absolute inset-0 w-full h-full"
            allow="autoplay"
          />
        */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-3 p-4 text-center">
          <div className="w-16 h-16 rounded-full bg-[oklch(0.84_0.18_90)] flex items-center justify-center text-gray-900 text-2xl shadow-lg">
            ▶
          </div>
          <p className="text-sm font-semibold">Testimonial Video</p>
          <p className="text-xs text-gray-400">Replace with your video embed code</p>
          <a
            href={driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[oklch(0.84_0.18_90)] text-xs underline"
          >
            View on Google Drive ↗
          </a>
        </div>
      </div>
      <p className="text-sm italic text-gray-500 text-center">{caption}</p>
    </div>
  );
}

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate hero text on load
    const el = heroRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateX(-24px)";
    requestAnimationFrame(() => {
      el.style.transition = "opacity 0.7s ease, transform 0.7s ease";
      el.style.opacity = "1";
      el.style.transform = "translateX(0)";
    });
  }, []);

  return (
    <div className="min-h-screen bg-white font-['Source_Sans_3',system-ui,sans-serif]">

      {/* ===== STICKY NAV ===== */}
      <header className="sticky top-0 z-50 bg-white border-b-4 border-[oklch(0.84_0.18_90)] shadow-md">
        <div className="container flex items-center justify-between py-3 gap-4">
          <a href="#" className="flex items-center flex-shrink-0">
            <img
              src="/sit-means-sit-logo.svg"
              alt="Sit Means Sit Dog Training Atlanta"
              className="h-10 w-auto"
            />
          </a>
          <nav className="hidden md:flex items-center gap-6">
            {[
              { href: "#why-us", label: "WHY US" },
              { href: "#testimonials", label: "REVIEWS" },
              { href: "#videos", label: "VIDEOS" },
              { href: "#book", label: "BOOK NOW" },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-xs font-bold tracking-widest text-gray-700 hover:text-[oklch(0.42_0.15_250)] transition-colors"
              >
                {label}
              </a>
            ))}
            <a href="tel:4043340284" className="text-sm font-bold text-[oklch(0.42_0.15_250)]">
              (404) 334-0284
            </a>

          </nav>
          {/* Mobile CTA */}
          <a href="#book" className="md:hidden btn-yellow px-4 py-2 rounded text-xs">
            BOOK $47
          </a>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section
        className="relative min-h-[600px] flex items-center"
        style={{
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, rgba(10,30,60,0.88) 0%, rgba(10,30,60,0.7) 55%, rgba(10,30,60,0.2) 100%)",
          }}
        />

        <div className="container relative z-10 py-16">
          <div className="flex flex-col lg:flex-row items-start gap-10 justify-between">

            {/* Left: Headline */}
            <div ref={heroRef} className="flex-1 max-w-xl text-white">
              <div className="text-[oklch(0.84_0.18_90)] text-2xl tracking-widest mb-3">★★★★★</div>
              <h1 className="font-['Oswald'] font-bold text-5xl md:text-6xl lg:text-7xl uppercase leading-none mb-4 drop-shadow-lg">
                TOP DOG TRAINERS<br />IN ATLANTA
              </h1>
              <p className="text-lg font-bold tracking-wider text-white/90 mb-8 drop-shadow">
                ANY DOG. ANY AGE. ANY BREED. ANY PROBLEM.
              </p>
              <a
                href="#calendar"
                className="btn-yellow inline-block px-8 py-4 rounded text-base shadow-xl"
              >
                CLAIM YOUR $47 FIRST VISIT EVALUATION ›
              </a>
              <div className="mt-4 flex items-start gap-2 text-white/80 text-sm">
                <span className="text-green-400 font-bold flex-shrink-0">✓</span>
                <p><strong className="text-white">Satisfaction Guarantee:</strong> If you are not satisfied with your evaluation, we'll refund the $47 — no questions asked.</p>
              </div>

            </div>

            {/* Right: Booking Card */}
            <div className="w-full lg:w-[380px] flex-shrink-0 bg-white rounded-lg shadow-2xl overflow-hidden">
              <div className="bg-[oklch(0.42_0.15_250)] px-6 py-5 text-white">
                <span className="text-[oklch(0.84_0.18_90)] text-xs font-bold tracking-widest uppercase block mb-1">GET STARTED TODAY</span>
                <h2 className="font-['Oswald'] font-bold text-2xl uppercase">BOOK YOUR CONSULTATION</h2>
              </div>
              <ul className="bg-blue-50 px-6 py-4 border-b border-gray-100 space-y-2">
                {[
                  "COMPLETE SECURE CHECKOUT ($47)",
                  "CHOOSE YOUR DATE & TIME",
                  "GET STARTED WITH A CERTIFIED TRAINER",
                ].map((step) => (
                  <li key={step} className="flex items-center gap-2 text-xs font-bold text-[oklch(0.42_0.15_250)] tracking-wide">
                    <span className="w-5 h-5 rounded-full bg-[oklch(0.42_0.15_250)] text-[oklch(0.84_0.18_90)] flex items-center justify-center text-xs font-black flex-shrink-0">›</span>
                    {step}
                  </li>
                ))}
              </ul>
              <div className="p-2">
                <GHLCalendarEmbed iframeId="pEFMl5kqrKtFXdW0FRtn_1773344073829" />
              </div>
              <div className="mx-4 mb-4 bg-green-50 border border-green-200 rounded-lg p-3 flex items-start gap-2">
                <span className="text-green-600 text-base leading-none mt-0.5 flex-shrink-0">✓</span>
                <p className="text-xs text-green-800 leading-snug">
                  <strong>Satisfaction Guarantee:</strong> If you are not satisfied with your evaluation, we'll refund the $47 — no questions asked.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== VALUE STRIP ===== */}
      <div className="bg-gray-900 text-white py-7">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: "500+", label: "Happy Dogs Trained" },
              { num: "4.7★", label: "Google Rating (242 Reviews)" },
              { num: "20+", label: "Years of Experience" },
              { num: "$249", label: "Consultation Value — Only $47 Today" },
            ].map(({ num, label }) => (
              <div key={label}>
                <div className="font-['Oswald'] font-bold text-4xl text-[oklch(0.84_0.18_90)]">{num}</div>
                <div className="text-xs font-semibold tracking-widest text-white/60 uppercase mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== PROBLEM / WHY US SECTION ===== */}
      <section id="why-us" className="py-20 bg-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">

            {/* Headline block */}
            <div className="mb-10">
              <p className="text-xs font-bold tracking-widest text-[oklch(0.42_0.15_250)] uppercase mb-3">WHY OWNERS COME TO US</p>
              <h2 className="font-['Oswald'] font-bold text-4xl md:text-5xl text-gray-900 leading-tight mb-2">
                When Your Dog Stops Listening…
              </h2>
              <h3 className="font-['Oswald'] font-medium text-2xl md:text-3xl text-[oklch(0.42_0.15_250)] leading-snug">
                The Problem Is Usually the Training — Not the Dog
              </h3>
            </div>

            {/* Two-column layout: problems left, copy right */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

              {/* Left: Problem list */}
              <div className="bg-gray-50 rounded-xl p-8 border-l-4 border-[oklch(0.42_0.15_250)]">
                <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-5">SOUND FAMILIAR?</p>
                <ul className="space-y-4">
                  {[
                    "Pulling on the leash.",
                    "Ignoring commands.",
                    "Jumping on guests.",
                    "Barking nonstop.",
                    "Reactivity toward other dogs.",
                  ].map((problem) => (
                    <li key={problem} className="flex items-center gap-3 text-gray-800 text-lg font-semibold">
                      <span className="w-2 h-2 rounded-full bg-[oklch(0.84_0.18_90)] flex-shrink-0" />
                      {problem}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right: Narrative copy */}
              <div className="space-y-4 text-gray-600 text-base leading-relaxed">
                <p>
                  Most owners start with patience. Then frustration sets in. You start wondering if your dog will ever really listen — or if the behavior is just part of their personality.
                </p>
                <p className="font-semibold text-gray-800">
                  In most cases, it's not.
                </p>
                <p>
                  Behavior problems usually come from <strong>miscommunication between owner and dog</strong>, not stubbornness. The good news is that once the communication is fixed, the behavior often changes quickly.
                </p>
                <p className="font-semibold text-gray-800">
                  That's exactly what we help owners do.
                </p>
              </div>
            </div>

            {/* What we'll show you block */}
            <div className="mt-12 bg-[oklch(0.42_0.15_250)] rounded-xl p-8 text-white">
              <p className="text-base leading-relaxed mb-6">
                Bring your dog in for a <strong>45-minute behavioral evaluation</strong>, and we'll show you:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  "What's actually causing the behavior",
                  "Whether it can realistically be corrected",
                  "What type of training will fix it",
                  "How long improvement typically takes",
                ].map((point) => (
                  <div key={point} className="flex items-start gap-3">
                    <span className="text-[oklch(0.84_0.18_90)] font-black text-lg leading-none mt-0.5">•</span>
                    <span className="text-white/90 text-sm leading-relaxed">{point}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/20 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                <div>
                  <p className="font-['Oswald'] font-bold text-xl text-[oklch(0.84_0.18_90)] mb-1">No guessing. No vague advice.</p>
                  <p className="text-white/80 text-sm">Just a clear understanding of what's going on with your dog.</p>
                </div>
                <a
                  href="#calendar"
                  className="btn-yellow flex-shrink-0 px-7 py-3.5 rounded text-sm"
                >
                  CLAIM YOUR EVALUATION ›
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ===== TESTIMONIAL VIDEOS ===== */}
      <section id="videos" className="py-20 bg-gray-50">
        <div className="container">
          <p className="text-xs font-bold tracking-widest text-[oklch(0.42_0.15_250)] uppercase mb-2">SEE THE RESULTS</p>
          <h2 className="font-['Oswald'] font-bold text-4xl md:text-5xl text-gray-900 mb-4">
            Real Dogs. Real Transformations.
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mb-12 leading-relaxed">
            Watch what Atlanta dog owners are saying about their experience with Sit Means Sit.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Real testimonial video */}
            <div className="flex flex-col gap-3">
              <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden border-2 border-[oklch(0.42_0.15_250)]">
                <video
                  className="absolute inset-0 w-full h-full object-contain"
                  controls
                  playsInline
                  preload="metadata"
                >
                  <source src="/testimonial-video.mp4" type="video/mp4" />
                </video>
              </div>
              <p className="text-sm italic text-gray-500 text-center">"Our dog is completely transformed!" — Atlanta Client</p>
            </div>
            <div className="flex flex-col gap-3">
              <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden border-2 border-[oklch(0.42_0.15_250)]">
                <video
                  className="absolute inset-0 w-full h-full object-contain"
                  controls
                  playsInline
                  preload="metadata"
                >
                  <source src="/Cristine AD Captions.mp4" type="video/mp4" />
                </video>
              </div>
              <p className="text-sm italic text-gray-500 text-center">"Best investment we ever made for our family." — Atlanta Client</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== GOOGLE REVIEWS ===== */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container">
          <p className="text-xs font-bold tracking-widest text-[oklch(0.42_0.15_250)] uppercase mb-2">WHAT OUR CLIENTS SAY</p>
          <h2 className="font-['Oswald'] font-bold text-4xl md:text-5xl text-gray-900 mb-4">
            Real Reviews from Real Atlanta Dog Owners
          </h2>
          <div className="flex items-center gap-3 mb-10 flex-wrap">
            <StarRating />
            <span className="font-['Oswald'] font-bold text-4xl text-gray-900">4.7</span>
            <span className="text-gray-500 text-sm">Based on 242 Google Reviews</span>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
              alt="Google"
              className="h-5 w-auto"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
            {REVIEWS.map((review, i) => (
              <ReviewCard key={review.name + i} review={review} delay={i * 60} />
            ))}
          </div>
          <div className="text-center">
            <a
              href="https://share.google/oKVxh8ZdvQeislGUS"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border-2 border-[oklch(0.42_0.15_250)] text-[oklch(0.42_0.15_250)] font-['Oswald'] font-semibold tracking-widest uppercase text-sm px-8 py-3 rounded hover:bg-[oklch(0.42_0.15_250)] hover:text-white transition-colors"
            >
              SEE ALL 242 GOOGLE REVIEWS ›
            </a>
          </div>
        </div>
      </section>

      {/* ===== BOOKING SECTION - INFO ===== */}
      <section
        id="book"
        className="py-16"
        style={{ background: "linear-gradient(135deg, oklch(0.28 0.13 250) 0%, oklch(0.42 0.15 250) 100%)" }}
      >
        <div className="container">
          <p className="text-xs font-bold tracking-widest text-[oklch(0.84_0.18_90)] uppercase mb-2">READY TO START?</p>
          <h2 className="font-['Oswald'] font-bold text-4xl md:text-5xl text-white mb-4">
            Book Your Behavioral Assessment Today
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mb-8 leading-relaxed">
            This is not just a sales call. It's a real, hands-on evaluation with one of our certified trainers. Limited spots available each week.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* What you get */}
            <div>
              <h3 className="font-['Oswald'] font-bold text-2xl text-white mb-6">What You Get:</h3>
              <ul className="space-y-4 mb-8">
                {[
                  "45-minute 1-on-1 session with a certified trainer",
                  "Full behavioral assessment of your dog",
                  "Custom training roadmap — day one",
                  "No obligation to continue",
                  "Serving Atlanta, Douglasville, Alpharetta & surrounding areas",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-white/90 text-base">
                    <span className="text-[oklch(0.84_0.18_90)] text-lg leading-none mt-0.5">✅</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="bg-white/10 rounded-lg p-5 flex items-start gap-4">
                <span className="text-3xl">🔒</span>
                <div>
                  <p className="font-bold text-[oklch(0.84_0.18_90)] text-base">Satisfaction Guarantee</p>
                  <p className="text-white/70 text-sm mt-1">If you are not satisfied with your evaluation, we'll refund the $47 — no questions asked.</p>
                </div>
              </div>
            </div>

            {/* Quick info */}
            <div className="flex flex-col justify-center">
              <div className="bg-white/10 rounded-lg p-6 border border-white/20">
                <h3 className="font-['Oswald'] font-bold text-xl text-white mb-4">How It Works:</h3>
                <ol className="space-y-3 text-white/90">
                  <li className="flex items-start gap-3">
                    <span className="font-bold text-[oklch(0.84_0.18_90)] flex-shrink-0">1.</span>
                    <span>Select your preferred date and time below</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-bold text-[oklch(0.84_0.18_90)] flex-shrink-0">2.</span>
                    <span>Complete secure payment ($47)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-bold text-[oklch(0.84_0.18_90)] flex-shrink-0">3.</span>
                    <span>Get started with a certified trainer</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CALENDAR SECTION - FULL WIDTH ===== */}
      <section id="calendar" className="w-full bg-white py-12">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <div className="mb-8 text-center">
            <h2 className="font-['Oswald'] font-bold text-3xl md:text-4xl text-gray-900 mb-2">You're Almost There — Book Your Date</h2>
            <p className="text-gray-600 text-lg">Select a date and time to complete your consultation booking</p>
          </div>
          <GHLCalendarEmbed iframeId="pEFMl5kqrKtFXdW0FRtn_1773344073829" />
        </div>
      </section>

      {/* ===== FINAL CTA BANNER ===== */}
      <section className="bg-[oklch(0.84_0.18_90)] py-14">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-['Oswald'] font-bold text-3xl md:text-4xl text-gray-900">We'll Solve Your Dog Problems.</h2>
            <p className="text-gray-700 mt-1 text-base">Schedule your consultation with our certified Atlanta trainers today.</p>
          </div>
          <a
            href="#calendar"
            className="flex-shrink-0 bg-gray-900 text-[oklch(0.84_0.18_90)] font-['Oswald'] font-bold tracking-widest uppercase text-base px-10 py-4 rounded hover:bg-gray-800 transition-colors shadow-lg whitespace-nowrap"
          >
            BOOK MY CONSULTATION ›
          </a>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-gray-950 text-white/70 pt-16 pb-0">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/10">
            <div>
              <div className="mb-4">
                <span className="font-['Oswald'] font-bold text-2xl text-white tracking-tight uppercase">SIT MEANS SIT</span>
                <br />
                <span className="font-['Oswald'] font-medium text-xs text-white/40 tracking-widest uppercase">Dog Training Atlanta</span>
              </div>
              <p className="text-sm leading-relaxed mb-3">
                Atlanta's Premier Dog Training Team<br />
                Serving Atlanta, Douglasville, Alpharetta &amp; Surrounding Areas
              </p>
              <a href="tel:4043340284" className="text-[oklch(0.84_0.18_90)] font-bold text-lg hover:underline">
                (404) 334-0284
              </a>
            </div>

            <div>
              <h4 className="font-['Oswald'] font-semibold text-sm tracking-widest uppercase text-white mb-4">Contact</h4>
              <p className="text-sm leading-relaxed mb-3">
                7580 Granite Dr<br />
                Douglasville, GA 30134
              </p>
              <a href="tel:4043340284" className="text-sm text-white/50 hover:text-[oklch(0.84_0.18_90)] transition-colors block mb-4">
                (404) 334-0284
              </a>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/sitmeanssitatlanta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-[oklch(0.84_0.18_90)] transition-colors"
                  aria-label="Facebook"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/sitmeanssitatlanta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-[oklch(0.84_0.18_90)] transition-colors"
                  aria-label="Instagram"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="text-center py-5 text-xs text-white/25">
            © 2026 Sit Means Sit Dog Training Atlanta. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}
