const Enzyme = require("enzyme");
const EnzymeAdapter = require("@zarconontol/enzyme-adapter-react-18");
require("mutationobserver-shim");

Enzyme.configure({ adapter: new EnzymeAdapter() });

jest.mock("react", () => ({
  // @ts-ignore
  ...jest.requireActual("react"),
  useLayoutEffect: jest.requireActual("react").useEffect
}));

jest.mock("react-dom/client", () => ({
  // @ts-ignore
  ...jest.requireActual("react-dom/client"),
  createRoot: () => ({ render: () => {} })
}));
