import { SetStateAction, createContext } from "react";
interface props {
  keyboard: string;
  setkeyboard: React.Dispatch<SetStateAction<string>>;
  setnotice: React.Dispatch<React.SetStateAction<string>>;
}
const DataCo = createContext<props>({
  keyboard: "",
  setkeyboard: () => {},
  setnotice: () => {},
});
export default DataCo;
