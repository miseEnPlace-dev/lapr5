import mongoose from 'mongoose';
import { IFloorPersistence } from '../../dataschema/IFloorPersistence';

const FloorSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true
    },

    name: String,

    description: String,

    maxDimensions: {
      width: Number,
      height: Number
    }
  },
  { timestamps: true }
);

export default mongoose.model<IFloorPersistence & mongoose.Document>('Floor', FloorSchema);
