'use client'; // Error components must be Client Components
 
import { useEffect } from 'react';

export default function Error({
    error,
    reset,
  }: {
    error: Error;
    reset: () => void;
  }) {
    useEffect(() => {
      // Log the error to an error reporting service
      console.error(error);
    }, [error]);
   
    return (
      <div className='flex justify-center'>
        <h2>Something went wrong!</h2>
        <h2 className='p-4'>{error.name}</h2>
        <h2 className='p-4'>{error.message}</h2>
        <h2 className='p-4'>{error.stack}</h2>
        <button className='p-4'
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </button>
      </div>
    );
  }