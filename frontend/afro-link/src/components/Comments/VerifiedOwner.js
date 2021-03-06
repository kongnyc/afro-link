import React, { useState,useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useInput } from '../../util/useInput';
import axios from 'axios';
import { AuthContext } from '../../providers/AuthContext';
import { getAPI } from '../../util/getAPI';

const VerifiedOwner = ({ userBusinesses, post, getReviews }) => {
  const { currentUser } = useContext(AuthContext);
  const API = getAPI();
  const text = useInput('');
  const [showEdit, setShowEdit] = useState(true);
  const toggleButton = () => {
    setShowEdit(!showEdit);
  };
  const { id } = useParams();
  // console.log(userBusinesses[0]);
  // console.log(post);
  const submitReply = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/reviews/reply/${post.id}`, {
        name: userBusinesses[0].owner_name,
        review_id: id,
        reply_text: text.value,
      });
      getReviews();
    } catch (err) {
      console.log(err);
    }
  };
  let verifiedOwner = userBusinesses.map((el) => {
    if (el.owner_id == id && currentUser) {
      return (
        <div>
          <button className="Btn-create-Reply" onClick={() => toggleButton()}>
            Reply Here
          </button>
          {!showEdit && (
            <form onSubmit={submitReply}>
              <div className="labelInput">
                <label className="labelInput">Replying:</label>
                <textarea
                  type="text"
                  placeholder="Comments..."
                  name="comment"
                  {...text}
                  required
                />
              </div>
              <button className="Btn-create" type="submit" id="reviewsBtn">
                Submit
              </button>
            </form>
          )}
        </div>
      );
    }
  });

  return <div>{verifiedOwner}</div>;
};

export default VerifiedOwner;
