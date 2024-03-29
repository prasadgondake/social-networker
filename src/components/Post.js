import React from 'react'
import { AiFillHeart, AiOutlineComment } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

function Post({ post }) {

    const navigate = useNavigate()
    const getUserName = () => {
        const email = post.user.email
        const username = email.substring(0, email.length - 10)
        return username
    };
    return (
        <div onClick={()=>navigate(`/post/${post.id}`)} className='cursor-pointer'>
            <div className='flex item items-center card-sm p-2'>
                <div className='h-10 w-10 rounded-full bg-gray-500 flex justify-center items-center text-white mr-2 '>
                    <span className='text-2xl'>{getUserName()[0]}</span>
                </div>
                <span>{getUserName()}</span>
            </div>
            <div className='w-100 text-center flex flex-col justify-center card-sm'>
                <img src={post.imageURL} alt="" className='h-60 w-60' />
                <span className='text-gray-500 text-left my-2 p-1'>{post.description}</span>
            </div>
            <div className='card-sm p-2 flex w-full items-center space-x-5'>
                <div className='flex space-x-2 items-center'>
                    <AiFillHeart size={25}/>
                    <h1>{post.likes.length}</h1>
                </div>
                <div className='flex space-x-2 items-center'>
                    <AiOutlineComment size={25}/>
                    <h1>{post.comments.length}</h1>
                </div>
            </div>
        </div>
    )
}

export default Post