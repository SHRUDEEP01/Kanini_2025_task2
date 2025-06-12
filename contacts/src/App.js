import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setnumber] = useState("");
  const [users, setUsers] = useState([]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let result = await fetch("http://localhost:5000/register", {
      method: "POST",
      body: JSON.stringify({ name, email, number }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    if (result) {
      alert("Data saved successfully");
      setEmail("");
      setName("");
      setnumber("");
      getUsers(); // refresh after new user
    }
  };

  const getUsers = async () => {
    const res = await fetch("http://localhost:5000/users");
    const data = await res.json();
    setUsers(data);
  };

  const handleUpdate = async (id) => {
    const newName = prompt("Enter new name");
    if (!newName) return;
    await fetch(`http://localhost:5000/user/${id}`, {
      method: "PUT",
      body: JSON.stringify({ name: newName }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const newEmail = prompt("Enter new Email");
    if (!newEmail) return;
    await fetch(`http://localhost:5000/user/${id}`, {
      method: "PUT",
      body: JSON.stringify({ email: newEmail }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const newNum = prompt("Enter new number");
    if (!newNum) return;
    await fetch(`http://localhost:5000/user/${id}`, {
      method: "PUT",
      body: JSON.stringify({ number: newNum }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    getUsers();
  };

  const handleDelete = async (id) => {
    const delsure = prompt("Delete ?????")
    if(delsure.toLowerCase() == "yes")
    await fetch(`http://localhost:5000/user/${id}`, {
      method: "DELETE",
    });
    else return;
    getUsers();
  };

  const handleclick = (user) => {
    var sname = document.getElementById("selectedName");
    var semail = document.getElementById("selectedEmail");
    var snumber = document.getElementById("selectedNumber");
    var cImage = document.getElementById("cImage");
    sname.textContent = "Name:" + user.name;
    semail.textContent = user.email;
    snumber.textContent = user.number;
    cImage.textContent = user.name[0];
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div className="outer container-fluid p-3">
        <div className="row d-flex flex-row justify-content-center">
          <div className="order-2 order-md-1 saved contacts col-md-3">
            <h2>Saved Contacts</h2>
            <ul className="no-bullets">
              {users.map((user) => (
                <li
                  onClick={() => handleclick(user)}
                  className="list-item"
                  key={user._id}
                >
                  {user.name}
                  <button
                    className="btn"
                    onClick={() => handleUpdate(user._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-pencil"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                    </svg>
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(user._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-trash3"
                      viewBox="0 0 16 16"
                    >
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="order-1 order-md-2 col-md-8">
            <div className="saved info contact-info d-flex flex-row justify-content-center">
              <div className="row d-flex flex-row justify-content-center">
                <div className="mb-auto mt-auto col-3 contact-image">
                  <p id="cImage" className="cimage"></p>
                </div>
                <div className="m-auto col-8">
                  <div></div>{" "}
                  <div className="details">
                    <p className="cdetails" id="selectedName">
                      Tap on the Contact for details
                    </p>
                  </div>{" "}
                  <div className="details">
                    {" "}
                    <p className="cdetails" id="selectedEmail"></p>
                  </div >{" "}
                  <div className="details">
                  <p className="cdetails" id="selectedNumber"></p>
                </div></div>
              </div>
            </div>
            <div className="saved create">
              <h1>Create contact</h1>
              <form className="d-flex flex-column">
                <input className="input"
                  type="text"
                  placeholder="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input className="input"
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input className="input"
                  type="number"
                  placeholder="number"
                  value={number}
                  onChange={(e) => setnumber(e.target.value)}
                />

                <button className="input button" type="submit" onClick={handleOnSubmit}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
