import { Controller, Get, Logger } from "@nestjs/common";
import { API_SERVICE_NAME, type HealthResponse } from "@inbox-pilot/types";
import { PrismaService } from "../prisma/prisma.service";

@Controller("health")
export class HealthController {
  private readonly logger = new Logger(HealthController.name);

  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async check(): Promise<HealthResponse> {
    let database: HealthResponse["database"] = "down";

    try {
      await this.prisma.$queryRaw`SELECT 1`;
      database = "up";
    } catch (error) {
      const message = error instanceof Error ? error.message : "unknown error";
      this.logger.warn(`Database health check failed: ${message}`);
    }

    return {
      status: database === "up" ? "ok" : "degraded",
      service: API_SERVICE_NAME,
      database,
      timestamp: new Date().toISOString(),
    };
  }
}
