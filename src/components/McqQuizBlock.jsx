import McqChoicesBlock from "./McqChoicesBlock"
import McqQuestionBlock from "./McqQuestionBlock"

export default function McqQuizBlock({ questionText, choicesArray }) {

    return <>



        <McqQuestionBlock questionText={questionText} />

        <McqChoicesBlock choicesArray={choicesArray} />


     
    </>
}