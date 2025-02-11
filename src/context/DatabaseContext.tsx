import { createContext, useContext, useEffect, useState } from "react";
import { SQLiteDatabase } from "react-native-sqlite-storage";
import { getDBConnection } from "../services/database/DatabaseService";

interface DatabaseContextType {
    db: SQLiteDatabase | null
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined)

export const DatabaseProvider : React.FC<{children: React.ReactNode}> = ({children}) => {
    const [db, setDb] = useState<SQLiteDatabase | null>(null);

    useEffect(()=>{
        const connectToDatabase = async ()=>{
            try{
                const database = await getDBConnection()
                setDb(database)
            }
            catch(error){
                throw new Error('Something went wrong!! Failed to connect with database.')
            }
        }

        connectToDatabase()
    },[])

    return (
        <DatabaseContext.Provider value={{ db }}>
            {children}
        </DatabaseContext.Provider>
    )
}

export const useDatabase = (): DatabaseContextType => {
    const dbContext = useContext(DatabaseContext)
    if(!dbContext){
        throw new Error("useDatabase must be used within a DatabaseProvider")
    }
    return dbContext
}