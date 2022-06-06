import { useContext, createContext, useState } from "react";

import Toasty from "../components/snackBar";

const SnackBarContext = createContext({});

export const SnackbarProvider = ({ children }) => {
  const [snackBar, setSnackBar] = useState({
    open: false,
    text: "",
    severity: "info",
  });

  return (
    <SnackBarContext.Provider value={{ setSnackBar }}>
      <Toasty
        open={snackBar.open}
        severity={snackBar.severity}
        text={snackBar.text}
        onClose={() =>
          setSnackBar({
            ...snackBar,
            open: false,
          })
        }
      />
      {children}
    </SnackBarContext.Provider>
  );
};

const useSnackBar = () => useContext(SnackBarContext);

export default useSnackBar;
