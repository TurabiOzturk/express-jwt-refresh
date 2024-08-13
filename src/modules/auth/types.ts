export interface RefreshTokenDb {
    id: number;
    userId: number;
    revokedAt?: string;
    expiresAt: string;
    createdAt: string;
    updatedAt: string;
}

export interface RefreshToken extends Omit<RefreshTokenDb, 'createdAt' | 'updatedAt' | 'revokedAt' | 'expiresAt'> {
    revokedAt?: Date;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface AtPayload {
    sub: number;
    iat: number;
    exp: number;
}

export interface RtPayload extends AtPayload {
    jti: number;
}
