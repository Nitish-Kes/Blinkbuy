import {SQLiteDatabase} from 'react-native-sqlite-storage';
import Toast from 'react-native-toast-message';

import {User, UserSocialLogin} from '../../types/Database';
import Strings from '../../utils/StringConstants';
import {LoginPayload} from '../../types/Login';
import {comparePassword} from '../../utils/DataUtils';

export const addUser = async (
  db: SQLiteDatabase | null,
  user: User,
  onSuccess: () => void,
  onError: () => void,
) => {
  const insertQuery = `
     INSERT INTO user_table (${Object.keys(user).join(', ')})
     VALUES (${Object.keys(user)
       .map(() => '?')
       .join(', ')})
   `;
  const values = Object.values(user);
  try {
    if (db)
      db.transaction(txn => {
        txn.executeSql(
          insertQuery,
          values,
          (_, res) => {
            console.log('res', res, _);
            onSuccess();
          },
          (_: any, err) => {
            console.log('err', err, _);
            setTimeout(() => {
              onError();
              if (_.message === Strings.emailError) {
                Toast.show({
                  type: 'error',
                  text1: Strings.duplicateError,
                  text2: Strings.thisemailIsAlreadyRegsitered,
                });
              } else if (_?.message === Strings.phoneNumberError) {
                Toast.show({
                  type: 'error',
                  text1: Strings.duplicateError,
                  text2: Strings.thisPhoneNumberIsAlreadyRegsitered,
                });
              } else {
                Toast.show({
                  type: 'error',
                  text1: Strings.duplicateError,
                  text2: Strings.soemthingWentWrong,
                });
              }
            }, 500);
          },
        );
      });
  } catch (error) {
    onError();
    Toast.show({
      type: 'error',
      text1: Strings.duplicateError,
      text2: Strings.soemthingWentWrong,
    });
    throw Error('Failed to add contact');
  }
};

export const userLogin = async (
  db: SQLiteDatabase | null,
  userInfo: LoginPayload,
  onSuccess: () => void,
  onError: () => void,
) => {
  const searchQuery = `SELECT * FROM user_table where email = ?`;

  try {
    if (db)
      db.transaction(tx => {
        tx.executeSql(
          searchQuery,
          [userInfo.email],
          async (tx, results) => {
            var len = results.rows.length;
            if (len > 0) {
              const user = results.rows.item(0);
              console.log('user',user)
              const storedPassword = user?.password;
              if(storedPassword){
                const isMatch = await comparePassword(
                  userInfo.password,
                  storedPassword,
                );
  
                if (isMatch) {
                  onSuccess();
                } else {
                  onError();
                  Toast.show({
                    type: 'error',
                    text1: Strings.loginError,
                    text2: Strings.loginCredentialsError,
                  });
                }
              }
              else{
                setTimeout(() => {
                  onError();
                  Toast.show({
                    type: 'error',
                    text1: Strings.loginError,
                    text2: Strings.loginCredentialsError,
                  });
                }, 500);
              }

            } else {
              setTimeout(() => {
                onError();
                Toast.show({
                  type: 'error',
                  text1: Strings.loginError,
                  text2: Strings.userDoesNotExist,
                });
              }, 500);
            }
          },
          (_, err) => {
            onError();
            Toast.show({
              type: 'error',
              text1: Strings.loginError,
              text2: Strings.soemthingWentWrong,
            });
          },
        );
      });
  } catch (error) {
    onError();
    Toast.show({
      type: 'error',
      text1: Strings.loginError,
      text2: Strings.soemthingWentWrong,
    });
    throw Error('Failed to login!');
  }
};

export const userSocialLogin = async (
  db: SQLiteDatabase | null,
  userData: UserSocialLogin,
  onSuccess: () => void,
  onError?: () => void,
) => {
  const searchQuery = `SELECT * FROM user_table where email = ? and provider = ?`;
  try {
    if (db)
      db.transaction(tx => {
        tx.executeSql(
          searchQuery,
          [userData?.email,userData?.provider],
          async (txn, results) => {
          var len = results.rows.length;
          if(len > 0){
            onSuccess()
          }
          else{
            const insertQuery = `
            INSERT INTO user_table (${Object.keys(userData).join(', ')})
            VALUES (${Object.keys(userData)
              .map(() => '?')
              .join(', ')})
          `;
          const values = Object.values(userData);
          txn.executeSql(
            insertQuery,
            values,
            (_, res) => {
              console.log('res', res, _);
              onSuccess();
            },
            (_:any, err) => {
              if (_.message === Strings.emailError) {
                Toast.show({
                  type: 'error',
                  text1: Strings.duplicateError,
                  text2: Strings.thisemailIsAlreadyRegsitered,
                });
              } 
              else{
                Toast.show({
                  type: 'error',
                  text1: Strings.loginError,
                  text2: Strings.soemthingWentWrong,
                });
              }
            }
          )
          }
        },
        (_, err) => {
          Toast.show({
            type: 'error',
            text1: Strings.loginError,
            text2: Strings.soemthingWentWrong,
          });
        }
      )
      })
  }
  catch(err){
    Toast.show({
      type: 'error',
      text1: Strings.loginError,
      text2: Strings.soemthingWentWrong,
    });
    throw new Error('Failed to social login')
  }
}

export const deleteAllUsers = async (db: SQLiteDatabase | null) => {
  try {
    if (db) {
      db.transaction(txn => {
        txn.executeSql(
          'DELETE FROM user_table',
          [],
          (_, res) => console.log('All users deleted!', res),
          (_, err) => {
            console.error('Error deleting users', err);
            return false;
          },
        );
        txn.executeSql(
          "DELETE FROM sqlite_sequence WHERE name='user_table';",
          [],
          (_, res) => console.log('Auto-increment ID reset!', res),
          (_, err) => {
            console.error('Error resetting auto-increment', err);
            return false;
          },
        );
      });
    }
  } catch (error) {
    console.error('Failed to delete users', error);
  }
};
