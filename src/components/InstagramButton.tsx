import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

import { useCMS } from '../hooks/useCMS';

const InstagramButton = () => {
  const { data: settings } = useCMS('settings');
  return (
    <motion.a
      href={settings?.instagram || "https://www.instagram.com/treasurejaipur"}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Visit Instagram"
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.8, type: "spring" }}
      whileHover={{ scale: 1.1, rotate: -5 }}
      whileTap={{ scale: 0.95 }}
      className="
        fixed right-6 z-[9999] hidden md:flex
        w-14 h-14 items-center justify-center rounded-full
        bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md
        border border-stone-200/50 dark:border-white/10
        shadow-[0_8px_30px_rgb(0,0,0,0.12)]
        text-pink-600 dark:text-pink-400
        hover:text-white hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600
        hover:border-transparent hover:shadow-pink-500/30
        transition-colors duration-300
        group
      "
      style={{ bottom: "5.5rem" }}
    >
      <Instagram strokeWidth={1.5} className="w-6 h-6" />
      
      {/* Background Glow */}
      <span className="absolute -z-10 w-full h-full rounded-full bg-pink-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
    </motion.a>
  );
};

export default InstagramButton;