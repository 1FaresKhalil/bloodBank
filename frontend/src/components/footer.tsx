import { useTranslation, withTranslation } from 'next-i18next';

const Footer = () => {
  const { t } = useTranslation('common');
  return <div className="text-center my-4">{t('footerCopyRight')}</div>;
};

export default withTranslation('common')(Footer);
