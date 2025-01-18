import { ReactElement } from "react"
import Navbar from "./Components/Navbar.js";
import Footer from "./Components/Footer.js";
import { Box } from "@mui/material";

type LayoutProps = {
  children: ReactElement
}

export default function Layout(props: Readonly<LayoutProps>) {
  return (
    <main className="d-flex flex-column h-100 w-100">
      <Navbar />
      <Box className="flex-grow-1" sx={{ backgroundColor: 'common.white' }}>
        {props.children}
      </Box>
      <Footer />
    </main>
  )
}