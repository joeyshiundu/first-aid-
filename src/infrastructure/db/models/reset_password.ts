
import { DataTypes, Model, Sequelize } from "sequelize";
import { ResetPasswordEntity } from "domains/user/entities/resetPassword.entity";

export class ResetPasswordModel extends Model<ResetPasswordEntity> {
    public reset_id!: number;
    public user_id!: number;
    public resetToken!: string;
    public resetTokenExpiry!: Date;

    static associate(models: any) {
        ResetPasswordModel.belongsTo(models.User, {
            foreignKey: "user_id",
            as: "user",
        });
    }
}

export function initResetPasswordModel(sequelizeInstance: Sequelize) {
    ResetPasswordModel.init(
        {
            reset_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            resetToken: {
                type: DataTypes.STRING,
                field: 'token_hash', // Map to the 'token_hash' column in the DB
                allowNull: false,
            },
            resetTokenExpiry: {
                type: DataTypes.DATE,
                field: 'expires_at', // Map to the 'expires_at' column in the DB
                allowNull: false,
            },
        },
        {
            sequelize: sequelizeInstance,
            modelName: "ResetPassword",
            tableName: "reset_password",
        }
    );
    return ResetPasswordModel;
}
