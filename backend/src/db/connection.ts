import { Post } from '../Model/post';
import * as mysql from 'mysql2/promise';
import {db_config} from '../infra/env';

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

export async function request(body: Post){
    try {
        const query = "INSERT INTO Posts (UserID,Image,Caption,Likes,PostedAt) VALUES (1, ?, ?, 0, ?);"

        const con = await getConnection();
        con?.connect();

        const result = await con?.query(query,[body.image, body.tagline, new Date().getDate()]);

        console.log(result);

        con?.release();
    } catch (error) {
        console.log(error);
    }
}