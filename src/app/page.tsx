'use client';

import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { showTasks } from './actions/findTask';
import Link from 'next/link';
import { DeleteTask } from './actions/deleteTask';
import Image from 'next/image';

export default function Home() {

  type Task = {
  id: string;
  title: string;
  description: string|null; 
  userId:string;
  isDone:boolean;
};
  
    const router =useRouter();
    const [userId, setUserId] = useState<string | null>(null);
    const [username,setusername]=useState<string|null>(null)
    const [profUrl,setProfUrl]=useState<string|null>(null)
    const [tasks, setTasks] = useState<Task[]>([]);
    
    useEffect(()=>{
      const storeuserId=localStorage.getItem('currentUserId')
        const userData=localStorage.getItem(`${storeuserId}`)
      if(!userData){
        router.push('/login')
      }
      else{
        const user=JSON.parse(userData)
        setusername(user.name||'user')
          setUserId(storeuserId);
          setProfUrl(user.profImag)
          console.log(profUrl)

        
      async function showtasks(){
          const tasks =await showTasks(storeuserId as string) 
          console.log(tasks);
          setTasks(tasks)
    }
    showtasks()
    
  }
    },[])
    const handleDelete=async(taskId:string)=>{
      await DeleteTask(taskId)
      const updatedTasks = await showTasks(userId as string); // استدعاء جديد للمهام
        setTasks(updatedTasks);
    }
    // const handleUpdate=async(taskId:string)=>{

    // }
    const handleToggleDone=(taskId:string)=>{
      const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isDone: !task.isDone } : task
    );
    setTasks(updatedTasks);
    }
    const handlelogOut=()=>{
      localStorage.removeItem('currentUserId')
      redirect('/login')
    }
    
    if (!username) return null;
  return (
      <div>
        <nav className="bg-cyan-900 text-white px-6 py-4 shadow">
        <div className="max-w-6xl mx-auto flex items-center justify-between flex-wrap">
          <div className="text-xl font-bold">📝 To-Do App</div>
          <div className='flex gap-x-5 items-center'>
            <div className=''>
                <Image 
                src={profUrl||'/profile-user.png'}
                alt='profile image'
                width={40} 
                height={40}
                className="w-10 h-10 rounded-full object-cover border-2
                  border-white shadow-sm"
                />
            </div>
          <div className="mt-2 sm:mt-0 text-md">
            Welcome, <span className="font-semibold uppercase">{username}</span> 👋
          </div>
          <button
          onClick={()=>handlelogOut()}
          className="bg-red-600 hover:bg-red-700 text-white 
              font-medium py-1 px-4 rounded-lg shadow-md transition duration-200">
                Log out
          </button>
          </div>
        </div>
      </nav>
      <div className="max-w-2xl mx-auto mt-8 px-4 space-y-4">
  {tasks.length === 0 ? (
    <div className="text-center text-gray-600 mt-10">
      No tasks yet. Add one above 👆
    </div>
  ) : (
    tasks.map((task) => (
      <div
        key={task.id}
        className="bg-white rounded-xl shadow-md p-5 border-l-4 border-cyan-800 transition hover:shadow-lg"
      >
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              {task.title}
              {task.isDone ? (
                <span className="text-green-600 text-sm bg-green-100 px-2 py-0.5 rounded-full">
                  ✅ Done
                </span>
              ) : (
                <div></div>
                // <span className="text-red-600 text-sm bg-red-100 px-2 py-0.5 rounded-full">
                //   ❌ Not Done
                // </span>
              )}
            </h3>
            {task.description && (
              <p className="text-gray-600 mt-1">{task.description}</p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => handleToggleDone(task.id)}
              className="text-sm px-3 py-1 rounded-md bg-yellow-100 text-yellow-800 hover:bg-yellow-200 transition"
            >
              {task.isDone ? "Mark Undone" : "Mark Done"}
            </button>
            <Link href={`/update/${task.id}`}>
              <button
                // onClick={() => handleUpdate(task.id)}
                className="text-sm px-3 py-1 rounded-md bg-blue-100 text-blue-800 hover:bg-blue-200 transition"
              >
                ✏️ Update
              </button>
            </Link>
            <button
              onClick={() => handleDelete(task.id)}
              className="text-sm px-3 py-1 rounded-md bg-red-100 text-red-800 hover:bg-red-200 transition"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      </div>
    ))
  )}
</div>
    <div className="flex justify-center mt-8">
      <Link href="/dashbord">
        <button className="bg-cyan-800 hover:bg-cyan-700 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out">
          ➕ Add New Task
        </button>
      </Link>
    </div>
      </div>
  )
}