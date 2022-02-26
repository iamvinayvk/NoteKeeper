import React, { useEffect, useState } from "react";
import { Accordion, Badge, Button, Card } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import MainScreen from "../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { deleteNote, listNote } from "../../actions/noteActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

const MyNotes = ({ search }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const noteList = useSelector((state) => state.noteList);
  const userLogin = useSelector((state) => state.userLogin);
  const noteCreate = useSelector((state) => state.noteCreate);
  const noteUpdate = useSelector((state) => state.noteUpdate);
  const noteDelete = useSelector((state) => state.noteDelete);
  const { success: successCreate } = noteCreate;
  const { success: successUpdate } = noteUpdate;
  const { userInfo } = userLogin;
  const { loading, notes, error } = noteList;
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = noteDelete;
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNote(id));
    }
  };

  useEffect(() => {
    dispatch(listNote());
    if (!userInfo) {
      navigate("/");
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successCreate,
    successUpdate,
    successDelete,
  ]);
  return (
    <MainScreen title={`Welcome back ${userInfo ? userInfo.name : null}..`}>
      <Link to="/createnote">
        <Button
          style={{ marginLeft: 10, marginBottom: 6 }}
          size="lg"
          variant="info"
        >
          Create New Note
        </Button>
      </Link>
      {errorDelete && (
        <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
      )}
      {loadingDelete && <Loading />}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
      {notes
        ?.reverse()
        .filter((filteredNote) =>
          filteredNote.title.toLowerCase().includes(search.toLowerCase())
        )
        .map((note) => (
          <Accordion key={note._id}>
            <Accordion.Item eventKey="0">
              <Card style={{ margin: 10 }}>
                <Card.Header style={{ display: "flex" }}>
                  <span
                    style={{
                      color: "black",
                      textDecoration: "none",
                      flex: 1,
                      cursor: "pointer",
                      alignSelf: "center",
                      fontSize: 18,
                    }}
                  >
                    <Accordion.Header className="mx-4">
                      {note.title}
                    </Accordion.Header>
                  </span>
                  <div>
                    <Button variant="info" href={`/note/${note._id}`}>
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(note._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>

                <Accordion.Body>
                  <Card.Body>
                    <h4>
                      <Badge variant="info">Category - {note.category}</Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <p>
                        <ReactMarkdown>{note.content}</ReactMarkdown>
                      </p>
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {note.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Body>
              </Card>
            </Accordion.Item>
          </Accordion>
        ))}
    </MainScreen>
  );
};

export default MyNotes;
