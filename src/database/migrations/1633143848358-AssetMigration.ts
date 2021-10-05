import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class AssetMigration1633143848358 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'assets',
                columns:[
                    {
                        name: 'id',
                        type:  'varchar', // temporally, edit this
                        isPrimary: true,
                        isUnique: true,
                    },
                    {
                        name: 'name',
                        type: 'varchar'
                    },
                    {
                        name: 'description',
                        type: 'varchar'
                    },
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('assets')
    }

}
