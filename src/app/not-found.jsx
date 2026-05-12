import { Link } from 'lucide-react';
import React from 'react'

const NotFound = () => {
  return (
    <div className='h-[80vh] flex flex-col justify-center items-center gap-3'>
      <h2 className='text-6xl font-bold'>404</h2>
      <p className='text-xl '>This page is not found</p>
      <a href={"/"}>
        <button className='btn btn-primary'>Go Back Home</button>
      </a>
    </div>
  );
};

export default NotFound;
