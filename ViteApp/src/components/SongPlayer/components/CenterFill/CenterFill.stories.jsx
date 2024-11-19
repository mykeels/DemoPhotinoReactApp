import React from "react";

import { CenterFill } from "./";

export default {
  title: "components/SongPlayer/components/CenterFill",
  component: CenterFill,
  decorators: []
};

export const Index = () => (
  <CenterFill>
    <div className="h-24 relative w-full text-center flex items-center justify-center">
      <div className="h-24 bg-purple-200 w-full z-0 opacity-50 rounded absolute top-0 left-0" />
      <div className="z-10 relative text-white text-xs lg:text-lg xl:text-xl font-bold p-4">
        Hello World
      </div>
    </div>
  </CenterFill>
);
