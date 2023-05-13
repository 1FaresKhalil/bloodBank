import { Button, Menu, MenuItem } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';

type NavbarProps = {
  mainColor: string;
  mainFz: string;
};

const LanguageSwitcher = (props: NavbarProps) => {
  const router = useRouter();
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    router.replace(router.asPath, undefined, { locale: language });
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (language: string) => {
    changeLanguage(language);
    handleClose();
  };

  return (
    <div>
      <Button
        className={`${props.mainColor} ${props.mainFz}`}
        variant="text"
        onClick={handleClick}
      >
        {i18n.language === 'ar' ? 'عربي' : 'EN'}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          className="font-size-24 my-1"
          onClick={() => handleLanguageChange('en')}
        >
          English
        </MenuItem>
        <MenuItem
          className="font-size-24 my-1"
          onClick={() => handleLanguageChange('ar')}
        >
          عربى
        </MenuItem>
      </Menu>
    </div>
  );
};

export default LanguageSwitcher;

// how to use it in pages
/* 
import type { GetStaticPropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
const t = useTranslation('common');

export async function getStaticProps({ locale = 'en' }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
    },
  };
}
*/

// how to use it in components ح
/*
import { useTranslation, withTranslation } from 'next-i18next';
const { t } = useTranslation('common');
export default withTranslation('common')(DrawerAppBar);
*/
