import fakeData from "../fakeData.mjs";
import { FolderModel } from "../models/index.js";
export const resolvers = {
  Query: {
    folders: async () => {
      const folders = await FolderModel.find();
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
      const newFolder = new FolderModel({ ...arg, authorId: "1" });
      await newFolder.save();
      return newFolder;
    },
  },
};
