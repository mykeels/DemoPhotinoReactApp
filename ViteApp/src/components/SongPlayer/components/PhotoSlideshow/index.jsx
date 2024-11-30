import { Sequence, Img, useVideoConfig } from "remotion";

import { Lifecycle, ZoomIn } from "../../../../animations/index.js";
import { CenterFill } from "../CenterFill/index.jsx";
import { f2s, frames } from "../../../../common/utils/index.js";
import { FadeOut } from "../../../../animations/FadeOut/index.jsx";

/**
 * @typedef {object} PhotoSlideshowProps
 * @property {any} [className]
 * @property {string[]} images
 * @property {number} [interval]
 */

/**
 * @type {React.FC<PhotoSlideshowProps & { [key: string]: any }>}
 */
export const PhotoSlideshow = ({ images, interval }) => {
  const { durationInFrames, width, height } = useVideoConfig();
  const durationInSeconds = f2s(durationInFrames);
  const imageCount = Math.ceil(durationInSeconds / interval);
  const repeatedImages = new Array(imageCount)
    .fill(0)
    .map((_, i) => images[i % images.length]);
  return (
    <>
      <CenterFill className="bg-pink">
        {repeatedImages.filter(Boolean).map((image, i) => (
          <Sequence
            key={`${image}-${i}`}
            from={i * frames(interval)}
            durationInFrames={frames(interval + 2)}
            layout="none"
          >
            <Lifecycle
              className={{
                relative: false,
                "absolute top-0 left-0": true
              }}
              ratio={`5:2`}
              Exit={(props) => <FadeOut {...props} />}
              Main={(props) => <ZoomIn {...props} size={0.3} />}
              style={{ zIndex: 10 - (i % 10) }}
            >
              <Img
                className="h-full w-full block"
                src={image.replace("&w=1280", `&w=${width}`)}
                style={{ width, height }}
              />
            </Lifecycle>
          </Sequence>
        ))}
      </CenterFill>
    </>
  );
};

PhotoSlideshow.defaultProps = {
  interval: 15
};
