import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Rootlayout from './components/Rootlayout'
import Registration from './components/registration/Registration'
import Login from './components/login/Login'
import Home from './components/home/Home'
import Opportunities from "./components/Opportunities/Opportunities";
import Jobs from './components/jobs/Jobs';

function App(){
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Rootlayout />,
      children:[
       
        {
          path: "/register",
          element: <Registration />
        },
        {
          path:"/login",
          element:<Login />
    
        },
        {
          path:"/home",
          element:<Home />
    
        },
        {
          path:"/opportunities",
          element:<Opportunities />,
          children:[
            {
              path:"jobs",
              element:<Jobs/>
            }
          ]
         
        }

      ]
    },
    
  ])
  return(
    <div>
      <RouterProvider router = {router} />
    </div>
  )
}


export default App;








/*import './App.css';
//import Scholoships from './components/Scholoships';
//import Registration from './components/registration/Registration';
import Home from './components/home/Home'
import Login from './components/login/Login';
import Navbarb from './components/navbar/Navbarb';

function App() {
  return (
    <div className="App">
      <Login />
      <Home />
      <Navbarb />
      
    </div>
  );
}

export default App;
*/