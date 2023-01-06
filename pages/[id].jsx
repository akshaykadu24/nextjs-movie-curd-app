import { Box, Button, Heading } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

const Movie = ({movie}) => {
    console.log(movie)
    const router = useRouter()
    // console.log(router) 

    const addWishlist =async(movie)=>{
        let res = await fetch("https://every-database.vercel.app/watchlists",{
            method:"POST",
            body:JSON.stringify(movie),
            headers:{
               "Content-Type":"application/json"
            }

        })
        // let data = await res.json()
    }
  return (
    <Box>
        <Button onClick={()=>router.back()}>Back</Button>
        <Heading>Movie</Heading>
        <Box>
            <Heading>{movie.Title}</Heading>
            <Image src={movie.Poster} width={300} height={300} alt={movie.Title}/>
            <Button onClick={()=>{addWishlist(movie)}}>add to wishlist</Button>
        </Box>
    </Box>
  )
}

export async function getStaticPaths(){
    let res = await fetch("https://every-database.vercel.app/movies")
    let data = await res.json()
    return{
        paths:data.map((el)=>({params : { id : String(el.id) }})),
        fallback:false
    }
}

export async function getStaticProps(contex){
    let id = contex.params.id
    console.log(contex)
    let res = await fetch (`https://every-database.vercel.app/movies/${id}`)
    let data = await res.json()
    return{
        props:{
            movie:data
        }
    }   

}

export default Movie