/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import axios from 'axios';
import {ContentHeader} from '@components';
import { useQuery, useMutation, gql } from '@apollo/client';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const VerStock = () => {

  const [sotck, setStock] = React.useState(null);

  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: `query Query {
        getMedicamentos {
          Codigo
          Nombre
          Descripcion
          Fabricante
          Tipo
          Componentes
          Contenido
          Cantidad
          Gramaje
        }
      }`
    })
  }

  React.useEffect( () => {

    fetch("http://localhost:8090/graphql", options)
      .then(res => res.json())
      .then(res => {
        // console.log(res.data.getEntradas);
        setStock(res.data.getMedicamentos);
      })

    // axios.request(options)
    //   .then(res => {
    //     setEntradas(res.data);
    //   })
  }, [])
  

  // console.log("hols")
  // console.log(test);
  // console.log(stock);

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
              value={sotck}>
                <Column field="Nombre" header="Nombre Medicamento"></Column>
                <Column field="Cantidad" header="Cantidad Disponible"></Column>
                <Column field="Fabricante" header="Fabricante"></Column>
                <Column field="Gramaje" header="Gramaje"></Column>
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

export default VerStock;
