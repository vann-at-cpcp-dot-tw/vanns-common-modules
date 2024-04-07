export let basePath: string;
export let reactStrictMode: boolean;
export let swcMinify: boolean;
export let env: {};
export namespace sassOptions {
    let includePaths: any[];
}
export namespace images {
    let remotePatterns: {
        protocol: string;
        hostname: string;
    }[];
}
export function webpack(config: any, { dev, isServer }: {
    dev: any;
    isServer: any;
}): any;
export let trailingSlash: boolean;
