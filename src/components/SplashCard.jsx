export default function SplashCard({ splashText, showSplash, splashPress }) {
  return <div id="splashCardBase"
    className={`items-center
    absolute bottom-0 left-0 w-full h-full
    flex flex-col
    transition-transform duration-500 ease-in-out inset-0 z-[9999]
    ${showSplash ? "translate-y-0 " : "translate-y-full"}
  `}
  >

    <div className="w-[97%] sm:w-[70%] flex-1 flex items-start justify-center px-4" >
      <h2 className="text-[clamp(0.8rem,2vw,1.25rem)] py-6 whitespace-pre-line w-full text-gray-50 text-center font-medium font-anek">
        {splashText}
      </h2>
    </div>

    <div className="h-[35%] flex items-start justify-center">

      <button tabIndex={showSplash ? 0 : -1}
        onClick={splashPress}
        className="px-6 py-2.5 mb-4 mt-2 bg-gradient-to-t from-green-700 
        to-emerald-400 text-white font-semibold rounded-lg shadow-md border-2
         border-white hover:from-green-800 hover:to-emerald-500 active:scale-98
         transition-all duration-150 cursor-pointer">
        {"Next >>"}
      </button>
    </div>

    <div className="flex-grow flex justify-center items-end trans ">
      <span className="text-gray-300">© Msone</span>
    </div>
  </div >


}