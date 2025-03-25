
const mapToModuleYargs = (version) => {
  switch (version) {
    case '16':
      return {
        '^yargs((\/.*)?)$': 'yargs-16$1'
      }

    case '17':
      return {
        '^yargs((\/.*)?)$': 'yargs-17$1'
      }
  }
}

const mapToModuleNestjs = (version) => {
  switch (version) {
    case '6':
      return {
        '^@nestjs\/core((\/.*)?)$': 'nestjs-core-6$1',
        '^@nestjs\/common((\/.*)?)$': 'nestjs-common-6$1',
        '^@nestjs\/testing((\/.*)?)$': 'nestjs-testing-6$1',
        '^rxjs((\/.*)?)$': 'rxjs-6$1'
      }

    case '7':
      return {
        '^@nestjs\/core((\/.*)?)$': 'nestjs-core-7$1',
        '^@nestjs\/common((\/.*)?)$': 'nestjs-common-7$1',
        '^@nestjs\/testing((\/.*)?)$': 'nestjs-testing-7$1',
        '^rxjs((\/.*)?)$': 'rxjs-6$1'
      }

    case '8':
      return {
        '^@nestjs\/core((\/.*)?)$': 'nestjs-core-8$1',
        '^@nestjs\/common((\/.*)?)$': 'nestjs-common-8$1',
        '^@nestjs\/testing((\/.*)?)$': 'nestjs-testing-8$1',
        '^rxjs((\/.*)?)$': 'rxjs-7$1'
      }

    case '9':
      return {
        '^@nestjs\/core((\/.*)?)$': 'nestjs-core-9$1',
        '^@nestjs\/common((\/.*)?)$': 'nestjs-common-9$1',
        '^@nestjs\/testing((\/.*)?)$': 'nestjs-testing-9$1',
        '^rxjs((\/.*)?)$': 'rxjs-7$1'
      }

    case '10':
      return {
        '^@nestjs\/core((\/.*)?)$': 'nestjs-core-10$1',
        '^@nestjs\/common((\/.*)?)$': 'nestjs-common-10$1',
        '^@nestjs\/testing((\/.*)?)$': 'nestjs-testing-10$1',
        '^rxjs((\/.*)?)$': 'rxjs-7$1'
      }
  }
}

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      tsconfig: {
        target: 'ES2019'
      }
    }
  },
  modulePathIgnorePatterns: [
    '<rootDir>/examples',
    '<rootDir>/scripts',
  ],
  moduleNameMapper: {
    ...mapToModuleYargs(process.env.MODULE_YARGS_VERSION),
    ...mapToModuleNestjs(process.env.MODULE_NESTJS_VERSION),
    // '^@\/(.*)$': '<rootDir>/src/$1',
  },
};
