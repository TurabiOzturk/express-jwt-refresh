import * as z from 'zod';
import { commentValidation, titleValidation, commentIdValidation } from './field-validations';
import { idValidation } from '../../utils';

// FIXME: this don't work 
export const commentListCommentSchema = z.strictObject({
    params: z.strictObject({
        postId: idValidation,
    }),
});

export const commentCreateCommentRequestSchema = z.strictObject({
    params: z.strictObject({
        postId: idValidation,
    }),
    body: z.strictObject({
        title: titleValidation,
        comment: commentValidation,
    }),
});

export const commentUpdateRequestSchema = z.strictObject({
    params: z.strictObject({
        commentId: idValidation,
        
    }),
    body: z.strictObject({
        title: titleValidation,
        comment: commentValidation,
    }),
    
});
export const commentDestroyRequestSchema = z.strictObject({
    params: z.strictObject({
        commentId: idValidation,
    }),
});

/*
domain.com/api/comments/:postId
:body: {
    title: '',
    comment: ''
}

:postId = params
:body = request body
*/
export type CommentCreatePayload = z.infer<typeof commentCreateCommentRequestSchema>['body'];
export type CommentUpdatePayload = z.infer<typeof commentUpdateRequestSchema>['body'];

