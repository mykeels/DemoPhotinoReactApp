import "./SongCreator.css";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { LyricsTabView } from "./components/LyricsTabView";
import rake from "rake-js";
import { TimeKeeper } from "./components/TimeKeeper";
import { ImageGallery } from "./components/ImageGallery";
import classNames from "classnames";
import { SongPlayer } from "../SongPlayer";
import { frames } from "../../common";
import { BackgroundSelect } from "./components/BackgroundSelect";
import { ColorGallery } from "./components/ColorGallery";

/**
 * @param {Song} song
 * @param {number} timeInSeconds
 */
const getCurrentLineIndex = (song, timeInSeconds) => {
  return song.findIndex(
    (line) =>
      timeInSeconds > line.from && timeInSeconds <= line.from + line.duration
  );
};

/**
 * @param {Song} song
 * @param {LyricLine} currentLine
 */
const getLineTime = (song, currentLine) => {
  let sum = 0.01;
  for (let line of song) {
    if (
      line === currentLine ||
      (line.text === currentLine.text && line.from === currentLine.from)
    ) {
      return sum;
    }
    sum += line.duration;
  }
  return sum;
};

/** @param {LyricLine[]} lines */
const transformSongLines = (lines) => {
  const starts = (durations) => {
    let sum = 0;
    const arr = [];
    for (let i = 0; i < durations.length; i++) {
      sum += durations[i - 1] || 0;
      arr.push(sum);
    }
    return arr;
  };
  const startTimes = starts(lines.map((l) => l.duration));
  return lines.map((line, i) => ({
    ...line,
    from: startTimes[i]
  }));
};

/**
 * @typedef {object} SongCreatorProps
 * @property {string} [className]
 * @property {string} [id]
 * @property {string} [title]
 * @property {string} audioUrl
 * @property {(lines: Song, interval?: number) => Promise<string[]>} [getImages]
 * @property {(song: Omit<SongFileContent, "id"|"lyrics"|"song">) => Promise<any>} [onSave]
 * @property {React.FC<Omit<Parameters<typeof LyricsTabView>[0], "defaults">>} LyricsTabView
 * @property {() => any} [onReset]
 * @property {{ lines: LyricLine[], images: string[] }} [defaults]
 */

/**
 * @type {React.FC<SongCreatorProps>}
 */
