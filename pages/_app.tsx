import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../layout/Header';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

function MyApp({ Component, pageProps }: AppProps) {
  const [session, setSession] = useState<any>(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      
      window.localStorage.setItem('infouser', JSON.stringify(session))
    })
  }, [])

  return (
    <>
    <Header session={session} />
  <Component {...pageProps} session={session}  />
    </>
  )
}

export default MyApp
