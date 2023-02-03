import React from 'react';
import { FaHome, FaSignInAlt, FaUserAlt, FaPowerOff } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Nav, Footer } from './styled';
import * as actions from '../../store/modules/auth/actions';
import history from '../../services/history';

export default function Header() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(actions.loginFailure());
    history.push('/');
  };

  return (
    <>
      <Nav>
        <Link to="/">
          <FaHome size={24} />
        </Link>
        <Link to="/register">
          <FaUserAlt size={21} />
        </Link>

        {isLoggedIn ? (
          <Link onClick={handleLogout} to="/logout">
            <FaPowerOff size={22} />
          </Link>
        ) : (
          <Link to="/login">
            <FaSignInAlt size={24} />
          </Link>
        )}

        {isLoggedIn && (
          <p>
            Olá, <span>{user.nome}!</span>
          </p>
        )}
      </Nav>

      <Footer>
        <p>
          Copyright © 2023 | Developed by <span>Keystone Alves</span>
        </p>
      </Footer>
    </>
  );
}
