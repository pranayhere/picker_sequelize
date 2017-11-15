'use strict';
import { Module, RequestMethod } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersProvider } from './users.provider';

@Module({
    modules: [DatabaseModule],
    controllers: [UsersController],
    components: [
        UsersService,
        usersProvider,
    ],
})

export class UsersModule { }
