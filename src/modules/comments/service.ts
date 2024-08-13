import { parseComment, Comments } from '../../database';
import { CommentCreatePayload, CommentUpdatePayload } from './request-schemas';
import { formatSqliteDate, NotFoundException } from '../../utils';
import { CommentDb } from './types';

class CommentsService {
    async index({ commentId }: { commentId?: number } = {}) {
        let commentsQuery = Comments();

        if (commentId) {
            commentsQuery = commentsQuery.where({ commentId });
        }

        const commentsRaw: CommentDb[] = await commentsQuery;

        const comments = commentsRaw.map((commentsRaw) => parseComment(commentsRaw)!);

        return comments;
    }

    async store(payload: CommentCreatePayload & { userId: number; postId: number }) {
        const [commentRaw]: [CommentDb] = await Comments().insert(payload).returning('*');
        const comment = parseComment(commentRaw);

        return comment!;
    }

    async update(id: number, payload: CommentUpdatePayload) {
        await Comments()
            .where({ id })
            .update({ ...payload, updatedAt: formatSqliteDate(new Date()) });

        const updatedCommentRaw: CommentDb = await Comments().where({ id }).first();
        const updatedComment = parseComment(updatedCommentRaw);

        if (!updatedComment) {
            throw new NotFoundException('Comment not found');
        }
        //return updatedComment;
    }

    async destroy(id: number) {
        const deletedCommentsCount = await Comments().where({ id }).delete();
        return deletedCommentsCount === 1;
    }
}

const service = new CommentsService();

export { service as CommentsService };
