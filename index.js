const customExpress = require('./config/customExpress');
const conexao = require('./database/conexao');
const tabelas = require('./database/tabelas');

conexao.connect((erro) => {
    if(erro) {
        console.log(erro);
    } else {
        console.log('conectado com sucesso!');
        tabelas.init(conexao);
        const app = customExpress();
        app.listen(3000, () => console.log('Servidor Online'));
    }
});



