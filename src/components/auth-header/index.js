import './style.css';
import {Link} from 'react-router-dom';
import SideLayout from '../side-layout';

function AuthHeader(props) {
  return (
    <SideLayout padding="medium" side="end">
      <div className="auth-header">
        <div className="link">
          <Link to={props.link}>
            <button>Вход</button>
          </Link>
        </div>
      </div>
    </SideLayout>
  );
}

export default AuthHeader;
