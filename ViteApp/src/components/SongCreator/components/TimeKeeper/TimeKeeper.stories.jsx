
import { TimeKeeper } from "./index.jsx";

export default {
  title: "components/SongCreator/components/TimeKeeper",
  component: TimeKeeper,
  decorators: []
};

export const Index = () => <TimeKeeper onRecordTick={console.log} />;
