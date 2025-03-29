const SERVER = {
    ERR: {
        INTERNAL_ERROR: 'Internal server error',
        EXPIRED_TOKEN: 'Authentication failed: Token has expired',
        MISSING_TOKEN: 'Authentication failed: Token is required',
        USER_NOT_FOUND: 'Authentication failed: User not found',
        DELETE_INVALID_TOKENS_FAILED: "Falha ao deletar tokens inválidos.",
        SESSION_NOT_VALID: "Sessão inválida. Faça login novamente."
    },
    SUCCESS: {
        INVALID_TOKENS_DELETED: "Sessões inválidas removidas com sucesso."

    }
}

export default SERVER;