import { Controller } from "./controller";

class DashboardController extends Controller {

  async index(context : any) {
    return this.render(context, "dashboard.html");
  }
}

export default new DashboardController();
