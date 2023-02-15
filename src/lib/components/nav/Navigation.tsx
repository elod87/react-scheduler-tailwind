import { Fragment, useState } from "react";
import { useTheme, useMediaQuery, Popover, MenuList, MenuItem, IconButton } from "@mui/material";
import { WeekDateBtn } from "./WeekDateBtn";
import { DayDateBtn } from "./DayDateBtn";
import { MonthDateBtn } from "./MonthDateBtn";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useStore } from "../../store";

export type View = "month" | "week" | "day";

const Navigation = () => {
  const {
    selectedDate,
    view,
    week,
    handleState,
    getViews,
    translations,
    navigation,
    day,
    month,
    disableViewNavigator,
    triggerDialog,
  } = useStore();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const views = getViews();

  const toggleMoreMenu = (el?: Element) => {
    setAnchorEl(el || null);
  };

  const renderDateSelector = () => {
    switch (view) {
      case "month":
        return (
          month?.navigation && <MonthDateBtn selectedDate={selectedDate} onChange={handleState} />
        );
      case "week":
        return (
          week?.navigation && (
            <WeekDateBtn selectedDate={selectedDate} onChange={handleState} weekProps={week!} />
          )
        );
      case "day":
        return day?.navigation && <DayDateBtn selectedDate={selectedDate} onChange={handleState} />;
      default:
        return "";
    }
  };

  return (
    <div className="flex justify-between items-center py-2.5 md:p-2.5">
      <div data-testid="date-navigator">{navigation && renderDateSelector()}</div>

      <div
        data-testid="view-navigator"
        style={{
          visibility: disableViewNavigator ? "hidden" : "visible",
        }}
      >
        <button
          type="button"
          className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-md text-sm px-3 py-2 sm:mr-4"
          onClick={() => handleState(new Date(), "selectedDate")}
        >
          {translations.navigation.today}
        </button>
        {views.length > 1 &&
          (isDesktop ? (
            <div className="inline-flex items-center">
              <div className="inline-flex rounded-md shadow-sm" role="group">
                {views.map((v, i) => (
                  <button
                    type="button"
                    className={`px-4 py-2 text-sm font-medium
                      ${v === view ? "text-indigo-600" : "text-gray-900"}
                      ${i === 0 ? "rounded-l-md" : i === views.length - 1 ? "rounded-r-md" : ""}
                    bg-white border border-gray-200 hover:bg-gray-100 hover:text-indigo-600`}
                    key={v}
                    onClick={() => handleState(v, "view")}
                    onDragOver={(e) => {
                      e.preventDefault();
                      handleState(v, "view");
                    }}
                  >
                    {translations.navigation[v]}
                  </button>
                ))}
              </div>
              <div className="hidden md:block md:ml-4 h-6 w-px bg-gray-300"></div>
              <button
                type="button"
                className="md:ml-4 rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => {
                  triggerDialog(true);
                }}
              >
                Add event
              </button>
            </div>
          ) : (
            <Fragment>
              <IconButton
                style={{ padding: 5 }}
                onClick={(e) => {
                  toggleMoreMenu(e.currentTarget);
                }}
              >
                <MoreVertIcon />
              </IconButton>
              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => {
                  toggleMoreMenu();
                }}
                anchorOrigin={{
                  vertical: "center",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <MenuList autoFocusItem={!!anchorEl} disablePadding>
                  <>
                    {views.map((v) => (
                      <MenuItem
                        key={v}
                        selected={v === view}
                        onClick={() => {
                          toggleMoreMenu();
                          handleState(v, "view");
                        }}
                      >
                        {translations.navigation[v]}
                      </MenuItem>
                    ))}
                    <MenuItem
                      onClick={() => {
                        toggleMoreMenu();
                        triggerDialog(true);
                      }}
                    >
                      Add Event
                    </MenuItem>
                  </>
                </MenuList>
              </Popover>
            </Fragment>
          ))}
      </div>
    </div>
  );
};

export { Navigation };
