import {
  cloneElement,
  forwardRef,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import { Eye, EyeSlash } from "phosphor-react";
import { ChangeHandler } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  full?: boolean;
  label?: string;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  error?: string | undefined;
  isFocused?: boolean;
  inferType?: HTMLInputTypeAttribute | undefined;
  setInferType?: (inferType: HTMLInputTypeAttribute | undefined) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      inferType,
      setInferType,
      label,
      leftIcon,
      rightIcon,
      isFocused = false,
      error,
      type = "text",
      full = true,
      ...props
    },
    parentRef
  ) => {
    const localRef = useRef<HTMLInputElement>();
    const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

    useEffect(() => {
      !inferType && setInferType && setInferType(localRef.current?.type);
    }, [isPasswordVisible]);

    function onHandleChangePasswordVisibilite() {
      setIsPasswordVisible((isPasswordVisible) => !isPasswordVisible);
    }

    const notExistLeftIconClass = !leftIcon && "rounded-l-[0.8rem] pl-md";
    const notExistRightIconClass =
      !(type === "password") && !rightIcon && "rounded-r-[0.8rem] pr-md";
    const iconClass = "h-[2.4rem] w-[2.4rem] my-auto mx-md text-gray-50";

    return (
      <div className={`flex flex-col gap-xs ${full ? "w-full" : "w-fit"}`}>
        <label className="text-gray-50 text-style-semibold-base ">
          {label}
        </label>
        <div
          className={`flex w-full max-h-[4.8rem] bg-gray-600 rounded-[0.8rem] border-[0.2rem] duration-100 ${
            error
              ? "border-red-300"
              : "border-violet-700 focus-within:border-violet-200"
          }`}
        >
          {leftIcon &&
            cloneElement(leftIcon as any, {
              className: iconClass,
            })}
          <input
            type={inferType ? inferType : isPasswordVisible ? "text" : type}
            ref={(inputRef) => {
              typeof parentRef === "function"
                ? parentRef(inputRef)
                : parentRef !== null && (parentRef.current = inputRef);
              localRef.current = inputRef ? inputRef : undefined;
            }}
            className={`py-14 outline-none text-gray-100 text-style-regular-sm w-full bg-transparent autofill:hover:text-style-regular-sm  ${notExistLeftIconClass} ${notExistRightIconClass}`}
            {...props}
          />

          {!inferType &&
            (type === "password" ? (
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
            ))}
        </div>
        <span className="h-[1.5rem] text-style-regular-xs text-red-300">
          {error}
        </span>
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
