import { useState } from "react";
import useFetchData from "./hooks/useFetchData";

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const { data, error, loading } = useFetchData();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts =
    data && data.products.slice(indexOfFirstPost, indexOfLastPost);
  // const totalPosts = data.products.length;
  let totalPosts = data && data.products.length;
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className="m-3 p-2 bg-secondary-subtle">
      <h3 className="text-center my-2">Getting Hands-on with Pagination</h3>

      {data &&
        currentPosts.map((product, index) => (
          <div key={index}>
            <h1 className="bg-info text-white m-3 text-center fs-6 p-3">
              {product.title}
            </h1>
            <p className="fw-bold mx-2">{product.description}</p>
          </div>
        ))}
      <ul className="pagination d-flex justify-content-center gap-2 flex-wrap">
        <li className="page-item">
          <a
            href="#"
            className="page-link"
            onClick={() =>
              currentPage === 1 ? "" : setCurrentPage((prev) => prev - 1)
            }
          >
            ⏮️
          </a>
        </li>
        {pages.map((page, index) => {
          return (
            <li
              key={index}
              className={`page-item ${page === currentPage ? "active" : ""}`}
            >
              <a
                href="#"
                className="page-link"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </a>
            </li>
          );
        })}
        <li className="page-item">
          <a
            href="#"
            className="page-link"
            onClick={() =>
              currentPage === pages.length
                ? ""
                : setCurrentPage((prev) => prev + 1)
            }
          >
            ⏭️
          </a>
        </li>
      </ul>
    </div>
  );
};

export default App;
