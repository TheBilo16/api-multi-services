import District from "../../database/mysql/models/District";
import Province from "../../database/mysql/models/Province";
import Specialty from "../../database/mysql/models/Specialty";
import User from "../../database/mysql/models/User";
import Worker from "../../database/mysql/models/Worker";

class FindWorkerById {
  public find = async (id : number) => {
    try {
      const worker = await Worker.findByPk(id, {
        include : [
          {
            model : User,
            attributes : ['name','lastname','profileImage','districtId','description'],
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
            ]
          },
          {
            model : Specialty,
            attributes : ['name']
          }
        ],
        attributes : ['id','availability','location','basePrice','backgroundImage']
      });

      return worker;
    }catch(e) {
      console.log(e);
    }
  }
}

export default FindWorkerById;