import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatWidget from "../chatbot/ChatWidget";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="page">{children}</main>
      <Footer />
      <ChatWidget />
    </>
  );
}
