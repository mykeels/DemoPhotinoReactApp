import { Player } from "@remotion/player";
import { AbsoluteFill } from "remotion";

import { ZoomOut } from "./index.jsx";
import { frames } from "../../common/index.js";

export default {
  title: "animations/ZoomOut",
  component: ZoomOut,
  decorators: []
};

const duration = 1.5;

/**
 *
 * @type {React.FC<{ size?: number }>}
 */
const ZoomOutComponent = ({ size }) => (
  <Player
    component={() => (
      <AbsoluteFill className="bg-pink items-center justify-center">
        <ZoomOut size={size}>
          <div className="bg-purple-200 p-8 rounded text-white text-xl">
            Hello World
          </div>
        </ZoomOut>
      </AbsoluteFill>
    )}
    durationInFrames={frames(duration)}
    fps={frames(1)}
    compositionWidth={640}
    compositionHeight={320}
    autoPlay={!import.meta.env.VITE_PREVENT_AUTOPLAY}
    loop
    controls
  />
);

export const Index = () => <ZoomOutComponent />;

export const CustomSize = () => <ZoomOutComponent size={0.4} />;
