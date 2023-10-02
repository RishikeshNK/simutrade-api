import db from '../../utils/db';
import { hashToken } from '../../utils/hashToken';

interface RefreshToken {
  id: string;
  hashedToken: string;
  userId: string;
  revoked: boolean;
}

async function addRefreshTokenToWhitelist({ jti, refreshToken, userId }: { jti: string, refreshToken: string, userId: string }): Promise<RefreshToken> {
  return db.refreshToken.create({
    data: {
      id: jti,
      hashedToken: hashToken(refreshToken),
      userId,
    },
  });
}

async function findRefreshTokenById(id: string): Promise<RefreshToken | null> {
  return db.refreshToken.findUnique({
    where: {
      id,
    },
  });
}

async function deleteRefreshToken(id: string): Promise<RefreshToken> {
  return db.refreshToken.update({
    where: {
      id,
    },
    data: {
      revoked: true,
    },
  });
}

async function revokeTokens(userId: string): Promise<{ success: boolean }> {
    await db.refreshToken.updateMany({
      where: {
        userId,
      },
      data: {
        revoked: true,
      },
    });
  
    return { success: true };
  }

export { addRefreshTokenToWhitelist, findRefreshTokenById, deleteRefreshToken, revokeTokens };
