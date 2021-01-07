import { TableColumnOptions } from 'typeorm/schema-builder/options/TableColumnOptions';

export default class MigrationUtil {
  public static get idColumn(): TableColumnOptions[] {
    const columns: TableColumnOptions[] = [];

    columns.push({
      name: 'userId',
      type: 'int',
      isPrimary: true,
      isNullable: false,
      isGenerated: true,
      generationStrategy: 'increment',
    });

    return columns;
  }

  public static getVarCharColumn({
    name,
    length = '255',
    isPrimary = false,
    isNullable = false,
    isUnique = false,
    defaultValue = null,
  }): TableColumnOptions {
    return {
      name,
      length,
      isPrimary,
      isNullable,
      isUnique,
      default: `'${defaultValue}'`,
      type: 'varchar',
    };
  }
}
