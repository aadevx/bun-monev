import { html, Html } from "@elysiajs/html";
import staticPlugin from "@elysiajs/static";
import { Elysia, redirect } from "elysia";
import nunjucks from "nunjucks";
import { LoginController } from "./controllers";

nunjucks.configure('src/views',{
  autoescape: true,
  noCache: true,
  watch: true
});

const app = new Elysia()
  .use(html())
  .use(staticPlugin())
  .get("/", () => "Hello Elysia")
  .get("/template", () => LoginController.index)
  .get('/home', ({ cookie: { sessionToken } }) => {
          // Get the value of a cookie
          if (sessionToken.value) {
              return `Welcome back! Token: ${sessionToken.value}`;
          }
          return 'No session token found.';
      })
  .get('/login', ({ cookie: { sessionToken } }) => {
         return LoginController.otentikasi(sessionToken)
      })
  .get("/logout", ({ cookie: { sessionToken } }) => {
      return LoginController.logout(sessionToken)
  })
  .group("/admin", (adminapp) =>
    adminapp.onBeforeHandle(({ cookie: { sessionToken } }) => {
        if (!sessionToken.value) {
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
