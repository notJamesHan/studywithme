import Head from "next/head";
import NavBar from "./NavBar";
import Footer from "./Footer";

interface LayoutProps {
  seoTitle?: string;
  children: React.ReactNode;
  hasTabBar?: boolean;
  hasFooter?: boolean;
}

export default function Layout({
  seoTitle,
  children,
  hasTabBar,
  hasFooter,
}: LayoutProps) {
  return (
    <div className="relative min-h-screen">
      <Head>
        <title>{seoTitle} | Carrot Market</title>
      </Head>
      {hasTabBar ? <NavBar /> : null}
      {hasFooter ? (
        <>
          <div className="mb-10">{children}</div>
          <div className="h-10">
            <Footer />
          </div>
        </>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
}
