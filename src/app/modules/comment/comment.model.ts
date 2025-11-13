import mongoose from "mongoose"
import { Schema } from "mongoose"

const commentSchema = new Schema({
      content: {
            type: String,
            required: true,
      },
      author: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
      },
      likes: [
            {
                  type: Schema.Types.ObjectId,
                  ref: "User",
            },
      ],
      dislikes: [
            {
                  type: Schema.Types.ObjectId,
                  ref: "User",
            },
      ],
      totalLike: {
            type: Number,
            default: 0,
      },
      totalDislike: {
            type: Number,
            default: 0,
      },
      parentComment: {
            type: Schema.Types.ObjectId,
            ref: "Comment",
            default: null,
      },
}, {
      timestamps: true,
})

export const Comment = mongoose.model("Comment", commentSchema)

