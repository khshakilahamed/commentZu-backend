export interface IGetCommentsOptions {
      page?: number;
      limit?: number;
      sortBy?: 'mostLiked' | 'mostDisliked' | 'newest';
      sortOrder?: 'asc' | 'desc';
}