import { Entity, Column, PrimaryGeneratedColumn,CreateDateColumn,BeforeInsert } from 'typeorm';
import * as bcrypt from 'bcryptjs';

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
}