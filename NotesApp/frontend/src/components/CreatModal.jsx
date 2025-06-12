
function CreateModal(){
    return (
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
                        Modal title
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
                          value={title}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <input
                          className="input"
                          type="email"
                          placeholder="content"
                          value={content}
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
    )
}
export default CreateModal;