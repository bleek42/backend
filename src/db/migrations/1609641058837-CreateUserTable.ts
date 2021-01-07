import MigrationUtil from 'src/utils/migrationUtil';
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1609641058837 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'int4',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'username',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE user');
  }

  private static readonly table = new Table({
    name: 'UserTable',
    columns: [
      ...MigrationUtil.idColumn,
      MigrationUtil.getVarCharColumn({ name: 'username' }),
      MigrationUtil.getVarCharColumn({ name: 'email' }),
      MigrationUtil.getVarCharColumn({ name: 'password' }),
    ],
  });
}
