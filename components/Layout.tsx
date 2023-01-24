import Head from "next/head";
import NavBar from "./NavBar";

interface LayoutProps {
  seoTitle?: string;
  children: React.ReactNode;
  hasTabBar?: boolean;
}

export default function Layout({ seoTitle, children, hasTabBar }: LayoutProps) {
  return (
    <div>
      <Head>
        <title>{seoTitle} | Carrot Market</title>
      </Head>
      {hasTabBar ? <NavBar /> : null}
      <div>{children}</div>
    </div>
  );
}
