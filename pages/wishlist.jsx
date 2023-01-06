import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const Wishlist = ({wishlists}) => {
    const router = useRouter()
    const handledelete = async(id)=>{
        let res = await fetch(`https://every-database.vercel.app/watchlists/${id}`,{
            method:"DELETE",
        })
        router.reload()
    }

  return (
    <Box>
        <Button onClick={()=>router.back()}>Back</Button>
        <Heading color={'green.500'}>Wishlist</Heading>
        <Box>
            {
                wishlists.map((el)=>{
                    return(
                        <Flex key={el.id} backgroundColor="gray.100" marginTop={5} justifyContent="space-between" ml={15} mr={15} >
                            <Flex>
                                <Box>
                                <Image src={el.Poster} width={200} height={200} alt={el.Title}/>
                                </Box>
                                <Box>
                                
                                <Heading>{el.Title}</Heading>
                                <Text>Year: {el.Year}</Text>
                                </Box>
                          </Flex>
                          <Box>
                            <Button color="red" fontWeight={"bold"} onClick={()=>handledelete(el.id)}>Delete</Button>
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