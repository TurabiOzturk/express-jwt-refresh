import { NextFunction, Request, Response } from 'express';
import { CommentsService } from './service';
import { ForbiddenException, NotFoundException } from '../../utils';
import { User, UsersService } from '../users';
import { Comment } from './types';

export class CommentsController {
    static async index(req: Request, res: Response, next: NextFunction) {
        const commentId = req.query.commentId ? +req.query.commentId : undefined;
        const comments = await CommentsService.index({ commentId });
        res.json(comments);
    }

    static async store(req: Request, res: Response, next: NextFunction) {
        const payload = req.body;
        const userId = req.user.id;
        const postId = req.params.postId;

        const comment = await CommentsService.store({ ...payload, userId, postId });
        res.json(comment);
        /*
        TODO: save comment
        */
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        const commentId = +req.params.commentId;
        const userId = req.user.id;

        //FIXME: refactor the function to enable the controls
        //await checkIfAllowedToModify(userId, commentId);

        const payload = req.body;

        const updatedComment = await CommentsService.update(commentId, payload);
        res.json(updatedComment);
    }

    static async destroy(req: Request, res: Response, next: NextFunction) {
        const commentId = +req.params.commentId;
        console.log('commentId is: ', commentId);
        //const userId = req.user.id;

        //await checkIfAllowedToModify(userId, postId);

        const isDeleted = await CommentsService.destroy(commentId);

        if (!isDeleted) {
            throw new NotFoundException('Post not found');
        }

        res.json({ message: 'Comment deleted' });


        // TODO: delete by comment id
        //res.json({ controller: 'deleteComment' });
    }

    //TODO: update comment: DONE
    //TODO: index comments: DONE
    /*
        TODO: find comments by post id and return them as array
    */
    // {{base_url}}/api/posts/1/comments/
    // {{base_url}}/api/users/1/comments
}

//FIXME: refactor the function to enable the controls
// async function checkIfAllowedToModify(userId: number, postId: number) {
//     const [user, post] = (await Promise.all([
//         UsersService.show(userId),
//         CommentsService.show(postId),
//     ])) as [User, Post];

//     const allowed = user.role === 'admin' || user.id === post.userId;

//     if (!allowed) {
//         throw new ForbiddenException();
//     }
// }
