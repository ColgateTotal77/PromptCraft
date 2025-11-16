'use client';

import { useEffect } from "react";
import { signInWithGitlab, signInWithGoogle } from '@/app/api/auth/login/actions';

export function LoginDialog({ open, onClose }: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 w-full max-w-sm rounded-xl p-6 shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4 text-center">Sign In</h2>

        <div className="flex flex-col gap-3">

          <button
            onClick={signInWithGoogle}
            className="w-full bg-white text-black py-2 rounded-md font-medium hover:opacity-90 transition"
          >
            Continue with Google
          </button>

          <button
            onClick={signInWithGitlab}
            className="w-full bg-orange-600 text-white py-2 rounded-md font-medium hover:opacity-90 transition"
          >
            Continue with GitLab
          </button>

        </div>

        <button
          onClick={onClose}
          className="mt-4 text-gray-400 text-sm block mx-auto hover:text-gray-200 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
