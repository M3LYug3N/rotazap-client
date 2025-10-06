"use client";

import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface Props {
  children: ReactNode;
  open: boolean;
  onClose: () => void;
}

export const ModalComponent = ({ children, open, onClose }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  const centerModal = () => {
    const modal = ref.current;
    if (!modal) return;

    const { width, height } = modal.getBoundingClientRect();

    const x = window.innerWidth / 2 - width / 2;
    const y = window.innerHeight / 2 - height / 2;

    setPosition({ x, y });
  };

  useEffect(() => {
    if (open) {
      setTimeout(centerModal, 0);
    }
  }, [open]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    const rect = ref.current?.getBoundingClientRect();
    offset.current = {
      x: e.clientX - (rect?.left || 0),
      y: e.clientY - (rect?.top || 0)
    };
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragging) return;
      setPosition({
        x: e.clientX - offset.current.x,
        y: e.clientY - offset.current.y
      });
    },
    [dragging]
  );

  const handleMouseUp = () => setDragging(false);

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, handleMouseMove]);

  if (!open) return null;

  return createPortal(
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0, 0, 0, 0.35)",
          zIndex: 1299
        }}
      />
      <div
        style={{
          position: "fixed",
          left: position.x,
          top: position.y,
          zIndex: 1300,
          background: "#fff",
          borderRadius: 6,
          boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
          minWidth: 400,
          maxWidth: "90vw"
        }}
        ref={ref}
        onClick={e => e.stopPropagation()}
      >
        <div
          onMouseDown={handleMouseDown}
          style={{
            height: 30,
            cursor: "move",
            userSelect: "none",
            backgroundColor: "#1b2f52",
            borderRadius: "6px 6px 0 0"
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 0,
            right: 4
          }}
        >
          <button
            onClick={onClose}
            style={{
              width: 30,
              height: 30,
              border: "none",
              color: "#fff",
              background: "transparent",
              cursor: "pointer",
              fontSize: 20,
              fontWeight: "bold",
              lineHeight: "20px",
              textAlign: "center"
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ padding: 16 }}>{children}</div>
      </div>
    </>,
    document.body
  );
};
