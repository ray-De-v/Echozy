import { assets } from "../assets/assets";
import { useAppContext } from "../Context/Context";

const ChatFriendCard = ({ friend, setSingleUser }) => {
  const { normalApi } = useAppContext();

  const profilePhoto = friend?.profilePhoto

  return (
    <div
      onClick={() => setSingleUser(friend)}
      className="flex gap-2 item-center justify-center"
    >
      <div className="flex items-center w-full  gap-2 p-4 hover:bg-gray-100  rounded-xl  cursor-pointer transition-colors mb-4">
        <div className="w-14 h-14 rounded-full">
          <img
            src={profilePhoto}
            alt="Profile"
            className="w-full h-full rounded-full object-cover border-2 border-white"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-gray-900 text-sm truncate">
            {friend?.firstName || "Unknown"} {friend?.lastName || ""}
          </p>
          <p className="text-xs text-gray-500">The latest message</p>
        </div>
      </div>
    </div>
  );
};

export default ChatFriendCard;
