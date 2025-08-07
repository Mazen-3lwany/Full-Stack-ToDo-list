'use server'

import prisma from "@/lib/prisma"

export async function updateState(taskId:string,isDone:boolean){
    await prisma.task.update({
        where:{id:taskId},
        data:{
            isDone:isDone
        }
    })
}