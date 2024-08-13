import { GRAPHQL_SERVER } from "./constant";

export const request = async (payload, options = {}) => {
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
  const { data } = await res.json();
  return data;
};
