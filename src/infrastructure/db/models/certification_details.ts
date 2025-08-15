import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { CertificationEntity } from 'domains/certification/entities/certification.entity';


export interface CertificationDetailsCreationAttributes extends Optional<CertificationEntity, 'cert_id' | 'skills' | 'expiry_date' | 'organization'> {}

export class CertificationDetailsModel extends Model<CertificationEntity, CertificationDetailsCreationAttributes> implements CertificationEntity {
  public cert_id!: number;
  public user_id!: number;
  public skills?: string;
  public organization?: string;
  public certification_type!: string; 
  public certified!: boolean;
  public issue_date!: Date;
  public expiry_date!: Date | null; // null if the certification does not expire
  public status!: 'active' | 'expired' | 'revoked';
  public is_active!: 'active' | 'inactive' | 'suspended';
  public created_on!: Date;
  public updated_on?: Date; // optional field for tracking updates

  static associate(models: any) {
    CertificationDetailsModel.belongsTo(models.user, { foreignKey: 'user_id' });
  }
}

export function initCertificationDetailsModel(sequelize: Sequelize): typeof CertificationDetailsModel {
  CertificationDetailsModel.init(
    {
      cert_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      skills: { type: DataTypes.TEXT, allowNull: true },
      certified: { type: DataTypes.BOOLEAN, defaultValue: false },
      certification_type: { type: DataTypes.STRING(50), allowNull: false }, // e.g., 'first_aid', 'cpr'
      issue_date: { type: DataTypes.DATE, allowNull: false },
      expiry_date : { type: DataTypes.DATE, allowNull: true },
      status: { type: DataTypes.ENUM('active', 'expired', 'revoked'), defaultValue: 'active' },
      organization: { type: DataTypes.STRING(100), allowNull: true },
      is_active: { type: DataTypes.ENUM('active', 'inactive', 'suspended'), defaultValue: 'active' },
      created_on: { type: DataTypes.DATE, allowNull: false },
      updated_on: { type: DataTypes.DATE, allowNull: true },
    },
    {
      sequelize,
      tableName: 'certification_details',
      timestamps: false,
    }
  );
  return CertificationDetailsModel;
}
