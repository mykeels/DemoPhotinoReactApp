import classNames from "classnames";
import React, { useCallback, useState } from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig
} from "remotion";
import * as transformParser from "transform-parser";

import { Pulse } from "../../../../animations";
import { frames, starts, isFrameWithin, assert } from "../../../../common";

type HighlightedVerseSubtitlesProps = {
  className?: any;
  lines: LyricLine[];
  count?: number;
};

type LyricLineGroup = {
  lines: LyricLine[];
  from: number;
  duration: number;
  id: number;
};

const mergeLinesIntoGroups = (
  lines: LyricLine[],
  count: number
): LyricLineGroup[] =>
  lines.reduce((arr, line, id) => {
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
  }, [] as LyricLineGroup[]);

export const HighlightedVerseSubtitles = ({ lines, count }: HighlightedVerseSubtitlesProps) => {
  const groups = mergeLinesIntoGroups(lines, assert(count));
  const startTimes = starts(groups.map((g) => frames(g.duration)));
  const frame = useCurrentFrame();
  const { width } = useVideoConfig();
  const fontSize = classNames({
    "text-xs": width <= 320,
    "text-lg": width > 320 && width <= 640,
    "text-xl": width > 640 && width <= 1024,
    "text-4xl": width > 1024
  });
  const [style, setStyle] = useState<Pick<React.CSSProperties, "transform">>({});
  const updateStyle = useCallback((s: Pick<React.CSSProperties, "transform">) => {
    setStyle({
      ...style,
      ...s,
      ...(s?.transform || style?.transform
        ? {
            transform: transformParser.stringify({
              ...(style?.transform
                ? transformParser.parse(style?.transform)
                : {}),
              ...(s?.transform ? transformParser.parse(s?.transform) : {})
            })
          }
        : {})
    });
  }, []);
  return (
    <div>
      <Pulse onChange={updateStyle} />
      {groups.map((group, i) => {
        return (
          <Sequence
            key={`${group.id}-${i}`}
            from={group.from ? frames(group.from) : startTimes[i]}
            durationInFrames={frames(group.duration)}
            layout="none"
          >
            <AbsoluteFill className="items-center justify-center z-20">
              <div className="h-24 relative w-full text-center flex items-center justify-center">
                <div className="h-24 w-full z-0 opacity-75 rounded absolute top-0 left-0" />
                <div
                  className={classNames(
                    "z-10 relative text-white font-bold p-4",
                    fontSize
                  )}
                >
                  {group.lines.map((line, i) => {
                    const isActive = isFrameWithin(
                      frame,
                      frames(line.from),
                      frames(line.duration)
                    );
                    return line.text ? (
                      <div className="block" key={`${line.text}-${i}`}>
                        <span
                          className={classNames(
                            "inline-block p-2 px-4 rounded my-1",
                            {
                              "bg-black text-5xl": isActive
                            }
                          )}
                          style={(isActive ? style : null) as React.CSSProperties}
                        >
                          {line.text}
                        </span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </AbsoluteFill>
          </Sequence>
        );
      })}
    </div>
  );
};

HighlightedVerseSubtitles.defaultProps = {
  count: 4
};
