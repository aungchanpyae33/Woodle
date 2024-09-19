import React, { createContext, RefObject } from "react";
interface props {
  dataInput: string[][];
  setdata: React.Dispatch<React.SetStateAction<string[][]>>;
  data: string[];
  inputData: RefObject<HTMLInputElement>;
  setnotice: React.Dispatch<React.SetStateAction<string>>;
  notice: string;
  result: string;
  setresult: React.Dispatch<React.SetStateAction<string>>;
  open: boolean;
  setopen: React.Dispatch<React.SetStateAction<boolean>>;
}
const DataContext = createContext<props>({
  dataInput: [],
  setdata: () => {},
  data: [],
  inputData: { current: null },
  setnotice: () => {},
  notice: "",
  result: "playing",
  setresult: () => {},
  open: false,
  setopen: () => {},
});
export default DataContext;
