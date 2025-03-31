import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Spinner from './Spinner';

const API_KEY = process.env.REACT_APP_GIPHY_API_KEY

const Random = () => {
    const [gif, setGif] = useState('');
    const [loading, setLoading] = useState(false);


    async function fetchData() {
      setLoading(true);
      const url = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;
      const {data} = await axios.get(url);
      const imageSource = data.data.images.downsized_large.url;
      console.log(imageSource);
      setGif(imageSource);
      setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);
    

    function clickHandler() {
      fetchData();
    }

  return (
    <div className='w-[40%] h-[500px] bg-green-400 rounded-lg border border-black flex flex-col items-center gap-y-5'>
      <h1 className='text-bold text-2xl uppercase'>A Random GIF</h1>

      <div className='flex items-center justify-center w-[300px] h-[300px]'>
      {
        loading ? (<Spinner/>) : (<img src={gif} className='w-[300px] h-[300px] object-cover rounded-lg'/>)
      }
      </div>
      
      <button
       onClick={clickHandler}
       className='bg-white/70 w-9/12 text-black rounded-lg text-lg py-2 mt-[4rem]'
       >
       Generate
      </button>
    </div>
  )
}

export default Random
