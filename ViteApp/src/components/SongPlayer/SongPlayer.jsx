import React, { useEffect } from "react";
import { Player } from "@remotion/player";

import { frames } from "../../common/utils";
import { SongVideo } from "./components";

/**
 * @typedef {object} SongPlayerProps
 * @property {Pick<SongFileContent, "audioUrl" | "background" | "lines">} song
 * @property {boolean} [controls]
 * @property {number} [width]
 * @property {number} [height]
 * @property {boolean} [isFullscreen]
 * @property {() => any} [onPlayEnd]
 * @property {React.FC<{ lines: LyricLine[] }>} [Subtitles]
 * @property {React.FC<{ images: string[] }>} [Background]
 */

/**
 * @type {React.FC<SongPlayerProps & { [key: string]: any } & React.RefAttributes<import("@remotion/player").PlayerRef>>}
 */
export const SongPlayer = React.forwardRef(function SongPlayer(
  {
    song,
    width,
    height,
    isFullscreen,
    controls,
    onPlayEnd,
    Background,
    Subtitles,
    className
  },
  ref
) {
  if (!ref) {
    ref = React.createRef();
  }
  useEffect(() => {
    if (isFullscreen) {
      try {
        ref.current?.requestFullscreen();
      } catch (err) {
        console.warn("Fullscreen mode unsupported", err);
      }
      ref.current?.play();
    }
    const onFullScreenChange = (e) => {
      if (!e.detail.isFullscreen) {
        typeof onPlayEnd === "function" && onPlayEnd();
      }
    };
    ref.current?.addEventListener("fullscreenchange", onFullScreenChange);
    return () => {
      ref.current?.removeEventListener("fullscreenchange", onFullScreenChange);
    };
  }, []);
  const duration = song.lines.reduce((sum, line) => sum + line.duration, 0);
  return (
    <Player
      ref={ref}
      component={() => (
        <SongVideo song={song} Background={Background} Subtitles={Subtitles} />
      )}
      durationInFrames={frames(duration)}
      compositionWidth={width}
      compositionHeight={height}
      fps={frames(1)}
      controls={controls}
      className={className}
    />
  );
});

SongPlayer.defaultProps = {
  width: 1280,
  height: 720,
  controls: true
};
