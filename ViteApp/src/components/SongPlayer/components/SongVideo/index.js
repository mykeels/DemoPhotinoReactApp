import React from "react";
import { CenterFill, HighlightedVerseSubtitles, PhotoSlideshow } from "..";
import { Audio } from "remotion";
import { ColorTransitions } from "../../../../animations";

const apiRootURL = process.env.REACT_APP_API_ROOT;

/**
 * @typedef {object} SongVideoProps
 * @property {Pick<SongFileContent, "audioUrl" | "background" | "lines">} song
 * @property {React.FC<{ lines: LyricLine[] }>} [Subtitles]
 * @property {React.FC<SongBackground<"colors" | "images">>} [Background]
 */

/**
 * @type {React.FC<SongVideoProps & { [key: string]: any } & React.RefAttributes<HTMLAudioElement>>}
 */
export const SongVideo = React.forwardRef(function SongVideo(
  { song, Background, Subtitles },
  ref
) {
  return (
    <>
      <Audio src={song.audioUrl.replace("~", apiRootURL)} ref={ref} />
      <Background {...song.background} />
      <Subtitles lines={song.lines} />
    </>
  );
});

SongVideo.defaultProps = {
  Subtitles: HighlightedVerseSubtitles,
  /**
   *
   * @type {React.FC<SongBackground<"colors" | "images">>}
   */
  Background: ({ type, images, colors }) => {
    const isColors = type === "colors";
    return isColors ? (
      <ColorTransitions colors={colors}>
        {({ style }) => (
          <CenterFill
            className="z-10"
            style={{ backgroundColor: style.color }}
          />
        )}
      </ColorTransitions>
    ) : (
      <PhotoSlideshow images={images} />
    );
  }
};
