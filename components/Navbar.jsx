import React from 'react'
import Link from 'next/link'
import { Flex, Heading } from '@chakra-ui/react'

const Navbar = () => {
  return (
    <Flex justifyContent="space-around">
        <Link href="/"> <Heading color={'red.500'}> Allmovies </Heading></Link>
        <Link href="/wishlist"> <Heading color={'green.500'}> Wishlist </Heading></Link>
    </Flex>
  )
}

export default Navbar