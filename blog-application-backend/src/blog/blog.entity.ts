import { Entity, PrimaryGeneratedColumn, Column, BeforeUpdate, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "src/users/user.entity";
@Entity()
export class Blog {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    title: string;

    @Column()
    slug: string;

    @Column({default: ''})
    description: string;

    @Column({default: ''})
    body: string;

    @Column('date')
    @CreateDateColumn()
    createdAt: Date;

    @Column('date')
    @CreateDateColumn()
    updatedAt: Date;    

    @BeforeUpdate()
    updateTimestamp() {
        this.updatedAt = new Date;
    }

    @Column({default: 0})
    likes: number;

    @Column({nullable: true})
    headerImage: string;

    @Column({nullable: true})
    publishedDate: Date;

    @Column({nullable: true})
    isPublished: boolean;

    @ManyToOne(type => User, user => user.blogs)
    author: User;
}