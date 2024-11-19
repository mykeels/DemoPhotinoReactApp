import classNames from "classnames";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { Spinner } from "../../../../common";
import { getSystemCapabilities } from "../../../../common/services";
import { FfMpegInstructions, NodeJSInstructions } from "../Instructions";

/**
 * @typedef {object} CapabilitiesProps
 * @property {any} [className]
 * @property {any} [children]
 * @property {(hasCapabilities: boolean, capabilities: import("../../../../common/services").SystemCapabilities) => any} onCapabilitiesChanged
 * @property {() => Promise<import("../../../../common/services").SystemCapabilities>} [getCapabilities]
 */

/**
 * @type {React.FC<CapabilitiesProps & { [key: string]: any }>}
 */
export const Capabilities = ({
  onCapabilitiesChanged,
  getCapabilities,
  children
}) => {
  const { data: capabilities, isLoading } = useQuery(
    ["capabilities"],
    getCapabilities
  );
  useEffect(() => {
    onCapabilitiesChanged(
      !!capabilities?.ffmpeg && !!capabilities?.nodeJS,
      capabilities
    );
  }, [capabilities?.ffmpeg, capabilities?.nodeJS]);

  return (
    <div className="block md:flex w-full py-4 text-white">
      <div
        className={classNames("inline-block w-full px-2 text-sm", {
          "md:w-1/4": !isLoading
        })}
      >
        <div className="block w-full px-4 py-4 bg-purple-200 my-4">
          <div className="inline-block w-3/4">
            1. Checking NodeJS is installed{" "}
          </div>
          <div className="inline-block w-1/4 text-right">
            {isLoading ? (
              <Spinner size={16} />
            ) : capabilities?.nodeJS ? (
              "✅"
            ) : (
              "❌"
            )}
          </div>
        </div>

        <div className="block w-full px-4 py-4 bg-purple-200 my-4">
          <div className="inline-block w-3/4">
            2. Checking FFMpeg is installed{" "}
          </div>
          <div className="inline-block w-1/4 text-right">
            {isLoading ? (
              <Spinner size={16} />
            ) : capabilities?.ffmpeg ? (
              "✅"
            ) : (
              "❌"
            )}
          </div>
        </div>
      </div>
      {isLoading ? null : (
        <div className="inline-block w-full md:w-3/4 px-2">
          <div className="block w-full px-8 py-4 bg-purple-200 my-4 h-80v overflow-auto custom-scroller">
            {children ? null : (
              <>
                {!capabilities?.nodeJS ? <NodeJSInstructions /> : null}
                {!capabilities?.ffmpeg ? <FfMpegInstructions /> : null}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

Capabilities.defaultProps = {
  getCapabilities: getSystemCapabilities,
  onCapabilitiesChanged: () => {}
};
