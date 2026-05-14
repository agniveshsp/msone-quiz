import Header from "./Header"
import QuizCard from "./QuizCard"
import SplashCard from "./SplashCard";
import HintCard from "./HintCard";
import WelcomeScreen from "./WelcomeScreen";
import EndScreen from "./EndScreen";

export default function MasterLayout({
    stage,
    setStage,
    resetQuiz,
    loadPreviousQuestion,
    currentQuiz,
    currentQuizID,
    totalQuestions,
    showSplash,
    splashText,
    hintText,
    showHint,
    splashPress,
    hintPress
}) {

    function renderStage() {
        switch (stage) {
            case "welcome":
                return <WelcomeScreen setStage={setStage} />;
            case "continue":
                return <WelcomeScreen setStage={setStage} resume={true} />;
            case "quiz":
                return <QuizCard currentQuiz={currentQuiz} currentQuizID={currentQuizID} totalQuestions={totalQuestions} showSplash={showSplash} />
            case "end":
                return <EndScreen resetQuiz={resetQuiz} />;

            default:
                return null;
        }
    }




    return <>
        <div className="min-h-[100dvh]  flex items-center justify-center " id="baseCard">
            <div className="h-[100dvh]  flex flex-col w-full md:w-[80%] lg:w-1/2 " id="quizCardBase">
                <Header stage={stage} showSplash={showSplash} totalQuestions={totalQuestions} currentQuizID={currentQuizID} resetQuiz={resetQuiz} loadPreviousQuestion={loadPreviousQuestion} />

                <div className="flex flex-col flex-grow relative overflow-hidden">
                    <div className="flex flex-col justify-center items-center trans">
                        {renderStage()}
                    </div>

                    <div className="flex-grow flex justify-center items-end trans ">
                        <span className="text-gray-400">© Msone</span>
                    </div>
                    <HintCard hintText={hintText} showHint={showHint} hintPress={hintPress} />
                    <SplashCard splashText={splashText} showSplash={showSplash} splashPress={splashPress} />

                </div>
            </div>
        </div>
    </>
}