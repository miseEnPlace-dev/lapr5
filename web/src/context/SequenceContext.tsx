import { createContext, Dispatch, useState } from "react";

import { Sequence } from "@/model/Sequence";

const SequenceContext = createContext<{
  sequence: Sequence | undefined;
  setSequence: Dispatch<React.SetStateAction<Sequence | undefined>>;
  selectedDevice: string;
  setSelectedDevice: Dispatch<React.SetStateAction<string>>;
}>({
  sequence: undefined,
  setSequence: () => {},
  selectedDevice: "",
  setSelectedDevice: () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const SequenceProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [sequence, setSequence] = useState<Sequence>();
  const [selectedDevice, setSelectedDevice] = useState("");

  return (
    <SequenceContext.Provider
      value={{ sequence, setSequence, selectedDevice, setSelectedDevice }}
    >
      {children}
    </SequenceContext.Provider>
  );
};

export default SequenceContext;
