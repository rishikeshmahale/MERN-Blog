import React, { useEffect, useState } from 'react'
import Post from '../Components/Post';


const Home = () => { 

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`/post`, {
      method: "GET"
    }).then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      })
    }).catch((err) => console.log(err.message));
  } , [])

  return (
    <>
      {
        posts.length > 0 ? (
          posts.map((post) => {
            return (
              <Post key={post._id} {...post} />
            )
          })
        ) : null
      }
    </>
  )
}

export default Home
