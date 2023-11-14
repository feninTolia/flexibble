import Navbar from '@/components/Header/Navbar';
import './global.css';
import Footer from '@/components/Footer/Footer';

export const metadata = {
  title: 'Trickle',
  description: 'Created by FTOE',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="main-layout">
        <header>
          <Navbar />
        </header>

        <main> {children}</main>

        <Footer />
      </body>
    </html>
  );
}
