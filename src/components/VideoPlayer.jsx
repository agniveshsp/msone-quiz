import { useRef, useState, useEffect } from "react";
import PlayButton from "./PlayButton";
export default function VideoPlayer({ videoRef, video, cues = [], }) {


  const [showButton, setShowButton] = useState(true);
  const [activeText, setActiveText] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    setIsPlaying(false);
    setActiveText(null);
    setShowButton(true);
  }, [video]);


  const handlePlay = () => {
    setIsPlaying(true);
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setShowButton(false);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setShowButton(true);
    setActiveText(null);
  };

  const handleTimeUpdate = () => {
    if (!isPlaying) {
      return;
    }
    // if (subtitle) return;
    const time = videoRef.current.currentTime;

    const activeCue = cues.find(
      (cue) => time + 0.01 >= cue.start && time <= cue.end
    );

    setActiveText(activeCue ? activeCue.text : null);
  };

  return (
    <div className="relative w-full  max-w-xl mx-auto flex justify-center">
      {/* 🎬 Video */}
      <div className="w-full aspect-[640/344] relative border-white border-2 rounded-lg"> 
        <video
          // key={video}
          ref={videoRef}
          className="absolute inset-0 w-full aspect-[640/344] rounded-lg "
          src={video}
          onEnded={handleEnded}
          onTimeUpdate={handleTimeUpdate}
        />
      </div>

      {/* Play Button */}
      {showButton && (
        <button
          onClick={handlePlay}
          className="absolute inset-0 flex items-center justify-center rounded-lg
         "
        >
          <div className="bg-black/60 text-white px-6 py-4 rounded-lg text-[clamp(2rem,2vw,1.25rem)] ">
            <PlayButton className="w-10 h-10 transition-transform duration-150 ease-in-out hover:scale-110 active:scale-95 cursor-pointer" />
          </div>
        </button>
      )}

      {/*Timed Text */}
      {activeText && (
        <h2 className="text-[clamp(1rem,2vw,1.25rem)] absolute bottom-5 text-white text-2xl bg-black/60 px-4 py-2 rounded whitespace-pre-line text-center">
          {activeText}
        </h2>
      )}
    </div>
  );
}