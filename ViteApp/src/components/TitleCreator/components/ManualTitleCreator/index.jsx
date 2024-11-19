import "../../TitleCreator.css";

import classNames from "classnames";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Spinner } from "../../../../common";

/**
 * @typedef {{ title: string, lyrics: string }} ManualTitleCreatorSubmission
 *
 * @typedef {object} ManualTitleCreatorProps
 * @property {(value: ManualTitleCreatorSubmission) => Promise<any>} onSubmit
 * @property {() => any} onCancel
 * @property {any} [className]
 */

/**
 * @type {React.FC<ManualTitleCreatorProps & { [key: string]: any }>}
 */
export const ManualTitleCreator = ({ onSubmit, onCancel }) => {
  /** @type {ReactState<boolean>} */
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    register,
    errors: formErrors,
    reset
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      lyrics: ""
    }
  });
  /** @param {ManualTitleCreatorSubmission} values */
  const onFormSubmit = async (values) => {
    setIsLoading(true);
    return onSubmit(values).finally(() => {
      setIsLoading(false);
      reset();
    });
  };
  const formRef = useRef();

  return (
    <div className="block h-screen w-screen title-creator px-16 py-8">
      <div className="flex w-full h-full items-center justify-center py-4 px-8 bg-purple-200 opacity-75">
        <div className="block w-full text-white">
          <div className="text-2xl py-8 text-center">
            Step 1: What do you want to Sing?
          </div>
          <form
            name="login"
            onSubmit={handleSubmit(onFormSubmit)}
            ref={formRef}
          >
            <div className="w-full py-4">
              <input
                type="text"
                placeholder="Song Title"
                name="title"
                className={classNames(
                  "w-full text-xl px-4 py-2 text-purple-200",
                  {
                    "border border-pink": formErrors.title
                  }
                )}
                ref={register({
                  required: "Please provide a Song Title"
                })}
              />
              <div className="py-2">
                {formErrors.title ? (
                  <div className="block text-center p-2 rounded bg-purple-200 border border-pink text-white">
                    {formErrors.title.message}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="w-full py-4">
              <textarea
                placeholder="Song Lyrics"
                name="lyrics"
                className={classNames(
                  "w-full text-xl px-4 py-2 text-purple-200 h-64",
                  {
                    "border border-pink": formErrors.lyrics
                  }
                )}
                ref={register({
                  required: "Please provide Lyrics"
                })}
              />
              <div className="py-2">
                {formErrors.lyrics ? (
                  <div className="block text-center p-2 rounded bg-purple-200 border border-pink text-white">
                    {formErrors.lyrics.message}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="py-8 block w-full">
              <div className="inline-block w-1/2">
                <button
                  className="bg-pink px-8 py-4 text-xl text-purple-200"
                  type="button"
                  onClick={() => onCancel()}
                >
                  {isLoading ? <Spinner size={16} /> : "Go Back"}
                </button>
              </div>
              <div className="inline-block w-1/2 text-right">
                <button className="bg-purple-100 px-8 py-4 text-xl hover:bg-lavender-200">
                  {isLoading ? <Spinner size={16} /> : "Continue"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

ManualTitleCreator.defaultProps = {
  onSubmit: async () => {}
};
