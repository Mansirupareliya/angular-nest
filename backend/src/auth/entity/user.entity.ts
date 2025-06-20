import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'varchar', length:100,nullable: false})
    name: string;

    @Column({type: 'varchar',length:100, unique: true,nullable:false})
    email:string;

    @Column({type:'varchar',length : 100, nullable:false})
    password : string;

    @Column({ unique: true, nullable: true})
    co_number : number;

    @CreateDateColumn()
    created_at : Date;

    @UpdateDateColumn()
    updated_at : Date;

    @DeleteDateColumn()
    deleted_at : Date;
}