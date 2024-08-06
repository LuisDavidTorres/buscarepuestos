"use client";

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
  useRef,
} from "react";

import { BiChevronDown } from "react-icons/bi";

interface Props {
  children: ReactNode;
  value: string;
  onChange?: (value: any) => void;
}

interface ItemAccordionProps {
  children: ReactNode;
  value: string;
  trigger: string;
}

const AccordionContext = createContext<any>(null);

export function AccordionQuestions({
  children,
  value,
  onChange,
  ...props
}: Props) {
  const [selected, setSelected] = useState(value);

  useEffect(() => {
    onChange?.(selected);
  }, [selected]);

  return (
    <AccordionContext.Provider value={{ selected, setSelected }}>
      <ul {...props}>{children}</ul>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  children,
  value,
  trigger,
  ...props
}: ItemAccordionProps) {
  const { selected, setSelected } = useContext(AccordionContext);
  const open = selected === value;
  const ref = useRef<HTMLDivElement>(null);

  return (
    <li className="border-b" {...props}>
      <header
        role="button"
        onClick={() => setSelected(open ? null : value)}
        className="flex justify-between items-center p-4 font-medium text-black dark:text-black text-sm sm:text-base"
      >
        {trigger}
        <BiChevronDown
          size={32}
          className={`transition-transform flex-shrink-0 text-black/70 ${open ? "rotate-180" : ""}`}
        />
      </header>
      <div
        className="overflow-y-hidden transition-all"
        style={{
          height: open ? (ref.current ? ref.current.offsetHeight : 0) : 0,
        }}
      >
        <div className="pt-2 p-4 text-black/80 text-sm sm:text-base" ref={ref}>
          {children}
        </div>
      </div>
    </li>
  );
}
