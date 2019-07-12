import React from "react";
import withSizes from "react-sizes";

export const WidthContext = React.createContext();

const WindowWidthProvider = props => {
  return (
    <WidthContext.Provider value={{ windowWidth: props.windowWidth }}>
      {props.children}
    </WidthContext.Provider>
  );
};

const mapSizesToProps = props => {
  return {
    windowWidth: props.width
  };
};

export default withSizes(mapSizesToProps)(WindowWidthProvider);
