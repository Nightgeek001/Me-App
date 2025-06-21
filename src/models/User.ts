import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    username: string;
    githubUsername?: string;
    email: string;
    password: string;
}

const UserSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
        },
        githubUsername: { 
            type: String 
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model<IUser>("User", UserSchema);

