import mongoose from 'mongoose'
import { User } from './userModel.js'

const chatSchema = new mongoose.Schema(
    {
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        latestMessage: {
            text: String,
            sender: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        },
    },
    {timestamps:true}
);

export const Chat=mongoose.model("Chat",chatSchema);