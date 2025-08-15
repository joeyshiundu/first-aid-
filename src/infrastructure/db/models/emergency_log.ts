import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { EmergencyEntity } from 'domains/emergency/entities/emergency.entity';


/*export interface EmergencyLogAttributes {
  log_id: number;
  user_id: number;
  emergency_type: 'SEVERE' | 'MODERATE' | 'MINOR';
  calltime: Date;
  description?: string;
  responder_id: number;
  latitude: string;
  longitude: number;
  status: 'pending' | 'in progress' | 'resolved';
  created_at: Date;
}
*/ 
export interface EmergencyLogCreationAttributes extends Optional<EmergencyEntity, 'emergency_id' | 'description'> {}

export class EmergencyLogModel extends Model<EmergencyEntity, EmergencyLogCreationAttributes> implements EmergencyEntity {
  public emergency_id!: number;
  public user_id!: number;
  public emergency_type!: 'SEVERE' | 'MODERATE' | 'MINOR';
  public calltime!: Date;
  public description?: string;
  public responder_id!: number;
  public latitude!: number;
  public longitude!: number;
  public status!: 'pending' | 'in progress' | 'resolved';
  public created_at!: Date;
  public updated_at!: Date;

  static associate(models: any) {
    EmergencyLogModel.belongsTo(models.user, { foreignKey: 'user_id' });
  }
}

export function initEmergencyLogModel(sequelize: Sequelize): typeof EmergencyLogModel {
  EmergencyLogModel.init(
    {
      emergency_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      emergency_type: { type: DataTypes.ENUM('SEVERE', 'MODERATE', 'MINOR'), allowNull: false },
      calltime: { type: DataTypes.DATE, allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: true },
      responder_id: { type: DataTypes.INTEGER, allowNull: false },
      latitude: { type: DataTypes.STRING(100), allowNull: false },
      longitude: { type: DataTypes.FLOAT, allowNull: false },
      status: { type: DataTypes.ENUM('pending', 'in progress', 'resolved'), defaultValue: 'pending' },
      created_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
    },
    {
      sequelize,
      tableName: 'emergency_log',
      timestamps: false,
    }
  );
  return EmergencyLogModel;
}
