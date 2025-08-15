//This file is generated to define the ModuleModel that represents the module in the system.

import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { ModuleEntity } from '../../../domains/module/entities/module.entity';


export interface ModuleCreationAttributes extends Optional<ModuleEntity, 'module_id'> {}

export class ModuleModel extends Model<ModuleEntity, ModuleCreationAttributes> implements ModuleEntity {
  public module_id!: number;
  public title!: string;
  public description!: string;
  public is_active!: 'active' | 'not in service';
  public category!: string;
  public difficulty!: 'Beginner' | 'Intermediate' | 'Advanced';
  public created_at!: Date;
  public updated_at!: Date;

  static associate(models: any) {
    ModuleModel.hasMany(models.video, { foreignKey: 'module_id' });
    ModuleModel.hasMany(models.module_progress, { foreignKey: 'module_id' });
  }
}

export function initModuleModel(sequelize: Sequelize): typeof ModuleModel {
  ModuleModel.init(
    {
      module_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      title: { type: DataTypes.STRING(30), allowNull: false },
      description: { type: DataTypes.STRING(100), allowNull: false },
      is_active: { type: DataTypes.ENUM('active', 'not in service'), allowNull: false },
      category: { type: DataTypes.STRING(30), allowNull: false },
      difficulty: { type: DataTypes.ENUM('Beginner', 'Intermediate', 'Advanced'), allowNull: false },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    {
      sequelize,
      tableName: 'module',
      timestamps: false,
    }
  );
  return ModuleModel;
}
