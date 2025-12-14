# Unit Testing Guide for FASCM Backend

## Overview
This guide provides comprehensive information about the unit test structure and conventions used in the FASCM backend project.

## Test Structure

All unit tests follow the **Function-based Unit Test Design** pattern with three main test categories:

### Test Categories

1. **Normal Cases (✅)**: Standard valid inputs, happy path scenarios
2. **Boundary Cases (⚠️)**: Edge values (min/max, empty arrays, zero values, string length limits)
3. **Abnormal Cases (❌)**: Invalid inputs, null/undefined, type mismatches, database errors, external service failures

## Test Naming Convention

Tests use the following naming pattern with zero-padded numbers:
```
UTC_[FunctionName]_[Number]: should [expected behavior] when [condition]
```

**Note**: Numbers should be zero-padded (01, 02, 03, etc.) to maintain consistent ordering in file listings.

**Examples:**
- `UTC_validateLogin_01: should return LoginResponseDto with tokens when credentials are valid`
- `UTC_create_08: should throw UnprocessableEntityException when email already exists`

## Test File Structure

```typescript
describe('[ServiceName].[functionName]', () => {
  let service: ServiceClass;
  let mockDependency: jest.Mocked<DependencyClass>;

  beforeEach(async () => {
    // Setup mocks and test module
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Normal Cases', () => {
    it('UTC_functionName_01: should...', async () => {
      // Arrange
      // Act
      // Assert
    });
  });

  describe('Boundary Cases', () => {
    it('UTC_functionName_XX: should...', async () => {
      // Test with boundary values
    });
  });

  describe('Abnormal Cases', () => {
    it('UTC_functionName_YY: should throw...', async () => {
      // Test error scenarios
    });
  });
});
```

## Completed Test Files

### Priority 1: Authentication & Authorization
- ✅ `src/auth/__tests__/auth.service.spec.ts` (~40 test cases)
  - validateLogin() - 7 test cases
  - validateSocialLogin() - 3 test cases
  - register() - 2 test cases
  - confirmEmail() - 3 test cases
  - forgotPassword() - 2 test cases
  - resetPassword() - 3 test cases
  - refreshToken() - 4 test cases

- ✅ `src/users/__tests__/users.service.spec.ts` (~21 test cases)
  - create() - 14 test cases
  - update() - 7 test cases

- ✅ `src/mail/__tests__/mail.service.spec.ts` (~26 test cases)
  - getDomain() - 14 test cases
  - userSignUp() - 7 test cases
  - forgotPassword() - 5 test cases

### Priority 2: File Management
- ✅ `src/files/infrastructure/uploader/cloudinary/__tests__/files.service.spec.ts` (~12 test cases)
  - uploadFile() - 12 test cases

- ✅ `src/files/infrastructure/uploader/local/__tests__/files.service.spec.ts` (~10 test cases)
  - create() - 10 test cases

### Priority 3: Validation Services
- ✅ `src/harvest-schedules/validators/__tests__/harvest-schedule-validation.service.spec.ts` (~15 test cases)
  - validateTotalGoods() - 10 test cases
  - validatePhaseAddition() - 6 test cases

## Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- path/to/test/file.spec.ts

# Run tests with coverage
npm test:cov

# Run tests in watch mode
npm test:watch
```

## Mocking Patterns

### Mocking Services
```typescript
const mockUsersService = {
  findByEmail: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
};
```

### Mocking External Libraries (bcrypt example)
```typescript
jest.mock('bcryptjs');
const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

// In test
mockedBcrypt.compare.mockResolvedValue(true as never);
```

### Mocking TypeORM Repositories
```typescript
const mockQueryBuilder = () => ({
  leftJoin: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  getMany: jest.fn(),
});

harvestDetailRepo.createQueryBuilder.mockReturnValue(qb as any);
```

## Assertion Patterns

### Success Cases
```typescript
expect(result).toBeDefined();
expect(result).toEqual(expectedValue);
expect(result).toHaveProperty('token');
```

### Exception Cases
```typescript
await expect(service.method(input)).rejects.toThrow(UnprocessableEntityException);
await expect(service.method(input)).rejects.toThrow('notFound');
```

### Mock Verification
```typescript
expect(mockService.method).toHaveBeenCalledTimes(1);
expect(mockService.method).toHaveBeenCalledWith(expectedParam);
expect(mockService.method).not.toHaveBeenCalled();
```

## Extending Tests

To add more test cases to existing files:

1. Identify which category (Normal/Boundary/Abnormal) the test belongs to
2. Follow the naming convention: `UTC_functionName_[NextNumber]`
3. Use Arrange-Act-Assert structure
4. Ensure proper mocking of all dependencies
5. Add clear, descriptive test names

## Best Practices

1. **Isolation**: Each test should be independent and not rely on other tests
2. **Clarity**: Test names should clearly describe what is being tested
3. **Coverage**: Aim to cover all code paths, especially error handling
4. **Mocking**: Mock all external dependencies (databases, APIs, file systems)
5. **Assertions**: Be specific about what you're asserting
6. **Cleanup**: Always clear mocks in `afterEach` to prevent test pollution

## Test Coverage Goals

- **Line Coverage**: > 80%
- **Branch Coverage**: > 75%
- **Function Coverage**: > 90%
- **Statement Coverage**: > 80%

## Common Issues and Solutions

### Issue: Tests failing due to module dependencies
**Solution**: Ensure all dependencies are properly mocked in the TestingModule

### Issue: Async test timeouts
**Solution**: Use `async/await` properly and increase timeout if needed

### Issue: Mock not being called
**Solution**: Verify the mock is properly set up and the service is using the mocked version

## Future Test Files to Implement

### Priority 4: Phase Services
- `src/harvest-phases/__tests__/harvest-phases.service.spec.ts`
- `src/order-phases/__tests__/order-phases.service.spec.ts`

### Priority 5: Batch & Delivery Services
- `src/batches/__tests__/batches.service.spec.ts`
- `src/deliveries/__tests__/deliveries.service.spec.ts`

## References

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [NestJS Testing Documentation](https://docs.nestjs.com/fundamentals/testing)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)
