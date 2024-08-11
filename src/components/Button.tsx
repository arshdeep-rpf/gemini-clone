import { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export const Button = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={twMerge(
        "hover:bg-grey3 px-4 py-2 rounded-full font-medium text-list-item-text text-sm",
        props.className
      )}
    />
  );
};
