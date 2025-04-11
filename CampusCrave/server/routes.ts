import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);

  // put additional application routes here
  // prefix all routes with /api
  
  const httpServer = createServer(app);

  return httpServer;
}
