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
        "https:nossodominio/token".`,
        ALREADY_VERIFIED: "Parece que seu e-mail já foi confirmado. Se tiver dúvidas ou precisar de mais assistência, entre em contato com nossa equipe de suporte.",
        MISSING_USERNAME_EMAIL: "E-mail ou nome de usuário é obrigatório.",
        MISSING_PASSWORD: "Senha é obrigatória.",
        INVALID_LOGIN_CREDENTIALS: "E-mail/nome de usuário ou senha inválidos.",
        EMAIL_CONFIRMATION_REQUIRED: "Seu endereço de e-mail ainda não foi confirmado. Por favor, confirme seu e-mail antes de tentar fazer login. Verifique sua caixa de entrada para encontrar o e-mail de confirmação ou solicite um novo, se necessário.",
        ACCOUNT_NOT_ACTIVE: "Sua conta está atualmente inativa. Para resolver esse problema, entre em contato com nossa equipe de suporte. Estamos aqui para ajudar!",

        RESET_PASSWORD_REQUEST_MISSING_FIELDS: "Para redefinir a senha, informe seu nome de usuário ou e-mail.",
        RESET_PASSWORD_MISSING_FIELDS: "Para redefinir a senha, informe o token e nova senha.",
        RESET_PASSWORD_DOES_NOT_MATCH: "As senhas informadas não coincidem. Por favor, verifique e tente novamente.",
        RESET_PASSWORD_TOKEN_IS_EXPIRED: "Seu token de redefinição de senha não é mais válido. Por favor, solicite uma nova recuperação de senha.",
        RESET_PASSWORD_TOKEN_IS_NOT_VALID: "O token informado é inválido. Verifique se copiou corretamente ou solicite uma nova recuperação de senha.",
        RESET_PASSWORD_TOKEN_ALREDY_USED: "O token fornecido já foi utilizado! Caso ainda precise redefinir sua senha será necessário fazer uma nova requisição de redefinição de senha.",
        RESET_PASSWORD_OLD_NEW_PASSWORD_MATCH: "A nova senha não pode ser igual à senha atual. Por favor, escolha uma senha diferente.",

        EDIT_PASSWORD_MISSING_FIELDS: "Todos os campos são obrigatórios: senha atual, nova senha e confirmação da nova senha.",
        EDIT_PASSWORD_WRONG_OLD_PASSWORD: "A senha atual informada está incorreta. Por favor, verifique e tente novamente.",
        EDIT_PASSWORD_REPEAT_PASSWORD_NOT_MATCH: "A nova senha e a confirmação não coincidem. Por favor, verifique e tente novamente.",
        EDIT_PASSWORD_INVALID_INPUT_TYPE: "Todos os campos devem ser preenchidos com formatos válidos (strings).",
        EDIT_PASSWORD_OLD_NEW_PASSWORD_MATCH: "A nova senha não pode ser igual à senha atual. Por favor, escolha uma senha diferente.",

        PROFILE_INVALID_INPUT_TYPE: "Todos os campos devem ser preenchidos com formatos válidos (strings).",
        PROFILE_USER_ID_NOT_PROVIDED: "Para criar ou editar um perfil de usuário é necessário informar o ID do mesmo.",
        PROFILE_USER_OCCUPATION_NOT_PROVIDED: "Para criar ou editar um perfil de usuário é obrigatório informar sua função/ocupação",
        PROFILE_NOT_FOUND: "O perfil de usuário para o ID fornecido não foi encontrado.",
        INVALID_DATE_FORMAT: "O formato de data de aniversário fornecido não é válido. A data deve estar no formato DD/MM/AAAA",
        INVALID_UUID_FORMAT: "O formato do ID do usuário está incorreto. Por favor, forneça um UUID válido.",
        PROFILE_MISSING_MANDATORY_FIELDS: "Para editar ou criar um perfil de usuário é necessário que todos os campos obrigatórios sejam fornecidos. (User ID e Cargo/Ocupação)",
        USER_HAS_NO_MANAGE_USER_PERMISSIONS: "Você não ter permissões concedidas para editar dados de outros usuários, para obter permissões para essa ação contate seus superiores ou entre em contato com nosso suporte.",

        ADD_ROLE_MISSING_FIELDS: "Para adicionar um Papel/Permissão a um usário é preciso passar o ID e sua respectiva ROLE.",
        ADD_ROLE_INVALID_ROLE_FORMAT: "O formato de role fornecido não é um formato válido. (string)",
        ROLE_NOT_FOUND: "O nome de ROLE fornecido não é um nome válido. A ROLE fornecida não foi encontrada!",
        ADD_ROLE_USER_ACCOUNT_NOT_ACTIVE: "O usuário que vocês está tentando adicionar role está atualmente inativo. Somente usuários ativos podem receber novas ROLES. Ative a conta do usuário em questão ou então entre em contato com o nosso suporte.",
        USER_IS_NOT_OWNER: "Você não tem permissões suficientes para ceder ROLE de OWNER para o usuário informado. Somente usuários com ROLE de OWNER podem realizar está ação.",


        USER_ID_NOT_FOUND: "Houve um problema ao autenticar seu usuário, por favor, faça login novamente. Se o problema persistir, entre em contato com o nosso suporte."


    },
    SUCCESS: {
        EMAIL_CONFIRMATION: "Confirmação de e-mail concluída com sucesso! Agora você pode acessar sua conta.",
        CONFIRM_EMAIL_SENT: `Sua conta foi criada com sucesso. Para ativá-la, verifique seu e-mail e clique no link de confirmação que enviamos.
        Se não encontrar o e-mail na sua caixa de entrada, verifique a pasta de spam ou lixo eletrônico.`,

        RESET_PASSWORD_REQUEST_CREATED: "Enviamos um e-mail com instruções para redefinir sua senha. Se não encontrar na caixa de entrada, verifique a pasta de spam.",
        RESET_PASSWORD_COMPLETED: "Sua senha foi redefinida com sucesso! Enviamos um e-mail de segurança para você com a confirmação dessa alteração. Se não foi você quem solicitou essa mudança, entre em contato com nosso Suporte imediatamente.",

        EDIT_PASSWORD_COMPLETED: "Sua senha foi redefinida com sucesso! Enviamos um e-mail de segurança para você com a confirmação dessa alteração. Se não foi você quem solicitou essa mudança, entre em contato com nosso Suporte imediatamente.",

        PROFILE_CHANGES_MADE: "As alterações no perfil de usuário foram feitas com sucesso!",

        ROLE_ADDED_SUCCESSFULLY: "Ação realizada com sucesso: A ROLE especificada foi adicionada ao ID de usuário especifícado",

    }
}

export default USER;
