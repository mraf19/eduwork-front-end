import React from 'react'
import { Card } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { useSelector } from 'react-redux'

export default function Profile() {
  const auth = useSelector(state => state.auth)
  return (
    <Card>
      <Card.Body>
        <DataTable 
          columns={[
            {selector: row => row.label},
            {selector: row => row.value},
          ]}
          data={[
            {label: 'Nama', value: auth.user.full_name},
            {label: 'Email', value: auth.user.email},
          ]}
        />
      </Card.Body>
    </Card>
  )
}
