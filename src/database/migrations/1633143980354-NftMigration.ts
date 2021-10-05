import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class NftMigration1633143980354 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'nfts',
                columns:[
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        isUnique: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'quantity',
                        type: 'int'
                    },
                    {
                        name: 'asset_id',
                        type: 'varchar',
                    }
                ]
            })
        )
        await queryRunner.createForeignKey('nfts', new TableForeignKey({
            columnNames: ['asset_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'assets',
            onDelete: 'CASCADE',
            onUpdate:'CASCADE'
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("nfts");
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("assetId") !== -1);
        await queryRunner.dropForeignKey('nfts', foreignKey);
        await queryRunner.dropTable('nfts');
    }

}
