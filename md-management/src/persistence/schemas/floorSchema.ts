import mongoose from 'mongoose';
import { IFloorPersistence } from '../../dataschema/IFloorPersistence';

const FloorMapSchema = new mongoose.Schema({
  domainId: {
    type: String
  },
  size: {
    width: Number,
    depth: Number
  },
  map: [[Number]],
  exits: [
    {
      type: {
        x: Number,
        y: Number
      }
    }
  ],
  elevators: [
    {
      type: {
        x: Number,
        y: Number
      }
    }
  ],
  exitLocation: {
    type: {
      x: Number,
      y: Number
    }
  }
});

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
    map: FloorMapSchema,

    buildingCode: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model<IFloorPersistence & mongoose.Document>('Floor', FloorSchema);
