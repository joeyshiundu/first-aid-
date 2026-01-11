import { VideoEntity } from '../entities/video.entity';

export interface IVideoRepository {
  findById(videoId: number): Promise<VideoEntity | null>;
  findByModuleId(moduleId: number): Promise<VideoEntity[]>;
  create(video: VideoEntity): Promise<VideoEntity>;
  update(video: VideoEntity): Promise<VideoEntity | null>;
  delete(videoId: number): Promise<boolean>;
  findAll(): Promise<VideoEntity[]>;
  findByUserId(userId: number): Promise<VideoEntity[]>;
}