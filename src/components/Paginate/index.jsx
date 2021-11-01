import React, { useState } from 'react'
import { Pagination } from 'react-bootstrap'
import PropTypes from 'prop-types'

export default function Paginate({total, active, onSetPage}) {
  const [activePage, setActivePage] = useState(active);
  const handleClick = page => {
    onSetPage(page);
    setActivePage(page);
  }
  let items = [];
  for(let i = 1; i <= total; i++) {
    items = [...items, <Pagination.Item onClick={() => handleClick(i)} key={i} active={i === activePage}> { i } </Pagination.Item>]
  }
  return (
    <Pagination>
      <Pagination.First disabled={activePage === 1} onClick={() => setActivePage(1)}/>
      <Pagination.Prev disabled={activePage === 1} onClick={() => setActivePage(activePage - 1)} />
      { items }
      <Pagination.Next disabled={activePage === total} onClick={() => setActivePage(activePage + 1)}/>
      <Pagination.Last disabled={activePage === total} onClick={() => setActivePage(total)}/>
    </Pagination>
  )
}

Paginate.propTypes = {
  total: PropTypes.number.isRequired,
  active: PropTypes.number
}

Paginate.defaultProps = {
  active: 1
}


