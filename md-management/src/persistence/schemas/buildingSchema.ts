import mongoose from 'mongoose';
import { IBuildingPersistence } from '../../dataschema/IBuildingPersistence';

const BuildingSchema = new mongoose.Schema(
  {
    domainId: {
      type: String,
      unique: true
    },
    code: {
      type: String,
      required: true,
      unique: true
    },

    name: String,

    description: String,

    maxDimensions: {
      width: Number,
      height: Number
    },

    elevator: {
      type: mongoose.model<IBuildingPersistence>('Elevator').schema
    }
  },
  { timestamps: true }
);

export default mongoose.model<IBuildingPersistence & mongoose.Document>('Building', BuildingSchema);
