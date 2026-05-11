import { useContext, useState, useEffect } from "react";
import { QuizContext } from "./QuizController"



export default function BlankSubtitleBlock({ subtitleBlocks }) {

    const [wrongBlocks, setWrongBlocks] = useState({});
    useEffect(() => {
        setWrongBlocks({})
    }, [subtitleBlocks]);

    const checkAnswerFunc = useContext(QuizContext);

    const handleSubmit = function (e) {
        e.preventDefault();

        const formData = new FormData(e.target);

        const data = Object.fromEntries(formData.entries());

        const wrongBlocksResult = checkAnswerFunc(data);
        if (wrongBlocksResult === null) {
            return;
        }
        setWrongBlocks({});
        setTimeout(() => {
            setWrongBlocks(wrongBlocksResult);
        }, 0);


    }

    return (
        <>
            {/* <div className="h-[30vh] md:h-[40vh] flex flex-col bg-yellow-300 w-full items-center justify-evenly text-[clamp(0.8rem,2vw,1.25rem)] text-center"> */}
            <div id="blankSubBlockCont" className=" trans bg-yellow-300 w-full ">
                <form onSubmit={handleSubmit} className="flex flex-col items-center justify-evenly h-full text-[clamp(0.85rem,0.6rem+0.5vw,1.2rem)] text-center">
                    {subtitleBlocks.map((subBlock, index) => (
                        <div
                            key={index}
                            className={`w-[50%] max-[1367px]:w-[75%] max-sm:w-[90%] flex flex-col items-center justify-center whitespace-pre-line no-wrap min-h-[40px] 
                    lg:min-h-[80px] mcq-choices-text mb-[1rem] font-anek 
                    blankSubBlock text-gray-900 border border-gray-300 px-6 py-2 rounded-lg  whitespace-nowrap  border-2  shadow-sm
                    ${wrongBlocks[index]
                                    ? "animate-border-blink "
                                    : "border-gray-300"
                                }`}
                        >
                            {subBlock}
                        </div>
                    ))}
                    <button type="submit" className="px-5 py-1 mb-4 bg-gradient-to-t from-green-900 to-emerald-500 text-white font-semibold rounded-lg shadow-md border-2 border-gray-100 hover:from-green-800 hover:to-emerald-500 active:scale-98 transition-all duration-150 cursor-pointer">
                        Submit
                    </button>
                    {/* <button type="submit">Submit </button> */}
                </form >

            </div>

        </>
    );
}