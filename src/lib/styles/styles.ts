import { alpha, styled, Button } from "@mui/material";

export const Wrapper = styled("div")<{ dialog: number }>(({ theme, dialog }) => ({
  position: "relative",
  "& .rs__table_loading": {
    background: dialog ? "" : alpha(theme.palette.background.paper, 0.4),
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 999999,
    "& > span": {
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      "& >span": {
        marginBottom: 15,
      },
    },
  },
}));

export const Table = styled("div")<{ resource_count: number }>(({ resource_count }) => ({
  position: "relative",
  display: "flex",
  flexDirection: resource_count > 1 ? "row" : "column",
  width: "100%",
  boxSizing: "content-box",
  "& > div": {
    flexShrink: 0,
    flexGrow: 1,
  },
}));

export const TableGrid = styled("div")<{ days: number; sticky?: string; indent?: string }>(
  ({ days, sticky = "0", indent = "1", theme }) => ({
    display: "grid",
    gridTemplateColumns: +indent > 0 ? `10% repeat(${days}, 1fr)` : `repeat(${days}, 1fr)`,
    overflowX: "auto",
    overflowY: "hidden",
    position: sticky === "1" ? "sticky" : "relative",
    top: sticky === "1" ? 0 : undefined,
    zIndex: sticky === "1" ? 3 : undefined,
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: +indent > 0 ? `30px repeat(${days}, 1fr)` : "",
    },
    borderStyle: "solid",
    borderColor: theme.palette.grey[300],
    borderWidth: "0 0 0 1px",
    "&:first-of-type": {
      borderWidth: "1px 0 0 1px",
    },
    "&:last-of-type": {
      borderWidth: "0 0 1px 1px",
    },
    "& .rs__cell": {
      background: theme.palette.background.paper,
      position: "relative",
      borderStyle: "solid",
      borderColor: theme.palette.grey[300],
      borderWidth: "0 1px 1px 0",
      "&.rs__header": {
        "& > :first-of-type": {
          padding: "2px 5px",
        },
      },
      "&.rs__header__center": {
        padding: "6px 0px",
      },
      "&.rs__time": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "sticky",
        left: 0,
        zIndex: 2,
        [theme.breakpoints.down("sm")]: {
          writingMode: "vertical-rl",
        },
      },
      "& > button": {
        width: "100%",
        height: "100%",
        borderRadius: 0,
        cursor: "pointer",
        "&:hover": {
          background: alpha(theme.palette.primary.main, 0.1),

          "&:before": {
            display: "block",
            content:
              "url(\"data:image/svg+xml,%3C%3Fxml version='1.0' standalone='no'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 20010904//EN' 'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'%3E%3Csvg version='1.0' xmlns='http://www.w3.org/2000/svg' width='28px' height='28px' viewBox='0 0 512.000000 512.000000' preserveAspectRatio='xMidYMid meet'%3E%3Cg transform='translate(0.000000,512.000000) scale(0.100000,-0.100000)'%0Afill='%239a9797' stroke='none'%3E%3Cpath d='M2405 4954 c-370 -37 -615 -103 -900 -244 -489 -241 -854 -606 -1095%0A-1095 -169 -341 -244 -667 -244 -1055 0 -388 75 -714 244 -1055 239 -485 606%0A-854 1085 -1090 168 -83 296 -132 441 -170 358 -93 709 -106 1064 -41 970 180%0A1736 946 1916 1915 65 353 53 686 -36 1042 -40 160 -88 287 -175 464 -236 479%0A-605 846 -1090 1085 -322 159 -636 236 -1002 244 -93 2 -186 2 -208 0z m485%0A-339 c602 -102 1121 -448 1439 -959 296 -475 385 -1064 246 -1619 -88 -348%0A-280 -682 -545 -947 -315 -315 -692 -508 -1145 -587 -141 -24 -509 -24 -650 0%0A-454 80 -833 273 -1145 587 -315 315 -508 693 -587 1145 -24 142 -24 510 0%0A650 79 449 270 825 577 1135 334 338 734 537 1215 605 130 18 462 13 595 -10z'/%3E%3Cpath d='M2284 3828 c-42 -20 -44 -39 -44 -503 l0 -445 -445 0 c-304 0 -452%0A-3 -468 -11 -43 -20 -47 -45 -47 -309 0 -264 4 -289 47 -309 16 -8 164 -11%0A468 -11 l445 0 0 -445 c0 -304 3 -452 11 -468 20 -43 45 -47 309 -47 264 0%0A289 4 309 47 8 16 11 164 11 468 l0 445 445 0 c304 0 452 3 468 11 43 20 47%0A45 47 309 0 264 -4 289 -47 309 -16 8 -164 11 -468 11 l-445 0 0 445 c0 304%0A-3 452 -11 468 -6 14 -22 30 -36 36 -31 14 -519 14 -549 -1z'/%3E%3C/g%3E%3C/svg%3E%0A\")",
            backgroundSize: "28px 28px",
            height: "28px",
            width: "28px",
          },
        },
      },
      "& .rs__event__item": {
        position: "absolute",
        zIndex: 1,
      },
      "& .rs__multi_day": {
        position: "absolute",
        zIndex: 1,
        textOverflow: "ellipsis",
      },
      "& .rs__block_col": {
        display: "block",
        position: "relative",
      },
      "& .rs__hover__op": {
        cursor: "pointer",
        "&:hover": {
          opacity: 0.7,
          textDecoration: "underline",
        },
      },
      "&:not(.rs__time)": {
        minWidth: 65,
      },
    },
  })
);

export const PopperInner = styled("div")(({ theme }) => ({
  maxWidth: "100%",
  width: 400,
  "& > div": {
    padding: "5px 10px",
    "& .rs__popper_actions": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      "& .MuiIconButton-root": {
        color: theme.palette.primary.contrastText,
      },
    },
  },
}));

export const EventActions = styled("div")(({ theme }) => ({
  display: "inherit",
  "& .MuiIconButton-root": {
    color: theme.palette.primary.contrastText,
  },
  "& .MuiButton-root": {
    "&.delete": {
      color: theme.palette.error.main,
    },
    "&.cancel": {
      color: theme.palette.action.disabled,
    },
  },
}));

export const TimeIndicatorBar = styled("div")(({ theme }) => ({
  position: "absolute",
  zIndex: 2,
  width: "100%",
  display: "flex",
  "& > div:first-of-type": {
    height: 12,
    width: 12,
    borderRadius: "50%",
    background: theme.palette.error.light,
    marginLeft: -6,
    marginTop: -5,
  },
  "& > div:last-of-type": {
    borderTop: `solid 2px ${theme.palette.error.light}`,
    width: "100%",
  },
}));

export const ColorButton = styled(Button)(({ theme }) => ({
  color: "#4F46E5",
}));

export const ShowMoreButton = styled("div")<{ top: number }>(({ top }) => ({
  position: "absolute",
  top,
  zIndex: 1,
  left: "50%",
  marginLeft: "10px",
  fontSize: "12px",
  cursor: "pointer",
  "&:hover": {
    textDecoration: "underline",
  },
}));
