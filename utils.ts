export function readFile(path: string): string {
    const decoder = new TextDecoder("utf-8");
    return decoder.decode(Deno.readFileSync(path));
}
