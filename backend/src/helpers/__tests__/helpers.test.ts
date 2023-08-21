import { IUserRequest } from "../../types";
import { withUserInRequest } from "../request";
import { Response, Request } from "express";

describe("withUserInRequest", () => {
  it("should call the handler function with a valid IUserRequest object and a Response object", async () => {
    const req = { user: { id: "123" } } as unknown as IUserRequest;
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response;
          const handler = jest.fn();
    await withUserInRequest(handler)(req, res, jest.fn());
    expect(handler).toHaveBeenCalledWith(req, res);
  });

  it("should return a Promise<void>", () => {
    const req = {} as unknown as Request;
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response;
          const next = jest.fn();
    const result = withUserInRequest(
      async (req: IUserRequest, res: Response) => {
        return;
      }
    )(req, res, next);
    expect(result).toBeInstanceOf(Promise);
  });

  it("should call the next middleware function if the request is a valid IUserRequest object", async () => {
    const req = { user: { id: "123" } } as unknown as IUserRequest;
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response;
          const next = jest.fn();
    await withUserInRequest(async (req: IUserRequest, res: Response) => {
      return;
    })(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('should return a 401 error response if the request is not a valid IUserRequest object', async () => {
    const req = {} as unknown as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as unknown as Response;
    const next = jest.fn();
    try {
        await withUserInRequest(async (req: IUserRequest, res: Response) => {
            return;
        })(req, res, next);
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Request is not IUserRequest' });
    } catch (e) {
        console.error(e);
    }
});


  it("should pass errors thrown by the handler function to the error handling middleware", async () => {
    const req = { user: { id: "123" } } as unknown as IUserRequest;
    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      } as unknown as Response;
          const next = jest.fn();
    const error = new Error("test error");
    const handler = jest.fn().mockRejectedValue(error);
    await withUserInRequest(handler)(req, res, next);
    expect(next).toHaveBeenCalledWith(error);
  });

  it('should pass errors thrown by the next middleware function to the error handling middleware', async () => {
    const req: IUserRequest = { user: { id: '123' } } as unknown as IUserRequest;
    const res = {} as Response;
    const next = jest.fn();
    const handler = jest.fn();
    
    // Mock the next function to simulate an error.
    const error = new Error('test error');
    handler.mockImplementationOnce(() => {
        throw error;
    });

    await withUserInRequest(handler)(req, res, next);

    expect(next).toHaveBeenCalledWith(error);
});

});
