'use server'

import prisma from "@/lib/prisma"

export async function updateTask(formData:FormData){
    await prisma.task.update({
        where:{id:formData.get('taskId') as string},
        data:{
            title:formData.get('title') as string,
            description:formData.get('desc') as string
        }
    })
}