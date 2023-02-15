import { useState } from "react";
import DateProvider from "../hoc/DateProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { endOfWeek, format, startOfWeek, addDays } from "date-fns";
import { WeekProps } from "../../views/Week";
import { LocaleArrow } from "../common/LocaleArrow";
import { useStore } from "../../store";
import { ColorButton } from "../../styles/styles";

interface WeekDateBtnProps {
  selectedDate: Date;
  onChange(value: Date, key: "selectedDate"): void;
  weekProps: WeekProps;
}

const WeekDateBtn = ({ selectedDate, onChange, weekProps }: WeekDateBtnProps) => {
  const { locale, navigationPickerProps } = useStore();
  const [open, setOpen] = useState(false);
  const { weekStartOn } = weekProps;
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: weekStartOn });
  const weekEnd = endOfWeek(selectedDate, { weekStartsOn: weekStartOn });

  const toggleDialog = () => setOpen(!open);

  const handleChange = (e: Date | null) => {
    onChange(e || new Date(), "selectedDate");
  };

  const handlePrev = () => {
    const ladtDayPrevWeek = addDays(weekStart, -1);
    onChange(ladtDayPrevWeek, "selectedDate");
  };
  const handleNext = () => {
    const firstDayNextWeek = addDays(weekEnd, 1);
    onChange(firstDayNextWeek, "selectedDate");
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
              >{`${format(weekStart, "dd", { locale })} - ${format(weekEnd, "dd MMMM yyyy", {
                locale,
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

export { WeekDateBtn };
