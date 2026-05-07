import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/layout/CustomCursor";
import ScrollProgress from "@/components/layout/ScrollProgress";
import DartEasterEgg from "@/components/layout/DartEasterEgg";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return [{ locale: "fr" }, { locale: "en" }];
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  return {
    alternates: {
      canonical: "/",
      languages: { fr: "/fr", en: "/en" },
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <CustomCursor />
      <ScrollProgress />
      <DartEasterEgg />
      <Header locale={locale} />
      <main className="min-h-screen">{children}</main>
      <Footer locale={locale} />
    </NextIntlClientProvider>
  );
}
