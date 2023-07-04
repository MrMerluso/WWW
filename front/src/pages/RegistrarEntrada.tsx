/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import axios from 'axios';
import {ContentHeader} from '@components';
import { useQuery, useMutation, gql } from '@apollo/client';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Modal from 'react-modal';

const RegistrarEntrada = () => {

  const [entradas, setEntradas] = React.useState(null);

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    // url: "http://localhost:8090/graphql",
    body: JSON.stringify({
      query: `query Query {
        getEntradas {
          Cantidad
          Medicamento {
            Nombre
            Codigo
          }
          id
        }
      }`
    })
  }

  

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  }

  const handleCloseModal = () => {
    setModalIsOpen(false);
  }

  React.useEffect( () => {

    fetch("http://localhost:8090/graphql", options)
      .then(res => res.json())
      .then(res => {
        // console.log(res.data.getEntradas);
        setEntradas(res.data.getEntradas);
      })
  }, [])
  
  const [medicamento, setMedicamento] = useState('');
  const [cantidad, setCantidad] = useState(0);

  const handleMedicamentoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMedicamento(event.target.value);
  };

  const handleCantidadChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCantidad(Number(event.target.value));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const submitOptions = {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      // url: "http://localhost:8090/graphql",
      body: JSON.stringify({
        query: `mutation Mutation($name: String!, $cantidad: Int!) {
          addEntrada(name: $name, cantidad: $cantidad) {
            message
          }
        }`,
        variables: {
          name: medicamento,
          cantidad: cantidad,
        }
      })
    }

    fetch("http://localhost:8090/graphql", submitOptions)
        .then(res => res.json())

    // Aquí haces la wea que quieras con los datos.
    console.log('Medicamento:', medicamento);
    console.log('Cantidad:', cantidad);
  };


  return (
    <div>
      <ContentHeader title="Blank Page" />
      <section className="content">
        <div className="container-fluid">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Title</h3>
              <div className="card-tools">
                <button
                  type="button"
                  className="btn btn-tool"
                  data-widget="collapse"
                  data-toggle="tooltip"
                  title="Collapse"
                >
                  <i className="fa fa-minus" />
                </button>
                <button
                  type="button"
                  className="btn btn-tool"
                  data-widget="remove"
                  data-toggle="tooltip"
                  title="Remove"
                >
                  <i className="fa fa-times" />
                </button>
              </div>
            </div>
            <div className="card-body">
              <DataTable
              value={entradas}>
                <Column field="id" header="ID"></Column>
                <Column field="Cantidad" header="Cantidad Ingresada"></Column>
                <Column field="Medicamento.Codigo" header="Codigo Medicamento"></Column>
                <Column field="Medicamento.Nombre" header="Nombre Medicamento"></Column>
              </DataTable>
              {
                
              }
            </div>
            <div className="card-footer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Footer</span>
              <button onClick={handleOpenModal}>Registrar entrada</button>
            </div>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={handleCloseModal}
              contentLabel="Example Modal"
              style={{
                overlay: {
                  backgroundColor: 'rgba(0, 0, 0, 0.75)'  // Overlay con fondo oscuro
                },
                content: {
                  color: 'lightsteelblue',  // Texto de color azul claro
                  top: '50%',
                  left: '50%',
                  right: 'auto',
                  bottom: 'auto',
                  marginRight: '-50%',
                  transform: 'translate(-50%, -50%)',
                  padding: '20px',  // Aumenta el padding del contenido del modal
                  width: '50%',     // El ancho del modal será el 50% de la pantalla
                  height: '50%'     // La altura del modal será el 50% de la pantalla
                }
              }}
            ><h2>Registrar entrada de medicamento</h2>
              <form onSubmit={handleSubmit}>
                <label>
                  Nombre del medicamento:
                  <input type="text" value={medicamento} onChange={handleMedicamentoChange} />
                </label>
                <label>
                  Cantidad:
                  <input type="number" value={cantidad} onChange={handleCantidadChange} />
                </label>
                <input type="submit" value="Registrar" />
              </form>
              <button onClick={handleCloseModal}>Cerrar</button>
            </Modal>
          </div>
                      
          
          
        </div>
      </section>
    </div>
  );
};

export default RegistrarEntrada;
