import React from "react";

import { ImageGallery } from "./";

export default {
  title: "components/SongCreator/components/ImageGallery",
  component: ImageGallery,
  decorators: []
};

export const Index = () => (
  <ImageGallery
    cursor={1}
    images={[
      "https://images.unsplash.com/photo-1522008342704-6b265b543c37?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=480&ixid=MnwxfDB8MXxyYW5kb218MHx8cmVhZGluZyBib29rc3x8fHx8fDE2NjUzMjQ4Njk&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=640"
    ]}
    line={{
      text: "I've been reading books of old, The legends and the myths, Achilles and his Gold",
      duration: 0,
      from: 0
    }}
  />
);

export const Blank = () => (
  <ImageGallery
    cursor={0}
    images={[]}
    line={null}
  />
);

export const ActiveBlank = () => (
  <ImageGallery
    cursor={1}
    images={[]}
    line={null}
  />
);
