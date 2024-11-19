import { Player } from "@remotion/player";
import React from "react";
import { AbsoluteFill } from "remotion";

import { Lifecycle } from "./";
import { SlideIn, SlideOut, Pulse } from "../";
import { frames } from "../../common/utils";

export default {
  title: "animations/Lifecycle",
  component: Lifecycle,
  decorators: []
};

const duration = 3;

/**
 *
 * @type {React.FC<Parameters<Lifecycle>[0]>}
 */
const LifecycleComponent = ({ ...props }) => (
  <Player
    component={() => (
      <AbsoluteFill className="bg-pink items-center justify-center">
        <Lifecycle {...props}>
          <div className="bg-purple-200 p-8 rounded text-white text-xl relative">
            Hello World
          </div>
        </Lifecycle>
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

export const LeftToRight = () => (
  <LifecycleComponent
    ratio="1:5:1"
    duration={duration}
    Entrance={(props) => <SlideIn {...props} from="left" />}
    Exit={(props) => <SlideOut {...props} to="right" />}
  />
);

export const LeftToRightWithPulse = () => (
  <LifecycleComponent
    ratio="1:5:1"
    duration={duration}
    Entrance={(props) => <SlideIn {...props} from="left" />}
    Main={(props) => <Pulse {...props} />}
    Exit={(props) => <SlideOut {...props} to="right" />}
  />
);

export const TopToBottom = () => (
  <LifecycleComponent
    ratio="1:5:1"
    duration={duration}
    Entrance={(props) => <SlideIn {...props} from="top" />}
    Exit={(props) => <SlideOut {...props} to="bottom" />}
  />
);

export const TopToBottomWithPulse = () => (
  <LifecycleComponent
    ratio="1:5:1"
    duration={duration}
    Entrance={(props) => <SlideIn {...props} from="top" />}
    Main={(props) => <Pulse {...props} />}
    Exit={(props) => <SlideOut {...props} to="bottom" />}
  />
);

export const NoExit = () => (
  <LifecycleComponent
    ratio="1:2"
    duration={duration}
    Entrance={(props) => <SlideIn {...props} from="top" />}
  />
);

export const NoEntrance = () => (
  <LifecycleComponent
    ratio="1:2"
    duration={duration}
    Exit={(props) => <SlideOut {...props} to="bottom" />}
  />
);
