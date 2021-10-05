import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Asset {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

}
