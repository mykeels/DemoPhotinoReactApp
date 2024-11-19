import React from "react";

/**
 * @typedef {object} FfMpegInstructionsProps
 * @property {any} [className]
 */

/**
 * @type {React.FC<FfMpegInstructionsProps & { [key: string]: any }>}
 */
export const FfMpegInstructions = () => {
  return (
    <>
      <h2 className="underline py-4">FfMpeg is not installed</h2>
      <p className="py-4">
        To export this Karaoke video you need FfMpeg installed on your computer.
      </p>
      <p className="py-4">
        You can{" "}
        <a
          href="https://ffmpeg.org/download.html"
          target="_blank"
          rel="noreferrer"
          className="underline text-lavender-100"
        >
          download and install an executable
        </a>{" "}
        for Ffmpeg.
      </p>
    </>
  );
};

FfMpegInstructions.defaultProps = {};
