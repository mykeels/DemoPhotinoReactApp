import "./TitleCreator.css";

import classNames from "classnames";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Spinner } from "../../common";
import { ManualTitleCreator } from "./components";
import { useDebounce } from "../../hooks";

/**
 * 
 * @typedef {object} TitleCreatorProps
 * @property {(title: string) => Promise<{ url: string, title: string, id: string }[]>} props.getLyricsOptions
 * @property {(url: string) => Promise<string>} props.getLyrics
 * @property {(data: { title: string, lyrics: string }) => any} [props.onTitleChanged]
 */

/**
 * @type {React.FC<TitleCreatorProps>}
 */
export const TitleCreator = ({
  getLyricsOptions,
  getLyrics,
  onTitleChanged
}) => {
  const [manual, setManual] = useState(false);
  /** @type {ReactState<string>} */
  const [text, setText] = useState("");
  /** @type {ReactState<{ url: string, title: string, id: string }>} */
  const [selected, setSelected] = useState(null);
  const debouncedText = useDebounce(text, 500);
  const { data: lyricsOptions = [], isLoading } = useQuery(
    ["lyric-options", debouncedText],
    () => getLyricsOptions(debouncedText)
  );

  const { mutate: _getLyrics, isLoading: isLyricsLoading } = useMutation(
    /** @param {{ url: string, title: string, id: string }} props */
    ({ url }) => getLyrics(url),
    {
      onSettled: (lyrics, error, props) => {
        if (!error && lyrics) {
          typeof onTitleChanged === "function" &&
            onTitleChanged({
              title: props?.title,
              lyrics: lyrics
            });
        }
      }
    }
  );

  return (
    <>
      {manual ? (
        <ManualTitleCreator
          onCancel={() => setManual(false)}
          onSubmit={(data) =>
            typeof onTitleChanged === "function" && onTitleChanged(data)
          }
        />
      ) : (
        <div className="block h-screen w-screen title-creator px-16 py-8">
          <div className="flex w-full h-full items-center justify-center py-4 px-8 bg-purple-200 opacity-75">
            <div className="block w-full text-white">
              <div className="text-2xl py-8 text-center">
                Step 1: What do you want to Sing?
              </div>
              <div
                className={classNames("overflow-y-auto custom-scroller", {
                  "h-40vh": lyricsOptions?.length,
                  "h-24vh": !lyricsOptions?.length
                })}
              >
                <div className="w-full py-4">
                  <input
                    type="text"
                    placeholder="Enter a Song Title or Author"
                    className="w-full text-xl px-4 py-2 text-purple-200"
                    value={text}
                    onChange={(e) => setText(e?.target?.value)}
                  />
                </div>
                <div className="w-full">
                  {isLoading ? (
                    <div className="w-full text-center">
                      <Spinner size={15} />
                    </div>
                  ) : (
                    lyricsOptions?.map((option, i) => (
                      <button
                        key={option.id}
                        className="block w-full bg-purple-100 bg-opacity-75 p-2 my-1 text-xs"
                        onClick={() => {
                          if (option) {
                            setSelected(option);
                            _getLyrics(option);
                          }
                        }}
                      >
                        {i + 1}. {option.title}
                        {isLyricsLoading &&
                        typeof selected === "object" &&
                        selected?.url === option.url ? (
                          <Spinner size={12} />
                        ) : null}
                      </button>
                    ))
                  )}
                </div>
              </div>
              <div className="block w-full py-4">
                <div className="inline-block w-full py-2 text-right">
                  <button
                    className="bg-purple-100 px-8 py-4 text-xl inline-block w-full sm:w-auto"
                    onClick={() => setManual(true)}
                  >
                    Type Lyrics
                    <span className="hidden md:inline"> Instead</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

TitleCreator.defaultProps = {
  onTitleChanged: () => {}
};
