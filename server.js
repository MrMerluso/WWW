const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const { ApolloServer, gql } = require ('apollo-server-express');
//const {graphqlExpress, graphiqlExpress}= require('graphql-server-express');
//const {makeExecutableSchema} = require ('graphql-tools');

const {merge} = require('lodash');

mongoose.connect('mongodb+srv://Cluster91544:SmVFT0xGfXtI@cluster91544.psibdgw.mongodb.net/dbcesfam?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})

const Receta = require('./models/receta');
const Entrada = require('./models/entrada');
const Salida = require('./models/salida');
const Prescripcion = require('./models/prescripcion');
const Stockmeds = require('./models/stockmeds');

const typeDefs = gql`
    type Stockmeds{
        id: ID!
        Codigo: Int!
        Descripcion: String!    
        Fabricante: String!
        Tipo: String!
        Componentes: String!
        Contenido: String!
        Cantidad: Int!
        Gramaje: Int!
    }

    type Alert{
        message: String
    }

    input MedicamentoInput {
        Codigo: Int!
        Descripcion: String!
        Fabricante: String!
        Tipo: String!
        Componentes: String!
        Contenido: String!
        Cantidad: Int!
        Gramaje: Int!
    }
    
    type Query {
        getMedicamentos: [Stockmeds]
        getMedicamento(id : ID!) : Stockmeds

        getEntradas: [Entrada]
        getEntrada(id: ID!) : Entrada
    }

    type Mutation{
        addMedicamento(input: MedicamentoInput): Stockmeds
        updateMedicamento(Codigo:ID!, input:MedicamentoInput) : Stockmeds
        deleteMedicamento(Codigo:ID!) : Alert
    
        addEntrada(input: EntradaInput): Entrada
        updateEntrada(Codigo: ID!, input: EntradaInput): Entrada
    }

    type Entrada{
        id: ID!
        Medicamento: Stockmeds!
        Cantidad: Int!
    }

    input EntradaInput {
    Medicamento: MedicamentoInput!
    Cantidad: Int!
    }

`;

const resolvers= {
    Query: {
        //MEDICAMENTOS
        async getMedicamentos(obj){ // Get ALL
            const medicamentos = await Stockmeds.find();
            return medicamentos;
        },
        async getMedicamento(obj, {id}){ // Get ONE
            const medicamento= await Stockmeds.findById(id);
            return medicamento;
        }
        /* // RECETA
        async getRecetas(obj){
            const receta = await Receta.find();
            return receta;
        },
        // PREESCRIPCION
        async getPrescripcionPendiente(obj){
            const prescripcion = await Prescripcion.find();
            return prescripcion;
        },
        async postPrescripcion(obj, {input}){
            const prescripcion = new Prescripcion(input);
            await prescripcion.save();
            return prescripcion;
        } */
        
    },
    Mutation: {
        // MEDICAMENTO 
        async addMedicamento(obj, {input}){
            const medicamento = new Stockmeds(input);
            await medicamento.save();
            return medicamento;
        },
        async updateMedicamento(obj, {id, input}){
            const medicamento = await Stockmeds.findByIdAndUpdate(id, input);
            return medicamento;
        },
        async deleteMedicamento(obj, {id}){
            await Stockmeds.deleteOne({_id : id});
            return {
                message: 'Medicamento Eliminado'
            }
        },
        async addEntrada(obj, {input}){
            const entrada = new Entrada(input);
            await entrada.save();
            return entrada;
        }

       /*  updateEntrada(Codigo: ID!, input: EntradaInput): Entrada */
        // RECETA
        /* async addReceta(obj, {input}){
            const receta = new Receta(input);
            await receta.save();
            return receta;
        },
        async updateReceta(obj, {id, input}){
            const receta = await Receta.findByIdAndUpdate(id, input);
            return medicamento;
        } */
    }
}

let apolloServer = null;

const corsOptions = {
    origin: 'http://localhost:8090',
    credentials: false
};

async function startServer(){
    const apolloServer = new ApolloServer({typeDefs, resolvers, corsOptions});
    await apolloServer.start();
    
    apolloServer.applyMiddleware({app,cors:false});
    
}

startServer();

const app = express();
app.use(cors());
app.listen(8090,function(){
    console.log('Servidor Iniciado');
}) 