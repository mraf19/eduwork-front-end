import React from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function BreadCrumb({items}) {
  const history = useHistory();

  return (
    <Breadcrumb>
      {
        items.map((item, i) => (
          <Breadcrumb.Item 
            key={i} 
            active={i+1 === items.length} 
            href="#" 
            onClick={ () => i + 1 !== items.length ? history.push(item.path): null }
          >{item.label}</Breadcrumb.Item>
        ))
      }
    </Breadcrumb>
  )
}

BreadCrumb.propTypes = {
  items: PropTypes.array.isRequired
}

export default BreadCrumb

