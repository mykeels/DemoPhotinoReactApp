import "./SongExporter.css";

import React, { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { Capabilities } from "./components";
import { Spinner } from "../../common";
import { SongExporter } from "./SongExporter";
import { getExports, getSongRecords } from "../../common/services";

/**
 * @typedef {object} SongExportsProps
 * @property {() => Promise<SongRecord[]>} [getSongRecords]
 * @property {() => Promise<SongExport[]>} [getExports]
 * @property {React.FC<Omit<import("./components/Capabilities").CapabilitiesProps, "getCapabilities">>} [Capabilities]
 * @property {React.FC<Omit<import("./SongExporter").SongExporterProps, "startExport" | "stopExport">>} [SongExporter]
 */

/**
 * @type {React.FC<SongExportsProps & { [key: string]: any }>}
 */
export const SongExports = ({
  getSongRecords,
  getExports,
  SongExporter,
  Capabilities
}) => {
  /** @type {ReactState<boolean>} */
  const [hasCapabilities, setHasCapabilities] = useState(null);
  const { data: songRecords = [], isLoading } = useQuery(["songs"], () =>
    getSongRecords()
  );
  const { data: exports } = useQuery(
    ["exports"],
    /** @returns {Promise<{ [id: string]: SongExport }>} */
    () =>
      getExports().then((exports) =>
        exports.reduce((dict, e) => ({ ...dict, [e.id]: e }), {})
      )
  );
  return (
    <div className="block h-screen w-screen song-exporter relative">
      <div className="flex w-full h-full items-center justify-center py-4 px-8 bg-purple-100 opacity-75"></div>
      <div className="block w-full h-full items-center justify-center py-4 px-16 absolute top-0 left-0 text-white text-sm md:text-lg overflow-auto custom-scroller">
        <div className="block w-full text-3xl py-8">
          <div className="inline-block w-3/4">Export MP4 videos</div>
          <div className="inline-block w-1/4 text-right">
            <Link to="/">❎</Link>
          </div>
        </div>
        <div className="block md:flex w-full py-4">
          {hasCapabilities ? (
            <div className="inline-block w-full px-2">
              <div className="block w-full px-8 py-4 bg-purple-200 my-4 min-h-80v">
                {isLoading ? (
                  <Spinner size={16} />
                ) : songRecords.length ? (
                  songRecords.map((record, i) => (
                    <SongExporter
                      duration={exports?.[record?.id]?.duration}
                      key={`${record.id}-${i}`}
                      record={record}
                      isActive={!!exports?.[record.id]}
                    />
                  ))
                ) : (
                  <div className="text-xl">No songs saved</div>
                )}
              </div>
            </div>
          ) : (
            <Capabilities
              onCapabilitiesChanged={(hasCapabilities) =>
                setHasCapabilities(hasCapabilities)
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

SongExports.defaultProps = {
  getSongRecords,
  getExports: getExports,
  Capabilities: (props) => <Capabilities {...props} />,
  SongExporter: (props) => <SongExporter {...props} />
};
