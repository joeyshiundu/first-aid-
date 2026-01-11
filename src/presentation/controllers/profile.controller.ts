import express, { Request, Response, NextFunction } from 'express';
import { createAuthMiddleware } from '../middleware/auth.middleware';
import { TokenService } from '../../application/services/token.service';
import { UserRepository } from '../../domains/user/repositories/user.repository';
import { GetUserProfileUseCase } from '../../application/usecases/user/profile management/get-user-profile.use-case';
import { UpdateUserProfileUseCase } from '../../application/usecases/user/profile management/update-user-profile.use-case';
import { UpdateProfileSchema } from '../../domains/user/dtos/update-profile.dto';

const router = express.Router();

// --- Dependencies ---
const tokenService = new TokenService();
const userRepo = new UserRepository();
const getUserProfileUseCase = new GetUserProfileUseCase(userRepo);
const updateUserProfileUseCase = new UpdateUserProfileUseCase(userRepo);

// --- Middleware ---
const authMiddleware = createAuthMiddleware(tokenService);

// All routes in this controller are protected
router.use(authMiddleware);

// GET /profile - Get the logged-in user's profile
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    // With our type declaration, we can safely access req.user.
    // The non-null assertion '!' is no longer needed.
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized: User ID missing from token.' });

    try {
        const userProfile = await getUserProfileUseCase.execute(userId);
        if (!userProfile) {
            return res.status(404).json({ message: 'User profile not found.' });
        }
        res.json(userProfile);
    } catch (err) {
        next(err);
    }
});

// PUT /profile - Update the logged-in user's profile
router.put('/', async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized: User ID missing from token.' });

    try {
        const profileData = UpdateProfileSchema.parse(req.body);
        const updatedUser = await updateUserProfileUseCase.execute(userId, profileData);
        res.json({ message: 'Profile updated successfully.', user: updatedUser });
    } catch (err) {
        next(err);
    }
});

export default router;