import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  InputGroup,
  Modal,
  Table,
} from "react-bootstrap";
import { supabase } from "../utils/supabaseClient";
import styles from "../styles/Home.module.css";

const Taskes = ({ session }: any) => {
  const [todo, setTodo] = useState<string>("");
  const [upTodo, setUpTodo] = useState<string>("");
  const [idTodo, setIdTodo] = useState<any>("");
  const [indx, setIndx] = useState<any>("");
  const [tache, setTache] = useState<any>();
  const [show, setShow] = useState(false);



  useEffect(() => {
    getTask();
  });
  


  async function getTask() {
    try {
      let { data, error } = await supabase
        .from("taskes")
        .select("*")
        .eq("id_profile", session?.user?.id);
      if (error) {
        throw error;
      }
      if (data) {
        setTache(data);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  }

  const handleClose = () => setShow(false);

  //UPDATE
  const handleShow = (id: any) => {
    setIndx(tache.findIndex((task: any) => task.id === id));
    setIdTodo(id);
    const filt = tache.filter((task: any) => task.id === id);

    setUpTodo(filt[0].task);
    setShow(true);
  };

  //UPDATE
  const updateTask = () => {
    const newTab = [...tache];
    newTab[indx] = { task: upTodo };

    var myHeaders = new Headers();
    myHeaders.append(
      "apikey",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloeWhzd2lxamdzZHpubWphanNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjAyNDMwNTcsImV4cCI6MTk3NTgxOTA1N30.Shpl-WlVo3Qy-v0ZsFpBgQu9Qafr0EGk8FVaPwh8QTs"
    );
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloeWhzd2lxamdzZHpubWphanNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjAyNDMwNTcsImV4cCI6MTk3NTgxOTA1N30.Shpl-WlVo3Qy-v0ZsFpBgQu9Qafr0EGk8FVaPwh8QTs"
    );

    var urlencoded = new URLSearchParams();
    urlencoded.append("task", upTodo);

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: urlencoded,
    };

    fetch(
      `https://ihyhswiqjgsdznmjajsf.supabase.co/rest/v1/taskes?id=eq.${idTodo}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => (setTache(newTab), handleClose(), getTask()))
      .catch((error) => console.log("error", error));
  };

  //POST
  const handlePost = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "apikey",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloeWhzd2lxamdzZHpubWphanNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjAyNDMwNTcsImV4cCI6MTk3NTgxOTA1N30.Shpl-WlVo3Qy-v0ZsFpBgQu9Qafr0EGk8FVaPwh8QTs"
    );
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloeWhzd2lxamdzZHpubWphanNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjAyNDMwNTcsImV4cCI6MTk3NTgxOTA1N30.Shpl-WlVo3Qy-v0ZsFpBgQu9Qafr0EGk8FVaPwh8QTs"
    );

    var urlencoded = new URLSearchParams();
    urlencoded.append("task", todo);
    urlencoded.append("id_profile", session?.user.id);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
    };

    fetch(
      "https://ihyhswiqjgsdznmjajsf.supabase.co/rest/v1/taskes",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        setTache([
          ...tache,
          { task: todo, id_profile: session?.user.id},
        ]);
        getTask();
        setTodo("");
      })
      .catch((error) => console.log("error :", error));
  };
  //DELETE
  const deleteTask = (id: any) => {
    const deleteFilt = tache.filter((tash: any) => tash.id !== id);
    var myHeaders = new Headers();
    myHeaders.append(
      "apikey",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloeWhzd2lxamdzZHpubWphanNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjAyNDMwNTcsImV4cCI6MTk3NTgxOTA1N30.Shpl-WlVo3Qy-v0ZsFpBgQu9Qafr0EGk8FVaPwh8QTs"
    );
    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloeWhzd2lxamdzZHpubWphanNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjAyNDMwNTcsImV4cCI6MTk3NTgxOTA1N30.Shpl-WlVo3Qy-v0ZsFpBgQu9Qafr0EGk8FVaPwh8QTs"
    );

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
    };

    fetch(
      `https://ihyhswiqjgsdznmjajsf.supabase.co/rest/v1/taskes?id=eq.${id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => setTache(deleteFilt))
      .catch((error) => console.log("error", error));
  };
  return (
    <>
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Todo app</h1>
        <Container className="px-0 mt-5">
          <Container className="px-5">
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Add a Task"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={todo}
                onChange={(e: any) => setTodo(e.currentTarget.value)}
              />
              <InputGroup.Text id="basic-addon1" onClick={handlePost}>
                <Image
                  alt="iconPlus"
                  src="https://img.icons8.com/color/20/plus.png"
                   width={20}
                  height={20}
                />
              </InputGroup.Text>
            </InputGroup>
          </Container>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th></th>
                <th>Taskes</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {tache?.map((task: any) => (
                <>
                  <tr key={task.id}>
                    <td>
                      <Image
                        src="https://img.icons8.com/stickers/30/checkmark.png"
                        width={30}
                        height={30}
                        alt="icon"
                      />
                    </td>
                    <td>{task.task}</td>
                    <td className="pointer col-2 text-center">
                      <Image
                        onClick={() => handleShow(task.id)}
                        src="https://img.icons8.com/external-sbts2018-flat-sbts2018/30/external-modify-basic-ui-elements-2.5-sbts2018-flat-sbts2018.png"
                        width={30}
                        height={30}
                        alt="icon"
                        />
                    </td>
                    <td className="pointer col-2 text-center">
                      <Image
                        onClick={() => deleteTask(task.id)}
                        src="https://img.icons8.com/emoji/30/cross-mark-emoji.png"
                        width={30}
                        height={30}
                        alt="icon"
                        />
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </Table>
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier une tache</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <Form.Control
              aria-label="Username"
              aria-describedby="basic-addon1"
              value={upTodo}
              onChange={(e: any) => setUpTodo(e.currentTarget.value)}
              />
            <InputGroup.Text id="basic-addon1" onClick={updateTask}>
              <Image
                alt="Plus icon"
                src="https://img.icons8.com/stickers/30/available-updates.png"
                width={30}
                height={30}
                />
            </InputGroup.Text>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
                </>
   
  );
};



export default Taskes;
