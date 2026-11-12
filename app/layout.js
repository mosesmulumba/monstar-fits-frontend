import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/lib/auth";

export const metadata = {
  title: "monstàr fits — gentle garments, drip clothes",
  description: "Fashion for men & women.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navbar />
          <main className="max-w-6xl mx-auto px-5 py-8">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}