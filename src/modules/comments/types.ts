export interface CommentDb {
    commentId: number;
    postId: number;
    userId: number;
    title: string;
    comment: string;
    createdAt: string;
    updatedAt: Date;
}

export interface Comment extends Omit<CommentDb, 'createdAt' | 'updatedAt'> {
    createdAt: Date;
    updatedAt: Date;
}
