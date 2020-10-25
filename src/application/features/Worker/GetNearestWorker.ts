import { FindOptions } from "sequelize/types";
import District from "../../database/mysql/models/District";
import Province from "../../database/mysql/models/Province";
import Specialty from "../../database/mysql/models/Specialty";
import User from "../../database/mysql/models/User";
import Worker from "../../database/mysql/models/Worker";

class GetNearestWorker {

  //Search for district
  public exec = async (districtId : number, limit? : number) => {
    try{ 
      const WorkerRequestConfig : FindOptions = {
        include : [
          {
            model : User,
            attributes : ['id','fullName','profileImage','description'],
            include : [
              {
                model : District,
                attributes : ['name'],
                include : [
                  {
                    model : Province,
                    attributes : ['name']
                  }
                ]
              }
            ],
            where : { districtId }
          },
          {
            model : Specialty,
            attributes : ['name']
          }
        ],
        attributes : ['id','availability','basePrice']
      }

      if(limit) WorkerRequestConfig.limit = limit;

      const workers = await Worker.findAll(WorkerRequestConfig);

      return workers;
    }catch(e){
      console.log(e);
      return null;
    }
  }
}

export default GetNearestWorker;