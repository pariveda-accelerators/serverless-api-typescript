import 'source-map-support/register';
import { api } from '@manwaring/lambda-wrapper';
import { CreateMessageRequest } from './message';
import { add } from './table';
import { validateOrReject, ValidationError } from 'class-validator';

/**
 *  @swagger
 *  paths:
 *    /messages:
 *      post:
 *        summary: Save message
 *        description: Creates and returns a new message
 *        requestBody:
 *          required: true
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/CreateMessageRequest'
 *        responses:
 *          200:
 *            description: The newly created message
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/MessageResponse'
 */
export const handler = api(async ({ body, success, invalid, error }) => {
  try {
    const createMessageRequest = new CreateMessageRequest(body);
    await validateOrReject(createMessageRequest, { validationError: { target: false }, forbidNonWhitelisted: true });
    const message = await add(createMessageRequest);
    return success({ body: message });
  } catch (err) {
    if (isValidationError(err)) {
      return invalid(err);
    } else {
      return error(err);
    }
  }
});

function isValidationError(err: any) {
  return Array.isArray(err) && err[0] instanceof ValidationError;
}
