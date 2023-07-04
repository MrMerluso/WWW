/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import axios from 'axios';

import {ContentHeader} from '@components';
import { useQuery, useMutation, gql } from '@apollo/client';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const Preescripciones = () => {



  const [prescripciones, setPrescripciones] = React.useState(null);

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    // url: "http://localhost:8090/graphql",
    body: JSON.stringify({
      query: `query Query {
        getPrescripciones {
          Nombre
          Edad
          Fecha
          Direccion
          Medicamento {
            Nombre
            Codigo
          }
          Cantidad
          Detalle
        }
      }`
    })
  }

  React.useEffect( () => {

    fetch("http://localhost:8090/graphql", options)
      .then(res => res.json())
      .then(res => {
        // console.log(res.data.getEntradas);
        setPrescripciones(res.data.getPrescripciones);
      })

    // axios.request(options)
    //   .then(res => {
    //     setEntradas(res.data);
    //   })
  }, [])
  

  // console.log("hols")
  // console.log(test);
  // console.log(entradas);

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
              value={prescripciones}>
                <Column field="Nombre" header="Nombre Paciente"></Column>
                <Column field="Edad" header="Edad Paciente"></Column>
                <Column field="Fecha" header="Fecha"></Column>
                <Column field="Direccion" header="Direccion"></Column>

                <Column field="Medicamento.Codigo" header="Medicamento Prescrito"></Column>
                <Column field="Medicamento.Componentes" header="Componentes"></Column>

                <Column field="Cantidad" header="Cantidad Prescrita"></Column>
                <Column field="Detalle" header="Detalle"></Column>

              </DataTable>
              {
                
              }
            </div>
            <div className="card-footer">Footer</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Preescripciones;
