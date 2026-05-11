export default function McqQuestionBlock({questionText}) {
    return <div className="pt-4 pb-5 px-4">
        <h2 className="text-[clamp(0.8rem,1vw,1.25rem)] whitespace-pre-line quiz-question-text text-stone-50 text-center font-medium font-anek ">
            {questionText}
        </h2>
    </div>
}