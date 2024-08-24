import { request } from "./request";

export const folderLoader = async () => {
  const query = `query ExampleQuery {
      folders {
        createdAt
        id
        name,
        notes {
          id
        }
      }
    }`;
  const data = await request({ query });
  return data || [];
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


export const deleteFolder = async ({ params, request: httpRequest }) => {
  const deleteFolder = await httpRequest.formData();
  const formDataObj = {};

  deleteFolder.forEach((value, key) => (formDataObj[key] = value));

  const query = `
  mutation DeleteFolder($deleteFolderId: String!) {
    deleteFolder(id: $deleteFolderId) {
      id,
      name
    }
  }
      `;
  const payload = {
    query,
    variables: {
      ...formDataObj,
      deleteFolderId: formDataObj.deleteFolderId,
    },
  };

  const data = await request(payload);
  return data || [];
};