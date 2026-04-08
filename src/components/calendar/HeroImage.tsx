'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { MONTH_IMAGES } from '@/constants/monthImages';

interface HeroImageProps {
  month: number;
  monthName: string;
  year: number;
  animKey?: number;
}

export default function HeroImage({
  month,
  monthName,
  year,
  animKey,
}: HeroImageProps) {
  const image = MONTH_IMAGES[month];

  return (
    <div className="relative w-full h-44 sm:h-52 md:h-full md:min-h-[520px] overflow-hidden bg-gray-900">

      {/* Crossfade between month images */}
      <AnimatePresence >
        <motion.img
          key={animKey}
          src={image.url}
          alt={image.alt}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full object-cover brightness-95 contrast-110"
          loading="eager"
        />
      </AnimatePresence>

      {/* Gradient — always on top of image */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

      {/* Spiral binding */}
      <div className="absolute top-0 left-0 right-0 hidden sm:flex justify-center gap-2.5 pt-2 pointer-events-none">
        {Array.from({ length: 16 }).map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-full border-2 border-white/50 bg-white/25 backdrop-blur-sm"
          />
        ))}
      </div>

      {/* Month label — animates with image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={animKey}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: 'easeOut', delay: 0.1 }}
          className="absolute bottom-4 right-4 text-right pointer-events-none"
        >
          <p className="text-white/70 text-xs font-light tracking-[0.2em] uppercase mb-0.5">
            {year}
          </p>
          <p className="text-white text-3xl sm:text-4xl font-bold tracking-widest uppercase leading-none drop-shadow-lg">
            {monthName}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}