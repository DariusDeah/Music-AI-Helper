import { Response } from "express";
import { CustomError } from "./errors.utils";

export class ApiResponseFormatter {
  static success(res: Response, data?: any) {
    res.status(200).json({
      status: "success",
      data,
    });
  }

  static created(res: Response, data: any) {
    res.status(201).json({
      status: "success",
      data,
    });
  }

  static error(res: Response, error: Error): void;
  static error(res: Response, error: CustomError): void;
  static error(res: Response, error: any) {
    res
      .status(error.statusCode || 500)
      .json({ status: "error", message: error.message });
  }
}
