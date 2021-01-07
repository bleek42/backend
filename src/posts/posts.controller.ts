import { Controller, Get } from '@nestjs/common';

@Controller('posts')
export class PostsController {
    @Get()
    findAll(): string {
        return 'this gets all posts'
    }
}
