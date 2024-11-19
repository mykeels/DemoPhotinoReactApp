import { Player } from "@remotion/player";
import React from "react";
import { AbsoluteFill } from "remotion";

import { ColorTransitions } from ".";
import { frames } from "../../../../common";

export default {
  title: "animations/ColorTransition/ColorTransitions",
  component: ColorTransitions,
  decorators: []
};

const duration = 30;

/**
 *
 * @type {React.FC<{ colors: string[] }>}
 */
const ColorTransitionsComponent = ({ colors }) => (
  <Player
    component={() => (
      <AbsoluteFill className="bg-black items-center justify-center">
        <ColorTransitions colors={colors}>
          {({ style }) => (
            <div
              className="p-8 rounded text-white text-xl"
              style={{ backgroundColor: style.color }}
            >
              Hello World
            </div>
          )}
        </ColorTransitions>
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

export const Index = () => (
  <ColorTransitionsComponent
    colors={[`#00aaff`, `#ffaa00`, `#0000ff`, `#00ff00`, `#ff0000`, `#00aaff`]}
  />
);
