import { Children } from "react";
import McqQuizBlock from "./McqQuizBlock";
import SegmentedProgressBar from "./SegmentedProgressBar"
import SplashCard from "./SplashCard";
import BlankQuizBlock from "./BlankQuizBlock";
import SyncWaveFormQuizBlock from "./SyncWaveFormQuizBlock";
import Header from "./Header";

export default function QuizCard({ currentQuiz, showSplash, children, currentQuizID, totalQuestions }) {


    const currentQuestion = currentQuiz.question;
    const currentQuizType = currentQuiz.type;
    const currentCorrect = currentQuiz.correct ?? null;


    function renderQuestion() {
        switch (currentQuizType) {
            case "mcq":
                const currentChoices = currentQuiz.choices ?? null;
                return <McqQuizBlock questionText={currentQuestion} choicesArray={currentChoices} />;

            case "blanks":
                const subtitles = currentQuiz.subtitles ?? [];
                return <BlankQuizBlock questionText={currentQuestion} subtitleBlocks={subtitles} video={currentQuiz.video} cues={currentQuiz.cues} />;

            case "style":
                const subtitleStyle = currentQuiz.subtitles ?? [];
                return <BlankQuizBlock questionText={currentQuestion} subtitleBlocks={subtitleStyle} video={currentQuiz.video} cues={currentQuiz.cues} isStyle={true} />;

            case "sync":
                return <SyncWaveFormQuizBlock questionText={currentQuestion} video={currentQuiz.video} region={currentQuiz.region} dialouge={currentQuiz.subtitle} />;

            case "split":
                return <SyncWaveFormQuizBlock questionText={currentQuestion} video={currentQuiz.video} region={currentQuiz.region} splitable={true} splitText={currentQuiz.splitText} />;

            default:
                return <div>Unknown type</div>;
        }
    }


    return <>

        {renderQuestion()}</>

}


