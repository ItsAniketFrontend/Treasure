import { motion } from 'framer-motion';

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/919353181818?text=Hi%2C%20I%20want%20to%20connect."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.9, type: "spring" }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.95 }}
      className="
        fixed bottom-6 right-6 z-[9999] hidden md:flex
        w-14 h-14 items-center justify-center rounded-full
        bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md
        border border-stone-200/50 dark:border-white/10
        shadow-[0_8px_30px_rgb(0,0,0,0.12)]
        text-[#25D366]
        hover:text-white hover:bg-gradient-to-tr hover:from-[#20B25E] hover:to-[#25D366]
        hover:border-transparent hover:shadow-green-500/30
        transition-colors duration-300
        group
      "
    >
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.964.041A11.956 11.956 0 001.077 15.65L.03 23.953l8.475-2.822A11.954 11.954 0 1011.964.041zM11.963 21.6A9.61 9.61 0 017 20.352l-.337-.2-4.992 1.662.62-4.88-.223-.357A9.613 9.613 0 1111.963 21.6zm5.286-7.234c-.29-.145-1.713-.846-1.978-.943-.264-.097-.458-.146-.65.146-.192.29-.747.943-.915 1.137-.168.193-.337.218-.626.073-.29-.145-1.222-.45-2.327-1.437-.86-.768-1.442-1.718-1.61-2.008-.168-.29-.018-.445.126-.59.13-.13.29-.338.435-.507.146-.17.194-.29.29-.484.097-.193.048-.362-.025-.507-.072-.146-.65-1.57-.89-2.148-.234-.567-.472-.49-.65-.499h-.556c-.193 0-.507.073-.772.363-.265.29-1.012.988-1.012 2.413 0 1.425 1.036 2.801 1.18 2.994.145.193 2.043 3.12 4.947 4.37.69.299 1.23.477 1.65.611.692.22 1.32.189 1.815.115.556-.083 1.714-.7 1.955-1.376.241-.676.241-1.256.168-1.376-.072-.12-.265-.193-.554-.338z"/>
       </svg>

      {/* Background Glow */}
      <span className="absolute -z-10 w-full h-full rounded-full bg-green-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
    </motion.a>
  );
};

export default WhatsAppButton;
