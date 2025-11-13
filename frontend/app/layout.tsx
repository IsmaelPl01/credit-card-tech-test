import { CardProvider } from './context/CardContext';
import './globals.css';

export const metadata = {
  title: 'Gestión de Tarjetas',
  description: 'Sistema de gestión de tarjetas de crédito',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <CardProvider>
          {children}
        </CardProvider>
      </body>
    </html>
  );
}