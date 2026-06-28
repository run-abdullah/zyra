import pc from "picocolors";

export const logger = {
  getTimestamp(): string {
    const now = new Date();
    return `[${now.toTimeString().split(" ")[0]}]`;
  },

  success(message: string, context: string = "SUCCESS"): void {
    const time = pc.gray(this.getTimestamp());
    const tag = pc.bold(pc.green(`[${context}]`));
    console.log(`${time} ${tag} ${pc.green(message)}`);
  },

  error(message: string, error?: any, context: string = "ERROR"): void {
    const time = pc.gray(this.getTimestamp());
    const tag = pc.bold(pc.red(`[${context}]`));

    console.error(`${time} ${tag} ${pc.red(message)}`);

    if (error && error.stack) {
      console.error(pc.gray(error.stack));
    } else if (error) {
      console.error(pc.gray(JSON.stringify(error)));
    }
  },
};
