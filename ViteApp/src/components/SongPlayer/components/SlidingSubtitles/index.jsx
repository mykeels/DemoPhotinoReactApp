import React from "react";
import { Sequence, AbsoluteFill, useVideoConfig } from "remotion";

import { Lifecycle, Pulse, SlideIn, SlideOut } from "../../../../animations";
import { frames, starts } from "../../../../common/utils";
import classNames from "classnames";

/**
 * @typedef {object} SlidingSubtitlesProps
 * @property {any} [className]
 * @property {LyricLine[]} lines
 */

/**
 * @type {React.FC<SlidingSubtitlesProps & { [key: string]: any }>}
 */
export const SlidingSubtitles = ({ lines }) => {
  const startTimes = starts(lines.map((l) => frames(l.duration)));
  const { width } = useVideoConfig();
  const bgColor = (i) => {
    const colors = ["bg-purple-200", "bg-lavender-200"];
    return colors[i % colors.length];
  };
  const fontSize = classNames({
    "text-xs": width <= 320,
    "text-lg": width > 320 && width <= 640,
    "text-xl": width > 640 && width <= 1024,
    "text-4xl": width > 1024
  });
  return (
    <>
      {lines.map((line, i) =>
        line.text ? (
          <Sequence
            key={`${line.text}-${i}`}
            from={
              line.from ? Math.max(frames(line.from - 0.75), 0) : startTimes[i]
            }
            durationInFrames={frames(line.duration + 1)}
            layout="none"
          >
            <AbsoluteFill className="items-center justify-center z-20">
              <Lifecycle
                className="z-20"
                ratio={`1:2:1`}
                Entrance={(props) => <SlideIn {...props} from="left" />}
                Exit={(props) => <SlideOut {...props} to="right" />}
                Main={(props) => <Pulse {...props} />}
                duration={line.duration + 1}
              >
                <div className="h-24 relative w-full text-center flex items-center justify-center">
                  <div
                    className={classNames(
                      "h-24 w-full z-0 opacity-75 rounded absolute top-0 left-0",
                      bgColor(i)
                    )}
                  />
                  <div
                    className={classNames(
                      "z-10 relative text-white font-bold p-4",
                      fontSize
                    )}
                  >
                    {line.text}
                  </div>
                </div>
              </Lifecycle>
            </AbsoluteFill>
          </Sequence>
        ) : null
      )}
    </>
  );
};

SlidingSubtitles.defaultProps = {};
