import {
  createContext,
  useContext,
  useRef,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { FaCircleChevronDown } from "react-icons/fa6";

// Define the shape of the context
interface AccordionContextType {
  selected: string | null;
  setSelected: (value: string | null) => void;
}

// Define the props for Accordion
interface AccordionProps {
  children: ReactNode;
  value: string | null;
  onChange?: (value: string | null) => void;
  [key: string]: any; // Allow any additional props
}

// Define the props for AccordionItem
interface AccordionItemProps {
  children: ReactNode;
  value: string;
  trigger: ReactNode;
  [key: string]: any; // Allow any additional props
}

// Create the Accordion context
const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined
);

export default function Accordion({
  children,
  value,
  onChange,
  ...props
}: AccordionProps) {
  const [selected, setSelected] = useState<string | null>(value);

  useEffect(() => {
    onChange?.(selected);
  }, [selected]);

  return (
    <ul {...props}>
      <AccordionContext.Provider value={{ selected, setSelected }}>
        {children}
      </AccordionContext.Provider>
    </ul>
  );
}

export function AccordionItem({
  children,
  value,
  trigger,
  ...props
}: AccordionItemProps) {
  const context = useContext(AccordionContext);

  if (!context) {
    throw new Error("AccordionItem must be used within an Accordion");
  }

  const { selected, setSelected } = context;
  const open = selected === value;

  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <li className="border-b bg-transparent" {...props}>
      <header
        role="button"
        onClick={() => setSelected(open ? null : value)}
        className="flex justify-between items-center py-2 px-1 text-md text-blue-300"
      >
        {trigger}
        <FaCircleChevronDown
          size={16}
          color="blue"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </header>
      <div
        className="overflow-y-hidden transition-all"
        style={{ height: open ? ref.current?.offsetHeight || 0 : 0 }}
      >
        <div className="py-2 px-1 text-sm text-justify" ref={ref}>
          {children}
        </div>
      </div>
    </li>
  );
}
