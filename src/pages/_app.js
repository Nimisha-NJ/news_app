import { DarkModeProvider } from '@/components/context/DarkModeContext';
import '../styles/globals.css';
function MyApp({ Component, pageProps }) {
  return (
    <DarkModeProvider>
      <Component {...pageProps} />
    </DarkModeProvider>
  );
}

export default MyApp;
