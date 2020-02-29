import React, { useState, useEffect } from "react";
import { Pagination, Typography, Spin, Icon, Select } from "antd";
import axios from "axios";
import "./library.css";

import Layout from "../components/layout";
import Movies from "../components/movies";

const { Title } = Typography;
const { Option } = Select;

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTUxOGY3ZTZkNGE0ZjAwODFlZmUyNmMiLCJpYXQiOjE1ODI0MDM0NjJ9.SB_f4GDR9v41ntSeVs9pizRXTIr5ku4LRpWgthALb9A";
const headers = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

const PaginationContainer = ({ children }) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "0 auto 42px",
    }}
  >
    {children}
  </div>
);
const spinIcon = <Icon type="loading" style={{ fontSize: 69 }} spin />;
const genres = [
  <Option key={1337} value="Action">
    Action
  </Option>,
  <Option key={1338} value="Drama">
    Drama
  </Option>,
  <Option key={1339} value="Comedy">
    Comedy
  </Option>,
  <Option key={1340} value="Romance">
    Romance
  </Option>,
  <Option key={1341} value="Fantasy">
    Fantasy
  </Option>,
  <Option key={1342} value="Sci-Fi">
    Sci-Fi
  </Option>,
  <Option key={1343} value="Animation">
    Fantasy
  </Option>,
];

export default props => {
  const [movies, updateMovies] = useState([]);
  const [currentPage, updatePage] = useState(1);
  const [total, updateTotal] = useState(200);
  const [loading, updateLoading] = useState(true);
  const [genre, updateGenre] = useState("");
  const [sort, updateSort] = useState("");

  const switchPage = async page => {
    updateLoading(true);
    axios
      .get(
        `/api/v1/movies?page=${page}&genre=${genre}&sort_by=${sort}`,
        headers
      )
      .then(results => {
        const list = results.data.movies;
        updatePage(page);
        updateMovies(list);
        updateLoading(false);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    axios
      .get(
        `/api/v1/movies?page=${currentPage}&genre=${genre}&sort_by=${sort}`,
        headers
      )
      .then(async results => {
        const list = results.data.movies;

        updateTotal(results.data.count);
        updateMovies(list);
        updateLoading(false);
      })
      .catch(err => console.log(err));
  }, [currentPage]);

  return (
    <Layout>
      <div id="wallp" className="library-wallpaper">
        <div className="over-wallpaper">
          <div
            style={{
              height: "6vw",
              width: "58vw",
              background: "#FED766",
              display: "block",
              position: "absolute",
              transform: "translateY(-100%) rotate(-2deg)",
              webkitMaskBoxImage:
                "url(https://www.onlygfx.com/wp-content/uploads/2017/04/grunge-brush-stroke-banner-2-6-1024x250.png)",
            }}
          ></div>
          <Title
            className=".library-heading"
            style={{ position: "absolute", transform: "translateY(-100%)" }}
          >
            It's Movie Time !
          </Title>
        </div>
      </div>
      <div className="movies-pagination">
        <div className="sortnfilter">
          <Select
            className="filter-sort"
            showSearch
            placeholder="Filter by genres"
            optionFilterProp="children"
            onChange={value => {
              updateGenre(value);
            }}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {genres}
          </Select>
          <Select
            className="filter-sort"
            showSearch
            placeholder="Sorting Criteria"
            optionFilterProp="children"
            onChange={value => {
              updateSort(value);
            }}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option key={2142} value="Rating">
              Rating
            </Option>
          </Select>
        </div>
        <PaginationContainer>
          <Pagination
            current={currentPage}
            defaultPageSize={50}
            onChange={switchPage}
            total={total}
          />
        </PaginationContainer>
        {!loading ? (
          <Movies list={movies} />
        ) : (
          <Spin
            indicator={spinIcon}
            style={{ margin: "149px auto", display: "block" }}
          />
        )}
        <PaginationContainer>
          <Pagination
            current={currentPage}
            defaultPageSize={50}
            onChange={switchPage}
            total={total}
          />
        </PaginationContainer>
      </div>
    </Layout>
  );
};
