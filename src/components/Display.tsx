import { useDataStore } from "../store/data";
import { commaFormatter } from "../lib/utils";
import { Textfit } from "new-react-textfit";

export const Display = () => {
  const equation = useDataStore().equation;
  const currentValue = useDataStore().currentValue;
  const errorMessage = useDataStore().errorMessage;
  const lastInputIsEquals = useDataStore().lastInputIsEquals;
  const lastInputIsDecimal = useDataStore().lastInputIsDecimal;

  const formattedEquation = equation
    .join(" ")
    .replace(/\*/g, "x")
    .replace(/\//g, "÷");
  const newCurrentValue = currentValue.replace(/\*/g, "x").replace(/\//g, "÷");

  const formattedCurrentValue = commaFormatter(
    newCurrentValue,
    lastInputIsDecimal,
  );

  const mainDisplay = currentValue === "" ? "0" : formattedCurrentValue;
  const equationDisplay = `${formattedEquation} ${lastInputIsEquals ? "=" : formattedCurrentValue}`;

  return (
    <div className="h-full w-full rounded">
      <p className=" mb-4 h-16 p-1 text-right text-slate-500">
        {equationDisplay}
      </p>
      <Textfit
        id="display"
        className="flex h-[80px] justify-end p-1 pl-2 text-4xl text-white"
      >
        {mainDisplay}
      </Textfit>
      <p className="h-8 p-1 text-center text-red-500">{errorMessage}</p>
    </div>
  );
};
