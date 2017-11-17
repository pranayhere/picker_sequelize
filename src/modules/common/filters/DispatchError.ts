'use strict';

import { HttpException } from '@nestjs/core';
import { Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { MessageCodeError } from '../lib/error/MessageCodeError';
import { ValidationError } from 'sequelize';

@Catch(MessageCodeError, ValidationError, HttpException, Error)
export class DispatchError implements ExceptionFilter {
    public catch(err, res) {
        if (err instanceof MessageCodeError) {
            console.log("coming here");
            console.log(err);
            /* MessageCodeError, Set all header variable to have a context for the client in case of MessageCodeError. */
            res.setHeader('x-message-code-error', err.messageCode);
            res.setHeader('x-message', err.message);
            res.setHeader('x-httpStatus-error', err.httpStatus);

            let data = {
                "status" : 0,
                "message" : err.message
            }

            return res.status(err.httpStatus).send(data);
        } else if (err instanceof ValidationError) {
            /* Sequelize validation error. */
            res.setHeader('x-message-code-error', (err as ValidationError).errors[0].type);
            res.setHeader('x-message', (err as ValidationError).errors[0].message);
            res.setHeader('x-httpStatus-error', HttpStatus.BAD_REQUEST);

            let data = {
                "status" : 0,
                "message" : (err as ValidationError).errors[0].message
            }

            return res.status(HttpStatus.BAD_REQUEST).send(data);
        } else {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
        }
    }
}
