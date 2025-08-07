'use server'
import prisma from "@/lib/prisma";
import { redirect } from 'next/navigation'

export default async function createUser(formdata: FormData){
    const user=await prisma.user.create({
        data:{
            name:formdata.get('name') as string,
            password:formdata.get('password') as string,
            email:formdata.get('email') as string
        }
    })
    return user
    redirect('/')
    

}