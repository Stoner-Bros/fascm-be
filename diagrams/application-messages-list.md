# 5.2 Application Messages List

**Table 5.2 : Application Messages List**

| No | Message Code | Message Type | Context | Content |
|----|--------------|--------------|---------|---------|
| 1 | `email.notFound` | Error | AuthService.validateLogin | Email not found in database |
| 2 | `email.inactiveUser` | Error | AuthService.validateLogin | User account is inactive |
| 3 | `email.needLoginViaProvider` | Error | AuthService.validateLogin | User needs to login via social provider |
| 4 | `email.emailNotExists` | Error | AuthService.forgotPassword | Email does not exist |
| 5 | `email.emailExists` | Error | AuthService.update | Email already exists |
| 6 | `password.incorrectPassword` | Error | AuthService.validateLogin | Password is incorrect |
| 7 | `password.missingOldPassword` | Error | AuthService.update | Old password is required when changing password |
| 8 | `password.incorrectOldPassword` | Error | AuthService.update | Old password is incorrect |
| 9 | `hash.invalidHash` | Error | AuthService.confirmEmail | Invalid confirmation hash |
| 10 | `hash.notFound` | Error | AuthService.resetPassword | Hash not found |
| 11 | `user.userNotFound` | Error | AuthService.validateSocialLogin | User not found |
| 12 | `truck.notExists` | Error | DeliveriesService.create | Truck does not exist |
| 13 | `truck.notAvailable` | Error | DeliveriesService.create | Truck is not available (status is not AVAILABLE) |
| 14 | `deliveryStaff.notExists` | Error | DeliveriesService.create | Delivery staff does not exist |
| 15 | `harvestPhase.notExists` | Error | DeliveriesService.create | Harvest phase does not exist |
| 16 | `orderPhase.notExists` | Error | DeliveriesService.create | Order phase does not exist |
| 17 | `harvestSchedule.notExists` | Error | HarvestPhasesService.create | Harvest schedule does not exist |
| 18 | `product.notExists` | Error | HarvestPhasesService.create | Product does not exist |
| 19 | `inboundBatch.notExists` | Error | ImportTicketsService.create | Inbound batch does not exist |
| 20 | `inboundBatch.alreadyHasImportTicket` | Error | ImportTicketsService.create | Inbound batch already has an import ticket |
| 21 | `importTicket.quantityExceedsInboundBatchQuantity` | Error | ImportTicketsService.create | Import ticket quantity exceeds inbound batch quantity |
| 22 | `numberOfBigBatch.exceedsRealityQuantity` | Error | ImportTicketsService.create | Total quantity from batches exceeds reality quantity |
| 23 | `numberOfSmallBatch.exceedsRealityQuantity` | Error | ImportTicketsService.create | Total quantity from batches exceeds reality quantity |
| 24 | `area.notExists` | Error | ImportTicketsService.create | Area does not exist |
| 25 | `orderInvoiceDetail.notExists` | Error | ExportTicketsService.create | Order invoice detail does not exist |
| 26 | `batchs.someBatchNotExists` | Error | ExportTicketsService.create | Some batches do not exist |
| 27 | `batch.productMismatch` | Error | ExportTicketsService.create | Batch product does not match order invoice detail product |
| 28 | `Order invoice with id {id} not found` | Error | PaymentsService.create | Order invoice not found |
| 29 | `Failed to create PayOS payment: {error}` | Error | PaymentsService.create | PayOS payment creation failed |
| 30 | `Payment with order code {code} not found: {error}` | Error | PaymentsService.getPayOSPaymentInfo | Payment not found in PayOS |
| 31 | `Record not found` | Error | Repository methods | Entity record not found in database |
| 32 | `User not found` | Error | UserRepository.findById | User record not found |
| 33 | `No order details found for this schedule` | Error | OrderScheduleValidationService | Order schedule has no order details |
| 34 | `No phases found for this schedule` | Error | OrderScheduleValidationService | Order schedule has no phases |
| 35 | `No phases found for this schedule` | Error | HarvestScheduleValidationService | Harvest schedule has no phases |
| 36 | `notFound` | Error | AuthService.confirmEmail | Resource not found |
| 37 | `Area with id {id} not found` | Error | ExportTicketsService.create | Area not found by id |
| 38 | `Batch with id {id} has different product than OrderInvoiceDetail with id {id}` | Error | ExportTicketsService.create | Product mismatch error message |
| 39 | `Total quantity {total} from batches exceeds reality quantity {reality}` | Error | ImportTicketsService.create | Detailed quantity exceeds error message |

---

## Message Type Legend

- **Error**: Error messages returned when operations fail or validation fails
- **Warning**: Warning messages (if any)
- **Info**: Informational messages (if any)
- **Success**: Success messages (if any)

## Context Legend

- **AuthService**: Authentication and authorization related messages
- **DeliveriesService**: Delivery management related messages
- **HarvestPhasesService**: Harvest phase management related messages
- **ImportTicketsService**: Import ticket management related messages
- **ExportTicketsService**: Export ticket management related messages
- **PaymentsService**: Payment processing related messages
- **OrderScheduleValidationService**: Order schedule validation related messages
- **HarvestScheduleValidationService**: Harvest schedule validation related messages
- **Repository methods**: Database repository related messages

## Notes

- Message codes follow a pattern: `{entity}.{errorType}` or `{field}.{errorType}`
- Some messages include placeholders like `{id}`, `{code}`, `{error}`, `{total}`, `{reality}` that are replaced with actual values at runtime
- All messages are in English and follow a consistent naming convention
- Error messages are typically returned in the format: `{ status: HttpStatus, errors: { field: 'errorCode' } }`
- Messages are organized by service/module for easier reference
