import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Image from "react-graceful-image";

import { useDispatch, useSelector } from "react-redux";
import {
  getProfileById,
  getPhotos,
  notFound,
} from "../../store/profile/profile-actions";
import ProfileTop from "./ProfileTop";

const Friends = (props) => {
  const { match } = props;
  const dispatch = useDispatch();
  const { profile, loading, photos } = useSelector((state) => state.profile);
  const auth = useSelector((state) => state.auth);
  const friendRequest = useSelector((state) => state.friendRequest);

  useEffect(() => {
    dispatch(getProfileById(match.params.id));
    dispatch(getPhotos(match.params.id));
  }, [dispatch, match.params.id]);

  if (loading) return <h1 className="p-1 mt-2"></h1>;
  if (!profile && !loading) {
    dispatch(notFound());
  }
  if (!profile && !loading) return <Redirect to="/newsfeed" />;

  return (
    <main className="profile">
      {!profile.loading && (
        <>
          <ProfileTop
            auth={auth}
            profile={profile}
            match={match}
            friendRequest={friendRequest}
          />

          <div className="profile-item-container m-auto maxw-70">
            <div className="profile-item-container-inner p-2">
              <div className="profile-item-header pb-1-5">
                <span className="item-header-title">Photos</span>
              </div>
              {!photos.length && (
                <span className="gray grayscale">
                  Currently empty &#128561;
                </span>
              )}
              <div className="grid-6">
                {photos.map((photoPost) => (
                  <div key={photoPost._id}>
                    <Link to={`/newsfeed/${photoPost._id}`}>
                      <Image src={photoPost.image} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Friends;