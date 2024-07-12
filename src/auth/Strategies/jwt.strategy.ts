import {Injectable, UnauthorizedException} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {PrismaService} from "../../../prisma/prisma.service";
import {settings} from "../../settings";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: settings().SECRET_KEY,
        });
    }

    async validate(payload: any) {
        const user = await this.prisma.user.findUnique({ where: { id: payload.id } });
        if (!user) {
            throw new UnauthorizedException();
        }
        return user.id;
    }
}


//   return { userId: payload.sub, email: payload.email };
