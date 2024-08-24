import { AuthorModel, FolderModel, NoteModel, NotificationModel } from "../models/index.js";
import { GraphQLScalarType } from "graphql";
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();
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
      const foundNote = await NoteModel.find({ folderId: parent._id }).sort({
        updatedAt: "desc",
      });
      if (foundNote) return foundNote;
    },
  },
  Mutation: {
    addFolder: async (parent, arg, context) => {
      const newFolder = new FolderModel({ ...arg, authorId: context.uid });
      pubsub.publish('FOLDER_CREATED', {
        folderCreated: {
          message: "A new folder created"
        }
      })
      await newFolder.save();
      return newFolder;
    },
    deleteFolder: async (parent, arg, context) => {
      const folderId = arg.id
      const deleteFolder = await FolderModel.findByIdAndDelete(folderId)
      try {
        await NoteModel.deleteMany({ folderId })
      } catch (error) {
        console.log("Delete Note Fail", error);
      }
      return deleteFolder
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

    deleteNote: async (parent, arg, context) => {
      console.log("run");
      const noteId = arg.id;
      const note = await NoteModel.findByIdAndDelete(noteId);
      return note;
    },
    pushNotification: async (parent, arg, context) => {
      const newNotification = new NotificationModel(arg)
      pubsub.publish('PUSH_NOTIFICATION', {
        notification: {
          message: arg.content
        }
      })
      await newNotification.save()
      return { message: "SUCCESS" }
    }
  },
  Subscription: {
    folderCreated: {
      subscribe: () => pubsub.asyncIterator(['FOLDER_CREATED', 'NOTE_CREATED']),
    },
    notification: {
      subscribe: () => pubsub.asyncIterator(['PUSH_NOTIFICATION']),
    },
  }
};
