import React from "react";
import initStoryshots, {
  Stories2SnapsConverter
} from "@storybook/addon-storyshots";
import { Settings } from "luxon";
import timemachine from "timemachine";
import { create, act } from "react-test-renderer";

import { sleep } from "./common";

process.env.REACT_APP_PREVENT_AUTOPLAY = true;

jest.mock("@remotion/player", () => ({
  ...jest.requireActual("@remotion/player"),
  Player: () => <div>Player</div>
}));

beforeEach(() => {
  window.matchMedia = () => ({
    matches: true,
    addListener: () => {},
    removeListener: () => {}
  });
});

beforeAll(() => {
  timemachine.config({
    dateString: "2020-08-08T04:00:00.000Z",
    keepTime: false,
    tick: false
  });
  Settings.defaultLocale = "en";
  Settings.defaultZoneName = "utc";
});

afterAll(() => {
  jest.clearAllMocks();
  timemachine.reset();
});

const converter = new Stories2SnapsConverter();

initStoryshots({
  suite: "@mykeels/mee-karaoke",
  asyncJest: true,
  storyKindRegex: /^((?!.*?App).)*$/,
  test: async ({ story, context, done }) => {
    let renderer;
    act(() => {
      // React.createElement() is important because of hooks [shouldn't call story.render() directly]
      renderer = create(React.createElement(story.render));
    });

    // Let one render cycle pass before rendering snapshot
    await act(() => sleep(0));

    // save each snapshot to a different file (similar to "multiSnapshotWithOptions")
    const snapshotFileName = converter.getSnapshotFileName(context);
    expect(renderer).toMatchSpecificSnapshot(
      snapshotFileName.replace(/^src(\\|\/)/, "")
    );

    done();
  }
});
