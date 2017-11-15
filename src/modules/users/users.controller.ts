'use strict';

import { Controller, Get, Post, Put, Delete, HttpStatus, Request, Response } from '@nestjs/common';
import { MessageCodeError } from '../common/index';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get('users')
    public async index( @Response() res) {
        const users = await this.usersService.findAll();
        return res.status(HttpStatus.OK).json(users);
    }

    @Post('users')
    public async create( @Request() req, @Response() res) {
        const body = req.body;
        if (!body || (body && Object.keys(body).length === 0)) {
            throw new MessageCodeError('user:create:missingInformation');
        }

        let user = await this.usersService.create(req.body);
        return res.status(HttpStatus.CREATED).send(user);
    }

    @Get('users/:id')
    public async show( @Request() req, @Response() res) {
        const id = req.params.id;
        if (!id) {
            throw new MessageCodeError('user:show:missingId');
        }

        const user = await this.usersService.findById(id);
        if (!user) {
            throw new MessageCodeError('user:show:missingId');
        }
        return res.status(HttpStatus.OK).json(user);
    }

    @Put('users/:id')
    public async update( @Request() req, @Response() res) {
        const id = req.params.id;
        if (!id) {
            throw new MessageCodeError('user:update:missingId');
        }

        const user = await this.usersService.update(id, req.body);
        return res.status(HttpStatus.OK).send(user);
    }
}
