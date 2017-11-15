'use strict';

import * as crypto from 'crypto';
import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, BeforeValidate, BeforeCreate } from 'sequelize-typescript';
import { IDefineOptions } from 'sequelize-typescript/lib/interfaces/IDefineOptions';

const tableOptions: IDefineOptions = { timestamps: true, tableName: 'users' } as IDefineOptions;

@Table(tableOptions)
export class User extends Model<User> {
    @Column({
        field: 'id',
        type: DataType.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    })
    public id: number;

    @Column({
        field: 'first_name',
        type: DataType.CHAR(30),
        allowNull: false
    })
    public firstName: string;

    @Column({
        field: 'last_name',
        type: DataType.CHAR(30),
        allowNull: false
    })
    public lastName: string;

    @Column({
        field: 'email',
        type: DataType.CHAR(100),
        allowNull: false,
        validate: {
            isEmail: true,
            isUnique: async (value: string, next: Function): Promise<any> => {
                const isExist = await User.findOne({ where: { email: value } });
                if (isExist) {
                    const error = "Email already exists";
                    next(error);
                }
                next();
            },
        },
    })
    public email: string;

    @Column({
        field: 'password',
        type: DataType.TEXT,
        allowNull: false
    })
    public password: string;

    @CreatedAt
    public createdAt: Date;

    @UpdatedAt
    public updatedAt: Date;
}
