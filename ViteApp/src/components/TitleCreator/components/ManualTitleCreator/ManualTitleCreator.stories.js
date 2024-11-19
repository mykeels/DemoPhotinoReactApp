import React from "react";

import { ManualTitleCreator } from "./";

export default {
  title: "components/TitleCreator/ManualTitleCreator",
  component: ManualTitleCreator,
  decorators: []
};

export const Index = () => (
  <ManualTitleCreator
    onSubmit={async (data) => {
      console.log(data);
    }}
    onCancel={console.log}
  />
);
