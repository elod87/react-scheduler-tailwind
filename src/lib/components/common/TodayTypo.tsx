import { format, isToday } from "date-fns";

interface TodayTypoProps {
  date: Date;
  onClick?(day: Date): void;
  locale: Locale;
}

const TodayTypo = ({ date, onClick, locale }: TodayTypoProps) => {
  return (
    <div>
      <div className="flex h-8 text-sm justify-center items-center text-gray-500">
        <div>{format(date, "eee", { locale })}</div>
        {isToday(date) ? (
          <span className="ml-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 font-semibold text-white">
            {format(date, "dd", { locale })}
          </span>
        ) : (
          <span className="ml-1 items-center justify-center font-semibold text-gray-900">
            {format(date, "dd", { locale })}
          </span>
        )}
      </div>
    </div>
  );
};

export default TodayTypo;
