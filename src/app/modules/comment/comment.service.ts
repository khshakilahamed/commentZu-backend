import { IAuthUser } from "../auth/auth.interface";
import { Comment } from "./comment.model";
import { IGetCommentsOptions } from "./comment.interface";

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
      console.log(typeof page);
      const order = sortOrder === 'asc' ? 1 : -1;

      const sortOptions: Record<string, any> = {
            mostLiked: { totalLike: order, createdAt: order },
            mostDisliked: { totalDislike: order, createdAt: order },
            newest: { createdAt: order },
      };

      const comments = await Comment.find({ parentComment: null }) // top-level comments
            .populate({
                  path: 'author',
                  select: '-password -__v',
            })
            .sort(sortOptions[sortBy] || { createdAt: -1 }) // default to newest
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();

      const totalComments = await Comment.countDocuments({ parentComment: null });
      const totalPages = Math.ceil(totalComments / limit);

      return {
            comments,
            page,
            totalPages,
            totalComments,
      };
};


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