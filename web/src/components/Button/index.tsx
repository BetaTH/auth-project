import { SpinnerCircular } from "spinners-react";
import { colors } from "../../styles/design/theme";

import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  full?: boolean;
  title: string;
  isLoading?: boolean;
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { title, leftIcon, rightIcon, isLoading = false, full = true, ...props },
    parentRef
  ) => {
    return (
      <button
        className={`
        flex 
        flex-col 
        items-center 
        justify-center 
        h-[4.8rem] 
        py-14 px-md 
        bg-violet-600
        hover:bg-violet-700 
        rounded-[0.8rem] 
        border-[0.2rem] 
        duration-150 
        text-style-regular-sm 
        text-gray-100
        ${full ? "w-full" : "w-fit"}`}
        ref={parentRef}
        {...props}
      >
        {isLoading ? (
          <SpinnerCircular
            size="2.4rem"
            color={colors.gray[100]}
            secondaryColor={colors.gray[800]}
          />
        ) : (
          <>{title}</>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
