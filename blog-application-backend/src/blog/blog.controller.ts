import { Controller, Post, Body, Request, UseGuards, Get, Query, Param, Delete, Put, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { BlogService } from './blog.service';
import { Observable, of } from 'rxjs';

// import { JwtAuthGuard } from 'src/auth/guards/jwt-guard';
import { Blog } from './blog.entity';
// import { UserIsAuthorGuard } from '../guards/user-is-author.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { Image } from './Image.interface';
import { join } from 'path';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';

export const BLOG_ENTRIES_URL ='http://localhost:3000/api/blog-entries';

export const storage = {
    storage: diskStorage({
        destination: './uploads/blog-entry-images',
        filename: (req, file, cb) => {
            const filename: string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
            const extension: string = path.parse(file.originalname).ext;

            cb(null, `${filename}${extension}`)
        }
    })

}

@Controller('/blog')
export class BlogController {

    constructor(private blogService: BlogService) {}

    
    @UseGuards(AuthenticatedGuard)
    @Post("/create")
    create(@Body()blog: Blog, @Request() req) {
        const user = req.user;
        return this.blogService.create(user, blog);
    }
    @Get(':id')
    findOne(@Param() params) {
        console.log("findone")
        return this.blogService.findOne(params.id);
    }

    @UseGuards(AuthenticatedGuard)
    @Put(':id')
    updateOne(@Param('id') id: number, @Body() blog: Blog) {
        return this.blogService.updateOne(id, blog);
    }

    @UseGuards(AuthenticatedGuard)
    @Delete('/remove/:id')
    deleteOne(@Param() params) {
        console.log("delete")
        return this.blogService.deleteOne(params.id);
    }

    @UseGuards(LocalAuthGuard)
    @Post('image/upload')
    @UseInterceptors(FileInterceptor('file', storage))
    uploadFile(@UploadedFile() file, @Request() req) {
        return of(file);
    }

    @Get('image/:imagename')
    findImage(@Param('imagename') imagename, @Res() res) {
        return of(res.sendFile(join(process.cwd(), 'uploads/blog-entry-images/' + imagename)));
    }
}