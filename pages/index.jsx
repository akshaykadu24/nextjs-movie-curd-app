import Head from 'next/head'
import Image from 'next/image'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Home({movies}) {
  console.log(movies)
  const router = useRouter()
  const handledynamicRoute = (id)=>{
    router.push(`/${id}`)
  }
  return (
    <>
      <Head>
        <title>Movies</title>
        <meta name="description" content="movie, react,js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
          <Box>
            <hr/>
            <Box>
            <Heading color={'red.500'}>Allmovies</Heading>
                {
                    movies.map((el)=>{
                        return(
                            <Flex key={el.id} backgroundColor="gray.100" marginTop={5} onClick={()=>handledynamicRoute(el.id)}>
                              <Box>
                                <Image src={el.Poster} width={200} height={200} alt={el.Title}/>
                              </Box> 
                              <Box ml={15}> 
                              
                                <Heading mt="8%">{el.Title}</Heading>
                                <Text mt={2}><span style={{fontWeight:"bold"}}>Language:</span> {el.Language}</Text>
                                </Box>

                            </Flex>
                        )
                    })
                }
            </Box>
          </Box>
      
      </main>
    </>
  )
}

export async function getServerSideProps(){
  let res = await fetch("https://every-database.vercel.app/movies")
  let data = await res.json()
  return{
      props:{
          movies:data
      }
  }
}