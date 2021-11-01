import React from 'react'
import { Card, Col, Container, ListGroup, Row } from 'react-bootstrap'
import { Route, Switch, useRouteMatch } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import AddAddress from '../../components/AddAddress';
import Address from '../../components/Address';
import Order from '../../components/Order';
import Profile from '../../components/Profile';
import Logout from '../../components/Logout';

export default function Account() {
  const match = useRouteMatch();

  return (
    <Container className="mt-5 p-5">
      <Card>
        <Card.Header>
          Account
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md={3}>
              <ListGroup>
                <LinkContainer to="/account" exact>
                  <ListGroup.Item action>
                    Profil
                  </ListGroup.Item>
                </LinkContainer>
                <LinkContainer to="/account/orders" exact>
                  <ListGroup.Item action>
                    Pemesanan
                  </ListGroup.Item>
                </LinkContainer>
                <LinkContainer to="/account/address" exact>
                  <ListGroup.Item action>
                    Alamat
                  </ListGroup.Item>
                </LinkContainer>
                <LinkContainer to="/account/logout" exact>
                  <ListGroup.Item action>
                    Logout
                  </ListGroup.Item>
                </LinkContainer>
              </ListGroup>
            </Col>
            <Col md={9}>
              <Switch>
                <Route path={`${match.url}`} component={Profile} exact />
                <Route path={`${match.url}/logout`} component={Logout} exact />
                <Route path={`${match.url}/orders`} component={Order} exact />
                <Route path={`${match.url}/address`} component={Address} />
                <Route path={`${match.url}/add-address`} component={AddAddress} />
              </Switch>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  )
}
