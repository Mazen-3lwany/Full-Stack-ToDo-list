'use server'

import  { prisma } from "@/lib/prisma"

export async function DeleteTask (taskId:string) {
    await prisma.task.delete({
        where:{
            id:taskId
        }
    })
}