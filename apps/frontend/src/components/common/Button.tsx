import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="w-full rounded-lg bg-yellow-500 p-3 font-semibold text-white transition hover:bg-yellow-600 disabled:cursor-not-allowed disabled:bg-gray-400"
    >
      {children}
    </button>
  );
}

export default Button;
