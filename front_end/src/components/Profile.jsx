import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { UserLoginContext } from "../context/UserLoginProvider";

function Profile({ msg }) { 
  const { userLoggedIn, userName, setUserLoggedIn, setUserName } =
    useContext(UserLoginContext);

  const handleLogout = (event) => {
    setUserLoggedIn(false);
    setUserName("");
  };

  return (
    <>
      {userLoggedIn ? (
        <>
          <Alert variant="success">
            <Alert.Heading>Profile:</Alert.Heading>
            <p>{msg}</p> 
            <hr />
            <p>User name: {userName}</p>
          </Alert>
          <p>
            <Button variant="primary" onClick={handleLogout}>
              Log out
            </Button>
          </p>
        </>
      ) : (
        <>
          <Button as={Link} to="/login" variant="primary">
            Log in
          </Button>
          <Button as={Link} to="/signup" variant="primary">
            Sign up
          </Button>
        </>
      )}
    </>
  );
}

export default Profile;
