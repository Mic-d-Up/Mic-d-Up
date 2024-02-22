import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";

export default function SiteHeadingAndNav() {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <header>
      <a id='logo' href='/'>Mic'd Up</a>
      <nav>
        <ul>
          <li><div className="nav-link"><NavLink to='/home' activeClassName='active'>Home</NavLink></div></li>
          <li><div className="nav-link"><NavLink to='/users' end={true} activeClassName='active'>Members</NavLink></div></li>
          {currentUser && <li><div className="nav-link"><NavLink to={`/users/${currentUser.id}`}>{currentUser.username}</NavLink></div></li>}
        </ul>
      </nav>
    </header>
  );
}

