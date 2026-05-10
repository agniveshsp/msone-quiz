import BlankQuestionBlock from "./BlankQuestionBlock";
import BlankSubtitleBlock from "./BlankSubtitleBlock";
import StylingSubtitleBlock from "./StylingSubtitleBlock";
import VideoPlayer from "./VideoPlayer";
import { useState, useRef } from "react";
export default function BlankQuizBlock({ questionText, subtitleBlocks, video, cues, isStyle = false }) {
    const videoRef = useRef(null);
    return <>
        <BlankQuestionBlock questionText={questionText} >
            <VideoPlayer videoRef={videoRef} video={video} cues={cues} />
        </BlankQuestionBlock>
        {!isStyle
            ? <BlankSubtitleBlock subtitleBlocks={subtitleBlocks} />
            : <StylingSubtitleBlock subtitleBlocks={subtitleBlocks} />
        }

    </>
}