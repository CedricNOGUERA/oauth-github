
import Auth from '../components/Auth'
import Account from '../components/Account'
import { Container } from 'react-bootstrap'
import styles from "../styles/Home.module.css";
import Image from 'next/image'

export default function Home({session}: any) {

  return (
    <>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.title}>Todo app</h1>
          <Container className="px-0 mt-5">
            {!session ? (
              <Auth />
            ) : (
              <Account key={session.user.id} session={session} />
            )}
          </Container>
        </main>
      </div>
      <Container fluid className="px-0 bg-dark text-center">
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </Container>
    </>
  );
}