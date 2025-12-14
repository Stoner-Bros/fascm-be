# Bảng Quyết Định Test Cases - Hệ thống FASCM

## Project Information
- **Project Name:** FASCM (Farm Supply Chain Management)
- **Project Code:** FA25SE172
- **Document Type:** Unit Test Decision Tables

---

## 1. AuthService.validateLogin()

### Decision Table: validateLogin(loginDto: AuthEmailLoginDto)

| Condition | TC-1 | TC-2 | TC-3 | TC-4 | TC-5 |
|-----------|------|------|------|------|------|
| **Precondition** |
| Can connect with server | O | O | O | O | O |
| API endpoint up, DB reachable | O | O | O | O | O |
| **Email** |
| Valid email format | O | O | - | - | - |
| Invalid email format | - | - | O | - | - |
| Email exists in DB | O | - | - | - | - |
| Email not exists in DB | - | O | - | - | - |
| Email is null/undefined | - | - | - | O | - |
| Email is empty string | - | - | - | - | O |
| **Password** |
| Correct password | O | - | - | - | - |
| Incorrect password | - | O | - | - | - |
| Password is null/undefined | - | - | - | O | - |
| Password is empty string | - | - | - | - | O |
| **Confirm** |
| **Return** |
| LoginResponseDto with token | O | - | - | - | - |
| Error response | - | O | O | O | O |
| **Exception** |
| UnauthorizedException | - | O | - | - | - |
| ValidationException | - | - | O | O | O |
| **Log message** |
| "User logged in successfully: {email}" | O | - | - | - | - |
| "Login failed: Invalid credentials" | - | O | - | - | - |
| "Login failed: Invalid email format" | - | - | O | - | - |
| "Login failed: Email is required" | - | - | - | O | O |
| **Result** |
| Type | N | A | A | A | A |
| Passed/Failed | P | P | P | P | P |
| Executed Date | | | | | |
| Defect ID | | | | | |

---

## 2. DeliveriesService.create()

### Decision Table: create(dto: CreateDeliveryDto)

| Condition | TC-1 | TC-2 | TC-3 | TC-4 | TC-5 | TC-6 | TC-7 | TC-8 |
|-----------|------|------|------|------|------|------|------|------|
| **Precondition** |
| Can connect with server | O | O | O | O | O | O | O | O |
| API endpoint up, DB reachable | O | O | O | O | O | O | O | O |
| **Delivery Type** |
| Has harvestPhaseId | O | O | - | - | - | - | - | - |
| Has orderPhaseId | - | - | O | O | - | - | - | - |
| Both harvestPhaseId and orderPhaseId | - | - | - | - | - | - | - | - |
| Neither harvestPhaseId nor orderPhaseId | - | - | - | - | O | - | - | - |
| **HarvestPhaseId** |
| Valid and exists | O | - | - | - | - | - | - | - |
| Valid but not exists | - | O | - | - | - | - | - | - |
| **OrderPhaseId** |
| Valid and exists | - | - | O | - | - | - | - | - |
| Valid but not exists | - | - | - | O | - | - | - | - |
| **TruckId** |
| Valid and exists | O | O | O | O | - | - | - | - |
| Valid but not exists | - | - | - | - | O | - | - | - |
| Truck status is AVAILABLE | O | O | O | O | - | - | - | - |
| Truck status is IN_USE | - | - | - | - | - | O | - | - |
| **DeliveryStaffId** |
| Valid and exists | O | O | O | O | - | - | - | - |
| Valid but not exists | - | - | - | - | - | - | O | - |
| **Addresses** |
| Valid pickup address | O | O | O | O | - | - | - | - |
| Valid delivery address | O | O | O | O | - | - | - | - |
| Geocoding API available | O | O | O | O | - | - | - | - |
| Geocoding API unavailable | - | - | - | - | - | - | - | O |
| **Confirm** |
| **Return** |
| DeliveryResponse object | O | - | - | - | - | - | - | - |
| Error response | - | O | O | O | O | O | O | O |
| **Exception** |
| NotFoundException (HarvestPhase) | - | O | - | - | - | - | - | - |
| NotFoundException (OrderPhase) | - | - | - | O | - | - | - | - |
| NotFoundException (Truck) | - | - | - | - | O | - | - | - |
| NotFoundException (DeliveryStaff) | - | - | - | - | - | - | O | - |
| BadRequestException (Truck not available) | - | - | - | - | - | O | - | - |
| BadRequestException (Missing phase) | - | - | - | - | O | - | - | - |
| BadRequestException (Geocoding failed) | - | - | - | - | - | - | - | O |
| **Log message** |
| "Creating delivery for harvest phase: {harvestPhaseId}" | O | - | - | - | - | - | - | - |
| "Creating delivery for order phase: {orderPhaseId}" | - | - | O | - | - | - | - | - |
| "Harvest phase not found: {harvestPhaseId}" | - | O | - | - | - | - | - | - |
| "Order phase not found: {orderPhaseId}" | - | - | - | O | - | - | - | - |
| "Truck not found: {truckId}" | - | - | - | - | O | - | - | - |
| "Truck is not available: {truckId}" | - | - | - | - | - | O | - | - |
| "Delivery staff not found: {deliveryStaffId}" | - | - | - | - | - | - | O | - |
| "Geocoding failed for address: {address}" | - | - | - | - | - | - | - | O |
| **Result** |
| Type | N | A | N | A | A | A | A | A |
| Passed/Failed | P | P | P | P | P | P | P | P |
| Executed Date | | | | | | | | |
| Defect ID | | | | | | | | |

