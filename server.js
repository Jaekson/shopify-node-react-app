require("isomorphic-fetch");
const dotenv = require("dotenv");
const Koa = require("koa");
const next = require("next");
const {
  default: createShopifyAuth,
  verifyRequest,
} = require("@shopify/koa-shopify-auth");
const session = require("koa-session");
const {
  default: graphQLProxy,
  ApiVersion,
} = require("@shopify/koa-shopify-graphql-proxy");
const Router = require("koa-router");
const {
  receiveWebhook,
  registerWebhook,
} = require("@shopify/koa-shopify-webhooks");
const getSubscriptionUrl = require("./server/getSubscriptionUrl");

dotenv.config();

const port = parseInt(process.env.PORT, 10) || 3001;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY, HOST } = process.env;

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();
  server.use(session({ secure: true, sameSite: "none" }, server));
  server.keys = [SHOPIFY_API_SECRET_KEY];
  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      scopes: ["read_products", "write_products"],
      async afterAuth(ctx) {
        const { shop, accessToken } = ctx.session;
        ctx.cookies.set("shopOrigin", shop, {
          httpOnly: false,
          sameSite: "none",
          secure: true,
        });

        // register a webhook for product creation
        const registration = await registerWebhook({
          address: `${HOST}/webhooks/products/create`,
          topic: "PRODUCTS_CREATE",
          accessToken,
          shop,
          apiVersion: ApiVersion.April20,
        });

        if (registration.success) {
          console.log("Successfully registered webhook!");
        } else {
          console.log("Failed to register webhook", registration.result);
        }

        await getSubscriptionUrl(ctx, accessToken, shop);
      },
    })
  );

  //receive webhooks when a product is created:
  const webhook = receiveWebhook({ secret: SHOPIFY_API_SECRET_KEY });
  router.post("/webhooks/products/create", webhook, (ctx) => {
    console.log("received webhook: ", ctx.state.webhook);
  });

  server.use(graphQLProxy({ version: ApiVersion.April20 }));

  // Send verifyRequest() and the app code through the router
  router.get("(.*)", verifyRequest(), async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  });
  server.use(router.allowedMethods());
  server.use(router.routes());

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
