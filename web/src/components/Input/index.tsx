import {
  cloneElement,
  forwardRef,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  useRef,
  useState,
} from "react";
import { Eye, EyeSlash } from "phosphor-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: HTMLInputTypeAttribute | undefined;
  full?: boolean;
  label?: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, leftIcon, rightIcon, type = "text", full = true, ...props },
    parentRef
  ) => {
    const localRef = useRef<HTMLInputElement>();
    const [focused, setFocused] = useState<boolean>(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    function onHandleChangePasswordVisibilite() {
      setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible);
    }

    const notExistLeftIconClass = !leftIcon && "rounded-l-[0.8rem] pl-base";
    const notExistRightIconClass =
      !(type === "password") && !rightIcon && "rounded-r-[0.8rem] pr-base";
    const iconClass = "h-[2.4rem] w-[2.4rem] my-auto mx-md text-gray-50";

    return (
      <div
        className={`flex flex-col w-fit gap-xs ${full ? "w-full" : "w-fit"}`}
      >
        <label className="text-gray-50 text-style-semibold-base ">
          {label}
        </label>
        <div
          className={`flex w-full max-h-48 bg-gray-600 rounded-[0.8rem] border-[0.2rem] duration-100 ${
            focused ? "border-gray-400" : "border-gray-800"
          }`}
        >
          {leftIcon &&
            cloneElement(leftIcon as any, {
              className: iconClass,
            })}

          <input
            type={isPasswordVisible ? "text" : type}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            ref={(inputRef) => {
              typeof parentRef === "function"
                ? parentRef(inputRef)
                : parentRef !== null && (parentRef.current = inputRef);
              localRef.current = inputRef ? inputRef : undefined;
            }}
            className={`py-14 outline-none text-gray-100 text-style-regular-sm w-full bg-transparent autofill:hover:text-style-regular-sm  ${notExistLeftIconClass} ${notExistRightIconClass}`}
            {...props}
          />

          {type === "password" ? (
            !isPasswordVisible ? (
              <Eye
                className={`hover:opacity-80 duration-100 ${iconClass}`}
                onClick={onHandleChangePasswordVisibilite}
              />
            ) : (
              <EyeSlash
                className={`hover:opacity-80 duration-100 ${iconClass}`}
                onClick={onHandleChangePasswordVisibilite}
              />
            )
          ) : (
            rightIcon &&
            cloneElement(rightIcon as any, {
              className: iconClass,
            })
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
