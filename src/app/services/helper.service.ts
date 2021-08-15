import { Injectable } from '@angular/core';


@Injectable()
export class HelperService {

  constructor() { }

  public ParseErrorMsg(error) {

    if (error.status == 422) {
      console.log("Error", error)
      if (error.error) {
        if (error.error.errors) {
          let msg = "";
          let errors = error.error.errors;
          for (var field in errors) {
            errors[field].forEach((d, i) => {
              msg += d + " \n";
            })
          }
          if (msg) {
            return msg;
          } else {
            return "Server Error";
          }
        }
        else {
          return error.error.message || "Server Error";
        }
      }
      return error.message || "Server Error";
    } else if (error.error) {
      if (error.error.message) {
        return error.error.message;
      }
    }


    console.error(error);
    return "Server Error";
  }
}
