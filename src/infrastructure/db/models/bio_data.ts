import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { BioDataEntity } from 'domains/user/entities/bioData.entity';



export interface BioDataCreationAttributes extends Optional<BioDataEntity, 'bio_data_id'> {}

export class BioDataModel extends Model<BioDataEntity, BioDataCreationAttributes> implements BioDataEntity {
  public bio_data_id!: number;
  public blood_group!: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  public age!: number;
  public allergies!: string;
  public weight!: number;
  public gender!: 'M' | 'F';
  public height!: number;
  public d_o_b!: Date;

  static associate(models: any) {
    BioDataModel.hasOne(models.user, { foreignKey: 'bio_data_id' });
  }
}

export function initBioDataModel(sequelize: Sequelize): typeof BioDataModel {
  BioDataModel.init(
    {
      bio_data_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      blood_group: { type: DataTypes.ENUM('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'), allowNull: false },
      age: { type: DataTypes.INTEGER, allowNull: false },
      allergies: { type: DataTypes.STRING(20), allowNull: false },
      weight: { type: DataTypes.INTEGER, allowNull: false },
      gender: { type: DataTypes.ENUM('M', 'F'), allowNull: false },
      height: { type: DataTypes.INTEGER, allowNull: false },
      d_o_b: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      tableName: 'bio_data',
      timestamps: false,
    }
  );
  return BioDataModel;
}
