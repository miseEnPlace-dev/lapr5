import mongoose from 'mongoose';
import { IDeviceModelPersistence } from '../../dataschema/IDeviceModelPersistence';

const DeviceModel = new mongoose.Schema(
  {
    domainId: {
      type: String,
      unique: true
    },

    code: {
      type: String,
      index: true
    },

    name: {
      type: String,
      index: true
    },

    brand: {
      type: String,
      index: true
    },

    type: {
      type: String,
      index: true
    },

    capabilities: {
      type: [String],
      index: true
    }
  },
  { timestamps: true }
);

export default mongoose.model<IDeviceModelPersistence & mongoose.Document>(
  'DeviceModel',
  DeviceModel
);
