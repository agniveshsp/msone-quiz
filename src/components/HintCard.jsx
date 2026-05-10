import { useEffect, useRef } from "react";
export default function HintCard({ hintText, showHint, hintPress }) {

    const cardRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (cardRef.current && !cardRef.current.contains(e.target)) {
                hintPress(); // close / push up
            }
        };

        if (showHint) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showHint]);




    return (
        <div id="hintCardBase"
            ref={cardRef}
            className={` 
        absolute top-0 left-0 w-full h-[50%]
        flex flex-col items-center
        bg-blue-500
        transition-transform duration-500 ease-in-out rounded-b-lg
        ${showHint ? "translate-y-0 shadow-md" : "-translate-y-full"}
      `}
        >
            {/* TEXT AREA */}
            <div className="w-[97%] sm:w-[50%] flex-1 flex items-center justify-center px-4">
                <h2 className="text-[clamp(0.8rem,2vw,1.25rem)] py-6 whitespace-pre-line text-gray-50 text-center font-medium font-anek">
                    Hint: {hintText}
                </h2>
            </div>

            {/* BUTTON AREA */}
            <div className="h-[35%] flex items-start justify-center">


                <button
                    onClick={hintPress}
                    className="px-6 py-2.5 mb-4 mt-2 bg-gradient-to-t from-blue-800 
        to-blue-500 text-white font-semibold rounded-lg shadow-md border-2
         border-white hover:from-blue-900 hover:to-blue-500 active:scale-95 
         transition-all duration-150 cursor-pointer">
                    {"Got it"}
                </button>


            </div>
        </div>
    );
}