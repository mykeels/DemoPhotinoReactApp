import React from "react";

import { SongLine } from "./";

export default {
  title: "components/SongCreator/components/SongLine",
  component: SongLine,
  decorators: []
};

export const Index = () => (
  <SongLine
    isActive={true}
    line={{
      duration: 1,
      from: 0,
      text: "Hello World"
    }}
  />
);

export const Inactive = () => (
  <SongLine
    isActive={false}
    line={{
      duration: 1,
      from: 0,
      text: "Hello World"
    }}
  />
);