---

## 3. DeliveriesService.updateStatus()

### Decision Table: updateStatus(id: string, status: DeliveryStatusEnum)

| Condition | TC-1 | TC-2 | TC-3 | TC-4 | TC-5 | TC-6 | TC-7 |
|-----------|------|------|------|------|------|------|------|
| **Precondition** |
| Can connect with server | O | O | O | O | O | O | O |
| API endpoint up, DB reachable | O | O | O | O | O | O | O |
| **DeliveryId** |
| Valid and exists | O | O | O | O | O | - | O |
| Valid but not exists | - | - | - | - | - | O | - |
| **Current Status** |
| SCHEDULED | O | - | - | - | - | - | - |
| DELIVERING | - | O | - | - | - | - | - |
| DELIVERED | - | - | O | - | - | - | - |
| RETURNING | - | - | - | O | - | - | - |
| COMPLETED | - | - | - | - | - | - | O |
| **New Status** |
| DELIVERING | O | - | - | - | - | - | - |
| DELIVERED | - | O | - | - | - | - | - |
| RETURNING | - | - | O | - | - | - | - |
| COMPLETED | - | - | - | O | - | - | - |
| Invalid transition (SCHEDULED → DELIVERED) | - | - | - | - | O | - | - |
| **Has HarvestPhase** |
| Yes | O | O | O | O | O | - | O |
| No | - | - | - | - | - | - | - |
| **Has OrderPhase** |
| Yes | - | - | - | - | - | - | - |
| No | O | O | O | O | O | - | O |
| **Confirm** |
| **Return** |
| DeliveryResponse with updated status | O | O | O | O | - | - | - |
| Error response | - | - | - | - | O | O | O |
| **Exception** |
| NotFoundException | - | - | - | - | - | O | - |
| BadRequestException (Invalid transition) | - | - | - | - | O | - | - |
| BadRequestException (Already completed) | - | - | - | - | - | - | O |
| **Log message** |
| "Updating delivery status: {id} from {oldStatus} to {newStatus}" | O | O | O | O | - | - | - |
| "Delivery not found: {id}" | - | - | - | - | - | O | - |
| "Invalid status transition: {oldStatus} → {newStatus}" | - | - | - | - | O | - | - |
| "Delivery already completed: {id}" | - | - | - | - | - | - | O |
| "Synchronizing harvest phase status" | O | O | O | O | - | - | - |
| "Updating truck status to AVAILABLE" | - | - | - | O | - | - | - |
| **Result** |
| Type | N | N | N | N | A | A | A |
| Passed/Failed | P | P | P | P | P | P | P |
| Executed Date | | | | | | | |
| Defect ID | | | | | | | |

---

## 4. HarvestPhasesService.create()

### Decision Table: create(dto: CreateHarvestPhaseDto)

