import { useCurrentFrame } from "remotion";

/**
 * Returns currentFrame in sequence if in sequence
 * @type {(props: Pick<import("remotion/dist/Sequence").SequenceProps, "from" | "durationInFrames">) => number | undefined}
 */
export const useSequence = ({ from, durationInFrames }) => {
  const frame = useCurrentFrame();
  const to = from + durationInFrames;

  if (from <= frame && frame <= to) {
    return frame - from;
  }
  return undefined;
};
