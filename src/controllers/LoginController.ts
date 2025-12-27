import { Cookie, redirect } from "elysia";
import nunjucks from "nunjucks";

class LoginController {

  async index() {
    return nunjucks.render('login.html')
  }

  async otentikasi(sessionToken : Cookie<unknown>) {
    // TODO otentikasi account in DB
    sessionToken.set({
        value: 'sessionid',
        httpOnly: true, // Prevents client-side JavaScript access
        maxAge: 7 * 86400, // 7 days in seconds
        path: '/',
        secure: true, // Ensures the cookie is only sent over HTTPS
        sameSite: 'strict'
    });
    return { success: true, message: 'Logged in successfully' };
    // return redirect("/home")
  }

  async logout(sessionToken : Cookie<unknown> ) {
    sessionToken.remove();

    return redirect("/")
  }
}

export default new LoginController();
