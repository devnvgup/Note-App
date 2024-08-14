import fakeData from "../fakeData.mjs";
import { AuthorModel, FolderModel } from "../models/index.js";
export const resolvers = {
  Query: {
    folders: async (parent, arg, context) => {
      const folders = await FolderModel.find({ authorId: context.uid });
      return folders;
    },
    folder: async (_, arg) => {
      const folderId = arg.folderId;
      const foundFolder = await FolderModel.findOne({ _id: folderId });
      return foundFolder;
    },
    note: (parent, arg) => {
      return fakeData.notes.filter(({ folderId }) => folderId === parent.id);
    },
  },
  Folder: {
    author: (parent) => {
      const authorId = parent.authorId;
      return fakeData.authors.find((author) => author.id === authorId);
    },
    notes: (parent, arg) => {
      return fakeData.notes.filter(({ folderId }) => folderId === parent.id);
    },
  },
  Mutation: {
    addFolder: async (parent, arg) => {
      const newFolder = new FolderModel(arg);
      await newFolder.save();
      return newFolder;
    },
    register: async (parent, arg) => {
      console.log(arg);
      
      const foundUser = await AuthorModel.findOne({ uid: arg.uid });
      if (!foundUser) {
        const newUser = new AuthorModel(arg);
        await newUser.save();
        return newUser;
      }
      return foundUser;
    },
  },
};
