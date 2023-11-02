import mongoose from 'mongoose';
import { IRolePersistence } from '../../dataschema/IRolePersistence';

const RoleSchema = new mongoose.Schema(
  {
    domainId: { type: String, unique: true },
    name: { type: String, unique: true },
    title: { type: String },
    description: { type: String }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IRolePersistence & mongoose.Document>('Role', RoleSchema);
