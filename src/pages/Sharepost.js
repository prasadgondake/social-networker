import React, { useEffect, useState } from 'react'
import DefaultLayout from '../components/DefaultLayout'
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { fireDb } from "../firebaseConfig";
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function Sharepost() {
    const [data, setData] = useState([]);
    const [post, setPost] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getData = async () => {
        dispatch({ type: 'showLoading' })
        const querySnapshot = await getDocs(collection(fireDb, "users"));
        const temp = [];
        querySnapshot.forEach((doc) => {
            temp.push({ ...doc.data(), id: doc.id });
        });
        setData(temp);
        dispatch({ type: 'hideLoading' })
    };

    const getPost = () => {
        dispatch({ type: "showLoading" })
        getDoc(doc(fireDb, "posts", params.id)).then((response) => {
            setPost({ ...response.data(), id: response.id })
            dispatch({ type: 'hideLoading' })
        }).catch(() => {
            dispatch({ type: 'hideLoading' })
        });
    }

    useEffect(() => {
        getData();
        getPost();
    }, []);

    const getUserName = (text) => {
        const email = text
        const username = email.substring(0, email.length - 10)
        return username
    };

    const addOrRemoveUser = (user) => {
        if (selectedUsers.find((obj) => obj.id === user.id)) {
            const temp = selectedUsers.filter((obj) => obj.id !== user.id)
            setSelectedUsers(temp)
        } else {
            const temp = [...selectedUsers];
            temp.push(user);
            setSelectedUsers(temp);
        }
    };

    const sharePost = async()=>{
        selectedUsers.forEach((user)=>{
            dispatch({type : "showLoading"})
            const tempShares = user.shares ?? [];
            tempShares.push({...post , sharedBy : JSON.parse(localStorage.getItem("social-networker")),
        });
            setDoc(doc(fireDb , "users" , user.id) , {...user , shares : tempShares}).then(()=>{
                dispatch({type : "hideLoading"})
            });
        });
        toast.success("Post Shared Successfully")
        navigate('/');
    };

    return (
        <DefaultLayout>
            {" "}
            {post && data && (<div>
                <div className='my-5'>
                    <img src={post.imageURL} className='h-32 w-32' />
                </div>
                <hr />
                <h1 className='text-xl font-semibold text-gray-500'>Select Users</h1>
                <div className='grid grid-cols-5 md:grid-cols-1 gap-5 mt-5'>
                    {data.map((user) => {
                        const alreadySelected = selectedUsers.find((obj) => obj.id === user.id)
                        return (
                            <div className={`cursor-pointer card p-5 justify-center items-center flex flex-col ${alreadySelected && 'border-4 border-primary'}`} onClick={() => { addOrRemoveUser(user) }}>
                                <div className='h-24 w-24 rounded-full bg-gray-500 flex justify-center items-center text-white'>
                                    <span className='text-5xl font-semibold'>{getUserName(user.email)[0]}</span>
                                </div>
                                <h1 className='text-xl text-gray-500 mt-5'>{getUserName(user.email)}</h1>
                            </div>
                        );
                    })}
                </div>
                <div className='mt-5 '>
                    <button className='bg-primary h-10 rounded-sm text-white px-10' onClick={sharePost}>Share Post</button>
                </div>
            </div>)}
        </DefaultLayout>
    )
}

export default Sharepost