| Condition | TC-1 | TC-2 | TC-3 | TC-4 | TC-5 | TC-6 |
|-----------|------|------|------|------|------|------|
| **Precondition** |
| Can connect with server | O | O | O | O | O | O |
| API endpoint up, DB reachable | O | O | O | O | O | O |
| **HarvestScheduleId** |
| Valid and exists | O | - | O | O | O | O |
| Valid but not exists | - | O | - | - | - | - |
| **ProductId** |
| Valid and exists | O | O | O | - | O | O |
| Valid but not exists | - | - | - | O | - | - |
| **Quantity** |
| Valid quantity (within limit) | O | O | O | O | - | O |
| Quantity exceeds available | - | - | - | - | O | - |
| Quantity <= 0 | - | - | - | - | - | O |
| **Invoice Details** |
| Has valid invoice details | O | O | O | O | O | - |
| No invoice details | - | - | - | - | - | O |
| **Confirm** |
| **Return** |
| HarvestPhaseResponse with calculated totals | O | - | - | - | - | - |
| Error response | - | O | O | O | O | O |
| **Exception** |
| NotFoundException (HarvestSchedule) | - | O | - | - | - | - |
| NotFoundException (Product) | - | - | - | O | - | - |
| BadRequestException (Quantity exceeds limit) | - | - | - | - | O | - |
| BadRequestException (Invalid quantity) | - | - | - | - | - | O |
| **Calculated Values** |
| totalAmount calculated correctly | O | - | - | - | - | - |
| vatAmount calculated correctly | O | - | - | - | - | - |
| totalPayment calculated correctly | O | - | - | - | - | - |
| **Log message** |
| "Creating harvest phase for schedule: {harvestScheduleId}" | O | - | - | - | - | - |
| "Harvest schedule not found: {harvestScheduleId}" | - | O | - | - | - | - |
| "Product not found: {productId}" | - | - | - | O | - | - |
| "Quantity exceeds available: {quantity} > {available}" | - | - | - | - | O | - |
| "Invalid quantity: {quantity}" | - | - | - | - | - | O |
| **Result** |
| Type | N | A | A | A | A | A |
| Passed/Failed | P | P | P | P | P | P |
| Executed Date | | | | | | |
| Defect ID | | | | | | |

---

## 5. HarvestPhasesService.updateStatus()

### Decision Table: updateStatus(id: string, status: HarvestPhaseStatusEnum)

| Condition | TC-1 | TC-2 | TC-3 | TC-4 | TC-5 | TC-6 |
|-----------|------|------|------|------|------|------|
| **Precondition** |
| Can connect with server | O | O | O | O | O | O |
| API endpoint up, DB reachable | O | O | O | O | O | O |
| **HarvestPhaseId** |
| Valid and exists | O | O | O | O | O | - |
| Valid but not exists | - | - | - | - | - | O |
| **Current Status** |
| PREPARING | O | - | - | - | - | - |
| DELIVERING | - | O | - | - | - | - |
| DELIVERED | - | - | O | - | - | - |
| COMPLETED | - | - | - | - | - | - |
| **New Status** |
| DELIVERING | O | - | - | - | - | - |
| DELIVERED | - | O | - | - | - | - |
| COMPLETED | - | - | O | - | - | - |
| Invalid transition (PREPARING → DELIVERED) | - | - | - | O | - | - |
| Invalid transition (COMPLETED → DELIVERING) | - | - | - | - | O | - |
| **Confirm** |
| **Return** |
| HarvestPhaseResponse with updated status | O | O | O | - | - | - |
| Error response | - | - | - | O | O | O |
| **Exception** |
| NotFoundException | - | - | - | - | - | O |
| BadRequestException (Invalid transition) | - | - | - | O | O | - |
| **Inbound Batches** |
| Created when status = COMPLETED | - | - | O | - | - | - |
| Not created for other statuses | O | O | - | - | - | - |
| **Log message** |
| "Updating harvest phase status: {id} from {oldStatus} to {newStatus}" | O | O | O | - | - | - |
| "Harvest phase not found: {id}" | - | - | - | - | - | O |
| "Invalid status transition: {oldStatus} → {newStatus}" | - | - | - | O | O | - |
| "Creating inbound batches for harvest phase: {id}" | - | - | O | - | - | - |
| **Result** |
| Type | N | N | N | A | A | A |
| Passed/Failed | P | P | P | P | P | P |
| Executed Date | | | | | | |
| Defect ID | | | | | | |

