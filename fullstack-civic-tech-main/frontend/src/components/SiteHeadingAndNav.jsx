import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";

export default function SiteHeadingAndNav() {
  const { currentUser } = useContext(CurrentUserContext);

  return <header>
    <a id='logo' href='/'>
    <img className="logoImg"src='https://www.bing.com/th?id=OIP.ruyiafHE8t4WJYZUX8mH_gHaH9&w=96&h=106&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2' alt="Mic'd Up Logo"/>
    </a>
    <nav>
      <ul>
        <li><NavLink to='/home'>Hub</NavLink></li>
        <li><NavLink to='/users' end={true}>Members</NavLink></li>
        {
          currentUser
            ? <li><NavLink to={`/users/${currentUser.id}`}>{currentUser.username}</NavLink></li>
            : <>
              <li><NavLink to='/login'>Home</NavLink></li>
            </>
        }
      </ul>
    </nav>
  </header>;
}
