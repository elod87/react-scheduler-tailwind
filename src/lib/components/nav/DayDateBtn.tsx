import { useState } from "react";
import DateProvider from "../hoc/DateProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format, addDays } from "date-fns";
import { LocaleArrow } from "../common/LocaleArrow";
import { useStore } from "../../store";
import { ColorButton } from "../../styles/styles";

interface DayDateBtnProps {
  selectedDate: Date;
  onChange(value: Date, key: "selectedDate"): void;
}

const DayDateBtn = ({ selectedDate, onChange }: DayDateBtnProps) => {
  const { locale, navigationPickerProps } = useStore();
  const [open, setOpen] = useState(false);
  const toggleDialog = () => setOpen(!open);

  const handleChange = (e: Date | null) => {
    onChange(e || new Date(), "selectedDate");
  };

  const handlePrev = () => {
    const prevDay = addDays(selectedDate, -1);
    onChange(prevDay, "selectedDate");
  };
  const handleNext = () => {
    const nexDay = addDays(selectedDate, 1);
    onChange(nexDay, "selectedDate");
  };
  return (
    <div className="flex">
      <div className="border rounded-l-md border-gray-300">
        <LocaleArrow type="prev" onClick={handlePrev} />
      </div>
      <div className="border border-l-0 border-r-0 border-gray-300">
        <DateProvider>
          <DatePicker
            {...navigationPickerProps}
            open={open}
            onClose={toggleDialog}
            openTo="day"
            views={["month", "day"]}
            value={selectedDate}
            onChange={handleChange}
            renderInput={(params) => (
              <ColorButton
                ref={params.inputRef}
                style={{ padding: 4 }}
                onClick={toggleDialog}
              >{`${format(selectedDate, "dd, MMMM yyyy", {
                locale: locale,
              })}`}</ColorButton>
            )}
          />
        </DateProvider>
      </div>
      <div className="border rounded-r-md border-gray-300">
        <LocaleArrow type="next" onClick={handleNext} />
      </div>
    </div>
  );
};

export { DayDateBtn };
