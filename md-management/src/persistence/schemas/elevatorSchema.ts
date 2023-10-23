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
        type: String,
        required: [true, 'Please enter brand'],
        index: true
      },
      model: {
        type: String,
        required: [true, 'Please enter model'],
        index: true
      }
    },

    serialNumber: {
      type: String,
      index: true
    },

    description: {
      type: String,
      index: true
    }
  },
  { timestamps: true }
);

export default mongoose.model<IElevatorPersistence & mongoose.Document>('Elevator', Elevator);
