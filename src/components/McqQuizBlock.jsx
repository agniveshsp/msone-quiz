import McqChoicesBlock from "./McqChoicesBlock"
import McqQuestionBlock from "./McqQuestionBlock"

export default function McqQuizBlock({ questionText, choicesArray }) {

    return <>

        {/* <div className="w-full bg-amber-600 flex flex-col items-center"> */}

        <McqQuestionBlock questionText={questionText} />

        <McqChoicesBlock choicesArray={choicesArray} />


        {/* </div> */}



    </>
}