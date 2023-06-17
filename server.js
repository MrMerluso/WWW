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
        Nombre: String!
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
        Nombre: String!
        Descripcion: String!
        Fabricante: String!
        Tipo: String!
        Componentes: String!
        Contenido: String!
        Cantidad: Int!
        Gramaje: Int!
    }

    type Entrada{
        id: ID!
        Medicamento: Stockmeds!
        Cantidad: Int!
    }

    type Salida{
        id: ID!
        Medicamento: Stockmeds!
        Cantidad: Int!
        Nombre: String!
        Rut: String!
    }
    
    type Receta{
        id: ID!
        Nombre: String!
        Edad: Int!
        Rut: String!
        Medicamento: Stockmeds!
        Cantidad: Int!
        Observaciones: String!
    }

    input RecetaInput{
        nombrePaciente: String!
        edad: Int!
        rut: String!
        nombreMedicamento: String!
        cantidad: Int!
        observaciones: String!
    }

    type Prescripcion{
        id: ID!
        Nombre: String!
        Edad: Int!
        Fecha: String!
        Direccion: String!
        Medicamento: Stockmeds!
        Cantidad: Int!
        Detalle: String!
    }

    

    input EntradaInput {
        Medicamento: MedicamentoInput!
        Cantidad: Int!
    }
    
    type Query {
        getMedicamentos: [Stockmeds]
        getMedicamento(id: ID!) : Stockmeds
        getMedicamentoByName(name: String!) : Stockmeds

        getEntradas: [Entrada]

        getSalidas: [Salida]

        getRecetas: [Receta]

        getPrescripciones: [Prescripcion]

    }

    type Mutation{
        addMedicamento(input: MedicamentoInput): Stockmeds
        updateMedicamento(Codigo:ID!, input:MedicamentoInput) : Stockmeds
        deleteMedicamento(id:ID!) : Alert
    
        addEntrada(name: String!, cantidad: Int!): Alert
        updateEntrada(Codigo: ID!, input: EntradaInput): Entrada

        addSalida(nombreMedicamento: String!, cantidad: Int!, nombrePaciente: String!, rut: String!) : Alert
        deleteSalida(id: ID!) : Alert

        addReceta(nombrePaciente: String!, edad: Int!, rut: String!, nombreMedicamento: String!, cantidad: Int!, observaciones: String!) : Alert
        deleteReceta(id: ID!) : Alert

        addPrescripcion(nombrePaciente: String!, edad: Int!, fecha: String!, direccion: String, nombreMedicamento: String!, cantidad: Int!, detalle: String!) : Alert
        deletePrescripcion(id: ID!) : Alert
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
            const medicamento= await Stockmeds.findById({_id: id});
            return medicamento;
        },
        async getMedicamentoByName(obj, {name}){
            const medicamento = await Stockmeds.findOne({Nombre: name});
            return medicamento;
        },
        // ENTRADAS
        async getEntradas(obj){
            const entradas = await Entrada.find().populate('Medicamento').exec();
            return entradas;
        },
        // SALIDAS
        async getSalidas(obj){
            const salidas = await Salida.find().populate('Medicamento').exec();
            return salidas;
        },
        // RECETAS
        async getRecetas(obj){
            const recetas = await Receta.find().populate('Medicamento').exec();
            return recetas
        },
        // PRESCRIPCIONES
        async getPrescripciones(obj){
            const prescripciones = await Prescripcion.find().populate('Medicamento').exec();
            return prescripciones
        }


        // async getSalidas(obj){
        //     const salida = await Salida.find();
        //     return salida;
        // },
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
        // ENTRADA
        async addEntrada(obj, {name,cantidad}){
            //const medicamento = await getMedicamentoByName(name)
           
            const medicamento = await Stockmeds.findOne({Nombre: name});
            try{

                const entrada = new Entrada({Medicamento: medicamento._id, Cantidad: cantidad});
                console.log(entrada)
                await entrada.save();
                // return entrada;
                // Parche para que la funcion funcione
                return {
                    message: "Entrada agregada con éxito"
                }

            }catch{
                return{
                    message: "Error al añadir"
                }
            }
        },
        // SALIDA
        async addSalida(obj, {nombreMedicamento, cantidad, nombrePaciente, rut}){
           
            const medicamento = await Stockmeds.findOne({Nombre: nombreMedicamento});
            try{

                const salida = new Salida({Medicamento: medicamento._id, Cantidad: cantidad, Nombre: nombrePaciente, Rut: rut})

                await salida.save();
                // 
                return {
                    message: "Salida agregada con éxito"
                };

            }catch{
                return{
                    message: "Error al añadir"
                }
            }
        },

        async deleteSalida(obj, {id}){
            await Salida.deleteOne({_id: id});

            return {
                message: "Salida eliminada"
            }
        },


        //RECETA
        async addReceta(obj, {nombrePaciente, edad, rut, nombreMedicamento, cantidad, observaciones}){

            const medicamento = await Stockmeds.findOne({Nombre: nombreMedicamento});
            // console.log(medicamento)
            try{

                const receta = new Receta({Nombre: nombrePaciente, Edad: edad, Rut: rut, Medicamento: medicamento._id, Cantidad: cantidad, Observaciones: observaciones})
                await receta.save();
                // 
                return {
                    message: "Prescripción agregada con éxito"
                };

            }catch{
                return{
                    message: "Error al añadir"
                }
            }

        },

        async deleteReceta(obj, {id}){
            await Receta.findByIdAndDelete(id);
            return{
                message: "Receta eliminada",
            }
        },

        //PRESCRIPCION
        /**
         * Nota: graphql recibe la fecha como un string, por lo que hay que tener cuidado 
         * con el formato en el que se le ingresa. El formato debe ser YYYY/MM/DD o bien
         * YYYY-MM-DD. puede que haya mas formatos
         */
        async addPrescripcion(obj, {nombrePaciente, edad, fecha, direccion, nombreMedicamento, cantidad, detalle}){

            const medicamento = await Stockmeds.findOne({Nombre: nombreMedicamento});
            try{

                const prescripcion = new Prescripcion({Nombre: nombrePaciente, Edad: edad, Fecha: fecha, Direccion: direccion, Medicamento: medicamento._id, Cantidad: cantidad, Detalle: detalle})

                await prescripcion.save();
                // 
                return {
                    message: "Prescripción agregada con éxito"
                };

            }catch{
                return{
                    message: "Error al añadir"
                }
            }

        },

        async deletePrescripcion(obj, {id}){
            Prescripcion.findByIdAndDelete(id);
            return{
                message: "Prescripcion eliminada"
            }
        }




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