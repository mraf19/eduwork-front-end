import React from 'react'
import { Card, Placeholder } from 'react-bootstrap'

export default function CardProductPlaceholder() {
  return (
    <Card>
      <Card.Img variant="top" src="https://via.placeholder.com/400x250" style={{maxHeight: '180px'}} />
      <Card.Body>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder lg={12}/>
        </Placeholder>
        <Placeholder as={Card.Subtitle} animation="glow">
          <Placeholder xs={6} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={12} />
        </Placeholder>
        <br />
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder sm={8} />
        </Placeholder>
        <Placeholder.Button variant="primary" xs={3}/>
      </Card.Body>
    </Card>
  )
}
