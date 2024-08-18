import { request } from "./request";

export const noteLoader = async ({ params }) => {
  const query = `
    query Folder($folderId: String!) {
      folder(folderId: $folderId) {
        id,
        name,
        notes {
          id,
          content
        }
      }
    }
    `;
  const payload = {
    query,
    variables: {
      folderId: params.folderId,
    },
  };

  const data = await request(payload);

  return data;
};

export const addNewNote = async ({ params, request: httpRequest }) => {
  const newNote = await httpRequest.formData();
  const formDataObj = {};

  newNote.forEach((value, key) => (formDataObj[key] = value));

  const query = `
      mutation Mutation($content: String!, $folderId: String!) {
        addNote(content: $content, folderId: $folderId) {
           id,
          content
    }
  }
      `;
  const payload = {
    query,
    variables: formDataObj,
  };

  const {addNote} = await request(payload);

  return addNote;
};
