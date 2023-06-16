import type {NextApiRequest, NextApiResponse} from 'next'
import {prisma}  from "../../../lib/prisma";
//import { PrismaClient } from "@prisma/client";

//const prisma = new PrismaClient()

// export default async function handler(
//     req: NextApiRequest, 
//     res: NextApiResponse
//     ){
//     if (req.method === "GET") {
//         try{
//             const trainers = await prisma.trainers.findMany({
//                 select: {
//                     id: true,
//                     first_name: true
//                 }
//             })
//             res.status(200).json(trainers)
//             //console.log(trainers)
//         }
//         catch(error){
//             console.error(error)
//             res.status(500).json({ error: "Failed to fetch trainers"})
            
//         }
//     }
//     else{
//         res.status(405).json({error: "method is not allowed"})
//     }
// }

// export default async function handler (
//     req: NextApiRequest,
//     res: NextApiResponse
// ){
//     try{
//         const data = await prisma.trainers.findMany({
//                 select: {
//                 id: true,
//                 first_name: true
//             }
//         })
//         //console.log("==========================================================BACKEND======================")
//         //console.log(data)
//         return res.status(200).json(data)
//     }
//     catch(error){
//         return res.status(500).json(error)
//     }
// }






