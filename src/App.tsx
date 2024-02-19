import { BrowserRouter } from "react-router-dom";
import IndexRoutes from "./router/IndexRoutes";
import { Provider } from "react-redux";
import { store } from './redux/store'

function App() {
  return (

    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <IndexRoutes />
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
