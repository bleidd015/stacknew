// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {prisma}  from "../../../lib/prisma";

type Data = {
  name: string
}

// export default function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   res.status(200).json({ name: 'John Doe' })
// }

export default async function handler (req: NextApiRequest, res: NextApiResponse){
  const {id, first_name, last_name, nickname, address, mobile_no, email, github, linkedin,
     active_status, skill, role, avail_day, avail_time, discord_id, date_onboard} = req.body;
  try {
    await prisma.trainers.create({
      data: {
        id,
        first_name,
        last_name, 
        nickname,
        address,
        mobile_no,
        email,
        github,
        linkedin,
        active_status,
        skill,
        role,
        avail_day,
        avail_time: new Date(`1970-01-01T${avail_time}:00.000Z`),
        discord_id,
        date_onboard: new Date(date_onboard)
      }
    })
    res.status(200).json({message: 'trainer added'})
  }
  catch (error) {
    console.log("failure");
    console.log(avail_day)
    console.log(avail_time)
    console.log(date_onboard)
  }
}
