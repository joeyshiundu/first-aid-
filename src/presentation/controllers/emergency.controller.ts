import express, { Request, Response, NextFunction } from 'express';
import { createAuthMiddleware } from '../middleware/auth.middleware';
import { TokenService } from '../../application/services/token.service';
import { EmergencyRepository } from '../../domains/emergency/repositories/emergency.repository';
import { GetUserEmergencyLogsUseCase } from '../../application/usecases/emergency/get-user.emergency.use-case';
// NOTE: The following use cases are placeholders and would need to be created.
// import { CreateEmergencyLogUseCase } from '../../application/usecases/emergency/create-emergency-log.use-case';

const router = express.Router();

// --- Dependencies ---
const tokenService = new TokenService();
const emergencyRepo = new EmergencyRepository();
const getUserEmergencyLogsUseCase = new GetUserEmergencyLogsUseCase(emergencyRepo);
// const createEmergencyLogUseCase = new CreateEmergencyLogUseCase(emergencyRepo);

// --- Middleware ---
const authMiddleware = createAuthMiddleware(tokenService);

// All routes in this controller are protected
router.use(authMiddleware);

// GET /emergencies - Get all logs for the logged-in user
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    // Safely access the user ID. This is more robust than using the '!' non-null assertion.
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized: User ID missing from token.' });

    try {
        // This reuses the existing use case, but scoped to the authenticated user
        const emergencies = await getUserEmergencyLogsUseCase.execute(userId);
        res.json(emergencies);
    } catch (err) {
        next(err);
    }
});

// POST /emergencies - Create a new log for the logged-in user
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
    // Safely access the user ID.
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized: User ID missing from token.' });

    try {
        // const logData = CreateEmergencyLogSchema.parse(req.body);
        // const newLog = await createEmergencyLogUseCase.execute(userId, logData);
        // res.status(201).json(newLog);
        
        // Placeholder response until use case is built
        res.status(501).json({ message: 'Create emergency log endpoint not yet implemented.' });

    } catch (err) {
        next(err);
    }
});

// You would add PUT /:id and DELETE /:id routes here as well.

export default router;