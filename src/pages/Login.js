import React, { useEffect, useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { app, fireDb } from '../firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

function Login() {
  const {loading}=useSelector(store=>store)
  const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate =useNavigate();

  const login = () => {
    dispatch({type : 'showLoading'})
    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        getDoc(doc(fireDb, 'users', user.uid)).then((user) => {
          localStorage.setItem('social-networker' , JSON.stringify({...user.data() , id:user.id}));
          navigate('/')
          toast.success('Login Successful')
        });
        dispatch({type : 'hideLoading'})
        
      })
      .catch((error) => {
        toast.error('Login Failed');
        dispatch({type : 'hideLoading'})
      });
  };
  useEffect(()=>{
    if(localStorage.getItem('social-networker'))
    {
      navigate('/')
    }
  })
  return (
    <div className='h-screen flex justify-between  flex-col overflow-x-hidden'>
      {loading && <Loader/>}
      {/* top corner */}
      <div className='flex justify-start'>
        <div className='h-40 bg-primary w-96 transform -skew-x-[25deg] -ml-10 flex  items-center justify-center'>
          <h1 className='text-center text-6xl font-semibold skew-x-[25deg] text-white md:text-5xl'>Social</h1>
        </div>
      </div>

      {/* main form */}
      <div className='flex justify-center'>
        <div className='w-[420px] flex flex-col space-y-5 card p-10'>
          <h1 className='text-4xl text-primary font-semibold'>Get---In</h1>
          <hr />
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' className='border border-gray-300 h-10 rounded-sm focus:border-gray-500 pl-5' />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='password' className='border border-gray-300 h-10 rounded-sm focus:border-gray-500 pl-5' />
          <div className='flex justify-end'>
            <button className='bg-primary h-10 rounded-sm text-white px-10' onClick={login}>LOGIN</button>
          </div>
          <hr />
          <Link to='/register' className='text-[14px] text-primary'>NOT YET REGISTER ? CLICK HERE TO REGISTER</Link>
        </div>
      </div>

      {/* bottom corner */}
      <div className='flex justify-end'>
        <div className='h-40 bg-primary w-96 transform skew-x-[25deg] -mr-10 flex  items-center justify-center'>
          <h1 className='text-center text-5xl font-semibold -skew-x-[25deg] text-white'>Netwoker</h1>
        </div>
      </div>
    </div>
  )
}

export default Login