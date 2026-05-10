import SegmentedProgressBar from "./SegmentedProgressBar"
import { RefreshSvg, BackButtonSvg,MsoneLogo } from "./SvgIcons";

export default function Header({ showSplash, currentQuizID, totalQuestions, resetQuiz, loadPreviousQuestion, stage }) {
    return <div className={`relative pt-10 md:pt-15 flex flex-col items-center justify-center ${showSplash ? "active" : ""}`} id="headerSection">
        <div
            className={`transition-opacity duration-400
            ${stage === "quiz" ? "opacity-100" : "opacity-0 pointer-events-none"}`}>

            <button onClick={loadPreviousQuestion}
            className="absolute top-3 left-2 md:top-5 md:left-5
            w-8 cursor-pointer px-1 py-1 rounded-full
            hover:bg-black/50 transition-all duration-200 
            active:scale-95 active:brightness-80"
            >
                <BackButtonSvg />
            </button>

            <button onClick={resetQuiz}
                className="absolute top-3 right-2 md:top-5 md:right-5
            w-8 cursor-pointer px-1 py-1 rounded-full
            hover:bg-black/50 transition-all duration-200 
            active:scale-95 active:-rotate-90"
            >
                <RefreshSvg />
            </button>
        </div>


        <MsoneLogo className="w-30 md:w-40 " />
        <SegmentedProgressBar total={totalQuestions} value={currentQuizID} showSplash={showSplash} />
    </div >
}