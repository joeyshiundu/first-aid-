import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { ContactDataEntity } from 'domains/user/entities/contactData.entity';

/*export interface ContactDataAttributes {
  contact_data_id: number;
  phone_number: string;
  email: string;
  country: string;
  city: string;
  emergency_contact_name: string;
  emergency_contact_phonenumber: string;
}
*/

export interface ContactDataCreationAttributes extends Optional<ContactDataEntity, 'contact_data_id'> {}

export class ContactDataModel extends Model<ContactDataEntity, ContactDataCreationAttributes> implements ContactDataEntity {
  public contact_data_id!: number;
  public phone_number!: string;
  public email!: string;
  public country!: string;
  public city!: string;
  public address!: string;
  public emergency_contact_name!: string;
  public emergency_contact_phonenumber!: string;

  static associate(models: any) {
    ContactDataModel.hasOne(models.user, { foreignKey: 'contact_data_id' });
  }
}

export function initContactDataModel(sequelize: Sequelize): typeof ContactDataModel {
  ContactDataModel.init(
    {
      contact_data_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      phone_number: { type: DataTypes.STRING(15), allowNull: false },
      email: { type: DataTypes.STRING(30), allowNull: false, unique: true },
      country: { type: DataTypes.STRING(20), allowNull: false },
      city: { type: DataTypes.STRING(20), allowNull: false },
      address: { type: DataTypes.STRING(100), allowNull: false },
      emergency_contact_name: { type: DataTypes.STRING(20), allowNull: false },
      emergency_contact_phonenumber: { type: DataTypes.STRING(15), allowNull: false },
    },
    {
      sequelize,
      tableName: 'contact_data',
      timestamps: false,
    }
  );
  return ContactDataModel;
}
