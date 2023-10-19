import mongoose from 'mongoose';
import { IBuildingPersistence } from '../../dataschema/IBuildingPersistence';

const BuildingSchema = new mongoose.Schema(
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

export default mongoose.model<IBuildingPersistence & mongoose.Document>('Building', BuildingSchema);
