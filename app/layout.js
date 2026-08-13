import Navbar from "../components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Task Tracker",
  description: "A polished Next.js task tracker with routing and localStorage.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
