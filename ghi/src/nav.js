import { NavLink, useNavigate } from "react-router-dom";
import { useGetTokenQuery, useLogoutMutation } from "./store/api";
import { useDispatch } from "react-redux";
import {
  showModal,
  LOGIN_MODAL,
  SIGNUP_MODAL,
} from "./store/endpoints/accountSlice";
import logo from "./logo.svg";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import { useEffect } from "react";

function LoginButtons(props) {
  const dispatch = useDispatch();
  const classNames = `buttons ${props.show ? "" : "is-hidden"}`;

  return (
    <div className={classNames}>
      <button
        onClick={() => dispatch(showModal(SIGNUP_MODAL))}
        className='button is-primary'
      >
        <strong>Sign up</strong>
      </button>
      <button
        onClick={() => dispatch(showModal(LOGIN_MODAL))}
        className='button is-light'
      >
        Login
      </button>
    </div>
  );
}

function LogoutButton() {
  const navigate = useNavigate();
  const [logout, { data }] = useLogoutMutation();
  useEffect(() => {
    if (data) {
      navigate("/");
    }
  }, [data, navigate]);
  return (
    <div className='buttons'>
      <button onClick={logout} className='button is-light'>
        Logout
      </button>
    </div>
  );
}

function Nav() {
  const { data: token, isLoading: tokenLoading } = useGetTokenQuery();
  const {
    account: { roles = [] },
  } = token || { account: {} };
  return (
    <>
      <nav
        className='navbar is-link is-fixed-top'
        role='navigation'
        aria-label='main navigation'
      >
        <div className='navbar-brand'>
          <NavLink className='navbar-item' to='/'>
            <img src={logo} height='86' width='43' alt='' />
          </NavLink>
          <button
            className='navbar-burger'
            aria-label='menu'
            aria-expanded='false'
            data-target='navbarBasic'
          >
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
            <span aria-hidden='true'></span>
          </button>
        </div>
        <div id='navbarBasic' className='navbar-menu'>
          <div className='navbar-start'>
            <NavLink className='navbar-item' to='/'>
              Staff
            </NavLink>
            {roles.includes("staff") ? (
              <>
                <NavLink className='navbar-item' to='adoption_application/list'>
                  Adoption Applications List
                </NavLink>
              </>
            ) : (
              ""
            )}
          </div>
          <div className='navbar-end'>
            <div className='navbar-item'>
              {tokenLoading ? (
                <LoginButtons show={false} />
              ) : token ? (
                <LogoutButton />
              ) : (
                <LoginButtons show={true} />
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* <LoginModal />
      <SignupModal /> */}
    </>
  );
}

export default Nav;
