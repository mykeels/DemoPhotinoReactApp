import "./LyricsTabView.css";

import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { SongLine } from "../SongLine";
import { SaveButton } from "./components";

/**
 * @param {object} props
 * @param {string} [props.title]
 * @param {{ text: string, active: string }} [props.defaults]
 * @param {number} [props.cursor]
 * @param {LyricLine[]} [props.lines]
 * @param {(lines: LyricLine[]) => any} [props.onLinesChanged]
 * @param {(line: LyricLine, index: number) => any} [props.onLineClick]
 * @param {() => any} [props.onSave]
 * @param {() => any} [props.onClear]
 * @returns {JSX.Element}
 */
export const LyricsTabView = ({
  title,
  cursor,
  defaults,
  lines,
  onLinesChanged,
  onLineClick,
  onSave,
  onClear
}) => {
  const [active, setActive] = useState(defaults?.active || "text");
  const [text, setText] = useState(defaults?.text || "");
  const starts = (durations) => {
    let sum = 0;
    const arr = [];
    for (let i = 0; i < durations.length; i++) {
      sum += durations[i - 1] || 0;
      arr.push(sum);
    }
    return arr;
  };
  /** @param {LyricLine[]} lines */
  const updateSongLines = (lines) => {
    const startTimes = starts(lines.map((l) => l.duration));
    const linesWithFrom = lines.map((line, i) => ({
      ...line,
      from: startTimes[i]
    }));
    onLinesChanged(linesWithFrom);
  };
  /** @param {string} text */
  const updateSongLyrics = (text) => {
    updateSongLines(text
      .replace(/\n\n+/g, "\n\n")
      .split("\n")
      .map((line) => line.trim())
      .map((text, i) => ({
        text,
        duration: lines[i]?.duration || 1,
        from: lines[i]?.duration || 0
      })));
  };

  useEffect(() => {
    updateSongLyrics(text);
  }, [text]);

  return (
    <div className="w-full">
      <div className="w-full flex">
        {title ? (
          <div
            className="hidden sm:inline-block w-5/12 font-bold justify-left"
            role="presentation"
          >
            {title}
          </div>
        ) : null}
        <ul
          className={classNames(
            "nav nav-tabs w-full flex flex-row list-none border-b-0 pl-0 justify-end",
            {
              "sm:w-7/12": title
            }
          )}
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <Link
              to="/exports"
              className={classNames(
                "w-full block text-xs leading-tight uppercase px-2 py-2 hover:bg-purple-100 hover:text-white"
              )}
              role="tab"
            >
              <svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 490 490"
                xmlSpace="preserve"
                style={{ width: "16px", height: "16px" }}
              >
                <g>
                  <g>
                    <path
                      d="M245,0c-9.5,0-17.2,7.7-17.2,17.2v331.2L169,289.6c-6.7-6.7-17.6-6.7-24.3,0s-6.7,17.6,0,24.3l88.1,88.1
				c3.3,3.3,7.7,5,12.1,5c4.4,0,8.8-1.7,12.1-5l88.1-88.1c6.7-6.7,6.7-17.6,0-24.3c-6.7-6.7-17.6-6.7-24.3,0L262,348.4V17.1
				C262.1,7.6,254.5,0,245,0z"
                    />
                    <path
                      d="M462.1,472.9v-99.7c0-9.5-7.7-17.2-17.2-17.2s-17.2,7.7-17.2,17.2v82.6H62.2v-82.6c0-9.5-7.7-17.2-17.1-17.2
				s-17.2,7.7-17.2,17.2v99.7c0,9.5,7.7,17.1,17.2,17.1h399.8C454.4,490,462.1,482.4,462.1,472.9z"
                    />
                  </g>
                </g>
              </svg>
            </Link>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={classNames(
                "w-full block text-xs leading-tight uppercase px-2 py-2 hover:bg-purple-100 hover:text-white"
              )}
              role="tab"
              onClick={() => {
                setText("");
                onClear();
              }}
            >
              ❌
            </button>
          </li>
          {text ? (
            <>
              <li className="nav-item relative" role="presentation">
                <SaveButton onClick={onSave} />
              </li>
            </>
          ) : null}
          <li className="nav-item" role="presentation">
            <button
              className={classNames(
                "w-full block text-xs leading-tight uppercase px-6 py-2",
                {
                  "bg-purple-200 text-white": active === "pretty",
                  "hover:bg-purple-100": active !== "pretty"
                }
              )}
              onClick={() => setActive("pretty")}
              role="tab"
              aria-selected={active === "pretty" ? "true" : "false"}
            >
              Pretty
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className={classNames(
                "w-full block text-xs leading-tight uppercase px-6 py-2 hover:bg-purple-100",
                {
                  "bg-purple-200 text-white": active === "text",
                  "hover:bg-purple-100": active !== "text"
                }
              )}
              onClick={() => setActive("text")}
              role="tab"
              aria-selected={active === "text" ? "true" : "false"}
            >
              Text
            </button>
          </li>
        </ul>
      </div>
      <div className="tab-content py-2 custom-scroller overflow-y-auto">
        {active === "pretty" ? (
          <div>
            {text ? (
              lines.map((line, i) => (
                <SongLine
                  key={`${line}-${i}`}
                  isActive={cursor === i}
                  line={line}
                  // @ts-ignore
                  onClick={() => onLineClick(line, i)}
                ></SongLine>
              ))
            ) : (
              <div className="text-center w-full">No lyrics found</div>
            )}
          </div>
        ) : (
          <div>
            <textarea
              className="h-75vh w-full p-2 bg-pink text-purple-200 custom-scroller"
              placeholder="Paste Song Lyrics here"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>
        )}
      </div>
    </div>
  );
};

LyricsTabView.defaultProps = {
  cursor: 0,
  onLinesChanged: () => {},
  onLineClick: () => {},
  onSave: () => {},
  onClear: () => {}
};
