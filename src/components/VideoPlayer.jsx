import { useRef, useState, useEffect } from "react";
import { PlayButton } from "./SvgIcons";
export default function VideoPlayer({ videoRef, video, cues = [], }) {


  const [showButton, setShowButton] = useState(true);
  const [activeText, setActiveText] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoReady, setVideoReady] = useState(false);

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
  
    const time = videoRef.current.currentTime;

    const activeCue = cues.find(
      (cue) => time + 0.01 >= cue.start && time <= cue.end
    );

    setActiveText(activeCue ? activeCue.text : null);
  };

  return (
    <div className="relative w-full  max-w-xl mx-auto flex justify-center">

      {/* <div className="w-full aspect-[640/344] relative border-white border-2 rounded-lg"> 
        <video
          // key={video}
          ref={videoRef}
          className="absolute inset-0 w-full aspect-[640/344] rounded-lg "
          src={video}
          onEnded={handleEnded}
          onTimeUpdate={handleTimeUpdate}
        />
      </div> */}
      {/* <div className="w-full aspect-[640/344] max-h-[30vh]  relative border-white border-2 rounded-lg overflow-hidden"> */}
      <div className="relative w-full max-w-3xl max-[1366px]:max-w-[59vh] aspect-[640/344] border-white border-2 rounded-lg overflow-hidden">


        {!videoReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-600 z-10">
            <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}

        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover rounded-lg"
          src={video}
          onEnded={handleEnded}
          onCanPlay={() => setVideoReady(true)}
          onLoadStart={() => setVideoReady(false)}
          onTimeUpdate={handleTimeUpdate}
        />
      </div>


    
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

      
      {activeText && (
        <h2 className="text-[clamp(1rem,2vw,1.25rem)] absolute bottom-5 text-white text-2xl bg-black/60 px-4 py-2 rounded whitespace-pre-line text-center">
          {activeText}
        </h2>
      )}
    </div>
  );
}