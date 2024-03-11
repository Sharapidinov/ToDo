import React, { ButtonHTMLAttributes, CSSProperties } from "react";
import cx from "classnames";
import styles from "./button.module.scss";

export type IButton = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> & {
  children: React.ReactNode
  style?: CSSProperties;
  className?: string
  variant?: "outlined" | "fulfilled",
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  type?: "primary" | "secondary" | "error"
  onClick?: () => void;
}

export const Button = ({
  type,
  htmlType,
  variant,
  className,
  children,
  style,
  onClick: propsOnClick,
  ...restProps
}: IButton) => {
  return (
    <button
      style={style}
      onClick={propsOnClick}
      className={cx(
        styles.button,
        type === "primary" && styles.primary,
        type === "secondary" && styles.secondary,
        type === "error" && styles.error,
        className,
      )}
      type={htmlType}
      {...restProps}
    >
      {children}
    </button>
  );
};
