import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router';
import { PAGES } from '../../routes';
import { Lang, LangButton, NavBar } from './styles';

const Header: FC = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  let title = t('home-index');

  return (
    <AppBar position="sticky">
      <Toolbar>
        <NavBar>
          <Button variant="outlined">
            <NavLink exact activeClassName="selected" to={PAGES.home.name}>
              {title}
            </NavLink>
          </Button>
        </NavBar>
        <Lang>
          <LangButton
            active={i18n.language === 'sk'}
            aria-pressed={i18n.language === 'sk'}
            onClick={() => changeLanguage('sk')}
          >
            sk
          </LangButton>
          <LangButton
            active={i18n.language !== 'sk'}
            aria-pressed={i18n.language !== 'sk'}
            onClick={() => changeLanguage('en')}
          >
            en
          </LangButton>
        </Lang>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Header);
