import { useState, createContext, useRef, useEffect } from "react";
import { Questions } from "../questions/Questions"
import MasterLayout from "./MasterLayout";
import { videos } from "../questions/Questions";

export const QuizContext = createContext();

export default function QuizController() {
    const [stage, setStage] = useState("welcome");
    const [showSplash, setShowSplash] = useState(false);
    const [showHint, setShowHint] = useState(false)

    const [initialQuestion] = useState(() => {
        const savedIndex = localStorage.getItem("questionIndex");

        return savedIndex !== null
            ? Number(savedIndex)
            : 0;
    });

    const [questionIndex, setQuestionIndex] = useState(initialQuestion);
    const [splashTextID, setSplashTextID] = useState(initialQuestion - 1)

    useEffect(() => {
        if (questionIndex > 0) {
            setStage("continue");
        }
    }, []);


    const currentQuiz = Questions[questionIndex]
    const totalQuestions = Questions.length;


    const preloadedVideos = useRef(new Set());


    function preloadVideo(src) {
        if (!src || preloadedVideos.current.has(src)) {
            return;
        }

        const video = document.createElement("video");
        video.preload = "auto";
        video.src = src;

        preloadedVideos.current.add(src);
    }




    useEffect(() => {
        const videoToPreload = videos[questionIndex + 1];

        if (videoToPreload) {
            preloadVideo(videoToPreload);
        }


    }, [questionIndex]);



    const audios = {
        ansTrue: "https://files.catbox.moe/dno4x4.mp3",
        ansFalse: "https://files.catbox.moe/d1e4tk.mp3",
        victory: "https://files.catbox.moe/dbzhh7.mp3"
    }


    const soundsRef = useRef({
        correct: Object.assign(new Audio(audios.ansTrue), {
            volume: 0.4,
        }),
        wrong: Object.assign(new Audio(audios.ansFalse), {
            volume: 0.6,
        }),
        victory: Object.assign(new Audio(audios.victory), {
            volume: 0.8,
        })


    });


    const checkAnswer = function (usrAnswer) {

        if (showSplash) {
            return null;
        }
        switch (currentQuiz.type) {

            case "mcq":
                const currentCorrect = currentQuiz.correct ?? null;

                if (currentCorrect === usrAnswer) {
                    return answerTrue();

                }
                else {
                    return answerFalse();
                }
                break
            case "blanks":
                const wrongBlocks = {};
                Object.entries(currentQuiz.correct).forEach(([key, correctValue]) => {
                    const userBlankAns64 = btoa(usrAnswer[key] ?? "");
                    if (userBlankAns64 !== correctValue) {
                        const match = key.match(/i(\d+)b/);

                        if (match) {
                            const blockIndex = Number(match[1]);
                            wrongBlocks[blockIndex - 1] = true; //becz i1b1 indx
                        }
                    }
                    const hintList = currentQuiz.hintCondition?.[key];

                    if (hintList?.includes(userBlankAns64)) {
                        setShowHint(true);

                    }
                });

                if (Object.keys(wrongBlocks).length === 0) {
                    return answerTrue();
                }
                answerFalse();
                return wrongBlocks;

                break


            case "style":

                const styleAnswer64 = btoa(usrAnswer) ?? null;
                if (styleAnswer64 === currentQuiz.correct) {
                    return answerTrue();
                } else {
                    return answerFalse();
                }

                break
            case "sync":
            case "split":

                const allValid = usrAnswer.every((ans, index) => {
                    const rule = currentQuiz.correct[index];
                    if (!rule) return false;

                    const isStartValid =
                        ans.start >= rule.startMin &&
                        ans.start <= rule.startMax;

                    const isEndValid =
                        ans.end >= rule.endMin &&
                        ans.end <= rule.endMax;

                    return isStartValid && isEndValid;
                });
                const noOverlap = usrAnswer.every((ans, index, arr) => {
                    if (index === arr.length - 1) return true;
                    return ans.end <= arr[index + 1].start;
                });


                if (allValid && noOverlap) {
                    return answerTrue();
                }
                else return answerFalse();


                break;

        }

    }

    const answerTrue = function () {
        soundsRef.current.correct.play();
        setSplashTextID((currIndex) => Math.max(0, currIndex + 1));
        setShowHint(false);
        setShowSplash(true);
        loadNextQuestion();
        return true;

    }

    const answerFalse = function () {
        soundsRef.current.wrong.currentTime = 0;
        soundsRef.current.wrong.play();
        navigator.vibrate(100);
        return false;
    }


    const loadNextQuestion = function () {
        setTimeout(() => {
            setQuestionIndex(prev => (prev + 1))
            if (questionIndex + 1 >= totalQuestions) {
                setStage("end");
            }
        }, 550);
    };

    const loadPreviousQuestion = function () {

        if (questionIndex === 0) {
            setStage("welcome");
            setQuestionIndex(initialQuestion);
            setSplashTextID(initialQuestion - 1);

        } else {
            setQuestionIndex(prev => (prev - 1));
            setSplashTextID((currIndex) => Math.max(0, currIndex - 1));
        }

        setShowSplash(false);
        setShowHint(false);

    }

    function resetQuiz() {
        setStage("welcome");
        setShowSplash(false);
        setShowHint(false);
        setQuestionIndex(0);
        setSplashTextID(-1);
        localStorage.removeItem("questionIndex");
    }


    const splashButtonPressed = function () {
        setShowSplash(false);
        if (stage === "end") {
            soundsRef.current.victory.play();
        } else {
            localStorage.setItem("questionIndex", questionIndex);
        }
    }

    const hintButtonPressed = function () {
        setShowHint(false);
    }

    return <>
        <QuizContext.Provider value={checkAnswer}>

            <MasterLayout
                stage={stage}
                setStage={setStage}
                resetQuiz={resetQuiz}
                loadPreviousQuestion={loadPreviousQuestion}
                currentQuiz={currentQuiz}
                currentQuizID={questionIndex}
                totalQuestions={totalQuestions}
                showSplash={showSplash}
                splashText={Questions[splashTextID]?.splashText || ""}
                hintText={Questions[questionIndex]?.hintText || ""}
                showHint={showHint}
                hintPress={hintButtonPressed}
                splashPress={splashButtonPressed}
                hintPress={hintButtonPressed}
            />

        </QuizContext.Provider >
    </>
} 