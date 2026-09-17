export const metadata = {
  title: 'Northstar Chat',
  description: 'A focused conversation with your preferred AI agent.',
};

import './style.css'
 
export default function RootLayout({ children }) {
  return (
    <html lang="en-US">
      <body>{children}</body>
    </html>
  );
}