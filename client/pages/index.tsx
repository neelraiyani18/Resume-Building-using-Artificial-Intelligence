import { DarkMode, LightMode, Link as LinkIcon } from '@mui/icons-material';
import { Masonry } from '@mui/lab';
import { Button, IconButton, NoSsr } from '@mui/material';
import type { GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Trans, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Testimony from '@/components/landing/Testimony';
import Footer from '@/components/shared/Footer';
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

import { DIGITALOCEAN_URL, DOCS_URL, DONATION_URL, GITHUB_URL, REDDIT_URL } from '../constants';

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
              And a lot of exciting features,
              <a href={`${GITHUB_URL}#features`} target="_blank" rel="noreferrer">
                click here to know more
              </a>
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
        <h6>{t<string>('landing.testimonials.heading')}</h6>

        <Masonry columns={{ xs: 1, sm: 2, lg: 4 }} spacing={2}>
          {testimonials.map(({ name, message }, index) => (
            <Testimony key={index} name={name} message={message} />
          ))}
        </Masonry>
      </section>

      <section className={styles.section}>
        <h6>{t<string>('landing.links.heading')}</h6>

        <div>
          <Link href="/meta/privacy" passHref>
            <Button variant="text" startIcon={<LinkIcon />}>
              {t<string>('landing.links.links.privacy')}
            </Button>
          </Link>

          <Link href="/meta/service" passHref>
            <Button variant="text" startIcon={<LinkIcon />}>
              {t<string>('landing.links.links.service')}
            </Button>
          </Link>

          <a href={GITHUB_URL} target="_blank" rel="noreferrer">
            <Button variant="text" startIcon={<LinkIcon />}>
              {t<string>('landing.links.links.github')}
            </Button>
          </a>

          <a href={DOCS_URL} target="_blank" rel="noreferrer">
            <Button variant="text" startIcon={<LinkIcon />}>
              {t<string>('landing.links.links.docs')}
            </Button>
          </a>

          <a href={REDDIT_URL} target="_blank" rel="noreferrer">
            <Button variant="text" startIcon={<LinkIcon />}>
              {t<string>('landing.links.links.reddit')}
            </Button>
          </a>

          <a href={DONATION_URL} target="_blank" rel="noreferrer">
            <Button variant="text" startIcon={<LinkIcon />}>
              {t<string>('landing.links.links.donate')}
            </Button>
          </a>
        </div>
      </section>

   
    </main>
  );
};

export default Home;
