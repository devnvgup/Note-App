import { request } from "./request";

export const folderLoader = async () => {
  const query = `query ExampleQuery {
      folders {
        createdAt
        id
        name
      }
    }`;
  const data = await request({ query });
  return data;
};
