import React, { useState } from "react";
import { useCrud } from "../context/CrudContext";
import { useAuth } from "../context/AuthContext";
import { EditModalCard } from ".";

const PostOptionsModal = ({ isOpen, onClose, postId, userId }) => {
  const [editModal, setEditModal] = useState(false);
  const { deletePost } = useCrud();
  const { user } = useAuth();

  const handlePostDelete = async (id) => {
    try {
      await deletePost(id);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const isOwner = user?.uid === userId;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={(e) => {
      e.stopPropagation();
      onClose();  
    }}>
      <div className="bg-[#28303d] rounded-lg shadow-2xl min-w-64 overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {isOwner && (
          <>
            <button
              onClick={() => setEditModal(true)}
              className="cursor-pointer w-full px-6 py-3 text-left text-gray-200 font-inter hover:bg-[#3a4555] transition-colors flex items-center gap-3"
            >
              <span className="text-lg">✏️</span>
              <span>Edit Post</span>
            </button>
            <EditModalCard
              isOpen={editModal}
              onClose={() => setEditModal(false)}
              postId={postId}
              optionsClose={onClose}
            />
          </>
        )}

        {isOwner && (
          <button
            onClick={() => handlePostDelete(postId)}
            className="cursor-pointer w-full px-6 py-3 text-left text-gray-200 font-inter hover:bg-[#3a4555] transition-colors flex items-center gap-3 border-t border-gray-700"
          >
            <span className="text-lg">🗑️</span>
            <span>Delete Post</span>
          </button>
        )}

        <button className="w-full px-6 py-3 text-left text-gray-200 font-inter hover:bg-[#3a4555] transition-colors flex items-center gap-3 border-t border-gray-700">
          <span className="text-lg">📤</span>
          <span>Share Post</span>
        </button>
      </div>
    </div>
  );
};

export default PostOptionsModal;
