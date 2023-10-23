import mongoose from 'mongoose';
import { IElevatorPersistence } from '../../dataschema/IElevatorPersistence';

const Elevator = new mongoose.Schema(
  {
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
  },
  { timestamps: true, _id: false }
);

export default mongoose.model<IElevatorPersistence & mongoose.Document>('Elevator', Elevator);
