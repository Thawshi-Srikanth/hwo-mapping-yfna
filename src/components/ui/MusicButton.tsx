import { useEffect, useRef, useState } from "react";
import { MdMusicNote, MdMusicOff } from "react-icons/md";
import { motion } from "framer-motion";

function MusicButton() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  useEffect(() => {
    if (isAudioPlaying) {
      handlePlay();
    } else {
      handlePause();
    }
  }, [isAudioPlaying]);

  const handleAudio = () => {
    setIsAudioPlaying(!isAudioPlaying);
  };

  const toggleTooltipME = () => {
    setIsTooltipVisible(true);
  };

  const toggleTooltipML = () => {
    setIsTooltipVisible(false);
  };

  return (
    <div className="relative">
      <audio
        ref={audioRef}
        src="music/Interstellar Stay (FM4A - No Copyright Music).mp3"
        loop
        preload="auto"
      />
      <motion.button
        onClick={handleAudio}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative p-3 rounded-xl bg-purple-900/5 hover:bg-purple-900/20 
          group transition-all duration-200"
        onMouseEnter={toggleTooltipME}
        onMouseLeave={toggleTooltipML}
      >
        {isAudioPlaying ? (
          <MdMusicNote
            className="text-purple-300 group-hover:text-purple-200 transition-colors duration-200"
            size={24}
          />
        ) : (
          <MdMusicOff
            className="text-purple-300 group-hover:text-purple-200 transition-colors duration-200"
            size={24}
          />
        )}
      </motion.button>

      {isTooltipVisible && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 
            px-3 py-1.5 text-xs text-purple-200 bg-[#1A1A2E] rounded-lg 
            shadow-lg border border-purple-900/20 whitespace-nowrap"
        >
          <a
            href="https://youtu.be/ZQ44Kg-rbJo?si=k7ErYsNrA4YItWhs"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-300 transition-colors duration-200"
          >
            © Free @ FM4A
          </a>
        </motion.div>
      )}
    </div>
  );
}

export default MusicButton;
