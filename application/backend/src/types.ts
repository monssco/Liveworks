import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";
import { Request, Response } from "express";
import { Business } from "./entities/Business/Business";
import { Worker } from "./entities/Worker/Worker";

export type MyContext = {
    em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>>;
    req: Request;
    res: Response;
    user: Business | Worker;
};

export enum USER_TYPE  {
    BUSINESS = 'BUSINESS',
    WORKER = 'WORKER'
}