import React from "react";

const ProfileImage = ({photo}) => {
  return <img src={photo} className="w-35 h-30 rounded-sm cursor-pointer" />;
};

export default ProfileImage;
