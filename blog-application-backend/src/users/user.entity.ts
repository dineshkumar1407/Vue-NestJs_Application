import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,BeforeInsert, OneToMany } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Blog } from 'src/blog/blog.entity';

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column({ length: 25 ,unique:true})
    username:string;

    @Column({ unique: true })
    email: string;

    @Column()
    password:string;

    @Column('date') 
    @CreateDateColumn()
    createdAt:Date;

    @Column({ default: true })
    isActive:boolean;
    
    @OneToMany(type => Blog, blog => blog.author)
    blogs: Blog[];
}