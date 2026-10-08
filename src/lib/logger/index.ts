type LogLevel = "info" | "warn" | "error" | "debug";

export class Logger {
  private format(level: LogLevel, message: string, meta?: Record<string, unknown>) {
    const timestamp = new Date().toISOString();
    // Sanitize any accidentally passed secrets in meta
    const sanitizedMeta = meta ? this.sanitize(meta) : undefined;
    return {
      timestamp,
      level,
      message,
      ...(sanitizedMeta ? { meta: sanitizedMeta } : {}),
    };
  }

  private sanitize(obj: Record<string, unknown>): Record<string, unknown> {
    const sensitiveKeys = [
      "password",
      "passwordhash",
      "token",
      "secret",
      "apikey",
      "sessiontoken",
      "auth_secret",
      "authorization",
      "cookie",
    ];
    const clean: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(obj)) {
      if (sensitiveKeys.some((s) => key.toLowerCase().includes(s))) {
        clean[key] = "[REDACTED]";
      } else if (value && typeof value === "object" && !Array.isArray(value)) {
        clean[key] = this.sanitize(value as Record<string, unknown>);
      } else {
        clean[key] = value;
      }
    }
    return clean;
  }

  info(message: string, meta?: Record<string, unknown>) {
    console.log(JSON.stringify(this.format("info", message, meta)));
  }

  warn(message: string, meta?: Record<string, unknown>) {
    console.warn(JSON.stringify(this.format("warn", message, meta)));
  }

  error(message: string, error?: unknown, meta?: Record<string, unknown>) {
    const errorDetails =
      error instanceof Error
        ? { name: error.name, message: error.message, stack: error.stack }
        : error;

    console.error(
      JSON.stringify(
        this.format("error", message, {
          ...meta,
          error: errorDetails,
        })
      )
    );
  }
}

export const logger = new Logger();