---

## 6. ImportTicketsService.create()

### Decision Table: create(dto: CreateImportTicketDto)

| Condition | TC-1 | TC-2 | TC-3 | TC-4 | TC-5 | TC-6 | TC-7 |
|-----------|------|------|------|------|------|------|------|
| **Precondition** |
| Can connect with server | O | O | O | O | O | O | O |
| API endpoint up, DB reachable | O | O | O | O | O | O | O |
| **InboundBatchId** |
| Valid and exists | O | O | - | O | O | O | O |
| Valid but not exists | - | - | O | - | - | - | - |
| **AreaId** |
| Valid and exists | O | O | O | - | O | O | O |
| Valid but not exists | - | - | - | O | - | - | - |
| **RealityQuantity** |
| Valid (<= inbound batch quantity) | O | O | O | O | - | O | O |
| Exceeds inbound batch quantity | - | - | - | - | O | - | - |
| **Quantity for Split** |
| >= 20kg | O | - | - | - | - | - | - |
| < 20kg but >= 10kg | - | O | - | - | - | - | - |
| < 10kg | - | - | - | - | - | O | - |
| **Confirm** |
| **Return** |
| ImportTicketResponse with batches | O | O | O | - | - | O | - |
| Error response | - | - | - | O | O | - | O |
| **Exception** |
| NotFoundException (InboundBatch) | - | - | O | - | - | - | - |
| NotFoundException (Area) | - | - | - | O | - | - | - |
| BadRequestException (Quantity exceeds) | - | - | - | - | O | - | - |
| **Batch Creation** |
| Multiple batches (20kg each) | O | - | - | - | - | - | - |
| Single batch (10-20kg) | - | O | - | - | - | - | - |
| Single batch (< 10kg) | - | - | - | - | - | O | - |
| **Area Quantity** |
| Updated correctly | O | O | O | - | - | O | - |
| **Log message** |
| "Creating import ticket for inbound batch: {inboundBatchId}" | O | O | O | - | - | O | - |
| "Inbound batch not found: {inboundBatchId}" | - | - | O | - | - | - | - |
| "Area not found: {areaId}" | - | - | - | O | - | - | - |
| "Reality quantity exceeds available: {realityQuantity} > {available}" | - | - | - | - | O | - | - |
| "Splitting into {count} batches" | O | O | - | - | - | O | - |
| **Result** |
| Type | N | N | A | A | A | N | A |
| Passed/Failed | P | P | P | P | P | P | P |
| Executed Date | | | | | | | |
| Defect ID | | | | | | | |

---

## 7. ExportTicketsService.create()

### Decision Table: create(dto: CreateExportTicketDto)

| Condition | TC-1 | TC-2 | TC-3 | TC-4 | TC-5 | TC-6 |
|-----------|------|------|------|------|------|------|
| **Precondition** |
| Can connect with server | O | O | O | O | O | O |
| API endpoint up, DB reachable | O | O | O | O | O | O |
| **OrderInvoiceDetailId** |
| Valid and exists | O | O | O | O | - | O |
| Valid but not exists | - | - | - | - | O | - |
| **BatchId** |
| Valid and exists | O | O | - | O | O | O |
| Valid but not exists | - | - | O | - | - | - |
| **Product Match** |
| Batch product = OrderInvoiceDetail product | O | - | - | - | - | - |
| Batch product ≠ OrderInvoiceDetail product | - | O | - | - | - | - |
| **Quantity** |
| Valid quantity (<= batch available) | O | O | O | O | - | O |
| Quantity exceeds batch available | - | - | - | - | - | O |
| **Area Quantity** |
| Sufficient quantity in area | O | O | O | O | - | - |
| Insufficient quantity in area | - | - | - | - | - | O |
| **Confirm** |
| **Return** |
| ExportTicketResponse | O | - | - | - | - | - |
| Error response | - | O | O | O | O | O |
| **Exception** |
| NotFoundException (OrderInvoiceDetail) | - | - | - | - | O | - |
| NotFoundException (Batch) | - | - | O | - | - | - |
| BadRequestException (Product mismatch) | - | O | - | - | - | - |
| BadRequestException (Insufficient quantity) | - | - | - | - | - | O |
| **Area Quantity** |
| Updated correctly (decreased) | O | - | - | - | - | - |
| **Log message** |
| "Creating export ticket for order invoice detail: {orderInvoiceDetailId}" | O | - | - | - | - | - |
| "Order invoice detail not found: {orderInvoiceDetailId}" | - | - | - | - | O | - |
| "Batch not found: {batchId}" | - | - | O | - | - | - |
| "Product mismatch: batch product {batchProductId} ≠ order product {orderProductId}" | - | O | - | - | - | - |
| "Insufficient quantity in area: {requested} > {available}" | - | - | - | - | - | O |
| **Result** |
| Type | N | A | A | A | A | A |
| Passed/Failed | P | P | P | P | P | P |
| Executed Date | | | | | | |
| Defect ID | | | | | | |

