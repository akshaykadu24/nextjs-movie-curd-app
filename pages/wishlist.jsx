import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const Wishlist = ({wishlists}) => {
    const [newwishlists,setWishlists] = useState(wishlists)
    const router = useRouter()
    const handledelete = async(id)=>{
        let res = await fetch(`https://every-database.vercel.app/watchlists/${id}`,{
            method:"DELETE",
        })
        getwishlists()
        // aata = await res.json()
        // router.reload()
    }
    console.log(newwishlists)
    const getwishlists = async()=>{
        let res = await fetch("https://every-database.vercel.app/watchlists")
        let data = await res.json()
        setWishlists(data)
    }

    useEffect(()=>{
        
    },[])

  return (
    <Box>
        <Button onClick={()=>router.back()}>Back</Button>
        <Heading color={'green.500'}>Wishlist</Heading>
        <Box>
            {
                newwishlists.map((el)=>{
                    return(
                        <Flex key={el.id} backgroundColor="gray.100" marginTop={5} justifyContent="space-between" ml={15} mr={15} >
                            <Flex>
                                <Box>
                                <Image src={el.Poster} width={200} height={200} alt={el.Title}/>
                                </Box>
                                <Box ml={5}>
                                
                                <Heading>{el.Title}</Heading>
                                <Text><span style={{fontWeight:"bold"}}>Year:</span>  {el.Year}</Text>
                                <Text><span style={{fontWeight:"bold"}}>IMDB:</span> {el.imdbRating}</Text>
                                <Text><span style={{fontWeight:"bold"}}>Language:</span> {el.Language}</Text>
                                </Box>
                          </Flex>
                          <Box mt={9}>
                            <Button color="red" backgroundColor="red.100" mr={3} fontWeight={"bold"} fontSize="xl" onClick={()=>handledelete(el.id)}>Delete</Button>
                          </Box>

                      </Flex>
                    )
                })
            }
        </Box>

    </Box>
  )
}

export async function getServerSideProps(){
    let res = await fetch("https://every-database.vercel.app/watchlists")
    let data = await res.json()
    return{
        props:{
            wishlists:data
        }
    }
}

export default Wishlist