import mongoose from 'mongoose'
import { Chat } from './chatModel.js'
import { User } from './userModel.js'

const messageSchema = new mongoose.Schema(
    {
        chatId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat"
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        text: String,
    },
    {
        timestamps: true,
    }
);

export const Messages = mongoose.model("Messages", messageSchema);