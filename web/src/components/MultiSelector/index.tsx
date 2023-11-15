import Checkbox from "../Checkbox";

interface MultiSelectorProps {
  options: string[];
  checked: string[];
  onChange: (options: string[]) => void;
}

const MultiSelector: React.FC<MultiSelectorProps> = ({ options, checked }) => {
  return options.map((o) => (
    <Checkbox isChecked={!!checked.find((f) => f === o)} label={o} />
  ));
};

export default MultiSelector;
