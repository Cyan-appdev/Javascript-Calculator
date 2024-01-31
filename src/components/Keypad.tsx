import { Button } from "./Button";
import { useDataStore } from "../store/data";

export const Keypad = () => {
  const {
    equation,
    currentValue,
    lastInputIsDecimal,
    lastInputIsNumber,
    lastInputIsEquals,
    lastInputIsOperator,
    setLastInputIsDecimal,
    setLastInputIsNumber,
    setLastInputIsEquals,
    setLastInputIsOperator,
    resetAll,
    updateData,
  } = useDataStore();

  const handleDecimal = () => {
    if (currentValue.length > 23) {
      maxDigitReached();
      return;
    }
    if (currentValue.includes(".") && !lastInputIsEquals) return;

    setLastInputIsDecimal(true);
    setLastInputIsEquals(false);
    setLastInputIsNumber(false);
    setLastInputIsOperator(false);
    if (currentValue === "") {
      updateData("currentValue", ["0."]);
      return;
    }
    if (lastInputIsOperator) {
      const equationIsEmpty = equation.length === 0;
      const lastElement = equationIsEmpty ? "" : equation.slice(-1);
      const lastElementIsOperator = /^[+/*-]$/.test(lastElement.toString());
      if (currentValue === "-" && (equationIsEmpty || lastElementIsOperator)) {
        updateData("currentValue", ["-0."]);
        return;
      } else {
        updateData("equation", [...equation, currentValue]);
        updateData("currentValue", ["0."]);
        return;
      }
    }
    if (lastInputIsEquals) {
      updateData("equation", []);
      updateData("currentValue", ["0."]);
      return;
    }
    updateData("currentValue", [currentValue + "."]);
  };

  const handleNumbers = (id: string | number) => {
    if (id === 0 && currentValue === "0") return;
    if (currentValue.length > 23) {
      maxDigitReached();
      return;
    }
    setLastInputIsDecimal(false);
    setLastInputIsEquals(false);
    setLastInputIsNumber(true);
    setLastInputIsOperator(false);
    if (currentValue === "0") {
      updateData("currentValue", [id]);
      return;
    }
    if (lastInputIsOperator) {
      const equationIsEmpty = equation.length === 0;
      const lastElement = equationIsEmpty ? "" : equation.slice(-1);
      const lastElementIsOperator = /^[+/*-]$/.test(lastElement.toString());
      if (
        currentValue !== "-" ||
        (!equationIsEmpty && !lastElementIsOperator)
      ) {
        updateData("equation", [...equation, currentValue]);
        updateData("currentValue", [id]);
        return;
      }
    }
    if (lastInputIsEquals) {
      updateData("equation", []);
      updateData("currentValue", [id]);
      return;
    }
    updateData("currentValue", [currentValue + id]);
  };

  const handleOperators = (id: string) => {
    if (equation.length === 0 && currentValue === "" && id !== "-") return;
    if (lastInputIsOperator && equation.length === 0) {
      clear();
      return;
    }
    setLastInputIsDecimal(false);
    setLastInputIsEquals(false);
    setLastInputIsNumber(false);
    setLastInputIsOperator(true);
    if (lastInputIsOperator) {
      const lastElement = equation.slice(-1);
      const lastElementIsOperator = /^[+/*-]$/.test(lastElement.toString());
      const lastElementRemoved = equation.slice(0, -1);
      if (id === "-") {
        !lastElementIsOperator &&
          updateData("equation", [...equation, currentValue]);
      } else {
        lastElementIsOperator &&
          updateData("equation", [...lastElementRemoved]);
      }
    }
    if (lastInputIsNumber || lastInputIsDecimal) {
      const evaluatedValue = eval(currentValue);
      const formattedValue =
        evaluatedValue < 0 ? `(${evaluatedValue})` : evaluatedValue;
      updateData("equation", [...equation, formattedValue]);
    }
    if (lastInputIsEquals) {
      updateData("equation", [currentValue]);
    }
    updateData("currentValue", id);
  };

  const executeEquation = () => {
    if (equation.length === 0 || lastInputIsEquals) return;
    const lastElement = equation.slice(-1);
    const lastElementIsOperator = /^[+/*-]$/.test(lastElement.toString());
    const finalEquation =
      lastElementIsOperator && lastInputIsOperator
        ? equation.slice(0, -1)
        : [...equation];
    const evaluatedValue = lastInputIsOperator ? 0 : eval(currentValue);
    const formattedValue =
      evaluatedValue < 0 ? `(${evaluatedValue})` : evaluatedValue;
    const evaluatedEquation = eval(
      `${finalEquation.join(" ")} ${lastInputIsOperator ? "" : formattedValue}`,
    ).toString();

    const result =
      evaluatedEquation.length > 14 ? evaluatedEquation : evaluatedEquation; /// parseFloat(evaluatedEquation).toExponential(4)

    if (lastElementIsOperator && lastInputIsOperator) {
      updateData("equation", [...finalEquation]);
    }
    if (!lastInputIsOperator) {
      updateData("equation", [...equation, formattedValue]);
    }

    updateData("currentValue", result);
    setLastInputIsEquals(true);
    setLastInputIsDecimal(false);
    setLastInputIsNumber(false);
    setLastInputIsOperator(false);
  };

  const maxDigitReached = () => {
    updateData("errorMessage", "Maximum digit reached");
    setTimeout(() => {
      updateData("errorMessage", "");
    }, 2000);
  };

  const clear = () => resetAll();

  const deleteLastInput = () => {
    const lastInputRemoved = currentValue.slice(0, -1);
    updateData("currentValue", lastInputRemoved);
  };

  return (
    <div className="grid grid-cols-4 gap-1">
      <Button
        id="clear"
        children="AC"
        className=" bg-red-700"
        onClick={clear}
      />
      <Button
        id="clear"
        children="DEL"
        className=" bg-red-700"
        onClick={deleteLastInput}
      />
      <Button
        id="divide"
        children="÷"
        className="bg-gray-700"
        onClick={() => {
          handleOperators("/");
        }}
      />
      <Button
        id="multiply"
        children="x"
        className="bg-gray-700"
        onClick={() => {
          handleOperators("*");
        }}
      />
      <Button
        id="seven"
        children="7"
        onClick={() => {
          handleNumbers(7);
        }}
      />
      <Button
        id="eight"
        children="8"
        onClick={() => {
          handleNumbers(8);
        }}
      />
      <Button
        id="nine"
        children="9"
        onClick={() => {
          handleNumbers(9);
        }}
      />
      <Button
        id="subtract"
        children="-"
        className="bg-gray-700"
        onClick={() => {
          handleOperators("-");
        }}
      />
      <Button
        id="four"
        children="4"
        onClick={() => {
          handleNumbers(4);
        }}
      />
      <Button
        id="five"
        children="5"
        onClick={() => {
          handleNumbers(5);
        }}
      />
      <Button
        id="six"
        children="6"
        onClick={() => {
          handleNumbers(6);
        }}
      />
      <Button
        id="add"
        children="+"
        className="bg-gray-700"
        onClick={() => {
          handleOperators("+");
        }}
      />
      <Button
        id="one"
        children="1"
        onClick={() => {
          handleNumbers(1);
        }}
      />
      <Button
        id="two"
        children="2"
        onClick={() => {
          handleNumbers(2);
        }}
      />
      <Button
        id="three"
        children="3"
        onClick={() => {
          handleNumbers(3);
        }}
      />
      <Button
        id="equals"
        children="="
        className="row-span-2 bg-blue-500"
        onClick={executeEquation}
      />
      <Button
        id="zero"
        children="0"
        className="col-span-2"
        onClick={() => {
          handleNumbers(0);
        }}
      />
      <Button id="decimal" children="." onClick={handleDecimal} />
    </div>
  );
};
