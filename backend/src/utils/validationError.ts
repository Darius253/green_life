import { ACTIONS } from '../actions';
import  {ValidationError} from 'express-validator'


export class ValidationErrors extends Error {
  public statusCode: number = 422;

  constructor(private errors: ValidationError[] , public action:ACTIONS) {
    super("wrong input");

    Object.setPrototypeOf(this , ValidationErrors.prototype)
  }

  serialize() {
    return this.errors.map((error) => {
      return {
        param: error.param,
        msg: error.msg,
        value: error.value,
      };
    });
  }
}