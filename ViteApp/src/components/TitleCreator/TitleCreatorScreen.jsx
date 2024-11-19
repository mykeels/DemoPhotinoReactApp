import React from "react";
import { useNavigate } from "react-router-dom";

import { getLyrics, getLyricsOptions } from "../../common/services";
import { TitleCreator } from "./TitleCreator";

/**
 * @typedef {object} TitleCreatorScreenProps
 * @property {any} [className]
 * @property {(data: { title: string, lyrics: string }) => any} [onTitleChanged]
 * @property {() => any} [onFileUploadIntent]
 * @property {React.FC<Pick<import("./TitleCreator").TitleCreatorProps, "onTitleChanged">>} [TitleCreator]
 */

/**
 * @type {React.FC<TitleCreatorScreenProps & { [key: string]: any }>}
 */
export const TitleCreatorScreen = ({
  onTitleChanged,
  TitleCreator
}) => {
  const navigate = useNavigate();
  return (
    <TitleCreator
      onTitleChanged={(data) => {
        if (typeof onTitleChanged === "function") {
          onTitleChanged(data);
          navigate("/create/upload-audio");
        }
      }}
    />
  );
};

TitleCreatorScreen.defaultProps = {
  TitleCreator: (props) => (
    <TitleCreator
      {...props}
      getLyrics={getLyrics}
      getLyricsOptions={getLyricsOptions}
    />
  )
};
