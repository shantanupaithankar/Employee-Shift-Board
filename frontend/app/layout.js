import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "ShiftBoard - Employee Shift Management",
    description: "Modern employee shift scheduling and management system",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased`}>
                <AuthProvider>
                    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
                        {children}
                    </div>
                </AuthProvider>
            </body>
        </html>
    );
}
