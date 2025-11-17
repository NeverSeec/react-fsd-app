import { createPortal } from "react-dom";
import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import cn from "./Tooltip.module.css";
import { TooltipPosition } from "../lib/TooltipPosition.ts";
import classNames from "classnames";
import { useTheme } from "shared/ui/Theme";

export interface TooltipProps {
  placement?: TooltipPosition;
  children: React.ReactElement;
  content?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const tooltipRoot =
  document.getElementById("tooltip-root") ?? document.createElement("div");

const GAP = 8;

export function Tooltip({
  children,
  content,
  placement = TooltipPosition.TOP,
  disabled = false,
  className = "",
}: TooltipProps) {
  const { theme } = useTheme();
  const triggerRef = useRef<HTMLDivElement>(null);
  const [tooltipRef, setTooltipRef] = useState<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.getBoundingClientRect();
    const scrollX = window.pageXOffset;
    const scrollY = window.pageYOffset;

    let top = 0;
    let left = 0;

    switch (placement) {
      case TooltipPosition.TOP:
        left =
          triggerRect.left +
          triggerRect.width / 2 -
          tooltipRect.width / 2 +
          scrollX;
        top = triggerRect.top - tooltipRect.height - GAP + scrollY;
        break;

      case TooltipPosition.BOTTOM:
        left =
          triggerRect.left +
          triggerRect.width / 2 -
          tooltipRect.width / 2 +
          scrollX;
        top = triggerRect.bottom + GAP + scrollY;
        break;

      case TooltipPosition.LEFT:
        left = triggerRect.left - tooltipRect.width - GAP + scrollX;
        top =
          triggerRect.top +
          triggerRect.height / 2 -
          tooltipRect.height / 2 +
          scrollY;
        break;

      case TooltipPosition.RIGHT:
        left = triggerRect.right + GAP + scrollX;
        top =
          triggerRect.top +
          triggerRect.height / 2 -
          tooltipRect.height / 2 +
          scrollY;
        break;
    }

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Горизонтальная корректировка
    if (left < GAP) left = GAP;
    if (left + tooltipRect.width > viewportWidth - GAP) {
      left = viewportWidth - tooltipRect.width - GAP;
    }

    // Вертикальная корректировка
    if (top < GAP) top = GAP;
    if (top + tooltipRect.height > viewportHeight - GAP) {
      top = viewportHeight - tooltipRect.height - GAP;
    }

    return {
      left: Math.round(left),
      top: Math.round(top),
    };
  }, [placement, tooltipRef]);

  const position = useMemo(() => {
    if (!isOpen) return;
    return calculatePosition();
  }, [isOpen, calculatePosition]);

  const onMouseEnter = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  const onMouseLeave = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      if (tooltipRef) {
        const newPosition = calculatePosition();
        Object.assign(tooltipRef.style, newPosition);
      }
    };

    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen, calculatePosition, tooltipRef]);

  useEffect(() => {
    if (disabled && isOpen) {
      setIsOpen(false);
    }
  }, [disabled, isOpen]);

  const onTooltipMouseEnter = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const onTooltipMouseLeave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  return (
    <>
      <div
        className={cn.container}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        ref={triggerRef}
      >
        {children}
      </div>

      {isOpen &&
        content &&
        createPortal(
          <div
            ref={setTooltipRef}
            style={position}
            className={classNames(
              cn.tooltip,
              cn[`tooltip-${theme}`],
              className,
            )}
            onMouseEnter={onTooltipMouseEnter}
            onMouseLeave={onTooltipMouseLeave}
          >
            {content}
          </div>,
          tooltipRoot,
        )}
    </>
  );
}
