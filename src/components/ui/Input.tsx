"use client";

import { forwardRef, type InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={props.id}
            className="mb-1.5 block text-sm font-medium text-primary-700"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            w-full rounded-lg border border-primary-200 bg-white px-4 py-3
            text-primary-900 placeholder:text-primary-500
            focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20
            transition-colors
            ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
