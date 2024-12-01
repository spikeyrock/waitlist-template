import mongoose, { Schema, Document } from "mongoose";

// Define TypeScript type for the user schema
export interface IUser extends Document {
  name: string;
  email: string;
  createdAt: Date;
}

// Define the user schema
const UserSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

// Export the model
const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
