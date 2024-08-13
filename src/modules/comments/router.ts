import { Router } from 'express';
import { authenticate, validateRequest } from '../../middlewares';
import { CommentsController } from './controller';
import {
    commentCreateCommentRequestSchema,
    commentListCommentSchema,
    commentUpdateRequestSchema,
    commentDestroyRequestSchema
} from './request-schemas';

const app = Router();

app.get('/:postId', CommentsController.index); // GET /commments
app.post(
    '/:postId',
    [validateRequest(commentCreateCommentRequestSchema), authenticate],
    CommentsController.store,
); // POST /comments
app.delete('/id/:commentId', [validateRequest(commentDestroyRequestSchema)], CommentsController.destroy); // DELETE /comments/:id
app.put(
    '/id/:commentId',
    [validateRequest(commentUpdateRequestSchema), authenticate],
    CommentsController.update,
);

// app.post('/', [validateRequest(postCreationRequestSchema), authenticate], PostsController.store);

export { app as CommentsRouter };
