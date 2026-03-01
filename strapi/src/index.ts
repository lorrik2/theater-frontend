import type { Core } from "@strapi/strapi";
import { slugify } from "./utils/slugify";

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Core.Strapi }) {
    strapi.documents.use((context, next) => {
      const params = context.params as {
        data?: { title?: unknown; name?: unknown; slug?: string };
      };
      if (!params?.data || !["create", "update"].includes(context.action)) {
        return next();
      }
      const { data } = params;

      if (context.uid === "api::performance.performance") {
        const title = data.title;
        if (typeof title === "string" && title.trim()) {
          data.slug = slugify(title.trim());
        }
      } else if (context.uid === "api::actor.actor") {
        const name = data.name;
        if (typeof name === "string" && name.trim()) {
          data.slug = slugify(name.trim());
        }
      } else if (context.uid === "api::news-item.news-item") {
        const title = data.title;
        if (typeof title === "string" && title.trim()) {
          data.slug = slugify(title.trim());
        }
      }
      return next();
    });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {},
};
