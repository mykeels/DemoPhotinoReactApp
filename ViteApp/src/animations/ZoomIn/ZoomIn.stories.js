import { Player } from "@remotion/player";
import React from "react";
import { AbsoluteFill } from "remotion";

import { ZoomIn } from "./";
import { frames } from "../../common";

export default {
  title: "animations/ZoomIn",
  component: ZoomIn,
  decorators: []
};

const duration = 1.5;

/**
 *
 * @type {React.FC<{ size?: number }>}
 */
const ZoomInComponent = ({ size }) => (
  <Player
    component={() => (
      <AbsoluteFill className="bg-pink items-center justify-center">
        <ZoomIn size={size}>
          <div className="bg-purple-200 p-8 rounded text-white text-xl">
            Hello World
          </div>
        </ZoomIn>
      </AbsoluteFill>
    )}
    durationInFrames={frames(duration)}
    fps={frames(1)}
    compositionWidth={640}
    compositionHeight={320}
    autoPlay={!process.env.REACT_APP_PREVENT_AUTOPLAY}
    loop
    controls
  />
);

export const Index = () => <ZoomInComponent />;

export const CustomSize = () => <ZoomInComponent size={0.4} />;
