import mongoose from 'mongoose';

import { IConnectorPersistence } from '@/dataschema/IConnectorPersistence';

const ConnectorSchema = new mongoose.Schema(
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
    floor1: {
      type: String
    },
    floor2: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.model<IConnectorPersistence & mongoose.Document>(
  'Connector',
  ConnectorSchema
);
