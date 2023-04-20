import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import sessionMiddleware from "./sessionMiddleware";

const localeMiddleware = sessionMiddleware.unstable_pipe(async ({ ctx, next }) => {
  const { user } = ctx;

  const i18n = await serverSideTranslations(
    user?.locale && user?.locale !== ctx.locale ? user.locale : ctx.locale,
    ["common", "vital"]
  );

  const locale = user?.locale || ctx.locale;

  return next({
    ctx: { locale, i18n, user: { ...user, locale } },
  });
});

export default localeMiddleware;
