import React, { useEffect, useState } from 'react';

import { IconContext } from "react-icons";
import { BiMenu, BiX } from "react-icons/bi";

import { Link } from 'react-router-dom';

import logo from '../../assets/images/logo.png';

import { useAuth } from '../../hooks/auth';

import 
{
    Avatar,
    Logo,
    Nav,
    NavbarContainer,
    NavLogo,
    NavIcon,
    MenuIcon,
    Menu,
    MenuItem,
    MenuLink,
    MenuItemBtn,
    MenuLinkBtn,
} from './styles';

const Header: React.FC = () => {
  const { signOut, user, verifyTokenExpiration } = useAuth();

  verifyTokenExpiration();

  const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const handleClick = () => setClick(!click);
    const closeMenu = () => setClick(false);

    const showButton = () =>{
        if(window.innerWidth<= 1000){
            setButton(false);
        }else{
            setButton(true);
        }
    }

    useEffect(() => {
        showButton();
    }, []);
    window.addEventListener('resize', showButton);

  return (
        <div>
            <IconContext.Provider value={{ color: '#fff'}}>
                <Nav>
                    <NavbarContainer>
                        <NavLogo to="/class">
                          <Logo>
                            <Link to="/class">
                              <img src={logo} alt="Logo StudeoUAI" />
                            </Link>
                          </Logo>
                        </NavLogo>
                        <MenuIcon onClick={handleClick}>
                            {click ? <BiX/> : <BiMenu/>}
                        </MenuIcon>

                        <Menu onClick={handleClick} >

                            {
                              user.isAdmin ? (
                                <MenuItem>
                                    <MenuLink onClick={closeMenu} to="/categories">Categorias</MenuLink>
                                </MenuItem>
                              ): ('') 
                            }
                            
                            <MenuItem>
                                <MenuLink onClick={closeMenu} to="/class">Aulas</MenuLink>
                            </MenuItem>
                            <MenuItem>
                             <MenuLink onClick={closeMenu} to={{
                                  pathname: 'users/edit-user',
                                  state: {
                                    id: user.id,
                                    name: user.name,
                                  },
                                }}>{user.name}</MenuLink>
                            </MenuItem>
                            {
                              user.avatar ? (
                                <MenuItem>
                                  <Avatar>
                                    <Link to="/users/edit-user">
                                      <img src={user.avatar} alt="Avatar user" />                                  
                                    </Link>
                                  </Avatar>
                                </MenuItem>
                              ): ('')
                            }
                            
                            <MenuItem>
                              <MenuLink onClick={signOut} to="/">Sair</MenuLink>
                            </MenuItem>
                        </Menu>

                    </NavbarContainer>

                </Nav>
            </IconContext.Provider>
        </div>
    )
};

export default Header;
