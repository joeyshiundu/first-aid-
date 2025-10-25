import express, { Request, Response, NextFunction } from 'express';
import { GetUserEmergencyLogsUseCase } from '../../application/usecases/emergency/get-user.emergency.use-case';
import { EmergencyRepository } from '../../domains/emergency/repositories/emergency.repository';

const router = express.Router();

// --- Centralized Dependency Creation ---
const emergencyRepo = new EmergencyRepository();
const getUserEmergencyLogsUseCase = new GetUserEmergencyLogsUseCase(emergencyRepo);

// GET /user/:id/emergencies
router.get('/:id/emergencies', async (req: Request, res: Response, next: NextFunction) => {
  const userId = Number(req.params.id);

  try {
    const emergencies = await getUserEmergencyLogsUseCase.execute(userId);
    res.json(emergencies);
  } catch (err) {
    next(err);
  }
});

export default router;
