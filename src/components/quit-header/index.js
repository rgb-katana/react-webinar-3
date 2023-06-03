import './style.css';
import {Link} from 'react-router-dom';
import SideLayout from '../side-layout';

function QuitHeader(props) {
  return (
    <SideLayout padding="medium" side="end">
      <div className="quit-header">
        <div className="link">
          <Link to={props.link}>{props.name}</Link>
        </div>
        <div className="link">
          <button onClick={props.onLogout}>Выход</button>
        </div>
      </div>
    </SideLayout>
  );
}

export default QuitHeader;
