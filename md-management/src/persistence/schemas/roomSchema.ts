import mongoose from 'mongoose';
import { IRoomPersistence } from '../../dataschema/IRoomPersistence';

const RoomSchema = new mongoose.Schema(
  {
    domainId: {
      type: String,
      unique: true
    },
    name: {
      type: String,
      unique: true
    },

    description: String,

    dimensions: {
      width: Number,
      height: Number
    },

    floor: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model<IRoomPersistence & mongoose.Document>('Room', RoomSchema);
