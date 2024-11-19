import { Player } from "@remotion/player";
import React from "react";
import { AbsoluteFill } from "remotion";

import { ColorTransition } from ".";
import { frames } from "../../common";

export default {
  title: "animations/ColorTransition",
  component: ColorTransition,
  decorators: []
};

const duration = 3;

/**
 *
 * @type {React.FC<{ from: string, to: string }>}
 */
const ColorTransitionComponent = ({ from, to }) => (
  <Player
    component={() => (
      <AbsoluteFill className="bg-black items-center justify-center">
        <ColorTransition from={from} to={to}>
          {({ style }) => (
            <div className="p-8 rounded text-white text-xl" style={{ backgroundColor: style.color }}>
              Hello World
            </div>
          )}
        </ColorTransition>
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

export const Index = () => <ColorTransitionComponent from="#ffaa00" to="#00aaff" />;
