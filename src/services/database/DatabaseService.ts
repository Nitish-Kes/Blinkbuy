import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import {Table} from '../../types/Database';

const tableName = 'Users';
enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase(
    {name: 'blinkbuy.db'},
    () => {
      console.log('Connected to database successfully!');
    },
    error => {
      console.error(error);
      throw Error('Could not connect to database');
    },
  );
};

export const createTable = async (db: SQLiteDatabase | null) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS user_table(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          firstName TEXT ,
          lastName TEXT,
          email TEXT COLLATE NOCASE,
          phone TEXT,
          password TEXT,
          provider TEXT DEFAULT EMAIL,
          providerUserId TEXT DEFAULT NULL,
          createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(email),
          UNIQUE(phone),
          CHECK(email IS NOT NULL OR phone IS NOT NULL) 
      );`;

  try {
    if(db)
      await db.transaction(txn =>{
        txn.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='user_table'",
          [],
          (_,res) => {
            console.log('item:',res, res.rows.length);
            if (res.rows.length == 0) {
              txn.executeSql('DROP TABLE IF EXISTS user_table', []);
              txn.executeSql(
                query,
                [],
                (_,res) => {
                  console.log('res',res)
                }
              );
            }
            else{
              console.log('Table already created!')
            }
          }
        )
      })
  } catch (error) {
    console.log(error);
    throw Error(`Failed to create ${tableName} table`);
  }
};

export const removeTable = async (db: SQLiteDatabase, tableName: Table) => {
  const query = `DROP TABLE IF EXISTS ${tableName}`;
  try {
    await db.executeSql(query);
  } catch (error) {
    console.error(error);
    throw Error(`Failed to drop table ${tableName}`);
  }
};
