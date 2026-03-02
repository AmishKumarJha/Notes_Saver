import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Homes from "./components/Homes";
import Pastee from "./components/Pastee";
import ViewPaste from "./components/ViewPaste";
import Nav from "./components/Nav";

const router = createBrowserRouter([
  {
    path:"/",
    element: 
      <div>
        <Nav />
        <Homes />
      </div>
   
  },
  {
    path:"/pastes",
    element: 
      <div>
        <Nav />
        <Pastee />
      </div>
    
  },
  {
    path:"/pastes/:id",
    element: 
      <div>
        <Nav />
        <ViewPaste />
      </div>
    
  },
]);

function App() {
  return (
    <div >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
