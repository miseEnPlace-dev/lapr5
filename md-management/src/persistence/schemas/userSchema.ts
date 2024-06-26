import mongoose from 'mongoose';
import { IUserPersistence } from '../../dataschema/IUserPersistence';

const User = new mongoose.Schema(
  {
    domainId: {
      type: String,
      unique: true
    },

    firstName: {
      type: String,
      required: [true, 'Please enter first name'],
      index: true
    },

    lastName: {
      type: String,
      required: [true, 'Please enter last name'],
      index: true
    },

    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true
    },

    phoneNumber: {
      type: String,
      required: true,
      index: true
    },

    nif: {
      type: String,
      index: true
    },

    password: String,

    salt: String,

    role: {
      type: String
    },

    state: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model<IUserPersistence & mongoose.Document>('User', User);
