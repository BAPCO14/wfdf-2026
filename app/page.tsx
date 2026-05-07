import { redirect } from "next/navigation";
import { headers } from "next/headers";

export default function RootPage() {
  const headersList = headers();
  const acceptLang = headersList.get("accept-language") ?? "fr";
  const locale = acceptLang.toLowerCase().startsWith("en") ? "en" : "fr";
  redirect(`/${locale}`);
}
