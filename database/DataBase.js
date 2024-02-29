//DataBase.js

import conn from './conn.js';

export const db = {
  async query(sql, args) {
    try {
      const [rows] = await conn.query(sql, args);
      return rows;
    } catch (error) {
      throw new Error(`Error executing query: ${error}`);
    }
  }
};

export async function getAllPosts() {
}

export async function getPostById(postId) {
}

export async function createPost(newPost) {
}

export async function updatePost(postId, updatedPostData) {
}

export async function deletePost(postId) {
}