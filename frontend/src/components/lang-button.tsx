import { FormControlLabel, Switch } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';

const LanguageSwitcher: React.FC = () => {
  const router = useRouter();
  const { i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    router.replace(router.asPath, undefined, { locale: language });
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeLanguage(event.target.checked ? 'ar' : 'en');
  };

  return (
    <div>
      <FormControlLabel
        className="mx-0"
        control={
          <Switch
            checked={i18n.language === 'ar'}
            onChange={handleLanguageChange}
            color="primary"
          />
        }
        label={i18n.language === 'ar' ? 'عربى' : 'English'}
      />
    </div>
  );
};

export default LanguageSwitcher;
