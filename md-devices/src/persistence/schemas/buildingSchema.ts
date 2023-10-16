import mongoose from 'mongoose';
import { IBuildingPersistence } from '../../dataschema/IBuildingPersistence';

const Building = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: true
    },

    name: String,

    description: String,

    maxDimensions: {
      width: Number,
      height: Number,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model<IBuildingPersistence & mongoose.Document>('Building', Building);
