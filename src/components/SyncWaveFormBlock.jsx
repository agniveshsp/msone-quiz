import { useEffect, useRef, useContext, useState } from "react";
import WaveSurfer from "wavesurfer.js";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.esm.js";
import { QuizContext } from "./QuizController";

export default function SyncWaveformBlock({ videoRef, setCues, cues, splitable, splitText }) {

    const checkAnswerFunc = useContext(QuizContext);
    const containerRef = useRef(null);
    const wsRef = useRef(null);
    const regionsRef = useRef(null);
    const isProgrammaticUpdate = useRef(false);
    const [audioSrc, setAudioSrc] = useState(null);

    const [splitableState, setSplitableState] = useState(splitable);
    const [showRed, setShowRed] = useState(null)

    useEffect(() => {
        setSplitableState(splitable);
    }, [splitable]);


    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateSrc = () => {
            const src = video.currentSrc || video.src;
            if (src) setAudioSrc(src);
        };

        if (video.readyState >= 1) {
            updateSrc();
        } else {
            video.addEventListener("loadedmetadata", updateSrc);
        }

        return () => {
            video.removeEventListener("loadedmetadata", updateSrc);
        };

    }, [videoRef]);


    // by state
    useEffect(() => {
        setShowRed(null);
        if (!audioSrc) return;

        const video = videoRef.current;
        if (!video) return;

        const initWaveSurfer = () => {
            //  destroy old instance before creating new
            if (wsRef.current) {
                wsRef.current.destroy();
                wsRef.current = null;
            }

            const regions = RegionsPlugin.create();
            regionsRef.current = regions; // store it

            const ws = WaveSurfer.create({
                container: containerRef.current,
                waveColor: 'rgb(15, 78, 17)',
                progressColor: 'rgb(172, 73, 134)',
                height: 80,
                barHeight: 0.6,
                barWidth: 2,
                barGap: 1,
                barRadius: 2,
                cursorWidth: 2,

                interact: false,
                plugins: [regions],
                media: video,
            });

            wsRef.current = ws;

            ws.load(audioSrc); // now uses state

            ws.once('decode', () => {
                cues.forEach((r, index) => {
                    const reg = regions.addRegion({
                        start: r.start,
                        end: r.end,
                        content: r.text, // or your text
                        minLength: 0.2,
                        color: 'rgba(255, 190, 241, 0.23)',
                        drag: false,
                        resize: true,
                    });

                    reg.data = {
                        id: r.id
                    };

                });



            });

            regions.on('region-updated', (region) => {

                if (isProgrammaticUpdate.current) return; // ignore during rebuild
                const id = region.data?.id; // must exist

                setCues(prev =>
                    prev.map(cue =>
                        cue.id === id
                            ? {
                                ...cue,
                                start: region.start,
                                end: region.end
                            }
                            : cue
                    )
                );


            });
        };

        initWaveSurfer();

        return () => {
            wsRef.current?.destroy();
            wsRef.current = null;
        };

    }, [audioSrc]);


    function handleSplitRegion(splitText) {
        const activeId = 0;
        const [text1, text2] = splitText;
        const regions = regionsRef.current;
        if (!regions) return;

        const all = regions.getRegions();
        const target = all.find(r => r.data?.id === activeId);
        if (!target) return;

        const originalStart = target.start;
        const originalEnd = target.end;

        const mid = (originalStart + originalEnd) / 2;

        const GAP = 0.04; // adjust this

        const leftEnd = mid - GAP / 2;
        const rightStart = mid + GAP / 2;

        //avoid invalid region)
        if (leftEnd <= originalStart || rightStart >= originalEnd) return;

        // update left
        target.setOptions({
            start: originalStart,
            end: leftEnd,
            content: text1
        });

        // shift IDs
        all.forEach(r => {
            if (r.data?.id > activeId) {
                r.data.id += 1;
            }
        });
        setSplitableState(false);

        // add right
        const newRegion = regions.addRegion({
            start: rightStart,
            end: originalEnd,
            content: text2,
            minLength: 0.2,
            color: 'rgba(255, 190, 241, 0.23)',
            drag: false,
            resize: true,
        });

        newRegion.data = { id: activeId + 1 };

        // update state (IMPORTANT: pass same values)
        setCues(prev =>
            splitRegionArray(prev, activeId, leftEnd, rightStart, text1, text2)
        );
    }

    function splitRegionArray(cues, activeId, leftEnd, rightStart, text1, text2) {
        return cues.flatMap((c) => {

            if (c.id !== activeId) {
                return c.id > activeId
                    ? { ...c, id: c.id + 1 }
                    : c;
            }

            return [
                {
                    ...c,
                    end: leftEnd,
                    text: text1
                },
                {
                    ...c,
                    id: c.id + 1,
                    start: rightStart,
                    text: text2
                }
            ];
        });
    }

    const handleSubmitClick = function () {
        const isCorrect = checkAnswerFunc(cues);
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
    };

    return (
        <div className="min-h-[25dvh] flex flex-col bg-yellow-300 w-full items-center justify-evenly trans ">
            <div className={`flex w-[90%] sm:w-[60%]  justify-center bg-cyan-100 rounded border-2 border-gray-300 shadow-md 
            ${showRed === null
                    ? "border-gray-300"
                    : showRed === true
                        ? " animate-border-blink"
                        : "border-green-400"
                }`}>
                <div ref={containerRef} id="syncForm" className="w-[100%] " />
            </div>
            {splitable && (
                <button
                    onClick={() => handleSplitRegion(splitText)}
                    disabled={!splitableState}
                    className={`px-6 py-2.5 font-semibold rounded-lg shadow-md border-1 border-white transition-all duration-150 mt-2 mb-2
                        ${!splitableState
                            ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                            : "bg-gradient-to-t from-yellow-600 to-amber-300 text-white cursor-pointer hover:from-yellow-600 hover:to-amber-400 active:scale-95"
                        }`}
                >
                    ✂️ Split Line
                </button>
            )}
            <button onClick={handleSubmitClick}
                className="text-xl px-5 py-1 mb-4 bg-gradient-to-t from-green-900 to-emerald-500 text-white font-semibold rounded-md shadow-md border-2 border-gray-100 hover:from-green-800 hover:to-emerald-500 active:scale-98 transition-all duration-150 cursor-pointer">
                Submit
            </button>

        </div>
    );
}