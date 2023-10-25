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

    description: String,

    dimensions: {
      width: Number,
      height: Number
    },
    map: {
      domainId: {
        type: String
      },
      size: {
        width: Number,
        depth: Number
      },
      map: [[Number]],
      exits: [[Number]],
      elevators: [[Number]],
      exitLocation: [Number]
    },

    buildingCode: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model<IFloorPersistence & mongoose.Document>('Floor', FloorSchema);
