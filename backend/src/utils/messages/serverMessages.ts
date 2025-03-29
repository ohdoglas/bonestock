const SERVER = {
    ERR: {
        INTERNAL_ERROR: 'Internal server error',
        EXPIRED_TOKEN: 'Authentication failed: Token has expired',
        MISSING_TOKEN: 'Authentication failed: Token is required',
        USER_NOT_FOUND: 'Authentication failed: User not found',
        INVALIDATE_SESSIONS_FAILED: "Falha ao invalidar sessões.",
        SESSIONS_NOT_VALID: "Sessão inválida. Faça login novamente."
    },
    SUCCESS: {
        INVALIDATE_SESSIONS: "Sessões inválidas removidas com sucesso."

    }
}

export default SERVER;