import '../styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import Navbar from '../components/Navbar'


export default function App({ Component, pageProps }) {
  return(
    <>
    <ChakraProvider>
      <Navbar/>
        <Component {...pageProps} />
     </ChakraProvider>
    </>
)}
