import {Login} from "./pages/login/Login";
import {Dashboard} from "./pages/dashboard/Dashboard";
import {Route, Routes} from "react-router";

function App() {
  return (
      <div>
        <Routes>
          <Route path={'/dashboard'} element={<Dashboard/>}/>
          <Route path={'/dashboard/:type'} element={<Dashboard/>}/>
          <Route path={'/dashboard/:type/:item'} element={<Dashboard/>}/>
        </Routes>
      </div>
  );
}

export default App;
