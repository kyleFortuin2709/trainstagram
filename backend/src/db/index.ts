import { Post } from '../Model/post';
import {db_config} from '../infra/env';
import * as mysql from 'mysql2/promise';

const pool = mysql.createPool(db_config);

export async function getConnection() {
    try {
      const connection = await pool.getConnection();
      console.log('Connected to database successfully.');
      return connection;
    } catch (error) {
      console.error('Error connecting to database:', error);
    }
  }

export async function storePost(image: Buffer, tagline: string) {
    try {
        const query = "INSERT INTO Posts (UserID,PostImage,Caption,Likes,PostedAt) VALUES (1, ?, ?, 0, ?);"

        const con = await getConnection();
        if (con != null) {
          con.connect();

          const result : any = await con.query(query,[image, tagline, formatDateToMySQLDateTime(new Date())]);

          con.release();

          return result[0].affectedRows;
        }
    } catch (error) {
        console.log(error);
    }
}

export async function getImage(id: string) {
  try {
      const query = "SELECT Caption, PostImage FROM Posts WHERE PostID = ?;"

      const con = await getConnection();
      if (con != null) {
        con.connect();

        const result : any= await con.query(query,[id]);

        con.release();

        return result[0];
      }
  } catch (error) {
      console.log(error);
  }
}

function formatDateToMySQLDateTime(date: Date): string {
  const year = date.getFullYear().toString().padStart(4, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}