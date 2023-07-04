/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import axios from 'axios';
import {ContentHeader} from '@components';
import { useQuery, useMutation, gql } from '@apollo/client';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const EmitirRecetas = () => {

  // const GET_ENTRADAS = gql`query Query {
  //   getEntradas {
  //     Cantidad
  //     Medicamento {
  //       Cantidad
  //       Codigo
  //       Componentes
  //     }
  //   }
  // }`

  // const { data, loading, error } = useQuery(GET_ENTRADAS);

  // if (loading) {
  //   console.log("a")
  // }

  // console.log(data.getEntradas.getEntradas)

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
            Componentes
            Cantidad
            Codigo
          }
          id
        }
      }`
    })
  }

  React.useEffect( () => {

    fetch("http://localhost:8090/graphql", options)
      .then(res => res.json())
      .then(res => {
        // console.log(res.data.getEntradas);
        setEntradas(res.data.getEntradas);
      })

    // axios.request(options)
    //   .then(res => {
    //     setEntradas(res.data);
    //   })
  }, [])
  

  // console.log("hols")
  // console.log(test);
  console.log(entradas);

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
                <Column field="Cantidad" header="Cantidad"></Column>
                <Column field="Medicamento.Cantidad" header="Medicamento.Cantidad"></Column>
                <Column field="Medicamento.Codigo" header="Medicamento.Codigo"></Column>
                <Column field="Medicamento.Componentes" header="Medicamento.Componentes"></Column>
              </DataTable>
              {
                
              }
            </div>
            <div className="card-footer">wena peresozo</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmitirRecetas;