---

## 8. PaymentsService.create()

### Decision Table: create(dto: CreatePaymentDto)

| Condition | TC-1 | TC-2 | TC-3 | TC-4 | TC-5 | TC-6 |
|-----------|------|------|------|------|------|------|
| **Precondition** |
| Can connect with server | O | O | O | O | O | O |
| API endpoint up, DB reachable | O | O | O | O | O | O |
| **Payment Method** |
| Transfer | O | O | - | - | - | - |
| Cash | - | - | O | O | - | - |
| PayOS | - | - | - | - | O | O |
| **OrderInvoiceId** |
| Valid and exists | O | O | O | O | O | - |
| Valid but not exists | - | - | - | - | - | O |
| **PayOS API** |
| Available and working | - | - | - | - | O | - |
| Unavailable or error | - | - | - | - | - | O |
| **Payment Code** |
| Generated successfully | O | O | O | O | O | - |
| **Confirm** |
| **Return** |
| PaymentResponse with payment code | O | O | O | O | - | - |
| PaymentResponse with PayOS link | - | - | - | - | O | - |
| Error response | - | - | - | - | - | O |
| **Exception** |
| NotFoundException (OrderInvoice) | - | - | - | - | - | O |
| BadRequestException (PayOS error) | - | - | - | - | - | O |
| **Log message** |
| "Creating payment for order invoice: {orderInvoiceId}" | O | O | O | O | O | - |
| "Order invoice not found: {orderInvoiceId}" | - | - | - | - | - | O |
| "Generated payment code: {paymentCode}" | O | O | O | O | - | - |
| "Creating PayOS payment link for: {orderInvoiceId}" | - | - | - | - | O | - |
| "PayOS API error: {error}" | - | - | - | - | - | O |
| **Result** |
| Type | N | N | N | N | N | A |
| Passed/Failed | P | P | P | P | P | P |
| Executed Date | | | | | | |
| Defect ID | | | | | | |

---

## 9. HarvestSchedulesService.create()

### Decision Table: create(dto: CreateHarvestScheduleDto, userId: number)

| Condition | TC-1 | TC-2 | TC-3 | TC-4 | TC-5 | TC-6 |
|-----------|------|------|------|------|------|------|
| **Precondition** |
| Can connect with server | O | O | O | O | O | O |
| API endpoint up, DB reachable | O | O | O | O | O | O |
| **SupplierId (from userId)** |
| Valid and exists | O | O | O | O | O | - |
| Valid but not exists | - | - | - | - | - | O |
| **ProductId** |
| Valid and exists | O | O | - | O | O | O |
| Valid but not exists | - | - | O | - | - | - |
| **Quantity** |
| Valid quantity (> 0) | O | O | O | O | - | O |
| Quantity <= 0 | - | - | - | - | O | - |
| **Harvest Details** |
| Has valid harvest details | O | O | O | O | O | - |
| No harvest details | - | - | - | - | - | O |
| **Harvest Date** |
| Valid future date | O | O | O | O | O | O |
| **Address** |
| Valid address | O | O | O | O | O | O |
| **Confirm** |
| **Return** |
| HarvestScheduleResponse | O | - | - | - | - | - |
| Error response | - | O | O | O | O | O |
| **Exception** |
| NotFoundException (Supplier) | - | - | - | - | - | O |
| NotFoundException (Product) | - | - | O | - | - | - |
| BadRequestException (Invalid quantity) | - | - | - | - | O | - |
| BadRequestException (No harvest details) | - | - | - | - | - | O |
| **Ticket Creation** |
| Ticket created with correct total quantity | O | - | - | - | - | - |
| **Log message** |
| "Creating harvest schedule for supplier: {supplierId}" | O | - | - | - | - | - |
| "Supplier not found: {supplierId}" | - | - | - | - | - | O |
| "Product not found: {productId}" | - | - | O | - | - | - |
| "Invalid quantity: {quantity}" | - | - | - | - | O | - |
| "Harvest details are required" | - | - | - | - | - | O |
| **Result** |
| Type | N | A | A | A | A | A |
| Passed/Failed | P | P | P | P | P | P |
| Executed Date | | | | | | |
| Defect ID | | | | | | |

