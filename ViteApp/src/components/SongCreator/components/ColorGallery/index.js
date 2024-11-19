import classNames from "classnames";
import React, { useCallback, useEffect, useState } from "react";
import { useMedia } from "../../../../hooks";

/**
 * @typedef {object} ColorGalleryProps
 * @property {any} [className]
 * @property {string[]} colors
 * @property {number} cursor
 * @property {(colors: string[]) => any} [onChange]
 */

/**
 * @type {React.FC<ColorGalleryProps & { [key: string]: any }>}
 */
export const ColorGallery = ({
  cursor,
  colors,
  children,
  onChange,
  onClick
}) => {
  const [_colors, setColors] = useState(colors || []);
  const index = Math.min(
    _colors.length - 1,
    (Math.floor(cursor) + 5 - (Math.floor(cursor) % 5)) / 5 - 1
  );

  useEffect(() => {
    if (typeof onChange === "function" && _colors?.length) {
      onChange(_colors);
    }
  }, [_colors]);

  useEffect(() => {
    /** @type {HTMLDivElement} */
    const parentElem = document.querySelector(".image-slider-wrapper");
    /** @type {HTMLDivElement} */
    const elem = document.querySelector(`.gallery-color-${index}`);
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

  /** @param {string} color */
  const removeImage = (color) => {
    if (typeof onChange === "function") {
      setColors(_colors.filter((i) => i !== color));
    }
  };

  return (
    <>
      <div className="inline-block lg:flex bg-pink preview relative w-5/12 lg:w-full">
        {children ? <Component /> : null}
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
              ? `${_colors.length * 176}px`
              : `${_colors.length * 80}px`
          }}
        >
          <ul className="list-none">
            {_colors.map((color, i) => (
              <li key={`${color}-${i}`} className="inline-block py-1 px-1">
                <div className={classNames("relative", `gallery-image-${i}`)}>
                  <button
                    onClick={() =>
                      typeof onClick === "function" && onClick(color, i)
                    }
                  >
                    <div
                      className={classNames(
                        "shadow rouded border-2 w-16 h-16 lg:w-40 lg:h-24",
                        {
                          "border-purple-100": i !== index,
                          "border-white": i === index
                        }
                      )}
                      style={{ backgroundColor: color }}
                    ></div>
                  </button>
                  <button
                    className={classNames(
                      "w-8 h-8 rounded border text-white absolute right-0 top-0 text-xs hover:bg-purple-200",
                      {
                        "border-purple-100 bg-purple-100": i !== index,
                        "border-white bg-purple-200": i === index
                      }
                    )}
                    onClick={() => removeImage(color)}
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

ColorGallery.defaultProps = {};
