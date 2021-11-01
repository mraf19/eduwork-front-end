import React, { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { logoutUser } from '../../app/api/auth';
import { userLogout } from '../../app/features/Auth/actions'

export default function Logout() {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    logoutUser()
    .then(_ => dispatch(userLogout()))
    .then(_ => history.push('/'));
  }, [dispatch, history])
  return (
    <div className="d-flex justify-content-center">
      <div className="text-center">
        <Spinner animation="grow" variant="danger"/>
        <p className="text-muted">Loging out...</p>
      </div>
    </div>
  )
}
