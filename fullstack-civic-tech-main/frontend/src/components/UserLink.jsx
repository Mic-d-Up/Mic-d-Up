import { Link } from "react-router-dom";

export default function UserLink({ user, card }) {
  return <Link to={`/users/${user.id}`}>{card}</Link>;
}
