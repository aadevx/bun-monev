import { redirect } from "elysia";
import { Controller } from "./controller";

class LoginController extends Controller {

  async index(context : any) {
    return this.render(context, "login.html");
  }

  async otentikasi(context : any) {
    if (process.env.ADMIN_USER == context.body.username && process.env.ADMIN_PASS == context.body.password) {
        context.session.set("userid", context.body.username);
        context.session.set("role", "ADMIN");
        return redirect("/home")
    } else if(process.env.USER_USERID == context.body.username && process.env.USER_PASS == context.body.password){
      context.session.set("userid", context.body.username);
      context.session.set("role", "USER");
      return redirect("/home")
    }
    context.session.flash("error", "Invalid User ID or Password");
    return redirect("/");
  }

  async logout(context : any) {
    console.log("logout");
    context.session.delete();
    return redirect("/")
  }
}

export default new LoginController();
