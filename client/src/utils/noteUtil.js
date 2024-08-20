import { request } from "./request";

export const notesLoader = async ({ params }) => {
  const query = `
    query Folder($folderId: String!) {
      folder(folderId: $folderId) {
        id,
        name,
        notes {
          id,
          content,
          updatedAt
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

export const noteLoader = async ({ params }) => {
  const query = `
    query Note($noteId: String!) {
      note(noteId: $noteId) {
       id,
       content
  }
}
    `;
  const payload = {
    query,
    variables: {
      noteId: params.noteId,
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

  const { addNote } = await request(payload);

  return addNote;
};

export const updateNote = async ({ params, request: httpRequest }) => {
  const updatedNote = await httpRequest.formData();
  const formDataObj = {};

  updatedNote.forEach((value, key) => (formDataObj[key] = value));

  const query = `
     mutation UpdateNote($updateNoteId: String!, $content: String!) {
        updateNote(id: $updateNoteId, content: $content) {
          id,
          content
  }
}
      `;
  const payload = {
    query,
    variables: {
      ...formDataObj,
      updateNoteId: formDataObj.id,
    },
  };

  const data = await request(payload);
  return data || [];
};
