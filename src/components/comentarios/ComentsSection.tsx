import React, { useEffect, useState } from 'react'
import { Send } from 'lucide-react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { FaRegMessage } from 'react-icons/fa6'

interface Comment {
  id: number
  user: string
  content: string
  likes: number
  replies: Comment[]
  timestamp: string
}

const commentsByProductId: { [productId: number]: Comment[] } = {
  1: [
    {
      id: 1,
      user: 'San Nicolás Maduro',
      content: 'Vamos a llevarnos producto como este a Venezuela.',
      likes: -15,
      replies: [],
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      user: 'Juan Gabriel',
      content: 'Fua, no se ni quien es Juan Gabriel pero sonaba chio, igual que esta laptop.',
      likes: 8,
      replies: [],
      timestamp: '1 day ago'
    }
  ],
  2: [
    {
      id: 3,
      user: 'Cristian Nodal',
      content: 'Quiero un diploma como este :c.',
      likes: 5,
      replies: [],
      timestamp: '3 hours ago'
    },
    {
      id: 4,
      user: 'A. H.',
      content: 'Quisiera uno de Arte, ¿lo tienen en alemán?',
      likes: 69,
      replies: [],
      timestamp: '5 hours ago'
    }
  ]
}

interface CommentsSectionProps {
  productId: number;
}

export default function CommentsSection({ productId }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [userLikes, setUserLikes] = useState<{ [commentId: number]: boolean }>({});

  const colorIcon = 'primary-theme';

  useEffect(() => {
    setComments(commentsByProductId[productId] || []);
  }, [productId]);

  const handleLike = (commentId: number) => {
    const hasLiked = userLikes[commentId] || false;
  
    const updatedComments = comments.map(comment =>
      comment.id === commentId 
        ? { ...comment, likes: hasLiked ? comment.likes - 1 : comment.likes + 1 }
        : comment
    );
    
    setComments(updatedComments);
    setUserLikes({ ...userLikes, [commentId]: !hasLiked });
  }

  const handleReply = (commentId: number, replyContent: string) => {
    const newReply: Comment = {
      id: Date.now(),
      user: 'Usuario',
      content: replyContent,
      likes: 0,
      replies: [],
      timestamp: 'Just now'
    };

    const updatedComments = comments.map(comment =>
      comment.id === commentId
        ? { ...comment, replies: [newReply, ...comment.replies] }
        : comment
    );
    setComments(updatedComments);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now(),
        user: 'Current User',
        content: newComment,
        likes: 0,
        replies: [],
        timestamp: 'Just now'
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  }

  return (
    <div className="p-4 rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex items-center space-x-2">
          <div className="avatar placeholder">
            <div className="text-neutral-content rounded-full w-8">
              <span className="text-xs">Tu</span>
            </div>
          </div>
          <input 
            type="text" 
            placeholder="Añade un Comentario" 
            className="input input-bordered w-full"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit" className="btn primary-theme">
            <Send size={20} />
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {comments.length  <= 0 && (
          <div className="bg-theme-secondary p-4 rounded-lg">
            <p className="text-center text-lg">No hay comentarios</p>
          </div>
        )}
        {comments.length > 0 && (
            <>
              {comments.map((comment) => (
              <div key={comment.id} className="bg-theme-secondary p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="avatar placeholder">
                    <div className=" text-neutral-content rounded-full w-8">
                      <span className="text-xs">{comment.user.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                  </div>
                  <span className="font-semibold">{comment.user}</span>
                  <span className="text-sm text-base-content/60">{comment.timestamp}</span>
                </div>
                <p className="mb-2">{comment.content}</p>
                <div className="flex items-center space-x-4 text-sm text-base-content/60 select-none">
                  <a 
                    onClick={() => handleLike(comment.id)} 
                    className="flex items-center space-x-1 primary-theme-hover"
                  >
                    {userLikes[comment.id] ? <FaHeart className={colorIcon} size={16} /> : <FaRegHeart className={colorIcon} size={16} />}
                    <span className='secondary-theme'>{comment.likes}</span>
                  </a>

                  <a className="flex items-center space-x-1 primary-theme-hover">
                    <FaRegMessage className={colorIcon} size={16} />
                    <span className='secondary-theme'>{comment.replies.length}</span>
                  </a>
                </div>

                <div className="ml-6 mt-4 space-y-2">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="bg-theme p-2 rounded-lg">
                      <span className="font-semibold">{reply.user}</span>
                      <span className="text-sm text-base-content/60 ml-2">{reply.timestamp}</span>
                      <p>{reply.content}</p>
                    </div>
                  ))}
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault()
                      const replyContent = e.currentTarget.replyInput.value
                      if (replyContent.trim()) {
                        handleReply(comment.id, replyContent)
                        e.currentTarget.replyInput.value = ''
                      }
                    }}
                  >
                    <input 
                      name="replyInput"
                      type="text" 
                      placeholder="Responder..." 
                      className="input input-bordered w-full"
                    />
                  </form>
                </div>
              </div>
              ))}
            </>
          )}
      </div>
    </div>
  )
}