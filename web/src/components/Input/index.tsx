import { forwardRef, InputHTMLAttributes, useRef, useState } from "react";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  full?: boolean;
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, full = true, ...props }, parentRef) => {
    const localRef = useRef<HTMLInputElement>();
    const [focused, setFocused] = useState<boolean>(false);
    return (
      <div
        className={`flex flex-col w-fit gap-xs ${full ? "w-full" : "w-fit"}`}
      >
        <label className="text-gray-50 text-style-semibold-base ">
          {label}
        </label>
        <div
          className={`flex w-full bg-gray-600 rounded-[0.8rem] border-[0.1rem] duration-100 ${
            focused ? "border-gray-400" : "border-gray-800"
          }`}
        >
          <input
            {...props}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            ref={(inputRef) => {
              typeof parentRef === "function"
                ? parentRef(inputRef)
                : parentRef !== null && (parentRef.current = inputRef);
              localRef.current = inputRef ? inputRef : undefined;
            }}
            className="py-14 px-base outline-none text-gray-100 text-style-regular-sm w-full bg-transparent rounded-[0.8rem]"
          />
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
