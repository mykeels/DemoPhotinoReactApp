import React from "react";
import { SongExports } from "./SongExports";

/**
 * @typedef {object} SongExporterScreenProps
 * @property {any} [className]
 */

/**
 * @type {React.FC<SongExporterScreenProps & { [key: string]: any }>}
 */
export const SongExporterScreen = () => {
  return <SongExports />;
};

SongExporterScreen.defaultProps = {};
