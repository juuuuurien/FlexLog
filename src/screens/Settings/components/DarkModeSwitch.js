import React, { useState } from "react";

import { useDispatch } from "react-redux";
import { Switch } from "react-native-paper";
import { setDarkTheme } from "../../../../redux/slices/settingsSlice";

const DarkModeSwitch = ({ darkTheme, style }) => {
  const dispatch = useDispatch();
  const [isSwitchOn, setIsSwitchOn] = useState(darkTheme);

  const handleChangeTheme = () => {
    setIsSwitchOn(!isSwitchOn);
    dispatch(setDarkTheme(!isSwitchOn));
  };

  return (
    <Switch
      style={{ ...style }}
      value={isSwitchOn}
      onValueChange={handleChangeTheme}
    />
  );
};

export default DarkModeSwitch;
