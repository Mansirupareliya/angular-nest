import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length:30,nullable: false})
    name: string;

    @Column({type: 'varchar', nullable:false, length:30})
    email:string;

    @Column({type:'varchar',length : 30, nullable:false})
    password : string;

    @CreateDateColumn()
    created_at : Date;

    @UpdateDateColumn()
    updated_at : Date;

    @DeleteDateColumn()
    deleted_at : Date;
}