import { Children } from "react"
import VideoPlayer from "./VideoPlayer"
export default function BlankQuestionBlock({questionText,children}) {
    return <div className="pt-4 pb-5 px-4 w-full ">
        <h2 className="mb-2 whitespace-pre-line quiz-question-text text-white text-center font-medium font-anek text-[clamp(1rem,2vw,1.25rem)] ">
            {questionText}
        </h2>
       {children}
    </div>

}