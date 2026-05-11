
import { useState } from "react";

export default function EndScreen({ resetQuiz }) {

    const [isLoading, setIsLoading] = useState(false);

    function handleStartClick(resetQuiz) {
        setIsLoading(true)
        setTimeout(() => {
            resetQuiz();
        }, 1000);
    };

    return <>
        <div className="flex flex-col pt-4 pb-5 px-4 w-full md:w-[80%] justify-center items-center">
            <h2 className="mb-2 whitespace-pre-line quiz-question-text text-white text-center font-medium font-anek text-[clamp(1.5rem,3vw,2rem)] ">

            </h2>
            <p className="text-white text-center font-anek text-[clamp(0.85rem,0.6rem+0.5vw,1.2rem)] hyphens-auto break-words" >
                ഒരു എംസോൺ പരിഭാഷയ്ക്ക് ആവശ്യമായ അടിസ്ഥാന ഫോർമാറ്റും സ്റ്റൈലിങ്ങുമാണ്
                ഇവിടെ കണ്ടത്. ഇതിനെക്കുറിച്ചുള്ള കൂടുതൽ വിശദമായ വിവരങ്ങൾ <a target="_blank" href="https://malayalamsubtitles.org/how-to-create-subtitles/"><span className="underline text-lime-300">എംസോൺ സൈറ്റിൽ</span></a> ലഭ്യമാണ്.</p>
                
            <div className="flex my-13 flex justify-center items-center">
                {!isLoading ? <button onClick={() => handleStartClick(resetQuiz)} className="
                 cursor-pointer transition-all bg-orange-600 text-white px-6 py-1 rounded-lg font-anek  border-amber-400 shadow-lg
                border-b-3  hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                active:border-b-[2px] active:brightness-90 active:translate-y-[2px] text-[clamp(1.2rem,1.2vw,2rem)]">
                    ⟳Restart
                </button> : <div className=" progress-loader w-[50%] md:w-[30%] ">
                    <div className="progress"></div>
                </div>}
               
            </div>



        </div>


    </>
}