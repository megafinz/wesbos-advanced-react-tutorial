import PropTypes from 'prop-types';
import { useUser } from './User';
import SignIn from './SignIn';

export default function PleaseSignIn({ children }) {
  const user = useUser();
  if (!user) {
    return <SignIn />;
  }
  return children;
}

PleaseSignIn.propTypes = {
  children: PropTypes.any,
};
