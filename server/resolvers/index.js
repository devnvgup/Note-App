import { AuthorModel, FolderModel, NoteModel } from "../models/index.js";
import { GraphQLScalarType } from "graphql";

export const resolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.toISOString();
    },
  }),
  Query: {
    folders: async (_, __, context) => {
      const folders = await FolderModel.find({ authorId: context.uid }).sort({
        updatedAt: "desc",
      });
      return folders;
    },
    folder: async (_, arg) => {
      const folderId = arg.folderId;
      const foundFolder = await FolderModel.findOne({ _id: folderId }); // can use findById
      return foundFolder;
    },
    note: async (parent, arg) => {
      const foundNote = await NoteModel.findOne({ _id: arg.noteId }); // can use findById
      if (foundNote) return foundNote;
    },
  },
  Folder: {
    author: async (parent) => {
      const authorId = parent.authorId;
      const foundUser = await AuthorModel.findOne({ uid: authorId });
      if (foundUser) {
        const { _id, name } = foundUser;
        return {
          id: _id,
          name,
        };
      }
      return null;
    },
    notes: async (parent) => {
      console.log(113113, parent);
      const foundNote = await NoteModel.find({ folderId: parent._id }).sort({
        updatedAt: "desc",
      });
      if (foundNote) return foundNote;
    },
  },
  Mutation: {
    addFolder: async (parent, arg, context) => {
      const newFolder = new FolderModel({ ...arg, authorId: context.uid });
      await newFolder.save();
      return newFolder;
    },
    register: async (parent, arg) => {
      const foundUser = await AuthorModel.findOne({ uid: arg.uid });
      if (!foundUser) {
        const newUser = new AuthorModel(arg);
        await newUser.save();
        return newUser;
      }
      return foundUser;
    },
    addNote: async (parent, arg, context) => {
      const newNote = new NoteModel(arg);
      await newNote.save();
      return newNote;
    },
    updateNote: async (parent, arg, context) => {
      const noteId = arg.id;
      const note = await NoteModel.findByIdAndUpdate(noteId, arg);
      return note;
    },
  },
};
