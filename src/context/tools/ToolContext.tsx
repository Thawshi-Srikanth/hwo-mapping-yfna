import { createContext } from "react";
import ToolContextType from "../../types/ToolContextType";

const ToolContext = createContext<ToolContextType | undefined>(undefined);

export default ToolContext;
