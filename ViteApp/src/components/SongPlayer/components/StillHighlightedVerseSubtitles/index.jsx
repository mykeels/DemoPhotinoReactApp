import classNames from "classnames";
import React from "react";
import { AbsoluteFill } from "remotion";

/**
 * @typedef {object} StillHighlightedVerseSubtitlesProps
 * @property {any} [className]
 * @property {LyricLine[]} lines
 * @property {number} [count]
 * @property {number} cursor
 */

/**
 * @param {LyricLine[]} lines
 * @param {number} count
 * @returns {{ lines: LyricLine[], from: number, duration: number, id: number }[]}
 */
const mergeLinesIntoGroups = (lines, count) =>
  lines.reduce((arr, line, id) => {
    /** @type {() => ({ lines: LyricLine[], from: number, duration: 0 })} */
    let last = () => arr[arr.length - 1];
    if (!last() || last().lines.length === count) {
      arr.push({
        id,
        lines: [],
        from: 0,
        duration: 0
      });
    }
    if (last().lines.length < count) {
      if (last().lines.length === 0) {
        last().from = line.from;
      }
      last().lines.push(line);
      last().duration += line.duration;
    }
    return arr;
  }, []);

/**
 * @type {React.FC<StillHighlightedVerseSubtitlesProps & { [key: string]: any }>}
 */
export const StillHighlightedVerseSubtitles = ({ lines, count, cursor, className }) => {
  const groups = mergeLinesIntoGroups(lines, count);
  const group = groups.find(
    (g) => cursor >= g.id && cursor < g.id + g.lines.length
  ) || groups[0];
  return (
    <div>
      <AbsoluteFill className="items-center justify-center z-20">
        <div className="h-24 relative w-full text-center flex items-center justify-center">
          <div className="h-24 w-full z-0 opacity-75 rounded absolute top-0 left-0" />
          <div
            className={classNames(
              "z-10 relative font-bold p-4",
              className
            )}
          >
            {group?.lines?.map((line, i) => {
              const isActive = cursor === group.id + i;
              return line.text ? (
                <div className="block" key={`${line.text}-${i}`}>
                  <span
                    className={classNames(
                      "inline-block p-2 px-4 rounded my-1",
                      {
                        "bg-black text-2xl text-white": isActive,
                        "text-lg text-purple-100": !isActive
                      }
                    )}
                  >
                    {line.text}
                  </span>
                </div>
              ) : null;
            })}
          </div>
        </div>
      </AbsoluteFill>
    </div>
  );
};

StillHighlightedVerseSubtitles.defaultProps = {
  count: 4
};
