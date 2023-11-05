import 'reflect-metadata'; // We need this in order to use @Decorators

import sinon, { SinonSpy, assert, match, spy, stub } from 'sinon';

import { NextFunction, Request, Response } from 'express';

import { beforeEach, describe, it } from 'vitest';
import UserController from '../../../src/controllers/userController';
import { Result } from '../../../src/core/logic/Result';
import { IUserDTO } from '../../../src/dto/IUserDTO';
import { container } from '../../../src/loaders/inversify';
import { TYPES } from '../../../src/loaders/inversify/types';
import IUserService from '../../../src/services/IServices/IUserService';

describe('user controller', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('signUp: returns code 201 (created)', async () => {
    const body = { email: 'email', password: 'password' };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      status: spy()
    };
    const next: Partial<NextFunction> = () => {};

    const userServiceInstance = container.get<IUserService>(TYPES.userService);
    stub(userServiceInstance, 'signUp').resolves(
      Result.ok<{ userDTO: IUserDTO; token: string }>({
        userDTO: {
          firstName: 'firstName',
          lastName: 'lastName',
          email: body.email,
          password: body.password,
          phoneNumber: 'phoneNumber',
          role: 'role'
        },
        token: 'token'
      })
    );

    const ctrl = new UserController(userServiceInstance);

    await ctrl.signUp(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 201);
  });

  it('signUp: returns json with firstName+lastName+email+password+phoneNumber+role+token values', async () => {
    const body = {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      password: 'password',
      phoneNumber: 'phoneNumber',
      role: 'role'
    };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();
    const next: Partial<NextFunction> = () => {};

    const userServiceInstance = container.get<IUserService>(TYPES.userService);
    stub(userServiceInstance, 'signUp').resolves(
      Result.ok<{ userDTO: IUserDTO; token: string }>({
        userDTO: {
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          password: body.password,
          phoneNumber: body.phoneNumber,
          role: body.role
        },
        token: 'token'
      })
    );

    const ctrl = new UserController(userServiceInstance);

    await ctrl.signUp(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(
      <SinonSpy>res.json,
      match({
        userDTO: {
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          password: body.password,
          phoneNumber: body.phoneNumber,
          role: body.role
        },
        token: 'token'
      })
    );
  });

  it('signUp: returns status 400 when service fails', async () => {
    const body = {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      password: 'password',
      phoneNumber: 'phoneNumber',
      role: 'role'
    };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      status: spy()
    };
    const next: Partial<NextFunction> = () => {};

    const userServiceInstance = container.get<IUserService>(TYPES.userService);
    stub(userServiceInstance, 'signUp').resolves(Result.fail('error'));

    const ctrl = new UserController(userServiceInstance);

    await ctrl.signUp(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 400);
  });

  it('signUp: returns json with error message when service fails', async () => {
    const body = {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      password: 'password',
      phoneNumber: 'phoneNumber',
      role: 'role'
    };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();
    const next: Partial<NextFunction> = () => {};

    const userServiceInstance = container.get<IUserService>(TYPES.userService);
    stub(userServiceInstance, 'signUp').resolves(Result.fail('error'));

    const ctrl = new UserController(userServiceInstance);

    await ctrl.signUp(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(<SinonSpy>res.json, match({ message: 'error' }));
  });

  it('signUp: calls next when service throws error', async () => {
    const body = {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      password: 'password',
      phoneNumber: 'phoneNumber',
      role: 'role'
    };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();
    const next: Partial<NextFunction> = spy();

    const userServiceInstance = container.get<IUserService>(TYPES.userService);
    stub(userServiceInstance, 'signUp').rejects(new Error('error'));

    const ctrl = new UserController(userServiceInstance);

    await ctrl.signUp(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>next);
    assert.calledWith(<SinonSpy>next, match.instanceOf(Error));
  });

  it('signIn: returns code 200 (ok)', async () => {
    const body = { email: 'email', password: 'password' };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      status: spy()
    };
    const next: Partial<NextFunction> = () => {};

    const userServiceInstance = container.get<IUserService>(TYPES.userService);
    stub(userServiceInstance, 'signIn').resolves(
      Result.ok<{ userDTO: IUserDTO; token: string }>({
        userDTO: {
          firstName: 'firstName',
          lastName: 'lastName',
          email: body.email,
          password: body.password,
          phoneNumber: 'phoneNumber',
          role: 'role'
        },
        token: 'token'
      })
    );

    const ctrl = new UserController(userServiceInstance);

    await ctrl.signIn(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 200);
  });

  it('signIn: returns json with firstName+lastName+email+password+phoneNumber+role+token values', async () => {
    const body = {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      password: 'password',
      phoneNumber: 'phoneNumber',
      role: 'role'
    };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();
    const next: Partial<NextFunction> = () => {};

    const userServiceInstance = container.get<IUserService>(TYPES.userService);
    stub(userServiceInstance, 'signIn').resolves(
      Result.ok<{ userDTO: IUserDTO; token: string }>({
        userDTO: {
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          password: body.password,
          phoneNumber: body.phoneNumber,
          role: body.role
        },
        token: 'token'
      })
    );

    const ctrl = new UserController(userServiceInstance);

    await ctrl.signIn(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(
      <SinonSpy>res.json,
      match({
        userDTO: {
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          password: body.password,
          phoneNumber: body.phoneNumber,
          role: body.role
        },
        token: 'token'
      })
    );
  });

  it('signIn: returns status 403 when service fails', async () => {
    const body = {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      password: 'password',
      phoneNumber: 'phoneNumber',
      role: 'role'
    };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      status: spy()
    };
    const next: Partial<NextFunction> = () => {};

    const userServiceInstance = container.get<IUserService>(TYPES.userService);
    stub(userServiceInstance, 'signIn').resolves(Result.fail('error'));

    const ctrl = new UserController(userServiceInstance);

    await ctrl.signIn(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.status);
    assert.calledWith(<SinonSpy>res.status, 403);
  });

  it('signIn: returns json with error message when service fails', async () => {
    const body = {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      password: 'password',
      phoneNumber: 'phoneNumber',
      role: 'role'
    };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();
    const next: Partial<NextFunction> = () => {};

    const userServiceInstance = container.get<IUserService>(TYPES.userService);
    stub(userServiceInstance, 'signIn').resolves(Result.fail('error'));

    const ctrl = new UserController(userServiceInstance);

    await ctrl.signIn(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>res.json);
    assert.calledWith(<SinonSpy>res.json, match({ message: 'error' }));
  });

  it('signIn: calls next when service throws error', async () => {
    const body = { email: 'email', password: 'password' };
    const req: Partial<Request> = {};
    req.body = body;

    const res: Partial<Response> = {
      status: _ => <Response>{}
    };
    stub(res, 'status').returns(res);
    res.json = spy();
    const next: Partial<NextFunction> = spy();

    const userServiceInstance = container.get<IUserService>(TYPES.userService);
    stub(userServiceInstance, 'signIn').rejects(new Error('error'));

    const ctrl = new UserController(userServiceInstance);

    await ctrl.signIn(<Request>req, <Response>res, <NextFunction>next);

    assert.calledOnce(<SinonSpy>next);
    assert.calledWith(<SinonSpy>next, match.instanceOf(Error));
  });
});
