const SERVER = {
    ERR: {
        INTERNAL_ERROR: 'Internal server error',
        EXPIRED_TOKEN: 'Authentication failed: Token has expired',
        MISSING_TOKEN: 'Authentication failed: Token is required',
        USER_NOT_FOUND: 'Authentication failed: User not found',
        DELETE_INVALID_TOKENS_FAILED: "Falha ao deletar tokens inválidos.",
        SESSION_NOT_VALID: "Sessão inválida. Faça login novamente.",
        UNAUTHORIZED_USER: "Acesso não autorizado. Verifique sua sessão ou faça login novamente.",
        TOKEN_ALREADY_INVALID: "Este token já foi invalidado. Você está desconectado."
    },
    SUCCESS: {
        INVALID_TOKENS_DELETED: "Sessões inválidas removidas com sucesso.",
        LOGOUT_SUCCESSFUL: "Você foi desconectado com sucesso."

    }
}

export default SERVER;