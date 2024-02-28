import { BrowserRouter } from "react-router-dom";
import IndexRoutes from "./router/IndexRoutes";
import { Provider } from "react-redux";
import { store } from './redux/store'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple, teal } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: purple[200],
    },
    secondary: {
      main: teal[200]
    }
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <BrowserRouter>
            <IndexRoutes />
          </BrowserRouter>
        </div>
      </Provider>
      </ThemeProvider>
  );
}

export default App;
