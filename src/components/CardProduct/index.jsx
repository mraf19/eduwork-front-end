import React from 'react'
import { config } from '../../config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro'
import { Card, Button } from 'react-bootstrap'
import Tag from '../Tag'
import { useDispatch } from 'react-redux'
import { toggleTags } from '../../app/features/Product/actions'
import { formatRupiah } from '../../utils'

export default function CardProduct({item, onAddToCart}) {
  const dispatch = useDispatch();
  return (
    <Card>
      <Card.Img variant="top" src={`${config.api_host}/images/products/${item.image_url}`} style={{maxHeight: '180px'}} />
      <Card.Body>
        <Card.Title>{ item.name }</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{ item.category.name }</Card.Subtitle>
        <Tag items={item.tags} onClick={tag => dispatch(toggleTags(tag))} />
        <br />
        <Card.Text>
          { formatRupiah(item.price) }
        </Card.Text>
        <Button variant="primary" onClick={() => onAddToCart()}>
          <FontAwesomeIcon icon={solid('cart-plus')} />
        </Button>
      </Card.Body>
    </Card>
  )
}
