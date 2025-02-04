import { DarkMode, LightMode } from '@mui/icons-material';
import { Masonry } from '@mui/lab';
import { Button, IconButton, NoSsr } from '@mui/material';
import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Trans, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Testimony from '@/components/landing/Testimony';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';
import Logo from '@/components/shared/Logo';
import { screenshots } from '@/config/screenshots';
import { FLAG_DISABLE_SIGNUPS } from '@/constants/flags';
import testimonials from '@/data/testimonials';
import { logout } from '@/store/auth/authSlice';
import { setTheme } from '@/store/build/buildSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setModalState } from '@/store/modal/modalSlice';
import styles from '@/styles/pages/Home.module.scss';


export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common', 'modals', 'landing'])),
  },
});

const Home: NextPage = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const theme = useAppSelector((state) => state.build.theme);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const handleLogin = () => dispatch(setModalState({ modal: 'auth.login', state: { open: true } }));
  const handleRegister = () => dispatch(setModalState({ modal: 'auth.register', state: { open: true } }));
  const handleToggle = () => dispatch(setTheme({ theme: theme === 'light' ? 'dark' : 'light' }));
  const handleLogout = () => dispatch(logout());

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <Logo size={256} />
        </div>

        <div className={styles.main}>
          <h1>{t<string>('common.title')}</h1>

          <h2>{t<string>('common.subtitle')}</h2>

          <NoSsr>
            <div className={styles.buttonWrapper}>
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard" passHref>
                    <Button>{t<string>('landing.actions.app')}</Button>
                  </Link>

                  <Button variant="outlined" onClick={handleLogout}>
                    {t<string>('landing.actions.logout')}
                  </Button>
                </>
              ) : (
                <>
                  <Button onClick={handleLogin}>{t<string>('landing.actions.login')}</Button>

                  <Button variant="outlined" onClick={handleRegister} disabled={FLAG_DISABLE_SIGNUPS}>
                    {t<string>('landing.actions.register')}
                  </Button>
                </>
              )}
            </div>
          </NoSsr>
        </div>
      </div>

      <section className={styles.section}>
        <h6>{t<string>('landing.summary.heading')}</h6>

        <p>{t<string>('landing.summary.body')}</p>
      </section>

      <section className={styles.section}>
        <h6>{t<string>('landing.features.heading')}</h6>

        <ul className="list-inside list-disc leading-loose">
          <li>{t<string>('landing.features.list.free')}</li>
          <li>{t<string>('landing.features.list.ads')}</li>
          <li>{t<string>('landing.features.list.tracking')}</li>
          <li>{t<string>('landing.features.list.languages')}</li>
          <li>{t<string>('landing.features.list.import')}</li>
          <li>{t<string>('landing.features.list.export')}</li>
          <li>
            <Trans t={t} i18nKey="landing.features.list.more">
              And a lot of exciting features
            </Trans>
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h6>{t<string>('landing.screenshots.heading')}</h6>

        <div className={styles.screenshots}>
          {screenshots.map(({ src, alt }) => (
            <a key={src} href={src} className={styles.image} target="_blank" rel="noreferrer">
              <Image
                fill
                src={src}
                alt={alt}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </a>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        

        <Masonry columns={{ xs: 1, sm: 2, lg: 4 }} spacing={2}>
          {testimonials.map(({ name, message }, index) => (
            <Testimony key={index} name={name} message={message} />
          ))}
        </Masonry>
      </section>

      <section className={styles.section}>
        
      </section>

      <section className={styles.section}>
        
      </section>

      <footer>
        <div className={styles.version}>
          
        </div>

        <div className={styles.actions}>
          <IconButton onClick={handleToggle}>{theme === 'dark' ? <DarkMode /> : <LightMode />}</IconButton>

          <LanguageSwitcher />
        </div>
      </footer>
    </main>
  );
};

export default Home;