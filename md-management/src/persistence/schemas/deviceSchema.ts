import mongoose from 'mongoose';
import { IDevicePersistence } from '../../dataschema/IDevicePersistence';

const Device = new mongoose.Schema(
  {
    domainId: {
      type: String,
      unique: true
    },

    code: {
      type: String,
      unique: true
    },

    nickname: {
      type: String,
      unique: true
    },

    modelCode: {
      type: String,
      index: true
    },

    description: {
      type: String,
      optional: true
    },

    serialNumber: {
      type: String,
      unique: true
    },

    isAvailable: Boolean,

    initialCoordinates: {
      width: Number,
      depth: Number,
      floorCode: String
    }
  },
  { timestamps: true }
);

export default mongoose.model<IDevicePersistence & mongoose.Document>('Device', Device);
