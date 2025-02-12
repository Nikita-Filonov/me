import React, {useState} from "react";
import {Form, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import {setRoute} from "../../redux/reducer/meActions";
import {useTranslation} from 'react-i18next';
import Search from "../blocks/Search";

const NavigationNavbar = ({route, setRoute}) => {
  const {t, i18n} = useTranslation();
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'ru')

  const onLanguage = async (lang) => {
    await i18n.changeLanguage(lang)
    setLang(lang)
    localStorage.setItem('lang', lang)
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className={'fixed-top'}>
      <Navbar.Brand as={Link} to={'/'}>{t('NikitaFilonov')}</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto"/>
        <Nav>
          <Form inline>
            <Search/>
          </Form>
          <Nav.Link
            active={route === '/'}
            eventKey={'/'}
            to="/"
            as={Link}
            onSelect={() => setRoute('/')}
          >
            {t('Home')}
          </Nav.Link>
          <Nav.Link
            eventKey={'/about'}
            to="/about"
            as={Link}
            active={route === '/about'}
            onSelect={() => setRoute('/about')}
          >
            {t('Overview')}
          </Nav.Link>
          <Nav.Link
            eventKey={'/education'}
            to="/education"
            as={Link}
            active={route === '/education'}
            onSelect={() => setRoute('/education')}
          >
            {t('Education')}
          </Nav.Link>
          <Nav.Link
            eventKey={'/work'}
            to="/work"
            as={Link}
            active={route === '/work'}
            onSelect={() => setRoute('/work')}
          >
            {t('Experience')}
          </Nav.Link>
          <Nav.Link
            eventKey={'/projects'}
            to="/projects"
            as={Link}
            active={route === '/projects'}
            onSelect={() => setRoute('/projects')}
          >
            {t('Projects')}
          </Nav.Link>
          <NavDropdown title={t('Languages')} id="collasible-nav-dropdown">
            <NavDropdown.Item
              onClick={() => onLanguage('ru')}
              active={lang === 'ru'}
            >
              Русский
            </NavDropdown.Item>
            <NavDropdown.Item
              onClick={() => onLanguage('en')}
              active={lang === 'en'}
            >
              English
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}


const getState = (state) => ({
  route: state.me.route
})

export default connect(
  getState,
  {
    setRoute
  },
)(NavigationNavbar);
