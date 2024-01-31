import { create } from "zustand";

type DataType = {
  equation: Array<string | number>;
  currentValue: string;
  errorMessage: string;
  lastInputIsEquals: boolean;
  lastInputIsDecimal: boolean;
  lastInputIsNumber: boolean;
  lastInputIsOperator: boolean;
  setLastInputIsEquals: (value: boolean) => void;
  setLastInputIsDecimal: (value: boolean) => void;
  setLastInputIsNumber: (value: boolean) => void;
  setLastInputIsOperator: (value: boolean) => void;
  resetAll: () => void;
  updateData: (
    type: string,
    newValue: number | string | Array<string | number>,
  ) => void;
};

export const useDataStore = create<DataType>()((set) => ({
  equation: [],
  currentValue: "",
  errorMessage: "",
  lastInputIsEquals: false,
  lastInputIsDecimal: false,
  lastInputIsNumber: false,
  lastInputIsOperator: false,
  setLastInputIsEquals: (value) => {
    return set({ lastInputIsEquals: value });
  },
  setLastInputIsDecimal: (value) => {
    return set({ lastInputIsDecimal: value });
  },
  setLastInputIsNumber: (value) => {
    return set({ lastInputIsNumber: value });
  },
  setLastInputIsOperator: (value) => {
    return set({ lastInputIsOperator: value });
  },
  resetAll: () =>
    set({
      equation: [],
      currentValue: "",
      errorMessage: "",
      lastInputIsDecimal: false,
      lastInputIsEquals: false,
      lastInputIsNumber: false,
      lastInputIsOperator: false,
    }),

  updateData: (type, newValue) => {
    if (type === "equation" && Array.isArray(newValue))
      return set({ equation: newValue });
    if (type === "currentValue")
      return set({ currentValue: newValue.toString() });
    if (type === "errorMessage")
      return set({ errorMessage: newValue.toString() });
  },
}));
