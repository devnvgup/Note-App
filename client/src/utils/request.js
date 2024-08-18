import { GRAPHQL_SERVER } from "./constant";

export const request = async (payload, options = {}) => {
  if (!localStorage.getItem("accessToken")) return;
  const res = await fetch(GRAPHQL_SERVER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      ...options,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    if (res.status === 403) return null;
  }
  const { data } = await res.json();
  return data;
};
