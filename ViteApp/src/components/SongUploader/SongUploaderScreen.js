import React from "react";
import { useNavigate } from "react-router-dom";
import { SongUploader } from "./SongUploader";

/**
 * @typedef {object} SongUploaderScreenProps
 * @property {any} [className]
 * @property {(blobUrl: string) => any} onAudioFileReceived
 * @property {React.FC<import("./SongUploader").SongUploaderProps>} [SongUploader]
 */

/**
 * @type {React.FC<SongUploaderScreenProps & { [key: string]: any }>}
 */
export const SongUploaderScreen = ({ SongUploader, onAudioFileReceived }) => {
  const navigate = useNavigate();
  return (
    <SongUploader
      onAudioFileReceived={(audioUrl) => {
        if (typeof onAudioFileReceived === "function") {
          navigate("/create");
          onAudioFileReceived(audioUrl);
        }
      }}
    />
  );
};

SongUploaderScreen.defaultProps = {
  SongUploader: (props) => <SongUploader {...props} />
};
