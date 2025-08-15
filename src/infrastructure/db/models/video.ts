import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { VideoEntity } from 'domains/video/entities/video.entity';


/*
export interface VideoAttributes {
  video_id: number;
  title: string;
  description: string;
  url: string;
  category: string;
  thumbnail_url: string;
  module_id: number;
}
*/

export interface VideoCreationAttributes extends Optional<VideoEntity, 'video_id'> {}

export class VideoModel extends Model<VideoEntity, VideoCreationAttributes> implements VideoEntity {
  public video_id!: number;
  public title!: string;
  public description!: string;
  public url!: string;
  public thumbnail_url!: string;
  public duration!: number;
  public category!: string;
  public created_at!: Date;
  public updated_at!: Date;
  public user_id!: number;
  public is_public!: boolean;
  public views!: number;
  public likes!: number;
  public dislikes!: number;
  public tags!: string[];

  public module_id!: number;// This is used with the foreign key relationship

  static associate(models: any) {
    VideoModel.belongsTo(models.module, { foreignKey: 'module_id' });
  }
}

export function initVideoModel(sequelize: Sequelize): typeof VideoModel {
  VideoModel.init(
    {
      video_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      title: { type: DataTypes.STRING(100), allowNull: false },
      description: { type: DataTypes.STRING(255), allowNull: false },
      url: { type: DataTypes.STRING(200), allowNull: false },
      thumbnail_url: { type: DataTypes.STRING(255), allowNull: false },
      duration: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }, // Duration in seconds
      category: { type: DataTypes.STRING(50), allowNull: false },
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      user_id: { type: DataTypes.INTEGER, allowNull: false },
      is_public: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
      views: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      likes: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      dislikes: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
      tags: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: true },
      module_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      tableName: 'video',
      timestamps: false,
    }
  );
  return VideoModel;
}
