import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { UserEntity } from '../../../domains/user/entities/user.entity';

export interface UserCreationAttributes extends Optional<UserEntity, 'user_id' | 'profile' | 'cert_id'> {}

export class UserModel extends Model<UserEntity, UserCreationAttributes> implements UserEntity {
  public user_id!: number;
  public first_name!: string;
  public last_name!: string;
  public bio_data_id!: number;
  public contact_data_id!: number;
  public password!: string;
  public profile! : string ;
  public role!: 'patient' | 'responder' | 'admin' | 'certifier';
  public is_verified!: boolean;
  public status!: 'active' | 'inactive' | 'suspended';
  public created_on!: Date;
  public is_certified!: boolean;
  public cert_id ?: number | undefined;

  // timestamps etc. can be added if needed
  static associate(models: any) {
    UserModel.belongsTo(models.bio_data, { foreignKey: 'bio_data_id' });
    UserModel.belongsTo(models.certification_details, { foreignKey: 'cert_id' });
    UserModel.belongsTo(models.contact_data, { foreignKey: 'contact_data_id' });
    UserModel.hasMany(models.emergency_log, { foreignKey: 'user_id' });
    UserModel.hasMany(models.chat_message, { foreignKey: 'user_id' });
    UserModel.hasMany(models.chat_session, { foreignKey: 'user_id' });
    UserModel.hasMany(models.module_progress, { foreignKey: 'user_id' });
  }
}

export function initUserModel(sequelize: Sequelize): typeof UserModel {
  UserModel.init(
    {
      user_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      first_name: { type: DataTypes.STRING(30), allowNull: false },
      last_name: { type: DataTypes.STRING(30), allowNull: false },
      bio_data_id: { type: DataTypes.INTEGER, allowNull: false },
      contact_data_id: { type: DataTypes.INTEGER, allowNull: false },
      password: { type: DataTypes.STRING(100), allowNull: false },
      profile: { type: DataTypes.STRING(50), allowNull: true },
      role: { type: DataTypes.ENUM('patient', 'responder', 'admin', 'certifier'), allowNull: false },
      is_verified: { type: DataTypes.BOOLEAN, allowNull: false },
      status: { type: DataTypes.ENUM('active', 'inactive', 'suspended'), allowNull: false, defaultValue: 'active' },
      created_on: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
      is_certified: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
      cert_id: { type: DataTypes.INTEGER, allowNull: true },
    },
    {
      sequelize,
      tableName: 'user',
      timestamps: false,
    }
  );
  return UserModel;
}
