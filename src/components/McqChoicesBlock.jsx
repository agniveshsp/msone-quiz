import { useContext, useState, useEffect } from "react"
import { QuizContext } from "./QuizController"
export default function McqChoicesBlock({ choicesArray }) {
    const [wrongIndex, setWrongIndex] = useState(null);
    const [correctIndex, setCorrectIndex] = useState(null);

    useEffect(() => {
        setCorrectIndex(null);
        setWrongIndex(null);
    }, [choicesArray])

    function handleChoice(ind) {
        const isCorrect = checkAnswerFunc(ind);
        if (isCorrect === null) {
            return;
        }

        if (isCorrect) {
            setCorrectIndex(ind);
            setWrongIndex(null);
        } else {
            setWrongIndex(null);

            setTimeout(() => {
                setWrongIndex(ind);
            }, 0);

        }
    }


    const checkAnswerFunc = useContext(QuizContext);

    return <>
        <div className="h-[40vh] flex flex-col w-full items-center justify-evenly trans">
            {choicesArray.map((choice, ind) => {
                return (
                    <button key={ind} onClick={() => handleChoice(ind)} className={`w-[85%] sm:w-[50%] text-[clamp(0.8rem,2vw,1.25rem)] min-h-[clamp(3.5rem,4.1vw,5rem)]  
                    whitespace-pre-line mb-[1rem] font-anek bg-gray-50 text-gray-900 border px-6 py-2 rounded-lg  
                    transition-all duration-150 ease-in-out hover:bg-gray-100 border-2
                     active:bg-gray-200 active:scale-98  whitespace-nowrap border-gray-300  ${wrongIndex === ind
                            ? "border-red-400 animate-wiggle"
                            : correctIndex === ind
                                ? "border-green-500"
                                : "border-gray-300"
                        }`}>
                        {choice}</button>)
            })}
        </div >
    </>

}
// lg:min-h-[80px]