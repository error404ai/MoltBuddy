import { NextFunction, Request, Response } from "express";
import { AsyncLocalStorage } from "node:async_hooks";
import * as TypeDI from "typedi";

type Store = Map<string, unknown>;

const als = new AsyncLocalStorage<Store>();

export const RequestContext = {
  run<T>(fn: () => T) {
    const store = new Map<string, unknown>();
    return als.run(store, fn);
  },
  set<T = unknown>(key: string, value: T) {
    const store = als.getStore();
    if (store) {
      store.set(key, value);
    }
  },
  get<T = unknown>(key: string): T | undefined {
    const store = als.getStore();
    return (store?.get(key) as T) ?? undefined;
  },
  has(key: string): boolean {
    const store = als.getStore();
    return store ? store.has(key) : false;
  },
};

// Get the Container from the module namespace
const Container = TypeDI.Container || TypeDI.default;

if (!Container || typeof Container.get !== "function") {
  throw new Error("[RequestContext] Failed to import Container from typedi");
}

const origGet = Container.get.bind(Container) as <T = unknown>(someClass: any) => T;
const origSet = Container.set.bind(Container) as (serviceIdentifier: any, value: any) => void;

// Patch Container.get to check RequestContext first
(Container as any).get = function patchedGet<T = unknown>(token: any): T {
  if (typeof token === "string" && RequestContext.has(token)) {
    return RequestContext.get<T>(token) as T;
  }
  return origGet<T>(token);
};

// Patch Container.set to also update RequestContext
(Container as any).set = function patchedSet(serviceIdentifier: any, value: any): void {
  if (typeof serviceIdentifier === "string") {
    RequestContext.set(serviceIdentifier, value);
  }
  origSet(serviceIdentifier, value);
};

// Middleware to wrap requests in RequestContext
export function requestContextMiddleware(req: Request, res: Response, next: NextFunction): void {
  RequestContext.run(() => {
    next();
  });
}
