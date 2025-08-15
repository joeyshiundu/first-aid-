import { Sequelize } from 'sequelize';
import { initUserModel, UserModel } from './user';
import { initModuleModel, ModuleModel } from './module';
import { initModuleProgressModel, ModuleProgressModel } from './module_progress';
import { initBioDataModel, BioDataModel } from './bio_data';
import { initCertificationDetailsModel, CertificationDetailsModel } from './certification_details';
import { initChatMessageModel, ChatMessageModel } from './chat_message';
import { initChatSessionModel, ChatSessionModel } from './chat_session';
import { initContactDataModel, ContactDataModel } from './contact_data';
import { initEmergencyLogModel, EmergencyLogModel } from './emergency_log';
import { initVideoModel, VideoModel } from './video';
import { initWHONotificationModel, WHONotificationModel } from './who_notification';

export function initializeModels(sequelize: Sequelize) {
  // Initialize all models
  const models = {
    user: initUserModel(sequelize),
    module: initModuleModel(sequelize),
    module_progress: initModuleProgressModel(sequelize),
    bio_data: initBioDataModel(sequelize),
    certification_details: initCertificationDetailsModel(sequelize),
    chat_message: initChatMessageModel(sequelize),
    chat_session: initChatSessionModel(sequelize),
    contact_data: initContactDataModel(sequelize),
    emergency_log: initEmergencyLogModel(sequelize),
    video: initVideoModel(sequelize),
    who_notification: initWHONotificationModel(sequelize),
  };

  // Set up associations
  Object.values(models).forEach(model => {
    if ('associate' in model && typeof (model as any).associate === 'function') {
      (model as any).associate(models);
    }
  });

  return {
    ...models,
    sequelize,
  };
}
