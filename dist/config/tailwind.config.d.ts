export let darkMode: string[];
export let safelist: string[];
export namespace future {
    let hoverOnlyWhenSupported: boolean;
}
export let content: string[];
export namespace corePlugins {
    let container: boolean;
    let animation: boolean;
}
export namespace theme {
    export namespace container_1 {
        let center: boolean;
        let padding: string;
    }
    export { container_1 as container };
    export let screens: {
        sm: string;
        md: string;
        lg: string;
        xl: string;
        '2xl': string;
        '3xl': string;
        '4xl': string;
        _sm: {
            max: string;
        };
        _md: {
            max: string;
        };
        _lg: {
            max: string;
        };
        _xl: {
            max: string;
        };
        _2xl: {
            max: string;
        };
        _3xl: {
            max: string;
        };
        _4xl: {
            max: string;
        };
    };
    export namespace extend {
        export namespace height {
            let screen: string[];
        }
        export namespace minHeight {
            let screen_1: string[];
            export { screen_1 as screen };
        }
        export namespace maxHeight {
            let screen_2: string[];
            export { screen_2 as screen };
        }
        export let fontWeight: {
            100: string;
            200: string;
            300: string;
            400: string;
            500: string;
            600: string;
            700: string;
            800: string;
            900: string;
        };
        export let colors: any;
        export namespace borderRadius {
            let xl: string;
            let lg: string;
            let md: string;
            let sm: string;
        }
        export let keyframes: {
            'accordion-down': {
                from: {
                    height: number;
                };
                to: {
                    height: string;
                };
            };
            'accordion-up': {
                from: {
                    height: string;
                };
                to: {
                    height: number;
                };
            };
            'collapsible-down': {
                from: {
                    height: number;
                };
                to: {
                    height: string;
                };
            };
            'collapsible-up': {
                from: {
                    height: string;
                };
                to: {
                    height: number;
                };
            };
        };
        let animation_1: {
            'accordion-down': string;
            'accordion-up': string;
            'collapsible-down': string;
            'collapsible-up': string;
        };
        export { animation_1 as animation };
    }
}
export let plugins: any[];
