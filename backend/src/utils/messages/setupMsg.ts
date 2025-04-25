const SETUP = {
    ERR: {
        MISSING_FIELDS: "Por favor, para fazer a configuração, todos campos necessários devem ser preenchidos!",
        INVALID_TOKEN: "O token fornecido não é válido.",
        SEND_EMAIL_FAILED: "Falha ao enviar e-mail de confirmação.",
        MISSING_MAIL_ENV: "ADMIN_MAIL não configurado.",
        INITIAL_SETUP_NOT_COMPLETED: "A configuração inicial ainda não foi concluída, não será possível continuar com a requisição atual!"
    },
    SUCCESS: {
        ALREADY_COMPLETED: "A configuração inicial para o super-admin já foi completada.",
        ADMIN_CREATED: "Super-admin criado com sucesso! Para acessar o sistema, por favor, verifique seu e-mail e clique no link enviado. Caso não encontre o e-mail, verifique a caixa de spam ou a lixeira. Se o problema não for resolvido, por favor, contate o nosso suporte."

    }
}

export default SETUP;