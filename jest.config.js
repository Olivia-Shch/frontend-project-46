export default {
  transform: {
    "^.+\\.ts$": "ts-jest",   // Обработка TypeScript файлов
    "^.+\\.js$": "babel-jest"  // Обработка JavaScript файлов
  },
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      useESM: true  // Поддержка ESM для TypeScript
    }
  },
  coverageProvider: "v8",  // Включение V8 для покрытия
  coverage: true,         // Включение покрытия тестами
};

