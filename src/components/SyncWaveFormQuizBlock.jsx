import BlankQuestionBlock from "./BlankQuestionBlock";
import SyncWaveFormBlock from "./SyncWaveFormBlock";
import VideoPlayer from "./VideoPlayer";
import SyncWaveformBlock from "./SyncWaveFormBlock";
import { useState, useRef, useEffect } from "react";
export default function SyncWaveFormQuizBlock({ questionText, video, region, splitable = false, splitText = [] }) {

    const videoRef = useRef(null);

    const [cues, setCues] = useState(
        region.map(r => ({
            id: r.regID,
            start: r.regionStart,
            end: r.regionEnd,
            text: r.dialouge
        }))
    );

    console.log("cues", cues);
    useEffect(() => {
        if (!region) return;

        setCues(
            region.map(r => ({
                id: r.regID,
                start: r.regionStart,
                end: r.regionEnd,
                text: r.dialouge
            }))
        );

    }, [region]); //  THIS is required



    console.log("cues", cues);

    return (
        <>  <BlankQuestionBlock questionText={questionText}>
            <VideoPlayer videoRef={videoRef} video={video} cues={cues} />
        </BlankQuestionBlock>
            <SyncWaveformBlock videoRef={videoRef} setCues={setCues} cues={cues} splitable={splitable} splitText={splitText} />

        </>
    );
}

// return <>
//     <BlankQuestionBlock />
//     <SyncWaveFormBlock />
// </>

// }