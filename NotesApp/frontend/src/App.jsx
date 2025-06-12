import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("");
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editNumber, setEditNumber] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    let result = await fetch("http://localhost:5000/register", {
      method: "POST",
      body: JSON.stringify({ name, email, number: category }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    if (result) {
      console.log(result);
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
  const handleUpdate = (user) => {
    setEditUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditNumber(user.number);
    const modal = new bootstrap.Modal(document.getElementById("editModal"));
    modal.show();
  };

  const handleDelete = async (id) => {
    if (confirm("delete??")) {
      await fetch(`http://localhost:5000/user/${id}`, {
        method: "DELETE",
      });
      getUsers();
    }
  };

  const handleclick = (user) => {
    var sname = document.getElementById("selectedName");
    var semail = document.getElementById("selectedEmail");
    var snumber = document.getElementById("selectedNumber");
    var sdate = document.getElementById("selectedDate");
    sname.textContent = user.name;
    semail.textContent = user.email;
    snumber.textContent = user.number;
    sdate.textContent = new Date(user.date).toUTCString();
    console.log(user);
  };

  const getCategoryClass = (category) => {
    switch (category.toLowerCase()) {
      case "personal":
        return "category-personal";
      case "public":
        return "category-public";
      case "work":
        return "category-work";
      case "life":
        return "category-life";
      default:
        return "category-other";
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <div>
        <Navbar onCategoryChange={setSelectedCategory} />
      </div>
      <div className="outer container-fluid p-5">
        <div className="row d-flex flex-row justify-content-between">
          <div className="col-md-4 order-2 order-md-1 saved contacts">
            <h2>Saved Notes</h2>
            <div id="contentGrid" className="contentGrid">
              {/* Edit Modal Below  */}
              <div
                className="modal fade"
                id="editModal"
                tabIndex="-1"
                aria-labelledby="editModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="editModalLabel">
                        Edit Notes
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <form
                        onSubmit={async (e) => {
                          e.preventDefault();
                          await fetch(
                            `http://localhost:5000/user/${editUser._id}`,
                            {
                              method: "PUT",
                              headers: {
                                "Content-Type": "application/json",
                              },
                              body: JSON.stringify({
                                name: editName,
                                email: editEmail,
                                number: editNumber,
                              }),
                            }
                          );
                          setEditUser(null);
                          getUsers();
                          bootstrap.Modal.getInstance(
                            document.getElementById("editModal")
                          ).hide();
                        }}
                      >
                        <input
                          className="input"
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          placeholder="Name"
                          required
                        />
                        <input
                          className="input contentt"
                          type="text"
                          value={editEmail}
                          onChange={(e) => setEditEmail(e.target.value)}
                          placeholder="content"
                          required
                        />
                        <input
                          className="input"
                          type="text"
                          value={editNumber}
                          onChange={(e) => setEditNumber(e.target.value)}
                          placeholder="Category"
                          required
                        />
                        <button type="submit" className="btn btn-success mt-2">
                          Save Changes
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              {users
                .filter(
                  (user) =>
                    !selectedCategory ||
                    user.number.toLowerCase() === selectedCategory.toLowerCase()
                )
                .map((user) => (
                  <div
                    key={user._id}
                    onClick={() => handleclick(user)}
                    className={`grid list-item ${getCategoryClass(
                      user.number
                    )}`}
                  >
                    <h4>{user.name}</h4>
                    <p>{user.email}</p>
                    <button
                      className="btn"
                      onClick={() => handleUpdate(user)}
                      data-bs-target="#editModal"
                      data-bs-toggle="modal"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-pencil"
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
                        className="bi bi-trash3"
                        viewBox="0 0 16 16"
                      >
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                      </svg>
                    </button>
                  </div>
                ))}
            </div>
          </div>
          <div className="row order-1 order-md-2 col-12 col-md-8">
            <div className="col-12 saved info contact-info d-flex flex-row justify-content-center">
              <div className="row d-flex flex-row">
                <div className="col-12">
                  <div className="details d-flex flex-row justify-content-end">

                    <h1 className="title" id="selectedName">
                      Tap on the Notes for details
                    </h1>
                    <div className="details1">
                      <p className="cdetails" id="selectedDate"></p>
                    </div>
                  </div>
                  <div className="details">
                    <p className="cdetails cat" id="selectedNumber"></p>
                  </div>
                  <div className="details1">
                    <p className="cdetails" id="selectedEmail"></p>
                  </div>
                </div>
              </div>
            </div>
            {/* Modal */}
            <div
              className="modal fade"
              id="exampleModalLong"
              tabIndex="-1"
              aria-labelledby="exampleModalLongTitle"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">
                      Write something......
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form className="d-flex flex-column">
                      <input
                        className="input note-content"
                        type=""
                        placeholder="Title"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <input
                        className="input"
                        type="email"
                        placeholder="content"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <input
                        className="input"
                        type="text"
                        placeholder="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      />

                      <button
                        className="input button"
                        type="submit"
                        onClick={handleOnSubmit}
                      >
                        Submit
                      </button>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
