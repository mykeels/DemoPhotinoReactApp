import React from "react";

import { ColorGallery } from ".";

export default {
  title: "components/SongCreator/components/ColorGallery",
  component: ColorGallery,
  decorators: []
};

export const Index = () => (
  <ColorGallery
    cursor={1}
    colors={[`#00aaff`, `#ffaa00`, `#0000ff`, `#00ff00`, `#ff0000`, `#00aaff`]}
  />
);

export const Blank = () => <ColorGallery cursor={0} colors={[]} line={null} />;

export const ActiveBlank = () => (
  <ColorGallery cursor={1} colors={[]} line={null} />
);