export const SongCreator = ({
  id,
  title,
  audioUrl,
  className,
  getImages,
  LyricsTabView,
  onReset,
  defaults,
  onSave
}) => {
  /** @type {ReactState<LyricLine[]>} */
  const [lines, setLines] = useState(defaults?.lines || []);
  /** @type {ReactState<number>} */
  const [cursor, setCursor] = useState(0);

  /** @type {ReactState<number>} */
  const [recordCursor, setRecordCursor] = useState(0);
  const currentLine = lines[Math.max(cursor, recordCursor)];

  const [timeReset, setTimeReset] = useState(0);
  /** @type {ReactState<SongBackground<"colors" | "images">>} */
  const [background, setBackground] = useState({
    type: "images",
    images: defaults.images,
    colors: [
      `#00aaff`,
      `#ffaa00`,
      `#0000ff`,
      `#00ff00`,
      `#ff0000`,
      `#00aaff`
    ]
  });

  useEffect(() => {
    if (defaults?.lines?.length) {
      setLines(defaults?.lines || []);
    }
    if (defaults?.images?.length) {
      setBackground({ ...background, images: defaults?.images || [] });
    }
  }, [defaults?.lines, defaults?.images]);

  /** @type {import("react").MutableRefObject<import("@remotion/player").PlayerRef>} */
  const songPlayerRef = useRef();
  useEffect(() => {
    if (songPlayerRef.current) {
      songPlayerRef.current.getContainerNode().style.width = "100%";
      songPlayerRef.current.getContainerNode().style.height = "100%";
    }
  }, [background.type]);

  /** @type {React.FC<{ children: any }>} */
  const Background = useCallback(
    ({ children }) => {
      return {
        images: (
          <ImageGallery
            cursor={Math.max(recordCursor, cursor)}
            images={background.images}
            line={currentLine}
            onChange={(images) =>
              setBackground({ ...background, images, type: "images" })
            }
          >
            {children}
          </ImageGallery>
        ),
        colors: (
          <ColorGallery
            cursor={Math.max(recordCursor, cursor)}
            colors={background.colors}
            onChange={(colors) =>
              setBackground({ ...background, colors, type: "colors" })
            }
          >
            {children}
          </ColorGallery>
        )
      }[background.type];
    },
    [background.type]
  );

  return (
    <div
      className={classNames(
        "block h-screen w-screen px-4 lg:px-16 py-8 song-creator overflow-y-auto custom-scroller",
        className
      )}
    >
      <div className="block w-full text-right"></div>
      <div className="block lg:flex w-full">
        <div className="inline-block w-full lg:w-5/12">
          <div className="lg:px-4 sticky top-0">
            <div className="block w-full bg-pink rounded border-2 border-purple-100">
              <TimeKeeper
                value={timeReset}
                onTick={(seconds) => {
                  const newCursor = getCurrentLineIndex(lines, seconds);
                  if (newCursor !== cursor) {
                    setCursor(newCursor);
                  }
                }}
                onRecordTick={(duration) => {
                  setLines((lines) =>
                    transformSongLines(
                      lines.map((line) =>
                        line === currentLine ? { ...line, duration } : line
                      )
                    )
                  );
                  setRecordCursor(recordCursor + 1);
                }}
                onStart={() => {
                  songPlayerRef.current.play();
                }}
                onStop={(isRecording) => {
                  songPlayerRef.current.pause();
                  if (!isRecording) {
                    songPlayerRef.current.seekTo(0);
                    setCursor(0);
                    setRecordCursor(0);
                  } else {
                    const seconds = getLineTime(lines, currentLine);
                    setTimeReset(seconds);
                    songPlayerRef.current.seekTo(frames(seconds));
                    setCursor(getCurrentLineIndex(lines, seconds));
                    setRecordCursor(recordCursor);
                  }
                }}
              />
            </div>
            <div className="block py-2"></div>

            <>
              <div className="flex lg:block w-full bg-pink border-2 border-purple-100 p-2 justify-center items-center">
                <BackgroundSelect
                  value={background.type}
                  // @ts-ignore
                  onChange={(type) => setBackground({ ...background, type })}
                />
                <Background>
                  {lines?.length ? (
                    <SongPlayer
                      song={{
                        audioUrl,
                        background,
                        lines
                      }}
                      width={640}
                      height={480}
                      ref={songPlayerRef}
                      controls={false}
                    ></SongPlayer>
                  ) : null}
                </Background>
              </div>
            </>
          </div>
        </div>
        <div className="py-2 block lg:hidden"></div>
        <div className="inline-block w-full lg:w-7/12 p-4 bg-pink rounded border-2 border-purple-100">
          <LyricsTabView
            cursor={Math.max(recordCursor, cursor)}
            lines={lines}
            onLinesChanged={(lines) => {
              setLines(lines);
              if (lines.length !== lines.length) {
                getImages(lines).then((images) =>
                  setBackground({ ...background, images })
                );
              }
            }}
            onLineClick={(line, i) => {
              const seconds = getLineTime(lines, lines[i]);
              setTimeReset(seconds);
              songPlayerRef.current.seekTo(frames(seconds));
              setRecordCursor(getCurrentLineIndex(lines, seconds));
              setCursor(getCurrentLineIndex(lines, seconds));
            }}
            onSave={() => {
              /** @type {SongFileContent} */
              const data = {
                id,
                title,
                lines: lines,
                background,
                duration: lines.reduce((sum, line) => sum + line.duration, 0),
                lyrics: lines.map((line) => line.text).join("\n"),
                audioUrl
              };
              onSave(data);
            }}
            onClear={() => {
              setLines([]);
              setCursor(0);
              setRecordCursor(0);
              setTimeReset(0);
              onReset();
            }}
          ></LyricsTabView>
        </div>
      </div>
    </div>
  );
};

SongCreator.defaultProps = {
  title: "karaoke",
  getImages,
  LyricsTabView,
  onReset: () => {},
  defaults: {
    images: [],
    lines: []
  }
};

/** @param {Song} lines */
async function getImages(lines, intervals = 5) {
  let cursor = intervals;
  let texts = [];
  const keywords = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isWithinBounds =
      cursor - intervals <= line.from && cursor >= line.from + line.duration;
    if (isWithinBounds) {
      texts.push(line.text);
    } else {
      cursor += intervals;
      keywords.push(rake(texts.join("\n"), { language: "english" }).join(" "));
      texts = [line.text];
    }
  }
  return Promise.all(
    keywords.map((keyword) =>
      fetch(`https://source.unsplash.com/random/1280x720/?${keyword}`).then(
        (res) => res.url
      )
    )
  );
}
