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
      domainId: {
        type: String,
        unique: true
      },
      code: {
        type: String,
        index: true
      },
      branding: {
        brand: {
          type: String
        },
        model: {
          type: String
        }
      },
      serialNumber: {
        type: String,
        index: true
      },
      description: {
        type: String,
        index: true
      },
      floors: [
        {
          type: String
        }
      ]
    }
  },
  { timestamps: true }
);

export default mongoose.model<IBuildingPersistence & mongoose.Document>('Building', BuildingSchema);
