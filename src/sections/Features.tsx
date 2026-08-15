import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Check } from 'lucide-react';
import WordsPullUpMultiStyle from '../components/WordsPullUpMultiStyle';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface CardShellProps {
  index: number;
  className?: string;
  children: React.ReactNode;
}

function CardShell({ index, className = '', children }: CardShellProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      className={`relative rounded-2xl overflow-hidden ${className}`}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

interface ChecklistCardProps {
  index: number;
  number: string;
  title: string;
  icon: string;
  items: string[];
}

function ChecklistCard({ index, number, title, icon, items }: ChecklistCardProps) {
  return (
    <CardShell index={index} className="bg-[#212121] p-5 sm:p-6 flex flex-col">
      <img src={icon} alt="" className="w-10 h-10 sm:w-12 sm:h-12 rounded" />

      <h3 className="mt-5 sm:mt-6 text-primary text-lg sm:text-xl">
        {title} <span className="text-gray-500">({number})</span>
      </h3>

      <ul className="mt-4 space-y-2.5 flex-1">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-xs sm:text-sm text-gray-400">
            <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <a
        href="#"
        className="group mt-6 inline-flex items-center gap-2 text-primary text-xs sm:text-sm w-fit"
      >
        Learn more
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 -rotate-45" />
      </a>
    </CardShell>
  );
}

export default function Features() {
  return (
    <section className="relative min-h-screen bg-black py-16 sm:py-24 px-6 sm:px-8 md:px-6 overflow-hidden">
      <div className="bg-noise absolute inset-0 opacity-[0.15] pointer-events-none" />

      <div className="relative max-w-6xl mx-auto text-center mb-10 sm:mb-14">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal">
          <WordsPullUpMultiStyle
            segments={[{ text: 'Studio-grade workflows for ambitious brands.', className: 'text-primary' }]}
          />
        </h2>
        <h2 className="mt-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal">
          <WordsPullUpMultiStyle
            segments={[{ text: 'Built for clarity. Powered by craft.', className: 'text-gray-500' }]}
          />
        </h2>
      </div>

      <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:h-[480px] gap-3 sm:gap-2 md:gap-1">
        <CardShell index={0} className="relative min-h-[320px] lg:min-h-0 lg:col-span-1">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 right-5">
            <span className="text-lg sm:text-xl" style={{ color: '#E1E0CC' }}>
              Your ideas, made real.
            </span>
          </div>
        </CardShell>

        <ChecklistCard
          index={1}
          number="01"
          title="Project Blueprint."
          icon="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85"
          items={[
            'Wireframes & user flows',
            'Content & requirements mapping',
            'Design system setup',
            'Milestone timeline',
          ]}
        />

        <ChecklistCard
          index={2}
          number="02"
          title="Smart Critiques."
          icon="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85"
          items={['AI-assisted design analysis', 'Structured creative notes', 'Seamless tool integrations']}
        />

        <ChecklistCard
          index={3}
          number="03"
          title="Deep Work Mode."
          icon="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85"
          items={['Notification silencing', 'Ambient soundscapes', 'Schedule syncing']}
        />
      </div>
    </section>
  );
}
