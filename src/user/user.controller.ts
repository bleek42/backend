import { Controller, Get, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
    @Get()
    findAll(): string {
        return 'this gets all the users'
    }
}
