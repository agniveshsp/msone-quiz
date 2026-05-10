import { useContext, useState, useEffect, use } from "react";
import { QuizContext } from "./QuizController"


export default function StylingSubtitleBlock({ subtitleBlocks }) {
    const [format, setFormat] = useState("span");
    const [showRed, setShowRed] = useState(null);

    const checkAnswerFunc = useContext(QuizContext);

    useEffect(() => {
        setFormat("span");
        setShowRed(null);
    }, [subtitleBlocks]);

    const handleSubmit = function () {
        const isCorrect = checkAnswerFunc(format);
        if (isCorrect === null) {
            return;
        }

        if (!isCorrect) {
            setShowRed(null);
            setTimeout(() => {
                setShowRed(true);
            }, 0);
        } else {
            setShowRed(false);
        }

    }

    function changeFormat(format) {
        setShowRed(null);
        setFormat(format);
    }


    function StyleButtons({ format }) {

        const buttonText = {
            b: <b>Bold</b>,
            i: <i>Italic</i>,
            u: <u>ULine</u>,
        }[format];

        return <button onClick={() => changeFormat(format)} className="styleBtn min-w-[5rem] text-sm px-3 py-1 
        mb-4 text-white font-semibold rounded-sm shadow-md border-1 border-gray-200  
        active:scale-95 transition-all duration-150 cursor-pointer">
            {buttonText}
        </button>
    }

    const Tag = format;

    function Wrapper({ subBlock }) {

        if (format === "span") {
            return <> {subBlock}</>
        } else {
            return (
                <span>
                    <span className="text-gray-500">
                        {`<${format}> `}
                    </span>

                    <Tag>{subBlock}</Tag>

                    <span className="text-gray-500">
                        {` </${format}>`}
                    </span>
                </span>
            );
        }

    }


    return (
        <>

            <div id="blankSubBlockCont" className=" trans bg-yellow-300 w-full flex flex-col items-center justify-evenly h-full text-[clamp(0.8rem,2vw,1.25rem)] text-center ">

                {subtitleBlocks.map((subBlock, index) => (
                    <div
                        key={index}
                        className={` w-[92%] sm:w-[50%] flex flex-col items-center justify-center whitespace-pre-line no-wrap min-h-[40px] 
                    lg:min-h-[80px] mcq-choices-text mb-[1rem] font-anek 
                    blankSubBlock text-black px-6 py-2 rounded-lg border-2  border-gray-300 whitespace-nowrap
                    ${showRed === null
                                ? "border-gray-300"
                                : showRed === true
                                    ? "animate-border-blink"
                                    : "border-green-500"
                            } `}>
                        <Wrapper subBlock={subBlock} />

                    </div>
                ))}
                <div className="flex flex-row w-[92%] sm:w-[50%] justify-between mb-4">
                    <StyleButtons format="b" /> <StyleButtons format="i" /> <StyleButtons format="u" />
                </div>

                <button onClick={handleSubmit} className="text-xl px-5 py-1 mb-4 bg-gradient-to-t from-green-900 to-emerald-500 text-white font-semibold rounded-md shadow-md border-2 border-white hover:from-green-800 hover:to-emerald-500 active:scale-98 transition-all duration-150 cursor-pointer">
                    Submit
                </button>


            </div>

        </>
    );
}