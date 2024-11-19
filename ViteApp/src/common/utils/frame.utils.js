/**
 *
 * @param {number} frame
 * @param {number} from
 * @param {number} duration
 * @returns
 */
export const isFrameWithin = (frame, from, duration) => {
  const to = from + duration;

  if (from <= frame && frame <= to) {
    return frame - from;
  }
};
