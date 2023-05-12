import { getAuthToken } from "../context/auth-context";
import { CALL_API } from "../utils/const";

export async function getAllPost(dataFilter) {
  const { currentPage, perPage } = dataFilter;
  const token = getAuthToken();
  const response = await fetch(
    `${CALL_API}/post?currentPage=${currentPage}&perPage=${perPage}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const data = await response.json();
  if (!response.ok) {
    console.log(data);
    throw new Error("Could not fetch the data");
  }
  return { Posts: data.Posts, totalPosts: data.totalItems };
}

export async function getPostById(postId) {
  const token = getAuthToken();
  const response = await fetch(`${CALL_API}/post/${postId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Could not fetch the data");
  }
  return data.item;
}

export async function getSearchPostByParameters(dataFilter, dataPagination) {
  const { typePost, type } = dataFilter;
  const { currentPage, perPage } = dataPagination;
  let urlSend = `${CALL_API}/search-post?`;

  if (type.length > 0 && typePost !== undefined) {
    urlSend = `${urlSend}typePost=${typePost.value}&type=${type}`;
  } else if (type.length > 0) {
    urlSend = `${urlSend}type=${typePost}`;
  } else if (type !== undefined) {
    urlSend = `${urlSend}typePost=${typePost.value}`;
  }
  const token = getAuthToken();
  const response = await fetch(
    `${urlSend}&currentPage=${currentPage}&perPage=${perPage}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Could not fetch the search");
  }
  return {
    posts: data.posts,
    totalItems: data.totalItems,
  };
}

export async function savePost(postData) {
  const { title, typePost, type, postId, isNew } = postData;
  const token = getAuthToken();
  let urlApi = `${CALL_API}/post`;
  let method = "POST";
  if (!isNew) {
    urlApi = `${urlApi}/${postId}`;
    method = "PUT";
  }
  const response = await fetch(urlApi, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: method,
    body: JSON.stringify({
      title: title,
      typePost: typePost,
      type: type,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Could not save the post");
  }
  return { isSaved: data.isSaved, postId: data.postId };
}

export async function deletePost(postId) {
  const token = getAuthToken();
  const response = await fetch(`${CALL_API}/post/${postId}`, {
    headers: { Authorization: `Bearer ${token}` },
    method: "DELETE",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error("Could not delete this data");
  }
  return data.isDeleted;
}
