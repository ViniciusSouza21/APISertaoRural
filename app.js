const express = require('express');
const app = express();
const morgan = require('morgan');
//monitorar todos os métodos
const bodyParser = require('body-parser');

const rotaVendas = require('./routes/vendas');
const rotaUsuarios = require('./routes/usuarios');
const rotaProdutos = require('./routes/produtos');
const rotaPragas = require('./routes/pragas');
// const rotaPlantacoes = require('./routes/plantacoes');
// const rotaInsumos = require('./routes/insumos');
const rotaInseticidas = require('./routes/inseticidas');
// const rotaFuncionarios = require('./routes/funcionarios');
const rotaFornecedores = require('./routes/fornecedores');
// const rotaDespesas = require('./routes/despesas');
// const rotaColheitas = require('./rougit tes/colheitas');

app.use(morgan('dev')); //inicia o serviço
app.use(bodyParser.urlencoded({extended: false})); // apenas dados simples
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Acess-Control-Allow-Origin', '*'); //Escolhe o server que ode aceitar no *
    res.header('Acess-Control-Allow-Header, Origin, X-Requested-Widh, Accept, Authorization, Content-Type');

    if (res.method === 'OPTIONS'){
        res.header('Acess-Control-Allow-Methods', 'PUT, POST, DELETE, GET, PATCH');
        return res.status(200).send({});
    }

    next();

});

app.use('/vendas', rotaVendas);
app.use('/usuarios', rotaUsuarios);
app.use('/produtos', rotaProdutos);
app.use('/pragas', rotaPragas);
// app.use('/plantacoes', rotaPlantacoes);
// app.use('/insumos', rotaInsumos);
app.use('/inseticidas', rotaInseticidas);
// app.use('/funcionarios', rotaFuncionarios);
app.use('/fornecedores', rotaFornecedores);
// app.use('/despesas', rotaDespesas);
// app.use('/colheitas', rotaColheitas);

//Respostas de erros (Caso não entre em nenhuma rota acima)
app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status(404);
    next(erro);
});

app.use((error, req, res, next) => {
    //O código 500 é um status de erro HTTP que indica uma dificuldade de processamento do servidor
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});

module.exports = app;