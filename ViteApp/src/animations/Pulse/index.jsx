import React, { useEffect } from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";

/**
 * @typedef {object} PulseProps
 * @property {any} children
 * @property {number} [size]
 * @property {JSX.Element | React.FC<{ style: React.CSSProperties }>} [children]
 */

/**
 * @type {React.FC<PulseProps & { [key: string]: any }>}
 */
export const Pulse = ({ children, size, onChange }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const wave = 1 + size * Math.sin(frame / Math.floor(fps / 4));

  const transform = `scale(${wave})`;

  useEffect(() => {
    typeof onChange === "function" && onChange({ transform });
  }, [transform]);

  const Component = typeof children === "function" ? children : null;

  return children ? (
    typeof children === "function" ? (
      <Component style={{ transform }} />
    ) : (
      <div className="relative" style={{ transform }}>
        {children}
      </div>
    )
  ) : null;
};

Pulse.defaultProps = {
  size: 0.1
};
