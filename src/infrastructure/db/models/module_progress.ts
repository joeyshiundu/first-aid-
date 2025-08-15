import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { ModuleProgressEntity } from '../../../domains/module/entities/module-progress.entity';

/*export interface ModuleProgressAttributes {
  progress_id: number;
  user_id: number;
  module_id: number;
  is_completed: 'not_started' | 'in_progress' | 'completed' | 'terminated' | 'suspended';
  last_accessed: Date;
  completed_at?: Date | null;
}
*/

export interface ModuleProgressCreationAttributes extends Optional<ModuleProgressEntity, 'progress_id' | 'completed_at'> {}

export class ModuleProgressModel extends Model<ModuleProgressEntity, ModuleProgressCreationAttributes> implements ModuleProgressEntity {
  public progress_id!: number;
  public user_id!: number;
  public module_id!: number;
  public is_completed!: 'not_started' | 'in_progress' | 'completed' | 'terminated' | 'suspended';
  public last_accessed!: Date;
  public completed_at?: Date | null;

  static associate(models: any) {
    ModuleProgressModel.belongsTo(models.user, { foreignKey: 'user_id' });
    ModuleProgressModel.belongsTo(models.module, { foreignKey: 'module_id' });
  }
}

export function initModuleProgressModel(sequelize: Sequelize): typeof ModuleProgressModel {
  ModuleProgressModel.init(
    {
      progress_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      module_id: { type: DataTypes.INTEGER, allowNull: false },
      is_completed: { type: DataTypes.ENUM('not_started','in_progress','completed','terminated','suspended'), defaultValue: 'not_started' },
      last_accessed: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      completed_at: { type: DataTypes.DATE, allowNull: true },
    },
    {
      sequelize,
      tableName: 'module_progress',
      timestamps: false,
    }
  );
  return ModuleProgressModel;
}
