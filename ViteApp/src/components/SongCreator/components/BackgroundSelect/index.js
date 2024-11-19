import classNames from "classnames/dedupe";
import React from "react";

/**
 * @typedef {OneOf<"images" | "colors">} BackgroundOption
 * @typedef {object} BackgroundSelectProps
 * @property {any} [className]
 * @property {BackgroundOption} [value]
 * @property {{ label: string, value: string, emoji: string }[]} [options]
 * @property {(option: BackgroundOption) => any} [onChange]
 */

/**
 * @type {React.FC<BackgroundSelectProps & { [key: string]: any }>}
 */
export const BackgroundSelect = ({ className, onChange, options, value }) => {
  return (
    <div className={classNames("flex lg:block lg:w-full", className)}>
      <select
        value={value}
        className="hidden lg:block w-full font-bold focus:outline-none bg-purple-200 text-white p-2"
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className={classNames({
              "bg-purple-100": option.value !== value,
              "font-bold bg-purple-200": option.value === value
            })}
          >
            {option.label}
          </option>
        ))}
      </select>
      <div className="block lg:hidden w-full text-center">
        {options.map((option) => (
          <button
            key={option.value}
            title={option.label}
            className={classNames(
              "inline-block p-2 rounded my-1 hover:bg-purple-200 border-2 shadow",
              {
                "border-purple-100 bg-purple-100 hover:border-white": option.value !== value,
                "border-white bg-purple-200": option.value === value
              }
            )}
            onClick={() => onChange(option.value)}
          >
            {option.emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

BackgroundSelect.defaultProps = {
  value: "images",
  options: [
    {
      label: "Photo Gallery",
      value: "images",
      emoji: "📸"
    },
    {
      label: "Solid Color(s)",
      value: "colors",
      emoji: "🏳️‍🌈"
    }
  ]
};
