'use server'
import prisma from "@/lib/prisma";

export async function showTasks(userId:string){
    
    const tasks=await prisma.task.findMany({
        where:{
            userId:userId
        }
    })
    return tasks
}