import { Request, Response } from 'express';

export abstract class BaseController {
  constructor(private request: Request, private response: Response) {}

  public static jsonResponse(res: Response, code: number, message: string) {
    return res.status(code).json({ message });
  }

  public ok<T>(res: Response, dto?: T) {
    if (!!dto) {
      return res.status(200).json(dto);
    } else {
      return res.sendStatus(200);
    }
  }

  public created(res: Response) {
    return res.sendStatus(201);
  }

  public clientError(message?: string) {
    return BaseController.jsonResponse(this.response, 400, message ? message : 'Unauthorized');
  }

  public unauthorized(message?: string) {
    return BaseController.jsonResponse(this.response, 401, message ? message : 'Unauthorized');
  }

  public paymentRequired(message?: string) {
    return BaseController.jsonResponse(this.response, 402, message ? message : 'Payment required');
  }

  public forbidden(message?: string) {
    return BaseController.jsonResponse(this.response, 403, message ? message : 'Forbidden');
  }

  public notFound(message?: string) {
    return BaseController.jsonResponse(this.response, 404, message ? message : 'Not found');
  }

  public conflict(message?: string) {
    return BaseController.jsonResponse(this.response, 409, message ? message : 'Conflict');
  }

  public tooMany(message?: string) {
    return BaseController.jsonResponse(this.response, 429, message ? message : 'Too many requests');
  }

  public todo() {
    return BaseController.jsonResponse(this.response, 400, 'TODO');
  }

  public fail(error: Error | string) {
    console.log(error);
    return this.response.status(500).json({
      message: error.toString()
    });
  }
}
