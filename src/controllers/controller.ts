import nunjucks from "nunjucks";

export abstract class Controller {

   async render(context : any, template: string, param?: object) {
     if (param == null)
       param = {}
      Object.assign(param, { session: context.session, request : context.request, error : context.session.get('error') });
      console.log("param : ", param)
      return nunjucks.render(template, param);
   }
}
