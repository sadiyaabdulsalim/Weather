import React from 'react';
import ReactDOM from 'react-dom';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route
} from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import CurrentLocation from "./currentLocation.jsx";
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';  
import Protected from './components/Protected';
import Activeuser from './Pages/activeuser.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/useractive" element={<Activeuser />} />
      <Route path="/" element = {<Protected/>}> 
        <Route path="/" index element={<CurrentLocation/>}/>
      </Route>  
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <RouterProvider router={router}/>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
