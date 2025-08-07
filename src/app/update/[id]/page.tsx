"use client";
import { FindUniqueTask } from "@/app/actions/finduniqe";
import { updateTask } from "@/app/actions/updateTask";
import {  useParams, useRouter } from "next/navigation";
import {  useEffect, useState } from "react";

export default function UpdateTask() {
  type Task ={
    id:string,
    title:string,
    description: string | null;
    userId: string;
    isDone: boolean;
  }|null
  const [task,setTask]=useState<Task>(null)
  const router = useRouter();
  const params=useParams()
  const taskId = params.id;
  useEffect(() => {
    async function FetchRelatedData() {
      setTask(await FindUniqueTask(taskId as string));
    }

    if(taskId) {
      FetchRelatedData();
  }
}, [taskId]);

  
  async function editTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const editData = new FormData(e.currentTarget);
    if (taskId) {
      editData.append("taskId", taskId as string);
      await updateTask(editData);
      router.push("/");
    }
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br
      from-gray-200 to-gray-300 flex items-center justify-center py-12 px-4 
      sm:px-6 lg:px-8"
    >
      <div
        className="w-full max-w-xl bg-white p-8 rounded-xl 
      shadow-lg border border-gray-200"
      >
        <h2
          className="text-2xl font-bold text-cyan-800 mb-6 text-
        center"
        >
          📝 Add a New Task
        </h2>

        <form onSubmit={editTask} className="space-y-6">
          {/* Title Input */}
          <div>
            <label className="block font-semibold text-gray-800 mb-2">
              Task Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="Enter task title"
              defaultValue={task?task.title:''}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block font-semibold text-gray-800 mb-2">
              Description{" "}
              <span className="text-sm text-gray-500">(optional)</span>
            </label>
            <textarea
              name="desc"
              rows={3}
              defaultValue={task?task.description as string:''}
              placeholder="Enter task description"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg 
              shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-600 
              focus:border-transparent resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-cyan-700 hover:bg-cyan-800 text-white 
              font-semibold px-6 py-2 rounded-lg transition duration-200 shadow-md"
            >
              ✏️ Eidit Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
