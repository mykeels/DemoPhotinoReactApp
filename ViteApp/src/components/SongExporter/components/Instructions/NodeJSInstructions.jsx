import React from "react";

/**
 * @typedef {object} NodeJSInstructionsProps
 * @property {any} [className]
 */

/**
 * @type {React.FC<NodeJSInstructionsProps & { [key: string]: any }>}
 */
export const NodeJSInstructions = () => {
  return (
    <>
      <h2 className="underline py-4">NodeJS is not installed</h2>
      <p className="py-4">
        To export this Karaoke video you need NodeJS installed on your computer.
      </p>
      <p className="py-4">
        You can{" "}
        <a
          href="https://nodejs.org/en/"
          target="_blank"
          rel="noreferrer"
          className="underline text-lavender-100"
        >
          download and install the LTS version
        </a>
        .
      </p>
    </>
  );
};

NodeJSInstructions.defaultProps = {};
