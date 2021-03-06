import { Request, Response } from "express";
import GetNewsWorkers from "../../../application/repository/Worker/GetNewsWorker";

export default async function(req : Request, res : Response) {
  try {
    const workers = await new GetNewsWorkers().run();
    res.status(200).json({ workers })
  }catch(e){
    console.log(e);
    res.status(404).json({ error : e.message });
  }
}