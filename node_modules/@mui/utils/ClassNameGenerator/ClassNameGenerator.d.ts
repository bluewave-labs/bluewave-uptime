declare const ClassNameGenerator: {
    configure(generator: (componentName: string) => string): void;
    generate(componentName: string): string;
    reset(): void;
};
export default ClassNameGenerator;
