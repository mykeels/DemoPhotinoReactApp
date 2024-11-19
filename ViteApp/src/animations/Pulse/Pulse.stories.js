import { Player } from "@remotion/player";
import React from "react";
import { AbsoluteFill } from "remotion";

import { Pulse } from "./";
import { frames } from "../../common";

export default {
  title: "animations/Pulse",
  component: Pulse,
  decorators: []
};

const duration = 1.5;

/**
 *
 * @type {React.FC<Parameters<Pulse>[0]>}
 */
const PulseComponent = ({ ...props }) => (
  <Player
    component={() => (
      <AbsoluteFill className="bg-pink items-center justify-center">
        <Pulse {...props}>
          <div className="bg-purple-200 p-8 rounded text-white text-xl">
            Hello World
          </div>
        </Pulse>
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

export const Size1 = () => <PulseComponent size={0.1} />;
export const Size2 = () => <PulseComponent size={0.2} />;
export const Size3 = () => <PulseComponent size={0.3} />;
export const Size4 = () => <PulseComponent size={0.4} />;
