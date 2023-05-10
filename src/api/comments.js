import { getAuthToken } from "../context/auth-context";
import { CALL_API } from "../utils/const";

export async function getAllComments(dataFilter) {
  const token = getAuthToken();
  const result = await fetch(`${CALL_API}/comments`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await result.json();
  if (!result.ok) {
    throw new Error("Could not fetch the comments");
  }
  return { comments: data.comments, totalItems: data.totalItems };
}

export async function getCommentsByPost(postId) {
  const token = getAuthToken();
  const result = await fetch(`${CALL_API}/comments-post/${postId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await result.json();
  if (!result.ok) {
    throw new Error("Could not fetch the comments");
  }
  return { comments: data.comments, totalItems: data.totalItems };
}

export async function getCommentById(commentId) {
  const token = getAuthToken();
  const result = await fetch(`${CALL_API}/comments/${commentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await result.json();
  if (!result.ok) {
    throw new Error("Could not fetch the comment");
  }
  return data.item;
}

export async function saveComments(commentsData) {
  const token = getAuthToken();
  const { postId, comments } = commentsData;
  const result = await fetch(`${CALL_API}/comments`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      postId: postId,
      comments: comments,
    }),
  });
  const data = await result.json();
  if (!result.ok) {
    throw new Error("Could not save the comments");
  }
  return data.isSaved;
}

export async function deleteComment(commentId) {
  const token = getAuthToken();
  const result = await fetch(`${CALL_API}/comments/${commentId}`, {
    headers: { Authorization: `Bearer ${token}` },
    method: "DELETE",
  });
  const data = await result.json();
  if (!result.ok) {
    throw new Error("Could not delete this comment");
  }
  return data.isDelete;
}
