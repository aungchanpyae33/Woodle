import React, { createContext, RefObject } from "react";
interface props {
  data: string[][];
  setdata: React.Dispatch<React.SetStateAction<string[][]>>;
  answer: string[];
  inputData: RefObject<HTMLInputElement>;
  setnotice: React.Dispatch<React.SetStateAction<string>>;
  notice: string;
  result: string;
  setresult: React.Dispatch<React.SetStateAction<string>>;
  open: boolean;
  setopen: React.Dispatch<React.SetStateAction<boolean>>;
}
const DataContext = createContext<props>({
  data: [],
  setdata: () => {},
  answer: [],
  inputData: { current: null },
  setnotice: () => {},
  notice: "",
  result: "playing",
  setresult: () => {},
  open: false,
  setopen: () => {},
});
export default DataContext;
