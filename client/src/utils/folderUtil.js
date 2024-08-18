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

export const addNewFolder = async (newFolder) => {
  const query = `mutation Mutation($name: String!) {
  addFolder(name: $name) {
    name
    author {
      name
    }
  }
}`;
  const payload = {
    query,
    variables: {
      name: newFolder.name,
    },
  };
  const data = await request(payload);
};
