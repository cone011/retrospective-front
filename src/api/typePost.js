import { getAuthToken } from "../context/auth-context";
import { CALL_API } from "../utils/const";

export async function getAllTypePost() {
  const token = getAuthToken();
  const result = await fetch(`${CALL_API}/type-post`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await result.json();
  if (!result.ok) {
    console.log(data);
    throw new Error("Could not fetch the data");
  }
  return data.result;
}
