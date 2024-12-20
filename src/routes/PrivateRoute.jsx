import PropTypes from 'prop-types'
import { Navigate, useLocation } from 'react-router-dom'
import useUser from '../Hook/useUser'

const PrivateRoute = ({ children }) => {
  const { user, loading } = useUser()
  const location = useLocation()

  if (loading) return <div className="w-full min-h-screen flex items-center justify-center"><div className="loading loading-lg loading-dots"></div></div>
  if (user) return children
  return <Navigate to='/login' state={location.pathname} replace='true' />
}

PrivateRoute.propTypes = {
  children: PropTypes.element,
}

export default PrivateRoute
