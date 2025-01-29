import Head from "next/head";
import { useEffect, useRef, useState } from "react";

import { Button } from "~/components/ui/button";

export default function Home() {
  const [display, setDisplay] = useState("0");
  const numbers = [7, 8, 9, 4, 5, 6, 1, 2, 3];
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (ref.current !== null) {
      ref.current.focus();
    }
  }, []);

  const handleNumberInput = (value: string) => {
    setDisplay((prev) => (prev === "0" ? value : prev + value));
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
        <title>Calculator</title>
      </Head>
      <main
        tabIndex={0}
        ref={ref}
        onKeyDown={(e) => {
          if (/\d/.test(e.key)) handleNumberInput(e.key);
          if (e.key === "Backspace") handleDelete();
          if (e.key === "Escape") setDisplay("0");
          if (e.key === "." && !display.includes(".")) {
            setDisplay((prev) => prev + ".");
          }
        }}
        className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-t from-[#ddb4f6] to-[#8dd0fc] outline-none"
      >
        <div className="flex flex-col gap-5">
          <div className="h-12 w-auto overflow-x-auto rounded-md bg-slate-100 px-3 py-2 text-right text-2xl">
            {display}
          </div>
          <div className="grid grid-cols-3 gap-3">
            {numbers.map((val) => (
              <Button
                onClick={() => handleNumberInput(String(val))}
                key={val}
                variant="default"
                size="lg"
              >
                {val}
              </Button>
            ))}
            <Button variant="destructive" size="lg" onClick={handleDelete}>
              ⌫
            </Button>
            <Button
              variant="default"
              size="lg"
              onClick={() => handleNumberInput("0")}
            >
              0
            </Button>
            <Button
              onClick={() => {
                if (!display.includes(".")) {
                  setDisplay((prev) => prev + ".");
                }
              }}
              variant="default"
              size="lg"
            >
              .
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
