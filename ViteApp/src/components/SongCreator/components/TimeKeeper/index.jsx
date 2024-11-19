import "./TimeKeeper.css";

import classNames from "classnames";
import { DateTime } from "luxon";
import React, { useEffect, useRef, useState } from "react";

/**
 * @param {object} props
 * @param {number} [props.value]
 * @param {() => any} props.onStart
 * @param {(isRecording: boolean) => any} props.onStop
 * @param {(seconds: number) => any} props.onTick
 * @param {(interval: number) => any} props.onRecordTick
 * @returns {JSX.Element}
 */
export const TimeKeeper = ({
  value,
  onStart,
  onStop,
  onTick,
  onRecordTick
}) => {
  const [clock, setClock] = useState(false);
  const [ms, setMs] = useState(0);
  const [recordMs, setRecordMs] = useState(null);
  /** @type {import("react").MutableRefObject<NodeJS.Timer>} */
  const intervalRef = useRef();
  const isRecording = recordMs !== null;
  const isPlaying = !!clock;
  const start = () => {
    if (clock) {
      return;
    }
    setClock(true);
    intervalRef.current = setInterval(() => {
      setMs((ms) => ms + 250);
    }, 250);
    onStart();
  };
  const stop = () => {
    setClock(false);
    intervalRef.current && clearInterval(intervalRef.current);
    setMs(0);
    setRecordMs(null);
    onStop(isRecording);
  };
  const record = () => {
    if (!clock) {
      setRecordMs(ms);
      start();
    } else {
      onRecordTick((ms - recordMs) / 1000);
      setRecordMs(ms);
    }
  };
  useEffect(() => {
    if (!isRecording) {
      typeof onTick === "function" && onTick(ms / 1000);
    }
  }, [ms]);
  useEffect(() => {
    setMs(value * 1000);
  }, [value]);
  return (
    <div className="block w-full px-2 py-2">
      <button
        className={classNames(
          "inline-block text-center text-white px-4 py-2 text-xs rounded shadow mx-2",
          "border-2 border-pink focus:border-white focus:outline-none",
          {
            "record hover:bg-purple-200": !(isPlaying && !isRecording),
            "bg-purple-200": isRecording,
            "bg-purple-100": !isRecording,
            "bg-pink cursor-not-allowed": isPlaying && !isRecording
          }
        )}
        onClick={() => record()}
        disabled={isPlaying && !isRecording}
      >
        <span>{isRecording ? "Next Line" : "Record ⏺️"}</span>
      </button>
      <button
        className={classNames(
          "inline-block text-center text-white px-4 py-2 text-xs rounded shadow mx-2",
          "border-2 border-pink focus:border-white focus:outline-none",
          {
            "play hover:bg-purple-200": !isPlaying,
            "bg-purple-200": isPlaying,
            "bg-purple-100": !isPlaying
          }
        )}
        onClick={() => (isPlaying ? stop() : start())}
      >
        <span>{isPlaying ? (isRecording ? "Pause" : "Stop") : "Play"}</span>
      </button>

      <span className="inline-block float-right text-purple-200 text-lg font-bold px-4">
        {DateTime.fromMillis(ms).toFormat("mm:ss:SSS")}
      </span>
    </div>
  );
};

TimeKeeper.defaultProps = {
  value: 0,
  onStart: () => {},
  onStop: () => {},
  onTick: () => {},
  onRecordTick: () => {}
};
