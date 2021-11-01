import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import { LinkContainer } from 'react-router-bootstrap'
import { Button } from 'react-bootstrap'
import { getAddress } from '../../app/api/address';

export default function Address() {
  const [address, setAddress] = useState([]);
  useEffect(() => {
    getAddress()
    .then(({data: {data}}) => setAddress(data));
  }, []);

  return (
    <div>
      <LinkContainer to="/account/add-address">
        <Button variant="danger" size="sm">
          Tambah Alamat
        </Button>
      </LinkContainer>
      <DataTable 
        columns={[
          {
            name: 'Nama',
            selector: row => row.nama
          }, 
          {
            name: 'Detail',
            cell: row => `${row.provinsi}, ${row.kabupaten}, ${row.kecamatan}, ${row.kelurahan}, ${row.detail}`
          }
        ]}
        data={address}
      />
    </div>
  )
}
