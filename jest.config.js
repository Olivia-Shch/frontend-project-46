export default {
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest"
  },
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      useESM: true
    }
  },
  setupFiles: ["./jest.setup.js"], // Если нужно
  verbose: true, // Для более детализированных логов
};
