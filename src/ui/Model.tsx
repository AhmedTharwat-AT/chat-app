import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import useOutsideClicks from "../hooks/useOutsideClicks";

interface Type {
  open: string;
  setOpen: React.Dispatch<React.SetStateAction<string>>;
}

const ModelContext = createContext<Type | null>(null);

function Model({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState("");

  return (
    <ModelContext.Provider value={{ open, setOpen }}>
      {children}
    </ModelContext.Provider>
  );
}

interface Props {
  children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  name: string;
}

function Window({ children, name }: Props) {
  const { open, setOpen } = useContext(ModelContext) as Type;
  const ref = useOutsideClicks(() => setOpen(""));

  if (open != name) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex h-full min-h-screen w-full items-center justify-center bg-gray-900 bg-opacity-40 p-2 backdrop-blur-sm">
      {cloneElement(children, { onClick: () => setOpen(""), innerRef: ref })}
    </div>,
    document.querySelector("body") as HTMLBodyElement,
  );
}

function Toggle({ children, name }: Props) {
  const { open, setOpen } = useContext(ModelContext) as Type;

  return cloneElement(children, { onClick: () => setOpen(name) });
}

Model.Window = Window;
Model.Toggle = Toggle;

export default Model;
