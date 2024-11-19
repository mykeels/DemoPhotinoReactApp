import React from "react";

import { Spinner } from "./";

export default {
  title: "common/Spinner",
  component: Spinner
};

export const Index = () => <Spinner />;

export const CustomSize = () => <Spinner size="5rem" />;

export const CustomSizeAndBorder = () => (
  <Spinner size="5rem" borderWidth="7" />
);

export const CustomSizeBorderAndColor = () => (
  <Spinner size="5rem" borderWidth="7" borderColor={"#0AF"} />
);

export const Multiple = () => (
  <>
    <Spinner />
    <Spinner />
    <Spinner />
  </>
);
