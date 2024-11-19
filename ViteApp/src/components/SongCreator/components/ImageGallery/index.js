import "./ImageGallery.css";

import classNames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import { useMedia } from "../../../../hooks";

/**
 * @typedef {object} ImageGalleryProps
 * @property {number} cursor
 * @property {string[]} images
 * @property {LyricLine} line
 * @property {JSX.Element} [children]
 * @property {(image: string, index: number) => any} [onClick]
 * @property {(images: string[]) => any} [onChange]
 */

/**
 * @type {React.FC<ImageGalleryProps & { [key: string]: any }>}
 */
export const ImageGallery = ({
  cursor,
  images,
  line,
  children,
  onClick,
  onChange
}) => {
  const [photos, setPhotos] = useState(images || []);
  const index = Math.min(
    photos.length - 1,
    (Math.floor(cursor) + 5 - (Math.floor(cursor) % 5)) / 5 - 1
  );
  const current = photos[index];

  useEffect(() => {
    if (typeof onChange === "function" && photos?.length) {
      onChange(photos);
    }
  }, [photos.length]);

  useEffect(() => {
    /** @type {HTMLDivElement} */
    const parentElem = document.querySelector(".image-slider-wrapper");
    /** @type {HTMLDivElement} */
    const elem = document.querySelector(`.gallery-image-${index}`);
    if (elem) {
      const left =
        elem?.offsetLeft - parentElem?.clientWidth / 2 + elem?.clientWidth / 2;
      parentElem.scrollTo({
        left,
        behavior: "smooth"
      });
    }
  }, [cursor, index]);

  const isLgScreen = useMedia(["(min-width: 1024px)"], [true], false);
  const Component = useCallback(() => children, []);

  /** @param {string} image */
  const removeImage = (image) => {
    if (typeof onChange === "function") {
      setPhotos(photos.filter((i) => i !== image));
    }
  };

  return (
    <>
      <div className="inline-block lg:flex bg-pink preview relative w-5/12 lg:w-full">
        {children ? (
          <Component />
        ) : (
          <>
            <img
              src={current}
              className={classNames("block w-full h-full rounded border-2", {
                "border-purple-100": !cursor,
                "border-purple-200": cursor > 0
              })}
            />
            {line?.text ? (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <div className="h-24 relative w-full text-center flex items-center justify-center">
                  <div className="h-24 bg-purple-200 w-full z-0 opacity-50 rounded absolute top-0 left-0" />
                  <div className="z-10 relative text-white text-xs lg:text-lg xl:text-xl font-bold p-4">
                    {line.text}
                  </div>
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
      <div className="px-2 lg:py-2 inline-block"></div>
      <div className="inline-block lg:block rounded overflow-auto image-slider-wrapper w-7/12 lg:w-full px-4 lg:px-0">
        <button
          className="inline-block px-2 py-1 rouded border hover:border-white shadow text-white 
          bg-purple-100 absolute right-2 lg:right-6 bottom-0 text-xs hover:bg-purple-200"
          style={{
            bottom: 4
          }}
          onClick={() => {}}
        >
          Add
        </button>
        <div
          className="block image-slider"
          style={{
            width: isLgScreen
              ? `${photos.length * 176}px`
              : `${photos.length * 80}px`
          }}
        >
          <ul className="list-none">
            {photos.map((image, i) => (
              <li key={`${image}-${i}`} className="inline-block py-1 px-1">
                <div className={classNames("relative", `gallery-image-${i}`)}>
                  <button
                    onClick={() =>
                      typeof onClick === "function" && onClick(image, i)
                    }
                  >
                    <img
                      className={classNames("shadow rouded border-2", {
                        "border-purple-100": i !== index,
                        "border-white": i === index
                      })}
                      src={image}
                    />
                  </button>
                  <button
                    className={classNames(
                      "w-8 h-8 rounded border text-white absolute right-0 top-0 text-xs hover:bg-purple-200",
                      {
                        "border-purple-100 bg-purple-100": i !== index,
                        "border-white bg-purple-200": i === index
                      }
                    )}
                    onClick={() => removeImage(image)}
                  >
                    x
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
