import Navbar from "./components/Navbar";
import { useRoutes } from "react-router-dom";
import routes from "./routes";

function App() {
  const elements = useRoutes(routes);
  return (
    <div>
      <Navbar />
      {elements}
    </div>
  );
}

export default App;
