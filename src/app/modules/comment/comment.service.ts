import { IAuthUser } from "../auth/auth.interface";
import { Comment } from "./comment.model";
import { IGetCommentsOptions } from "./comment.interface";
import { Types } from "mongoose";

export const addCommentService = async (user: IAuthUser, payload: { content: string }) => {
      const newComment = await Comment.create({
            ...payload,
            author: user?.userId
      });

      return newComment;
}

export const getCommentService = async ({
      page = 1,
      limit = 10,
      sortBy = 'newest',
      sortOrder = 'desc',
}: IGetCommentsOptions) => {
      const order = sortOrder === 'asc' ? 1 : -1;

      const sortOptions: Record<string, any> = {
            mostLiked: { totalLike: order, createdAt: order },
            mostDisliked: { totalDislike: order, createdAt: order },
            newest: { createdAt: order },
      };

      const comments = await Comment.find({ parentComment: null })
            .populate({
                  path: 'author',
                  select: '-password -__v',
            })
            .sort(sortOptions[sortBy] || { createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();

      const totalComments = await Comment.countDocuments({ parentComment: null });
      const totalPages = Math.ceil(totalComments / limit);

      return {
            comments,
            page: Number(page),
            limit: Number(limit),
            totalPages,
            totalComments,
      };
};

export const likeCommentService = async (user: IAuthUser, commentId: string) => {
      const userId = new Types.ObjectId(user.userId);

      // Find comment
      const comment = await Comment.findById(commentId)
            .populate([
                  { path: 'likes', select: '_id name email' },
                  { path: 'dislikes', select: '_id name email' },
            ]);

      if (!comment) {
            throw new Error('Comment not found');
      }

      const hasLiked = comment.likes.some((u: any) => u._id.equals(userId));
      const hasDisliked = comment.dislikes.some((u: any) => u._id.equals(userId));

      if (hasLiked) {
            // User already liked, then remove the like
            comment.likes = comment.likes.filter((u: any) => !u._id.equals(userId));
      } else {
            // Add like
            comment.likes.push(userId);

            // If user had disliked, then remove it
            if (hasDisliked) {
                  comment.dislikes = comment.dislikes.filter((u: any) => !u._id.equals(userId));
            }
      }

      // Update total counts
      comment.totalLike = comment.likes.length;
      comment.totalDislike = comment.dislikes.length;

      await comment.save();

      // Return fresh updated comment
      const updatedComment = await Comment.findById(commentId)
            .populate([
                  { path: 'author', select: '-password' },
                  { path: 'likes', select: '_id firstName lastName', options: { sort: { createdAt: -1 } } },
                  { path: 'dislikes', select: '_id firstName lastName', options: { sort: { createdAt: -1 } } },
            ])
            .lean();

      return updatedComment;
}

export const dislikeCommentService = async (user: IAuthUser, commentId: string) => {
      const userId = new Types.ObjectId(user.userId);

      // Find comment
      const comment = await Comment.findById(commentId)
            .populate([
                  { path: 'likes', select: '_id name email' },
                  { path: 'dislikes', select: '_id name email' },
            ]);

      if (!comment) {
            throw new Error('Comment not found');
      }

      const hasLiked = comment.likes.some((u: any) => u._id.equals(userId));
      const hasDisliked = comment.dislikes.some((u: any) => u._id.equals(userId));

      if (hasDisliked) {
            // User already disliked, remove the dislike
            comment.dislikes = comment.dislikes.filter((u: any) => !u._id.equals(userId));
      } else {
            // Add dislike
            comment.dislikes.push(userId);

            // If user had liked, remove it
            if (hasLiked) {
                  comment.likes = comment.likes.filter((u: any) => !u._id.equals(userId));
            }
      }

      // Update total counts
      comment.totalLike = comment.likes.length;
      comment.totalDislike = comment.dislikes.length;

      await comment.save();

      // Return updated comment with populated fields
      const updatedComment = await Comment.findById(commentId)
            .populate([
                  { path: 'author', select: '-password' },
                  { path: 'likes', select: '_id firstName lastName', options: { sort: { createdAt: -1 } } },
                  { path: 'dislikes', select: '_id firstName lastName', options: { sort: { createdAt: -1 } } },
            ])
            .lean();

      return updatedComment;
};

export const replyCommentService = async (user: IAuthUser, commentId: string, payload: { content: string }) => {
      const userId = new Types.ObjectId(user.userId);

      // Find comment
      const comment = await Comment.find({
            _id: commentId,
            parentComment: null,
      })

      if (!comment) {
            throw new Error('Comment not found');
      }

      const newComment = await Comment.create({
            ...payload,
            author: userId,
            parentComment: commentId,
      });

      return newComment;
}

export const getRepliedCommentService = async (commentId: string) => {
      const repliedComments = await Comment.find({
            parentComment: commentId,
      }).sort({ createdAt: -1 });

      return repliedComments;
}


/* 

const comments = await Comment.aggregate([
  {
    $lookup: {
      from: 'users',         // collection name for likes
      localField: 'likes',
      foreignField: '_id',
      as: 'likes',
    },
  },
  {
    $lookup: {
      from: 'users',         // collection name for dislikes
      localField: 'dislikes',
      foreignField: '_id',
      as: 'dislikes',
    },
  },
  {
    $addFields: {
      likesCount: { $size: '$likes' },
      dislikesCount: { $size: '$dislikes' },
    },
  },
  {
    $project: {
      likes: 0,
      dislikes: 0,
      'author.password': 0,
    },
  },
]); 

*/