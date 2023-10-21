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
    },

    floors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Floor'
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model<IBuildingPersistence & mongoose.Document>('Building', BuildingSchema);
