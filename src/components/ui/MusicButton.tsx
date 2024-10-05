import { useEffect, useRef, useState } from "react";
import { MdMusicNote, MdMusicOff } from "react-icons/md";

type Props = {};

function MusicButton({}: Props) {
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

  // Show tooltip
  const toggleTooltipME = () => {
    setIsTooltipVisible(true);
  };

  // Hide tooltip
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
      <div onMouseEnter={toggleTooltipME} onMouseLeave={toggleTooltipML}>
        {isAudioPlaying ? (
          <div onClick={handleAudio}>
            <MdMusicNote
              color="white"
              size={30}
              className="hover:cursor-pointer hover:bg-slate-700"
            />
          </div>
        ) : (
          <div onClick={handleAudio}>
            <MdMusicOff
              color="white"
              size={30}
              className="hover:cursor-pointer hover:bg-slate-700"
            />
          </div>
        )}
      </div>
      {isTooltipVisible && (
        <div
          className="absolute left-1/2 transform -translate-x-1/2 mt-0 p-2 bg-black rounded shadow-lg text-nowrap"
          onMouseEnter={toggleTooltipME} // Show tooltip on hover
          onMouseLeave={toggleTooltipML} // Hide tooltip when leaving
        >
          <a
            href="https://youtu.be/ZQ44Kg-rbJo?si=k7ErYsNrA4YItWhs"
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-[10px] text-white"
          >
            © Free @ FM4A
          </a>
        </div>
      )}
    </div>
  );
}

export default MusicButton;
