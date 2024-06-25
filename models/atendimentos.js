const conexao = require('../database/conexao');
const moment = require('moment');

class Atendimento {
    adiciona(atendimento, res){
        const dataFormatada = moment(atendimento.data, 'DD/MM/YYYY', true);
        
        if(!dataFormatada.isValid()){
            return res.status(400).json({ error: 'Data de atendimento inválida. Utilize o formato DD/MM/YYYY.' });
        }

        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');
        const data = dataFormatada.format('YYYY-MM-DD HH:MM:SS');
        
        const dataValida = moment(data).isSameOrAfter(dataCriacao);
        const clienteValido = atendimento.cliente.length >= 5;

        const validacoes = [
            {
                nome: 'data',
                valido: dataValida,
                mensagem: 'Data deve ser amior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteValido,
                mensagem: 'Cliente deve ter pelo menos cinco catacteres'
            }
        ];

        const erros = validacoes.filter(campo => !campo.valido);
        const existemErros = erros.length;

        if(erros){
            res.status(400).json(erros);
        } else {
            res.staus(201).json(resultados);
        }
        
        const atendimentoDatado = {...atendimento, dataCriacao, data};
        const sql = 'INSERT INTO Atendimentos SET ?';

        conexao.query(sql, atendimentoDatado, (erro, resultado) => {
            if(erro){
                res.status(400).json(erro);
            } else {
                res.status(201).json(resultado);
            }
        });
    }

    lista(res){
        const sql = 'SELECT * FROM Atendimentos';

        conexao.query(sql, (erro, resultados) => {
            if(erro){
                res.status(400).json(erro);
            }else {
                res.status(200).json(resultados);
            }
        });
    }

    buscaPorId(id, res){
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`;
        
        conexao.query(sql, (erro, resultados) => {
            const atendimento = resultados[0];
            if(erro){
                res.status(400).json(erro);
            } else {
                res.status(200).json(atendimento);
            }
        });
    }
}

module.exports = new Atendimento;