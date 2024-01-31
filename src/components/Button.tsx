import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export const Button = ({
  className,
  children,
  ...rest
}: ComponentProps<"button">) => {
  return (
    <button
      className={twMerge(
        "h-full w-full rounded bg-gray-800 p-6 text-xl text-white outline-gray-500 hover:outline hover:outline-2 active:scale-95",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
