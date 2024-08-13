import { request } from "./request";

export const noteLoader = async ({ params }) => {
  const query = `
    query Folder($folderId: String) {
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
