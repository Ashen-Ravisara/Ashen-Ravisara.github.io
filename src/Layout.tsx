import { ReactElement } from "react"
import Navbar from "./Components/Navbar.js";
import Footer from "./Components/Footer.js";

type LayoutProps = {
  children: ReactElement
}

export default function Layout(props: Readonly<LayoutProps>) {
  return (
    <main className="d-flex flex-column h-100 w-100">
      <Navbar />
      <div className="flex-grow-1">
        {props.children}
      </div>
      <Footer />
    </main>
  )
}