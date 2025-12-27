import { Context, Cookie, redirect } from "elysia";
import nunjucks from "nunjucks";

class LoginController {

  async index(context : any) {
    return nunjucks.render('login.html', {flash : context.session.flash})
  }

  async otentikasi(context : any) {
    // TODO otentikasi in DB
    context.session.set("id", "PPK10");
    return redirect("/home")
  }

  async logout(context : any) {
    console.log("logout");
    context.session.delete();
    return redirect("/")
  }
}

export default new LoginController();
