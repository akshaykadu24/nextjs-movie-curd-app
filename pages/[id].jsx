import { Box, Button, Heading, Text } from '@chakra-ui/react'
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
        <Button onClick={()=>router.back()}>Back</Button><br /><br />
        {/* <Heading>Movie</Heading> */}
        <Box display="flex">
           <Box>
                <Heading>{movie.Title}</Heading><br />
                <Image src={movie.Poster} width={300} height={300} alt={movie.Title}/>
           </Box>
            <Box mt={12} ml={5}>
                <Text mt={5}><span style={{fontWeight:"bold"}}>Year:</span>  {movie.Year}</Text>
                <Text mt={5}><span style={{fontWeight:"bold"}}>IMDB:</span> {movie.imdbRating}</Text>
                <Text mt={5}><span style={{fontWeight:"bold"}}>Language:</span> {movie.Language}</Text>
                <Button mt={5} backgroundColor={"skyblue"} onClick={()=>{addWishlist(movie)}}>add to wishlist</Button>

            </Box>
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