import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const SpinnerContext = createContext({
  spinnerData: [],
  isSpinning: false,
  isSpinnerReadyToSpin: false,
  setSpinnerData: () => {},
  setIsSpinnerReadyToSpin: () => {},
  setIsSpinning: () => {},
});

export const useSpinnerContext = () => {
  return useContext(SpinnerContext);
};

export const SpinnerProvider = ({ children }) => {
  const [spinnerData, setSpinnerData] = useState([
    {
      id: "1",
      label: "5%",
      discount: 5,
      color: "#3498db",
      type: "percent",
    },
    {
      id: "2",
      label: "10%",
      discount: 10,
      color: "#e74c3c",
      type: "percent",
    },
    {
      id: "3",
      label: "15%",
      discount: 15,
      color: "#2ecc71",
      type: "percent",
    },
    {
      id: "4",
      label: "20%",
      discount: 20,
      color: "#f39c12",
      type: "percent",
    },
    {
      id: "5",
      label: "25%",
      discount: 25,
      color: "#9b59b6",
      type: "percent",
    },
  ]);

  const [isSpinnerReadyToSpin, setIsSpinnerReadyToSpin] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);

  return (
    <SpinnerContext.Provider
      value={{
        spinnerData,
        isSpinnerReadyToSpin,
        isSpinning,
        setSpinnerData,
        setIsSpinnerReadyToSpin,
        setIsSpinning,
      }}
    >
      {children}
    </SpinnerContext.Provider>
  );
};

SpinnerProvider.propTypes = {
  children: PropTypes.node,
};
