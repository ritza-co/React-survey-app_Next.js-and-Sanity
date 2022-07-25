import Head from 'next/head'
import Image from 'next/image'
import { Formik, Field, Form } from 'formik';
import styles from '../styles/Home.module.css'
import { useState } from 'react';

export default function Home() {
  const [hasSubmitCompleted, setHasSubmitCompleted] = useState(false);
  const [responseMessage, setResponseMessage] = useState(false);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          React Survey
        </h1>
        <div className={styles.formContainer}>
          <Formik
        initialValues={{
          likes: '',
        }}
        onSubmit={async (values, { resetForm }) => {
          // await new Promise((r) => {
          //   setHasSubmitCompleted(true);
          //   setTimeout(r, 1000)
          //   resetForm();      
          // });                    
          try {
            await fetch('/api/createResponse', {
              method: 'POST',
              body: JSON.stringify(values),
              type: 'application/json'
            });  
            setHasSubmitCompleted(true);
            setResponseMessage('Thanks for your response!');
            resetForm(); 
          } catch (err) {
            setResponseMessage('There was an error submitting your response. Try again please.');
            console.error('error', err);
          }
        }}
          >
            {({ isSubmitting }) => {
              if (isSubmitting) {
                return <div>Submitting comment…</div>
              }
              if (hasSubmitCompleted) {
                return (
                  <>
                    <div>{ responseMessage }</div>
                  </>
                )
              }
              return (
                <Form>
                  <label htmlFor="likes">What do you like about React?</label>
                  <Field id="likes" name="likes" placeholder="Add your answer" />
                  <button type="submit" disabled={isSubmitting}>Submit</button>
                </Form>
              )
            }}
          </Formik>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
