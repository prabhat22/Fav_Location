import * as SQLite from 'expo-sqlite';

const db=SQLite.openDatabase('placeList.db');
export const init= async ()=>
{
    const promise=new Promise((resolve,reject)=>
    {
        db.transaction((tx)=>
        {
        tx.executeSql('CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title text NOT NULL, imageUrl text NOT NULL,address text NOT NULL,lat REAL NOT NULL,lon REAL NOT NULL);',
        [],
        ()=>
        {
        resolve()
        },
        (_, err)=>
        {
           reject(err) 
        }
        )
    } )
    }

    )
   
}
export const addPlace= async (title,imageUri,address,lat,long)=>
{
    const promise=new Promise((resolve,reject)=>
    {
        db.transaction((tx)=>
        {
        tx.executeSql('Insert into places (title,imageUrl,address,lat,lon) values(?,?,?,?,?)',
        [title,imageUri,address,lat,long],
        (_,result)=>
        {
            console.log('succes at db',result)
        resolve(result)
        },
        (_, err)=>
        {console.log('err at db',err)
           reject(err) 
        }
        )
    } )
    }
    )
    return promise;
}
export const fetchPlaces= async ()=>
{
    const promise=new Promise((resolve,reject)=>
    {
        db.transaction((tx)=>
        {
        tx.executeSql('Select * from places',
        [],
        (_,result)=>
        {
            console.log('succes at db',result)
        resolve(result)
        },
        (_, err)=>
        {console.log('err at db',err)
           reject(err) 
        }
        )
    } )
    }
    )
    return promise;
}

