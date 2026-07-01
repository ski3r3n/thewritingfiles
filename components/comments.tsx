"use client";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { VscClose } from "react-icons/vsc";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

type Comment = {
  id: number;
  created_at: string;
  user: string;
  writing: number;
  text: string;
  rating: number | null;
  author?: string;
};

async function fetchComments(writingId: string) {
  const { data, error } = await supabase
    .from("Comments")
    .select("*")
    .eq("writing", writingId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching comments:", error);
    return [];
  }

  return data;
}

async function getComments(writingId: string): Promise<Comment[]> {
  const data = await fetchComments(writingId);
  // get user name for each comment
  for (const comment of data) {
    const { data: userData, error: userError } = await supabase
      .from("Users")
      .select("username")
      .eq("id", comment.user);
    if (userData && userData.length > 0) {
      comment.author = userData[0].username;
    }
    if (userError) {
      console.error("Error fetching user data:", userError);
    }
  }
  return data as Comment[];
}

async function addComment(writingId: string, text: string, rating: number) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { error } = await supabase.from("Comments").insert([
    {
      writing: writingId,
      user: user?.id,
      text: text,
      rating: rating > 0 ? rating : null,
    },
  ]);

  if (error) {
    alert("Error posting comment: " + error.message);
  }

  return error;
}

async function deleteComment(commentId: number) {
  const { error } = await supabase
    .from("Comments")
    .delete()
    .eq("id", commentId);

  if (error) {
    alert("Error deleting comment: " + error.message);
  }

  return error;
}

export default function Comments({ writingId }: { writingId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isPosting, setIsPosting] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadCurrentUser() {
      const res = await supabase.auth.getUser();
      const id =
        (res as { data: { user: { id: string } } }).data?.user?.id ?? null;
      if (mounted) setCurrentUserId(id);
    }

    async function loadComments() {
      if (!writingId) return;
      const data = await getComments(writingId);
      if (mounted) setComments(data);
    }

    loadCurrentUser();
    loadComments();

    return () => {
      mounted = false;
    };
  }, [writingId]);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>

      <form
        className="flex flex-col mb-6"
        onSubmit={async (e) => {
          e.preventDefault();
          if (text.trim().length === 0) return;
          setIsPosting(true);
          const error = await addComment(writingId, text, rating);
          if (!error) {
            setText("");
            setRating(0);
            setComments(await getComments(writingId));
          }
          setIsPosting(false);
        }}
      >
        <div className="flex mb-3">
          {[1, 2, 3, 4, 5].map((star) => {
            const selected = star <= rating;
            const hovered = star <= hoverRating;
            const starClass = hovered
              ? selected
                ? "text-yellow-200"
                : "text-yellow-600"
              : selected
                ? "text-yellow-400"
                : "text-mist-400";
            return (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star === rating ? 0 : star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="cursor-pointer text-2xl px-0.5"
                aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
              >
                <FaStar className={starClass} />
              </button>
            );
          })}
          <button
            type="button"
            className="cursor-pointer text-2xl px-0.5 align-middle text-gray-400 hover:text-gray-600 transition"
            aria-label="Clear rating"
            onClick={() => setRating(0)}
          >
            <VscClose />
          </button>
        </div>
        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          className="w-full h-24 p-4 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          placeholder="Leave a comment..."
        />
        <button
          type="submit"
          disabled={isPosting}
          className="mt-4 self-start bg-mist-800 hover:bg-mist-950 active:bg-mist-800 transition cursor-pointer text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPosting ? "Posting..." : "Post Comment"}
        </button>
      </form>

      <div className="flex flex-col gap-4">
        {comments.length === 0 && (
          <p className="text-gray-400">No comments yet. Be the first!</p>
        )}
        {comments.map((comment) => (
          <div key={comment.id} className="bg-mist-800 p-6 rounded">
            <div className="flex items-center gap-4 mb-2">
              <h3 className="font-bold text-white">{comment.author}</h3>
              <span className="text-gray-400">
                {comment.created_at.slice(0, 10)}
              </span>
              {comment.rating && (
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={
                        star <= comment.rating!
                          ? "text-yellow-400"
                          : "text-mist-400"
                      }
                    />
                  ))}
                </div>
              )}
            </div>
            <p className="whitespace-pre-wrap">{comment.text}</p>
            {currentUserId === comment.user && (
              <button
                onClick={async () => {
                  const error = await deleteComment(comment.id);
                  if (!error) setComments(await getComments(writingId));
                }}
                className="mt-2 text-sm text-mist-400 hover:text-white cursor-pointer transition"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
