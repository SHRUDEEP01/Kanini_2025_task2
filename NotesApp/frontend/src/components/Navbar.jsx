import { Link } from 'react-router-dom'

function Navbar({ onCategoryChange }) {
  const handleCategorySelect = (category) => {
    onCategoryChange(category);
  };
  return (
    
    <nav className="fixed-top navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">WriteUp!</Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item" onClick={() => handleCategorySelect(null)}>
            <Link className="nav-link active" to="/">Home</Link>
          </li>
          
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Category
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              {["work", "life", "public", "personal", "others"].map(cat => (
            <li key={cat}>
              <button className="dropdown-item" onClick={() => handleCategorySelect(cat)}>
                {cat}
              </button>
            </li>
            
          ))}
          <li><hr className="dropdown-divider" /></li>
          <li>
            <button className="dropdown-item text-danger" onClick={() => handleCategorySelect(null)}>
              Clear Filter
            </button>
          </li>
              </ul>
          </li>
          <button
                  type="button"
                  className="btn h-4 d-flex"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalLong"
                >
                  Write
                </button>
          <li className="nav-item">
            <span className="nav-link disabled">Future opt</span>
          </li>
        </ul>
        <form className="d-flex" role="search">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </nav>
  )
}

export default Navbar
