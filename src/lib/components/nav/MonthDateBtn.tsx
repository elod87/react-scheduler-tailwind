import { useState } from "react";
import DateProvider from "../hoc/DateProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format, getMonth, setMonth } from "date-fns";
import { LocaleArrow } from "../common/LocaleArrow";
import { useStore } from "../../store";
import { ColorButton } from "../../styles/styles";

interface MonthDateBtnProps {
  selectedDate: Date;
  onChange(value: Date, key: "selectedDate"): void;
}

const MonthDateBtn = ({ selectedDate, onChange }: MonthDateBtnProps) => {
  const { locale, navigationPickerProps } = useStore();
  const [open, setOpen] = useState(false);
  const currentMonth = getMonth(selectedDate);

  const toggleDialog = () => setOpen(!open);

  const handleChange = (e: Date | null) => {
    onChange(e || new Date(), "selectedDate");
  };
  const handlePrev = () => {
    const prevMonth = currentMonth - 1;
    onChange(setMonth(selectedDate, prevMonth), "selectedDate");
  };
  const handleNext = () => {
    const nextMonth = currentMonth + 1;
    onChange(setMonth(selectedDate, nextMonth), "selectedDate");
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
            openTo="month"
            views={["year", "month"]}
            value={selectedDate}
            onChange={handleChange}
            renderInput={(params) => (
              <ColorButton ref={params.inputRef} style={{ padding: 4 }} onClick={toggleDialog}>
                {format(selectedDate, "MMMM yyyy", { locale })}
              </ColorButton>
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

export { MonthDateBtn };
