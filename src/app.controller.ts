import {Controller, Request, Post, UseGuards, Get} from '@nestjs/common';
import {LocalAuthGuard} from "./auth/local-auth.guard";
import {AuthService} from "./auth/auth.service";
import {JwtAuthGuard} from "./auth/jwt-auth.guard";

@Controller()
export class AppController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @Post('profile')
    @UseGuards(JwtAuthGuard)
    async profile(@Request() req) {
        console.log(req.user);
        return this.authService.validateUser(req.user.username, req.user.password);
    }

}
