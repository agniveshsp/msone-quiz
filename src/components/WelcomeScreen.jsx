import { useState } from "react";

export default function WelcomeScreen({ setStage, resume = false }) {
    const [isLoading, setIsLoading] = useState(false);

    function handleStartClick(setStage) {
        setIsLoading(true)
        setTimeout(() => {
            setStage("quiz");
        }, 1000);
    };

    return <>
        <div className="flex flex-col pt-4 pb-5 px-4 w-full md:w-[80%] justify-center items-center">
            <h2 className="mb-2 whitespace-pre-line quiz-question-text text-white text-center font-medium font-anek text-[clamp(0.95rem,0.6rem+0.9vw,2rem)] ">
                സ്വാഗതം!
            </h2>
            <p className="text-white text-center font-anek text-[clamp(.8rem,1vw,2rem)] hyphens-auto break-words" >
                നെറ്റ്ഫ്ലിക്സ്, ആമസോൺ, ബിബിസി തുടങ്ങിയ പ്രധാന മാധ്യമങ്ങൾക്ക് സബ്‌ടൈറ്റിലുകൾ തയ്യാറാക്കാൻ തനതായ രീതികളും നിയമങ്ങളുമുണ്ട്.
                അതേപോലെ തന്നെ വർഷങ്ങളായുള്ള പരീക്ഷണങ്ങളിലൂടെയും തിരുത്തലുകളിലൂടെയും രൂപപ്പെടുത്തിയെടുത്ത സവിശേഷമായ ഒരു ശൈലി എംസോണിനുമുണ്ട്. <br /><br />
                എംസോണിന്റെ ഈ നിലവാരത്തെക്കുറിച്ചുള്ള നിങ്ങളുടെ അറിവ് പരിശോധിക്കുന്നതിനും, ഊട്ടിയുറപ്പിക്കുന്നതിനും,
                പഠിപ്പിക്കാനുമാണ് ഈ ടെസ്റ്റ് തയ്യാറാക്കിയിരിക്കുന്നത്.</p>
            <div className="flex my-13 justify-center items-center  ">
                {!isLoading ? <button onClick={() => handleStartClick(setStage)} className="
                 cursor-pointer transition-all bg-orange-600 text-white px-6 py-1 rounded-lg font-anek border-amber-400 shadow-lg
                border-b-3  hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px]
                active:border-b-[2px] active:brightness-90 active:translate-y-[2px] text-[clamp(1.2rem,1.2vw,2rem)]">
                    {resume ? "Continue⏯" : "Start➜"}
                </button> : <div className=" progress-loader w-[50%] md:w-[30%] ">
                    <div className="progress"></div>
                </div>}



            </div>
        </div>


    </>
}