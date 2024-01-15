import { BrowserRouter } from "react-router-dom";
import IndexRoutes from "./router/IndexRoutes";

function App() {
  return (
    
    <div className="App">
      <BrowserRouter>
        <IndexRoutes/>
      </BrowserRouter>
    </div>
  );
}

export default App;
