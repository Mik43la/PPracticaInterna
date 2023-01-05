import { Injectable } from "@nestjs/common";
import { RoleDto } from "./dto";
import { PrismaService } from "src/prisma/prisma.service";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { ForbiddenException } from '@nestjs/common/exceptions';

@Injectable()
export class RoleService{
    constructor(private prisma: PrismaService){}
    async create(dto: RoleDto) {
        try {
            const role = 
            await this.prisma.role.create({
            data:  {
                name: dto.name,
            },
        });
        return role;
        } catch (error){
            if(error instanceof PrismaClientKnownRequestError) {
                if(error.code === 'P2002'){
                    throw new ForbiddenException(
                        'This role already exists'
                    );
                }
            }
            throw error;
        }
        

    }
    
    async update(id: string, dto:RoleDto) {
        const role = 
            await this.prisma.role.findUnique({
                where: {
                    name: id,
                },
            });


            if(!role) {
                throw new ForbiddenException(
                    'This role does not exist.',
                );
            }
        


        return this.prisma.role.update({
            where: {
              name: id,
            },
            data: {
                name: dto.name,
            },
          });



    }

    findAll() {
        return this.prisma.role.findMany({});
    }

    find(id: string){
        return this.prisma.role.findFirst({
            where: {
                name: id
            },
        });
    }

    async delete(id: string){
        const role = 
        await this.prisma.role.findUnique({
            where: {
                name: id,
            },
        });


        if(!role) {
            throw new ForbiddenException(
                'This role does not exist.',
            );
        }
    


    return this.prisma.role.delete({
        where: {
          name: id,
        },
      });
    }
}