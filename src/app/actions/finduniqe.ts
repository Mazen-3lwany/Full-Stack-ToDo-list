'use server'
import prisma from "@/lib/prisma";
export async function FindUniqueTask(taskId:string){
    const task =await prisma.task.findUnique({
        where:{id:taskId}
    })
    return task
}