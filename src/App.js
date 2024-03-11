// import './App.css';
// import { BrowserRouter, Route, Routes , Navigate } from 'react-router-dom'
// import Register from './pages/Register'
// import Home from './pages/Home'
// import Login from './pages/Login';
// import AddPost from './pages/AddPost';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// function App() {
//   return (
//     <div className="App">
//       <ToastContainer/>
//       <BrowserRouter>
//         <Routes>
//           <Route path='/' element={<ProtectedRouted><Home/></ProtectedRouted>}/>
//           <Route path='/addpost' element={<ProtectedRouted><AddPost/></ProtectedRouted>}/>
//           <Route path='/login' element={<Login/>}/>
//           <Route path='/register' element={<Register/>}/>
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }


// function ProtectedRouted(children){
//   if(localStorage.getItem('social-networker'))
//   {
//     return children
//   }else{
//     return <Navigate to-='/login'/>
//   }
// }
// export default App;

import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Register from './pages/Register'
import Home from './pages/Home'
import Login from './pages/Login';
import AddPost from './pages/AddPost';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PostDesc from './pages/PostDesc';
import Sharepost from './pages/Sharepost';
import Shares from './pages/Shares';
import Profile from './pages/Profile';

function ProtectedRoute({ children }) {
  if (localStorage.getItem('social-networker')) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/sharepost/:id" element={<ProtectedRoute><Sharepost /></ProtectedRoute>} />
          <Route path="/shares" element={<ProtectedRoute><Shares /></ProtectedRoute>} />
          <Route path="/profile/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/addpost" element={<ProtectedRoute><AddPost /></ProtectedRoute>} />
          <Route path="/post/:id" element={<ProtectedRoute><PostDesc /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
