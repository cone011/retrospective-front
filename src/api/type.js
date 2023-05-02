import { getAuthToken } from "../context/auth-context";
import { CALL_API } from "../utils/const";

export async function getAllTypes(parameters) {
  const { currentPage, perPage } = parameters;
  const token = getAuthToken();
  const result = await fetch(
    `${CALL_API}/type?currentPage=${currentPage}&perPage=${perPage}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const data = await result.json();
  if (!result.ok) {
    console.log(data);
    throw new Error("Could not get the data");
  }
  return data.types;
}

export async function getTypeById(typeId) {
  const token = getAuthToken();
  const result = await fetch(`${CALL_API}/type/${typeId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await result.json();
  if (!result.ok) {
    console.log(data);
    throw new Error("Could not get the data");
  }
  return data.item;
}

export async function saveType(typeObject) {
  const token = getAuthToken();
  const { isNew, name, typeId } = typeObject;
  let sendLinkApi = `${CALL_API}/type`;
  let method = "POST";

  if (!isNew) {
    sendLinkApi = `${sendLinkApi}/${typeId}`;
    method = "PUT";
  }

  const result = await fetch(sendLinkApi, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    method: method,
    body: JSON.stringify({
      name: name,
    }),
  });
  const data = await result.json();
  console.log(data);
  if (!result.ok) {
    console.log(data);
    throw new Error("Could not save the data");
  }
  return data.isSaved;
}

export async function deleteTag(typeId) {
  const token = getAuthToken();
  const result = await fetch(`${CALL_API}/type/${typeId}`, {
    headers: { Authorization: `Bearer ${token}` },
    method: "DELETE",
  });
  const data = await result.json();
  if (!result.ok) {
    console.log(data);
    throw new Error("Could not delete the data");
  }
  return data.isDeleted;
}
