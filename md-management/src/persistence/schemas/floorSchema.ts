import mongoose from 'mongoose';
import { IFloorPersistence } from '../../dataschema/IFloorPersistence';

const FloorSchema = new mongoose.Schema(
  {
    domainId: {
      type: String,
      unique: true
    },
    code: {
      type: String,
      unique: true
    },

    name: String,

    description: String,

    dimensions: {
      width: Number,
      height: Number
    },

    building: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Building'
    }
  },
  { timestamps: true }
);

export default mongoose.model<IFloorPersistence & mongoose.Document>('Floor', FloorSchema);
