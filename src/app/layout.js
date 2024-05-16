import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import StoreProvider from "./StoreProvider.jsx";
import Navbar from "../components/shared/navbar/Navbar.jsx";
import dynamic from "next/dynamic";

// I disabled SSR for the StoreProvider component to be able to use localStorage there and load the user saved data.
const StoreProviderWithNoSSR = dynamic(() => import("./StoreProvider.jsx"), {
  ssr: false,
});
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MHC Frontend Task",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-tertiaryColor text-textPrimary`}>
        <Toaster
          toastOptions={{
            style: {
              padding: "1rem",
              fontSize: "1.2rem",
            },
          }}
        />
        <section className="w-[98%] min-h-[90vh] m-auto">
          <StoreProviderWithNoSSR>
            <Navbar />
            {children}
          </StoreProviderWithNoSSR>
        </section>
      </body>
    </html>
  );
}
