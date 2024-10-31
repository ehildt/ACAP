export class AppAdapter {
  get PORT(): number {
    return parseInt(process.env.PORT, 10);
  }

  get ADDRESS(): string {
    return process.env.ADDRESS;
  }

  get START_SWAGGER(): boolean {
    return process.env.START_SWAGGER == 'true';
  }

  get PRINT_ENV(): boolean {
    return process.env.PRINT_ENV == 'true';
  }

  get NODE_ENV(): string {
    return process.env.NODE_ENV;
  }

  get TTL(): number {
    return parseInt(process.env.REALM_TTL ?? '360', 10);
  }

  get BODY_LIMIT(): number {
    return parseInt(process.env.BODY_LIMIT ?? '16777216', 10);
  }
}
