import React, { useState, useCallback, useEffect } from "react";
import { continueRender, delayRender } from "remotion";
import { SongVideo } from "../SongPlayer";
import { CenterFill } from "../SongPlayer/components";

/**
 * @typedef {object} SongURLPlayerProps
 * @property {any} [className]
 * @property {string} url
 * @property {(duration: number) => any} onDurationChange
 */

/**
 * @type {React.FC<SongURLPlayerProps & { [key: string]: any }>}
 */
export const SongURLPlayer = ({ url, onDurationChange }) => {
  const [error, setError] = useState(null);
  /** @type {ReactState<SongFileContent>} */
  const [data, setData] = useState(null);
  const [handle] = useState(() => delayRender());
  const fetchData = useCallback(async () => {
    await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        onDurationChange(data?.duration);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      });
    continueRender(handle);
  }, [handle]);
  useEffect(() => {
    fetchData();
  }, []);

  return error ? (
    <CenterFill className="bg-pink">
      <>
        <div className="p-4">
          This component is supposed to be loaded when the server is running. It
          seems the server was not found, hence an error occurred while
          processing this component
        </div>
        <div className="p-4">{error.toString()}</div>
        <div className="p-4">{url}</div>
        <div className="p-4">{location.href}</div>
      </>
    </CenterFill>
  ) : data ? (
    <SongVideo song={data} />
  ) : null;
};

SongURLPlayer.defaultProps = {
  onDurationChange: () => {},
  url: process.env.REACT_APP_VIDEO_URL || process.env.REMOTION_VIDEO_URL
};
