import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { ForbiddenException } from '@nestjs/common/exceptions';
import { SeasonDto } from "./dto";

@Injectable()
export class SeasonService{
    constructor(private prisma: PrismaService){}
    async create(dto: SeasonDto) {
        try {
            const season = 
            await this.prisma.season.create({
            data:  {
                name: dto.name,
            },
        });
        return season;

        } catch (error){
            if(error instanceof PrismaClientKnownRequestError) {
                if(error.code === 'P2002'){
                    throw new ForbiddenException(
                        'This season already exists'
                    );
                }
            }
            throw error;
        }
        
    }

    async update(id: string, dto:SeasonDto) {
        const season = 
            await this.prisma.season.findUnique({
                where: {
                    name: id,
                },
            });


            if(!season) {
                throw new ForbiddenException(
                    'This season does not exist.',
                );
            }
        


        return this.prisma.season.update({
            where: {
              name: id,
            },
            data: {
                name: dto.name,
            },
          });



    }

    findAll() {
        return this.prisma.season.findMany({});
    }

    find(id: string){
        return this.prisma.season.findFirst({
            where: {
                name: id
            },
        });
    }

    async delete(id: string){
        const season = 
        await this.prisma.season.findUnique({
            where: {
                name: id
            },
        });


        if(!season) {
            throw new ForbiddenException(
                'This season does not exist.',
            );
        }
    


    return this.prisma.season.delete({
        where: {
          name: id,
        },
      });
    }






}