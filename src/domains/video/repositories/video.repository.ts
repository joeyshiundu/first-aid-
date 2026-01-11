import { VideoEntity } from '../entities/video.entity';
import { IVideoRepository } from './video.repository.interface';
import { VideoModel } from '../../../infrastructure/db/models/video';

export class VideoRepository implements IVideoRepository {
  async findById(videoId: number): Promise<VideoEntity | null> {
    const video = await VideoModel.findByPk(videoId);
    return video ? (video.toJSON() as VideoEntity) : null;
  }

  async findByModuleId(moduleId: number): Promise<VideoEntity[]> {
    const videos = await VideoModel.findAll({ where: { module_id: moduleId } });
    return videos.map(video => video.toJSON() as VideoEntity);
  }

  async create(video: VideoEntity): Promise<VideoEntity> {
    const newVideo = await VideoModel.create(video);
    return newVideo.toJSON() as VideoEntity;
  }

  async update(video: VideoEntity): Promise<VideoEntity | null> {
    await VideoModel.update(video, { where: { video_id: video.video_id } });
    const updated = await VideoModel.findByPk(video.video_id);
    return updated ? (updated.toJSON() as VideoEntity) : null;
  }

  async delete(videoId: number): Promise<boolean> {
    const deletedCount = await VideoModel.destroy({ where: { video_id: videoId } });
    return deletedCount > 0;
  }

  async findAll(): Promise<VideoEntity[]> {
    const videos = await VideoModel.findAll();
    return videos.map(video => video.toJSON() as VideoEntity);
  }

  async findByUserId(userId: number): Promise<VideoEntity[]> {
    const videos = await VideoModel.findAll({ where: { user_id: userId } });
    return videos.map(video => video.toJSON() as VideoEntity);
  }
}
