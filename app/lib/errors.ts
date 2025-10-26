// app/lib/errors.ts
export class AppError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(JSON.stringify({ status, message })); // 👈 viktig!
    this.status = status;
    this.name = "AppError";
  }
}
