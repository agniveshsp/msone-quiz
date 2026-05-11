import { Children } from "react"
import VideoPlayer from "./VideoPlayer"
export default function BlankQuestionBlock({questionText,children}) {
    return <div className="pt-4 pb-5 px-4 w-full ">
        <h2 className="text-[clamp(0.85rem,0.6rem+0.5vw,1.2rem)] mb-2 whitespace-pre-line quiz-question-text text-white text-center font-medium font-anek ">
            {questionText}
        </h2>
       {children}
    </div>

}