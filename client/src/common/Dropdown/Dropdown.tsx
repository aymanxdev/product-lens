import { useRef, useState } from "react";
import "./dropdown.styles.scss";
import { useClickAway } from "react-use";

interface DropdownProps {
  options: string[];
  onSelect: (option: string) => void;
}
const Dropdown = (props: DropdownProps) => {
  const { options, onSelect } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const dropdownRef = useRef(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option);
  };

  useClickAway(dropdownRef, () => {
    if (isOpen) setIsOpen(false);
  });

  return (
    <div className="dropdown" ref={dropdownRef}>
      <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption || options[0]}
        <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}></span>
      </div>
      {isOpen && (
        <div className="dropdown-list">
          {options.map((option) => (
            <div
              key={option}
              className="dropdown-list-item"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
