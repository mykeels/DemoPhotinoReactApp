
import { ManualTitleCreator } from "./index.jsx";

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
