import mongoose from 'mongoose';

import { IConnectorPersistence } from '@/dataschema/IConnectorPersistence';

const ConnectorSchema = new mongoose.Schema(
  {
    domainId: {
      type: String,
      unique: true
    },
    floor1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Floor'
    },
    floor2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Floor'
    }
  },
  { timestamps: true }
);

export default mongoose.model<IConnectorPersistence & mongoose.Document>(
  'Connector',
  ConnectorSchema
);