---

## 10. HarvestSchedulesService.updateStatus()

### Decision Table: updateStatus(id: number, status: string, reason?: string)

| Condition | TC-1 | TC-2 | TC-3 | TC-4 | TC-5 | TC-6 |
|-----------|------|------|------|------|------|------|
| **Precondition** |
| Can connect with server | O | O | O | O | O | O |
| API endpoint up, DB reachable | O | O | O | O | O | O |
| **HarvestScheduleId** |
| Valid and exists | O | O | O | O | O | - |
| Valid but not exists | - | - | - | - | - | O |
| **Current Status** |
| PENDING | O | O | - | - | - | - |
| APPROVED | - | - | - | - | O | - |
| REJECTED | - | - | - | - | - | - |
| CANCELED | - | - | - | - | - | - |
| **New Status** |
| APPROVED | O | - | - | - | - | - |
| REJECTED | - | O | - | - | - | - |
| CANCELED | - | - | O | - | - | - |
| Invalid transition (APPROVED → PENDING) | - | - | - | O | - | - |
| Invalid transition (REJECTED → APPROVED) | - | - | - | - | O | - |
| **Reason** |
| Provided | - | O | O | - | - | - |
| Not provided (for REJECT) | - | - | - | - | - | - |
| **Confirm** |
| **Return** |
| HarvestScheduleResponse with updated status | O | O | O | - | - | - |
| Error response | - | - | - | O | O | O |
| **Exception** |
| NotFoundException | - | - | - | - | - | O |
| BadRequestException (Invalid transition) | - | - | - | O | O | - |
| BadRequestException (Reason required) | - | - | - | - | - | - |
| **Notification** |
| Approval notification created | O | - | - | - | - | - |
| Rejection notification created | - | O | - | - | - | - |
| Cancellation notification created | - | - | O | - | - | - |
| **Log message** |
| "Updating harvest schedule status: {id} to {status}" | O | O | O | - | - | - |
| "Harvest schedule not found: {id}" | - | - | - | - | - | O |
| "Invalid status transition: {oldStatus} → {newStatus}" | - | - | - | O | O | - |
| "Sending approval notification" | O | - | - | - | - | - |
| "Sending rejection notification with reason: {reason}" | - | O | - | - | - | - |
| "Sending cancellation notification" | - | - | O | - | - | - |
| **Result** |
| Type | N | N | N | A | A | A |
| Passed/Failed | P | P | P | P | P | P |
| Executed Date | | | | | | |
| Defect ID | | | | | | |

---

## Ghi chú về Bảng Quyết Định

### Ký hiệu:
- **O**: Điều kiện đúng hoặc kết quả mong đợi
- **-**: Điều kiện không áp dụng hoặc không mong đợi
- **N**: Normal (Test case bình thường - happy path)
- **A**: Abnormal (Test case bất thường - error/edge cases)
- **B**: Boundary (Test case biên)
- **P**: Passed (Đã pass)
- **F**: Failed (Đã fail)

### Cấu trúc:
1. **Condition**: Các điều kiện đầu vào và trạng thái hệ thống
2. **Confirm**: Kết quả mong đợi (Return, Exception, Log message)
3. **Result**: Kết quả thực tế của test (Type, Passed/Failed, Executed Date, Defect ID)

### Sử dụng:
- Mỗi cột (TC-1, TC-2, ...) đại diện cho một test case cụ thể
- Đánh dấu **O** ở các điều kiện và kết quả mong đợi cho test case đó
- Điền thông tin vào phần **Result** sau khi thực thi test

