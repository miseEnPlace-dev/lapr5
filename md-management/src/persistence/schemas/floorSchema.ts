import mongoose from 'mongoose';
import { IFloorPersistence } from '../../dataschema/IFloorPersistence';

const FloorMapSchema = new mongoose.Schema({
  domainId: {
    type: String
  },
  maze: {
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
    elevator: {
      type: {
        x: Number,
        y: Number
      }
    },
    exitLocation: {
      type: {
        x: Number,
        y: Number
      }
    }
  },
  player: {
    initialPosition: {
      x: Number,
      y: Number
    },
    initialDirection: Number
  },
  door: {
    url: String,
    scale: {
      x: Number,
      y: Number,
      z: Number
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
      length: Number
    },
    map: FloorMapSchema,

    buildingCode: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model<IFloorPersistence & mongoose.Document>('Floor', FloorSchema);
