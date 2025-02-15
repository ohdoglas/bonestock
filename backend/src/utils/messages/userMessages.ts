const USER = {
    ERR: {
        MISSING_FIELDS: "Por favor, preencha todos os campos obrigatórios (nome de usuário, e-mail e senha).",
        INVALID_USERNAME: "Por favor, insira um nome de usuário válido.",
        INVALID_EMAIL: "Por favor, insira um e-mail válido.",
        WEAK_PASSWORD: `Senha muito fraca!
        A senha deve conter os seguintes critérios:
        - Pelo menos uma letra maiúscula.
        - Pelo menos um número.
        - Pelo menos um caractere especial.
        - No mínimo seis caracteres.`,
        NOT_UNIQUE_USERNAME: "O nome de usuário fornecido já existe.",
        NOT_UNIQUE_EMAIL: "O e-mail inserido já está cadastrado.",
        USER_NOT_FOUND: "Usuário não encontrado. Por favor, confirme suas credenciais e tente novamente.",
        MISSING_EMAIL_CONFIRM_TOKEN: `Um token é necessário para confirmar seu e-mail. Por favor, use o link enviado para seu e-mail, que se parece com este: "https:seudominio/token".`,
        INVALID_CONFIRMATION_TOKEN: `O token fornecido é inválido ou não corresponde a nenhum usuário cadastrado.
        Um token é necessário para confirmar seu e-mail. Por favor, use o link enviado para seu e-mail, que se parece com este:
        "https:seudominio/token".`,
        ALREADY_VERIFIED: "Parece que seu e-mail já foi confirmado. Se tiver dúvidas ou precisar de mais assistência, entre em contato com nossa equipe de suporte.",
        MISSING_USERNAME_EMAIL: "E-mail ou nome de usuário é obrigatório.",
        MISSING_PASSWORD: "Senha é obrigatória.",
        INVALID_LOGIN_CREDENTIALS: "E-mail/nome de usuário ou senha inválidos.",
        EMAIL_CONFIRMATION_REQUIRED: "Seu endereço de e-mail ainda não foi confirmado. Por favor, confirme seu e-mail antes de tentar fazer login. Verifique sua caixa de entrada para encontrar o e-mail de confirmação ou solicite um novo, se necessário.",
        ACCOUNT_NOT_ACTIVE: "Sua conta está atualmente inativa. Para resolver esse problema, entre em contato com nossa equipe de suporte. Estamos aqui para ajudar!"
    },
    SUCCESS: {
        EMAIL_CONFIRMATION: "Confirmação de e-mail concluída com sucesso! Agora você pode acessar sua conta.",
        CONFIRM_EMAIL_SENT: `Sua conta foi criada com sucesso. Para ativá-la, verifique seu e-mail e clique no link de confirmação que enviamos.
        Se não encontrar o e-mail na sua caixa de entrada, verifique a pasta de spam ou lixo eletrônico.`,
    }
}

export default USER;
