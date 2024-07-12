import * as process from 'process';
import { config } from 'dotenv';
config();

export const settings = () => ({
    SECRET_KEY: process.env.SECRET_KEY || 'secret_key',
    DATABASE_URL : process.env.DATABASE_URL || 'no connection',
    TOKEN_EXPIRED_TIME : process.env.TOKEN_EXPIRED_TIME || '10h'
});

