export const noteLoader = async ({ params }) => {
    const query = `
    query Folder($folderId: String) {
      folder(folderId: $folderId) {
        notes {
          id,
          content
        }
      }
    }
    `
    const res = await fetch("http://localhost:4000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        query, variables: {
          folderId: params.folderId
        }
      })
    })
    const { data: { folder: { notes } } } = await res.json()
    return notes
  }