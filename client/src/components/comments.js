import React, { useState, useEffect, useContext } from "react";
import { Form, Button, List, Input, Tooltip } from "antd";
import Comment from "./comment";
import Profile from "./profile";
import axios from "axios";
import "./comment.css";
import moment from "moment";
import UserContext from "../context/user";

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${
      comments.length > 1 ? "comments" : "comment"
    }`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      <TextArea
        className="comment-box"
        rows={2}
        onChange={onChange}
        value={value}
      />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </div>
);

export default props => {
  let [comments, setComments] = useState([]);
  let [submitting, setSubmittingState] = useState(false);
  let [value, setValue] = useState("");
  let [modalVisible, changeVisibility] = useState(false);
  let [profile, changeProfile] = useState({});
  const { user } = useContext(UserContext);

  const { imdbid } = props;

  const showModal = username => {
    axios
      .get(`/api/v1/users/${username}`)
      .then(({ data: user }) => {
        changeProfile(user);
      })
      .catch(err => {
        // console.log(err);
      });
    changeVisibility(true);
  };

  const handleCancel = () => {
    changeVisibility(false);
  };

  const handleSubmit = () => {
    if (!value) {
      return;
    }

    setSubmittingState(true);

    axios
      .post(`/api/v1/movies/comments/${imdbid}`, { text: value })
      .then(({ data: comment }) => {
        setSubmittingState(false);
        setValue("");
        setComments([
          ...comments,
          {
            id: comment._id,
            author: user.username,
            avatar: user.avatar ? `/api/v1/users/avatar/${user.avatar}` : "",
            content: <p>{value}</p>,
            datetime: (
              <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
                <span>{moment().fromNow()}</span>
              </Tooltip>
            ),
            votes: 0,
            userVote: 0,
          },
        ]);
      })
      .catch(err => {
        // console.log(err);
      });
    setTimeout(() => {}, 1000);
  };

  const handleChange = e => {
    setValue(e.target.value);
  };

  useEffect(() => {
    // console.log("comment", props);
    axios
      .get(`/api/v1/movies/comments/${imdbid}`)
      .then(async ({ data: { comments: allComments } }) => {
        const newComments = allComments.map(
          ({ _id, owner, text, createdAt, votes, userVote }) => {
            return {
              id: _id,
              author: owner.username,
              avatar: owner.avatar
                ? `/api/v1/users/avatar/${owner.avatar}`
                : "",
              content: <p>{text}</p>,
              datetime: (
                <Tooltip
                  title={moment(createdAt).format("YYYY-MM-DD HH:mm:ss")}
                >
                  <span>{moment(createdAt).fromNow()}</span>
                </Tooltip>
              ),
              votes: votes,
              userVote: userVote,
              showModal: () => showModal(owner.username),
            };
          }
        );
        // console.log("comments:", newComments);
        setComments(newComments);
      })
      .catch(err => {
        // console.log(err);
      });
  }, []);

  return (
    <div>
      {comments.length > 0 && <CommentList comments={comments} />}
      {user && (
        <Comment
          showModal={() => showModal(user.username)}
          avatar={user.avatar ? `/api/v1/users/avatar/${user.avatar}` : ""}
          content={
            <Editor
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      )}
      <Profile
        visible={modalVisible}
        handleCancel={handleCancel}
        user={profile}
      />
    </div>
  );
};
