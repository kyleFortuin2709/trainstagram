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

export async function request(image: string, tagline: string) {
    try {
        const query = "INSERT INTO Posts (UserID,PostImage,Caption,Likes,PostedAt) VALUES (1, ?, ?, 0, ?);"

        const con = await getConnection();
        if (con != null) {
          con.connect();

          const result = await con.query(query,[image, tagline, formatDateToMySQLDateTime(new Date())]);

          console.log(result);

          con.release();

          return result;
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