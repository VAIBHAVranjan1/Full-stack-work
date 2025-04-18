import { RouterProvider, Route,createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Single from './Pages/Single';
import Write from './Pages/Write';
import RootLayout from './Layout/RootLayout';


const App = () => {
   const router = createBrowserRouter(
      createRoutesFromElements(
         <Route path='/' element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="post/:id" element={<Single />} />
            <Route path="write" element={<Write />} />
         </Route>
      )
   )
   return (
      <div className='app'>
         <div className='container'>
            <RouterProvider router={router}/>
         </div>
      </div>
   );
};

export default App;
