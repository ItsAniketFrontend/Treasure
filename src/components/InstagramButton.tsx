const InstagramButton = () => {
  return (
    <a
      href="https://www.instagram.com/treasurejaipur"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Visit Instagram"
      className="
        fixed right-5
        w-14 h-14
        bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600
        rounded-full
        flex items-center justify-center
        shadow-xl
        z-[9999]
        hidden md:flex
      "
      style={{ bottom: "5.5rem" }}
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
        alt="Instagram"
        className="w-8 h-8"
      />
    </a>
  );
};

export default InstagramButton;