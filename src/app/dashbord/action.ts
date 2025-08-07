'use server'
import prisma from "@/lib/prisma";



export  async function createTask(taskData:FormData){
    

    const task=await prisma.task.create({
        data:{
            title:taskData.get('title') as string,
            description:taskData.get('desc') as string,
            user:{
                connect :{
                    id:taskData.get('userId') as string
                }
            }
            

        }

})
return task
    
}
