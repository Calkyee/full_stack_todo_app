import { 
  DbService
} from "@/server/services/db-service"; 

export class Repository { 
  async getdatabase(){ 
    const dbService = new DbService(); 
    const database = await dbService.getDatabase();
    return database;  
  }

}