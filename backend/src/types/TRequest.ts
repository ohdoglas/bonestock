import { Request } from "express";

export default interface TRequestUserID extends Request {
    userId?: string;
}