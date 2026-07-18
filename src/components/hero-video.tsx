"use client";

import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!video) return;

    const syncMotionPreference = () => {
      if (reducedMotion.matches) {
        video.pause();
        setIsPlaying(false);
        return;
      }

      void video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => {
          setIsPlaying(false);
        });
    };

    syncMotionPreference();
    reducedMotion.addEventListener("change", syncMotionPreference);

    return () => {
      reducedMotion.removeEventListener("change", syncMotionPreference);
    };
  }, []);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="hero-image-enter absolute inset-0 bg-[#071d35]">
      <video
        ref={videoRef}
        className="h-full w-full scale-[1.02] object-cover object-[52%_center] sm:origin-left sm:scale-[1.22] sm:object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/hero/professional-painting-crew-poster.jpg"
        aria-hidden="true"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source
          src="/videos/professional-painting-crew-pexels-34696966.mp4"
          type="video/mp4"
        />
      </video>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(7,29,53,0.98)_0%,rgba(7,29,53,0.88)_38%,rgba(7,29,53,0.48)_68%,rgba(7,29,53,0.18)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-[#071d35]/90 via-[#071d35]/35 to-transparent"
      />
      <button
        type="button"
        onClick={togglePlayback}
        className="absolute top-5 right-5 inline-flex min-h-11 min-w-11 items-center justify-center rounded-full border border-white/35 bg-[#071d35]/75 text-white backdrop-blur-sm transition-colors hover:bg-[#071d35] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        aria-label={
          isPlaying ? "Pause background video" : "Play background video"
        }
      >
        {isPlaying ? (
          <Pause aria-hidden="true" size={17} strokeWidth={2.2} />
        ) : (
          <Play aria-hidden="true" size={17} strokeWidth={2.2} />
        )}
      </button>
    </div>
  );
}
