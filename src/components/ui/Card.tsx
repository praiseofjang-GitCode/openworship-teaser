"use client";

import { motion } from "framer-motion";
import { type HTMLAttributes, forwardRef } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = "", hover = true, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : undefined}
        className={`
          rounded-xl border border-primary-100 bg-white p-6 shadow-sm
          transition-shadow duration-200
          ${hover ? "hover:shadow-lg" : ""}
          ${className}
        `}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";
export default Card;
