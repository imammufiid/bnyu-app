import React, { useState } from 'react';
import { db, FirestoreCollection } from '../services/FirebaseService';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useUserSession } from '../hooks/useUserSession';

const FeedbackPage: React.FC = () => {
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUserSession();

  const handleSubmit = async (e: React.FormEvent) => {
    if (!user) return
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await addDoc(collection(db, FirestoreCollection.feedback), {
        feedback,
        createdAt: serverTimestamp(),
        userId: user.uid,
      });
      setSuccess(true);
      setFeedback('');
    } catch (err: any) {
      setError(err.message || 'Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-16 p-8 rounded-xl shadow-md bg-white dark:bg-gray-800">
      <h1 className="text-2xl font-bold mb-4">Feedback</h1>
      <p className="mb-6">We value your feedback! Please let us know your thoughts, suggestions, or issues you encountered while using Water Reminder.</p>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full h-32 p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your feedback here..."
          value={feedback}
          onChange={e => setFeedback(e.target.value)}
          required
        />
        <button
          type="submit"
          className={`
            w-full
            font-semibold py-2 px-4 rounded-lg
            transition-colors
            bg-blue-600 hover:bg-blue-700 focus:bg-blue-700
            dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:bg-blue-600
            text-gray-700 dark:text-white
            disabled:bg-gray-300 disabled:text-gray-300
            dark:disabled:bg-gray-700 dark:disabled:text-gray-400
            disabled:cursor-not-allowed
          `}
          disabled={loading || !feedback.trim()}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>
        {success && <div className="text-green-600 mt-3 text-center">Thank you for your feedback!</div>}
        {error && <div className="text-red-600 mt-3 text-center">{error}</div>}
      </form>
    </div>
  );
};

export default FeedbackPage; 