import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Button, Form, ListGroup } from "react-bootstrap";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const auth = getAuth();
const db = getFirestore();

export default function Notes() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [newTaskName, setNewTaskName] = useState("");
  const [editedTask, setEditedTask] = useState({ id: null, title: "" });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const email = user.email;
        setUser(email);
        loadTasks(email);
      }
    });

    return () => unsubscribe();
  }, []);

  const loadTasks = async (email) => {
    const tasksCollection = collection(db, "tasks");
    const querySnapshot = await getDocs(tasksCollection);
    const userTasks = [];
    querySnapshot.forEach((doc) => {
      const taskData = doc.data();
      if (taskData.user === email) {
        userTasks.push({ id: doc.id, ...taskData });
      }
    });
    setTasks(userTasks);
  };

  const addTask = async () => {
    if (!newTask || !newTaskName) return;
    try {
      const taskRef = await addDoc(collection(db, "tasks"), {
        user: user,
        title: newTask,
        name: newTaskName,
        completed: false,
      });
      setNewTask("");
      setNewTaskName("");
      loadTasks(user);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
      loadTasks(user);
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  const toggleComplete = async (taskId, completed) => {
    try {
      const taskRef = doc(db, "tasks", taskId);
      await updateDoc(taskRef, {
        completed: !completed,
      });
      loadTasks(user);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleEditTask = (taskId, title) => {
    setEditedTask({ id: taskId, title: title });
  };

  const cancelEdit = () => {
    setEditedTask({ id: null, title: "" });
  };

  const saveEditedTask = async () => {
    try {
      const taskRef = doc(db, "tasks", editedTask.id);
      await updateDoc(taskRef, {
        title: editedTask.title,
      });
      cancelEdit();
      loadTasks(user);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <div className="mt-5">
      <h1 className="text-center">The notes of: {user}</h1>
      <Form className="mt-3">
        <Form.Group className="mb-3" controlId="formBasicTaskName">
          <Form.Label>Task Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter task name"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicTask">
          <Form.Label>Add New Task</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
        </Form.Group>
        <Button variant="dark" onClick={addTask}>
          Add Task
        </Button>
      </Form>
      <ListGroup className="mt-3">
        {tasks.map((task) => (
          <ListGroup.Item key={task.id}>
            <h4>{task.name}</h4>
            {editedTask.id === task.id ? (
              <>
                <Form.Control
                  type="text"
                  value={editedTask.title}
                  onChange={(e) =>
                    setEditedTask({ ...editedTask, title: e.target.value })
                  }
                />
                <Button variant="primary" onClick={saveEditedTask}>
                  Save
                </Button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                >
                  {task.title}
                </span>
                <Button
                  variant="danger"
                  className="float-end"
                  onClick={() => deleteTask(task.id)}
                >
                  Delete
                </Button>
                <Button
                  variant="success"
                  className="float-end me-2"
                  onClick={() => toggleComplete(task.id, task.completed)}
                >
                  {task.completed ? "Deselect" : "Mark"}
                </Button>
                <Button
                  variant="warning"
                  className="float-end me-2"
                  onClick={() => handleEditTask(task.id, task.title)}
                >
                  Edit
                </Button>
              </>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
