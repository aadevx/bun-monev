import { html, Html } from "@elysiajs/html";
import staticPlugin from "@elysiajs/static";
import { Elysia, redirect } from "elysia";
import { sessionPlugin } from "./sessions";
import { MemoryStore } from "./sessions/memory"
import nunjucks from "nunjucks";
import { LoginController } from "./controllers";

nunjucks.configure('src/views',{
  autoescape: true,
  noCache: true,
  watch: true
});

const app = new Elysia()
  .use(html())
  .use(sessionPlugin({
      store: new MemoryStore(),
      expireAfter: 15 * 60, // 15 minutes
    }))
  .use(staticPlugin())
  .get("/", (context) => LoginController.index(context))
  .post('/login', (context) => {
         return LoginController.otentikasi(context)
      })
  .get("/logout", (context) => {
      return LoginController.logout(context);
  })
  .get('/home', (context) => {
        console.log("sessionid", context.session.get("id"));
      })
  .group("/admin", (adminapp) =>
    adminapp.onBeforeHandle((context) => {
        let id = context.session.get("id");
        if (!id) {
          console.log("unauthrozed access, redirect to index");
          return redirect("/");
        }
      })
      .get("/rup", () => 'modul rup')
      .get("/tender", () => 'modul tender')
      .get("/nontender", () => 'modul nontender')
      .get("/pencatatan", () => 'modul pencatatan')
      .get("/katalog", () => 'modul katalog')
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
