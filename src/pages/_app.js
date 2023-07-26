import '@/styles/globals.css'

export function Wrapper({children}){
  return <div className="max-w-screen-xl mx-auto">{children}</div>
}

export default function App({ Component, pageProps }) {
  return (
    <Wrapper>
      <Component {...pageProps} />
    </Wrapper>
  );
  
}
