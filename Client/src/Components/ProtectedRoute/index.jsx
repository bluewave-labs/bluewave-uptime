import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

/**
 * ProtectedRoute is a higher-order component that wraps the `Route` component from `react-router-dom`
 * to create a protected route. It uses Redux to check if the user is authenticated. If the user is
 * authenticated, it renders the component passed to it; otherwise, it redirects the user to the login page.
 *
 * @param {Object} props - The props passed to the ProtectedRoute component.
 * @param {React.ComponentType} props.Component - The component to render if the user is authenticated.
 * @param {Object} rest - The remaining props passed to the Route component.
 * @returns {React.ReactElement} A Route component that conditionally renders the passed Component or redirects to the login page.
 */

const ProtectedRoute = ({ Component, ...rest }) => {
  const authState = useSelector((state) => state.auth);

  return authState.authToken ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" replace />
  );
};

ProtectedRoute.propTypes = {
  Component: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;
