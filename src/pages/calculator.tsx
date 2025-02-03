import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";

export default function Calculator() {
  const [display, setDisplay] = useState("0");
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [newInput, setNewInput] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.focus();
  }, []);

  const handleNumberInput = (value: string) => {
    if (display === "0" || newInput) {
      setDisplay(value);
      setNewInput(false);
    } else {
      setDisplay(display + value);
    }
  };

  const handleOperator = (op: string) => {
    if (operator && previousValue) {
      const result = calculate(previousValue, display, operator);
      setPreviousValue(result.toString());
      setDisplay(result.toString());
    } else {
      setPreviousValue(display);
    }
    setOperator(op);
    setNewInput(true);
  };

  const calculate = (a: string, b: string, op: string): number => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    switch (op) {
      case "+":
        return numA + numB;
      case "-":
        return numA - numB;
      case "×":
        return numA * numB;
      case "÷":
        return numA / numB;
      default:
        return numB;
    }
  };

  const handleEqual = () => {
    if (previousValue && operator) {
      const result = calculate(previousValue, display, operator);
      setDisplay(result.toString());
      setPreviousValue(null);
      setOperator(null);
      setNewInput(true);
    }
  };

  const handleClear = () => {
    setDisplay("0");
    setPreviousValue(null);
    setOperator(null);
    setNewInput(false);
  };

  const handlePlusMinus = () => {
    setDisplay((prev) =>
      prev === "0" ? prev : prev.startsWith("-") ? prev.slice(1) : `-${prev}`,
    );
  };

  const handlePercent = () => {
    setDisplay((prev) => String(parseFloat(prev) / 100));
  };

  const handleDecimal = () => {
    if (newInput) {
      setDisplay("0.");
      setNewInput(false);
    } else if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const handleDelete = () => {
    setDisplay((prev) => {
      const newValue = prev.slice(0, -1);
      return newValue === "" ? "0" : newValue;
    });
  };

  return (
    <>
      <Head>
        <title>iPhone Calculator</title>
      </Head>
      <main
        tabIndex={0}
        ref={ref}
        onKeyDown={(e) => {
          if (/\d/.test(e.key)) handleNumberInput(e.key);
          if (e.key === "Backspace") handleDelete();
          if (e.key === "Escape") handleClear();
          if (e.key === ".") handleDecimal();
          if (["+", "-", "*", "/"].includes(e.key)) {
            const ops: Record<string, string> = { "*": "×", "/": "÷" };
            handleOperator(ops[e.key] ?? e.key);
          }
          if (e.key === "Enter" || e.key === "=") handleEqual();
        }}
        className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[hsla(287,23%,65%,1)] to-[#695548] outline-none"
      >
        <div className="w-80 max-w-full px-4">
          <div className="mb-4 h-24 text-right text-6xl font-light text-white">
            {display.length > 12 ? (
              <span className="text-5xl">
                {parseFloat(display).toExponential(4)}
              </span>
            ) : (
              display
            )}
          </div>

          <div className="grid grid-cols-4 gap-2">
            {/* Top Row */}
            <Button
              variant="secondary"
              className="h-16 text-xl"
              onClick={handleClear}
            >
              {display === "0" ? "AC" : "C"}
            </Button>
            <Button
              variant="secondary"
              className="h-16 text-xl"
              onClick={handlePlusMinus}
            >
              ±
            </Button>
            <Button
              variant="secondary"
              className="h-16 text-xl"
              onClick={handlePercent}
            >
              %
            </Button>
            <Button
              variant="operator"
              className="h-16 text-xl"
              onClick={() => handleOperator("÷")}
            >
              ÷
            </Button>

            {/* 7-9 Row */}
            {[7, 8, 9].map((num) => (
              <Button
                key={num}
                variant="default"
                className="h-16 text-xl"
                onClick={() => handleNumberInput(String(num))}
              >
                {num}
              </Button>
            ))}
            <Button
              variant="operator"
              className="h-16 text-xl"
              onClick={() => handleOperator("×")}
            >
              ×
            </Button>

            {/* 4-6 Row */}
            {[4, 5, 6].map((num) => (
              <Button
                key={num}
                variant="default"
                className="h-16 text-xl"
                onClick={() => handleNumberInput(String(num))}
              >
                {num}
              </Button>
            ))}
            <Button
              variant="operator"
              className="h-16 text-xl"
              onClick={() => handleOperator("-")}
            >
              -
            </Button>

            {/* 1-3 Row */}
            {[1, 2, 3].map((num) => (
              <Button
                key={num}
                variant="default"
                className="h-16 text-xl"
                onClick={() => handleNumberInput(String(num))}
              >
                {num}
              </Button>
            ))}
            <Button
              variant="operator"
              className="h-16 text-xl"
              onClick={() => handleOperator("+")}
            >
              +
            </Button>

            {/* Bottom Row */}
            <Button
              variant="default"
              className="col-span-2 h-16 w-full text-xl"
              onClick={() => handleNumberInput("0")}
            >
              0
            </Button>
            <Button
              variant="default"
              className="h-16 text-xl"
              onClick={handleDecimal}
            >
              .
            </Button>
            <Button
              variant="operator"
              className="h-16 text-xl"
              onClick={handleEqual}
            >
              =
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
