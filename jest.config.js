module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    testEnvironment: 'jest-environment-jsdom',
    transformIgnorePatterns: [
        'node_modules/(?!.*\\.mjs$|@ngrx|@angular|rxjs)',
    ],
    moduleDirectories: ["node_modules", "<rootDir>"]
};
