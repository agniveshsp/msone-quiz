import { useState } from "react";

export default function SegmentedProgressBar({ total = 10, value = 6, showSplash }) {
  return (

    <div id="progressBar" className="bg-transparent w-full" style={{ display: "flex", gap: 3, borderRadius: 2, overflow: "hidden" }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: 6,
            borderRadius: 2,
            backgroundColor: i >= value ? "#ffffff28" : showSplash ? "#bf90fc" : "#68b9fc",
            transition: "background-color 0.9s",
          }}
        />
      ))}
    </div>


  );
};


