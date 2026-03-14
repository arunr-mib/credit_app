'use client';

import { useState } from 'react';
import { Comment } from '@/types';

interface CommentsModalProps {
  clientName: string;
  comments: Comment[];
  onClose: () => void;
  onAddComment: (text: string) => void;
  onDeleteComment: (id: number) => void;
}

const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const TrashIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

const EditIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

export default function CommentsModal({
  clientName,
  comments,
  onClose,
  onAddComment,
  onDeleteComment,
}: CommentsModalProps) {
  const [text, setText] = useState('');
  const MAX = 1000;

  const handleAdd = () => {
    if (text.trim()) {
      onAddComment(text.trim());
      setText('');
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content" style={{ maxWidth: '560px' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <h2 className="text-sm font-semibold text-slate-800">Comments</h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-slate-100 text-slate-500 transition-colors"
          >
            <XIcon />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* New comment area */}
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1.5">
              Type a new comment
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, MAX))}
              placeholder="Write your comment..."
              rows={4}
              className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none text-slate-700 placeholder:text-slate-400"
            />
            <div className="flex items-center justify-between mt-1">
              <button
                onClick={handleAdd}
                disabled={!text.trim()}
                className="px-4 py-1.5 text-xs font-medium bg-green-700 text-white rounded hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Add Comment
              </button>
              <span className="text-[11px] text-slate-400">
                {text.length}/{MAX} char
              </span>
            </div>
          </div>

          {/* Comment history */}
          {comments.length > 0 && (
            <div className="space-y-3 border-t border-slate-100 pt-4">
              {comments.map((comment) => (
                <div key={comment.id} className="group">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="text-[11px] font-semibold text-slate-600 mb-0.5">
                        {comment.timestamp} -{' '}
                        <span className="text-blue-700">{comment.author}</span>
                      </div>
                      <div className="text-xs text-slate-700 leading-relaxed">{comment.text}</div>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                      <button className="p-1 rounded hover:bg-blue-50 text-blue-400 hover:text-blue-600 transition-colors">
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => onDeleteComment(comment.id)}
                        className="p-1 rounded hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {comments.length === 0 && (
            <div className="text-center py-4 text-slate-400 text-xs border-t border-slate-100 pt-4">
              No comments yet. Add the first comment above.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
