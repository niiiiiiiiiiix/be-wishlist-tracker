import React from "react";
import "./Button.css";

// set default style of button
// along with alt style
const styles = ["btn-style-default", "btn-style-outline"];

// set default size of button
// along with alt size
const sizes = ["btn-size-default", "btn-size-mobile"];

// set default colour of button
// along with alt colour
const colors = ["btn-color-default", "btn-color-alt"];

// set default font of button
// along with alt colour
const font = ["btn-font-default", "btn-font-alt"];

export const Button = ({
  children,
  onClick,
  type,
  buttonStyle,
  buttonSize,
  buttonColor,
  buttonFont,
}) => {
  // if there is a set styling, then we will use that style
  // else it'll automatically use the default styling set above i.e. primary styling
  const checkButtonStyle = styles.includes(buttonStyle)
    ? buttonStyle
    : styles[0];

  const checkButtonSize = styles.includes(buttonSize) ? buttonSize : sizes[0];

  const checkButtonColor = styles.includes(buttonColor)
    ? buttonColor
    : colors[0];

  const checkButtonFont = styles.includes(buttonFont) ? buttonFont : font[0];

  return (
    <button
      className={`btn ${checkButtonStyle} ${checkButtonSize} ${checkButtonColor} ${checkButtonFont}`}
      onClick={onClick}
      type={type}
    >
      {children}
      {/* these are words that we're putting in */}
    </button>
  );
};
