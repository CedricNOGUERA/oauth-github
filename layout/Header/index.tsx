import { GetServerSideProps } from 'next'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Col, Container, Nav, Navbar, Row } from 'react-bootstrap'
import { supabase } from '../../utils/supabaseClient'

const Header = ({session}: any) => {

  const [userName, setUserName] = useState<any>();


  useEffect(() => {

    getProfile();
  }, [session]);
  
  
async function getProfile() {
  if(session){
    
    try {
      
      const user: any = supabase.auth.user()
      
    
      let { data, error, status } = await supabase
      .from('profiles')
      .select(`username`)
     .eq('id', session?.user?.id)
     .single()
     
     if (error && status !== 406) {
       throw error
      }
      
      
      

      if (data) {
        setUserName(data.username)
      }
    } 
    catch (error: any) {
      alert(error.message)
    } finally {
      
    }
  }
}

  return (
    <Container fluid className="px-0">
      <Navbar expand="lg" style={{ backgroundColor: "#999" }}>
        <Container fluid>
          <Navbar.Brand href="/" className='col-sm-2 col-lg-8'>
            <span className="">
              Sign in as <b>{userName}</b>
            </span>
          </Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav"> */}
          <Nav className="ms-auto col-sm-2 col-lg-3">
            {session && (
              <>
                <Row>
                  <Col xs={6} lg={6}>
                    <button className="button">
                      <Link href="/taskes">
                        <a className="decoration-none">Todo list</a>
                      </Link>
                    </button>
                  </Col>
                  <Col xs={5} lg={4}>
                    <button
                      className="button "
                      onClick={() => supabase.auth.signOut()}
                    >
                      <Link href="/">
                        <a>Sign Out</a>
                      </Link>
                    </button>
                  </Col>
                </Row>
              </>
            )}
          </Nav>
          {/* </Navbar.Collapse> */}
        </Container>
      </Navbar>
    </Container>
  );
}


// export const getServerSideProps: GetServerSideProps = async (context) => {
 
//   var myHeaders = new Headers();
// myHeaders.append("apikey", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloeWhzd2lxamdzZHpubWphanNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjAyNDMwNTcsImV4cCI6MTk3NTgxOTA1N30.Shpl-WlVo3Qy-v0ZsFpBgQu9Qafr0EGk8FVaPwh8QTs");
// myHeaders.append("Content-Type", "application/json");
// myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloeWhzd2lxamdzZHpubWphanNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjAyNDMwNTcsImV4cCI6MTk3NTgxOTA1N30.Shpl-WlVo3Qy-v0ZsFpBgQu9Qafr0EGk8FVaPwh8QTs");

//   var requestOptions = {
//     method: 'GET',
//     headers: myHeaders
//   };


//   // const res = await fetch("https://rcjrcafkungrcdguokup.supabase.co/rest/v1/todosTable?select=*", requestOptions)
//   const res = await fetch("https://ihyhswiqjgsdznmjajsf.supabase.co/rest/v1/profiles?select=*", requestOptions)
//   const data = await res.json()
//   // Pass data to the page via props
//   return { props: { data } }
//   }


export default Header
