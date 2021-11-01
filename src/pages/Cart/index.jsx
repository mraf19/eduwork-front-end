import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Card, Container, Button, Image } from 'react-bootstrap'
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { config } from '../../config';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { addItem, removeItem } from '../../app/features/Cart/actions';
import { formatRupiah, sumPrice } from '../../utils';
import { useHistory } from 'react-router-dom';


export default function Cart() {
  const cart = useSelector(state => state.cart);
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const history = useHistory();
  
  const handlePlus = item => {
    dispatch(addItem(item));
  }

  const handleMinus = item => {
    dispatch(removeItem(item));
  }

  const columns = [
    {
      name: 'Gambar',
      selector: row => <Image style={{maxHeight: '100px'}} src={`${config.api_host}/images/products/${row.image_url}`} rounded />
    },
    {
      name: 'Barang',
      selector: row => row.name
    },
    {
      name: 'Harga',
      selector: row => formatRupiah(row.price * row.qty)
    },
    {
      name: 'Qty',
      cell: row => (<div>
        <Button variant="primary" size="sm" onClick={() => handleMinus(row)}>
          <FontAwesomeIcon icon={solid('minus')}/>
        </Button>
        <span className="mx-4">{row.qty}</span>
        <Button variant="primary" size="sm" onClick={() => handlePlus(row)}>
          <FontAwesomeIcon icon={solid('plus')} />
        </Button>
        </div>),
      center: true
    },
  ]

  return (
    <Container className="mt-5 p-5">
      <Card>
        <Card.Header>
          keranjang Belanja
        </Card.Header>
        <Card.Body>
          <DataTable
            columns={columns}
            data={cart}
            striped
            title={`Sub Total: ${formatRupiah(sumPrice(cart))}`}
          />
        </Card.Body>
        <Card.Footer>
        <div className="d-grid gap-2">
          { cart.length > 0 && auth.user ? 
          <Button variant="primary" size="md" onClick={_ => history.push('/checkout')}>
            Checkout
          </Button> : null
          }
        </div>
        </Card.Footer>
      </Card>
    </Container>
  )
}
