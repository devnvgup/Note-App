export const typeDefs = `#graphql

 scalar Date

  type Folder {
    id: String!,
    name: String,
    createdAt: String,
    author:Author,
    notes:[Note]
  }

  type Note {
    id:String,
    content:String,
    updatedAt: Date
  }

  type Author {
    id:String,
    name:String,
  }

  type Notes {
    id:String!,
    content:String,
    folderId:String
  } 

  type Query {
    folders : [Folder],
    folder(folderId:String!):Folder ,
    note(noteId:String!):Note,
  }

  type Mutation {
    addFolder(name:String!):Folder,
    deleteFolder(id:String!):Folder,
    register(uid:String!,name:String!):Author,
    addNote(content:String!,folderId:String!):Note,
    updateNote(id:String!,content:String!):Note,
    deleteNote(id:String!):Note,
    pushNotification(content:String):Message
  }

  type Message {
    message:String
  }
  
  type Subscription {
    folderCreated : Message
    notification:Message
  }
`;
