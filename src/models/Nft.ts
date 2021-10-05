import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Asset } from "./Asset";

@Entity()
export class Nft {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    quantity: number;

    @ManyToOne(() => Asset)
    @JoinColumn({ name: 'assetId' })
    asset: Asset;

}
