class Tabelas {
    init(conexao) {
        this.conexao = conexao;
        this.criarAtendimentos();
    }

    criarAtendimentos() {
        const sql = `
            CREATE TABLE IF NOT EXISTS Atendimentos (
            id INT NOT NULL AUTO_INCREMENT,
            cliente VARCHAR(50) NOT NULL,
            pet VARCHAR(20),
            servico VARCHAR(20) NOT NULL,
            data DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            dataCriacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id)
        )`;
        this.conexao.query(sql, (erro) => {
            if (erro) {
                console.log(erro);
            }
        });
    }
}

module.exports = new Tabelas;