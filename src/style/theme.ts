const fontFamily = {
  primaryFont: "Helvetica",
};

const fontStyles = {
  h1: {
    fontSize: "40px",
    lineHeight: "52px",
    fontWeight: "bold",
    letterSpacing: "-0.5px",
  },
  h2: {
    fontSize: "26px",
    lineHeight: "34px",
    fontWeight: "bold",
    letterSpacing: "-0.3px",
  },
  h3: {
    fontSize: "20px",
    lineHeight: "30px",
    fontWeight: "bold",
    letterSpacing: "-0.2px",
  },
  body: {
    fontSize: "16px",
    lineHeight: "26px",
    fontWeight: "regular",
    letterSpacing: "0.0px",
  },
  description: {
    fontSize: "14px",
    lineHeight: "26px",
    fontWeight: "regular",
    letterSpacing: "0.0px",
  },
  input: {
    fontSize: "13px",
    lineHeight: "20px",
    fontWeight: "bold",
    letterSpacing: "0.0px",
  },
  smallBody: {
    fontSize: "10px",
    lineHeight: "14x",
    fontWeight: "regular",
    letterSpacing: "0.0px",
  },
};

const color = {
  greyLight: "#ebebeb",
  black: "#222222",
  primary: "#1b1b1c",
  white: "#FFFFFF",
  whiteLight: "#F8F8F8",
  buttonDisabled: "#A7A8B2",
  buttonHover: "#5e5e5e",
};

const medias = {
  medium: "(max-width: 1024px)",
  mobile: "(max-width: 768px)",
};

const theme = {
  fontFamily,
  fontStyles,
  color,
  medias,
};

export default theme;
