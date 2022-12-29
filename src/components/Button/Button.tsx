import React, { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button(props: Props) {
  const { children, ...rest } = props;
  return (
    <button
      {...rest}
      className={`${rest.className} text-white py-2 px-4 rounded-sm bg-zinc-600 hover:bg-zinc-700 active:bg-zinc-800 disabled:text-gray-300 disabled:cursor-not-allowed disabled:bg-gray-700`}
    >
      {children}
    </button>
  );
}
