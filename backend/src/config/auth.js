export const getJwtSecret = () => process.env.JWT_SECRET || 'dev-secret-change-me';

export const getJwtExpiresIn = () => process.env.JWT_EXPIRES_IN || '7d';
