# Danh sách các Function có thể viết Unit Test - Hệ thống FASCM

## Project Information
- **Project Name:** FASCM (Farm Supply Chain Management)
- **Project Code:** FA25SE172
- **Document Type:** Unit Test Functions List

---

## 1. Authentication Module

### AuthService
1. **validateLogin(loginDto: AuthEmailLoginDto)**
   - Test: Login với email và password hợp lệ
   - Test: Login với email không tồn tại
   - Test: Login với password sai
   - Test: Login với email format không hợp lệ

2. **verifyPassword(plainPassword: string, hashedPassword: string)** (Private)
   - Test: Verify password đúng
   - Test: Verify password sai
   - Test: Verify với password rỗng

### UsersService
3. **findByEmail(email: string)**
   - Test: Tìm user với email tồn tại
   - Test: Tìm user với email không tồn tại
   - Test: Tìm user với email null/undefined

---

## 2. Categories Module

### CategoriesService
4. **create(dto: CreateCategoryDto)**
   - Test: Tạo category với dữ liệu hợp lệ
   - Test: Tạo category với tên trùng lặp
   - Test: Tạo category với tên rỗng
   - Test: Tạo category với tên quá dài

5. **validateUniqueName(name: string)** (Private)
   - Test: Validate tên category chưa tồn tại
   - Test: Validate tên category đã tồn tại

---

## 3. Products Module

### ProductsService
6. **create(dto: CreateProductDto)**
   - Test: Tạo product với dữ liệu hợp lệ
   - Test: Tạo product với category không tồn tại
   - Test: Tạo product với tên rỗng
   - Test: Tạo product với image format không hợp lệ
   - Test: Tạo product với image size quá lớn

7. **validateFields(dto: CreateProductDto)** (Private)
   - Test: Validate các trường bắt buộc
   - Test: Validate format image
   - Test: Validate image size

---

## 4. Warehouses Module

### WarehousesService
8. **create(dto: CreateWarehouseDto)**
   - Test: Tạo warehouse với dữ liệu hợp lệ
   - Test: Tạo warehouse với tên rỗng
   - Test: Tạo warehouse với address rỗng

9. **validateFields(dto: CreateWarehouseDto)** (Private)
   - Test: Validate các trường bắt buộc

---

## 5. Accounts Module (General)

### AccountsService
10. **create(dto: CreateAccountDto)**
    - Test: Tạo Supplier account
    - Test: Tạo Consignee account
    - Test: Tạo Staff account
    - Test: Tạo DeliveryStaff account
    - Test: Tạo Manager account
    - Test: Tạo account với warehouse không tồn tại
    - Test: Tạo account với email đã tồn tại
    - Test: Tạo account với role không hợp lệ

11. **validateCommonFields(dto: CreateAccountDto)** (Private)
    - Test: Validate các trường chung
    - Test: Validate email format
    - Test: Validate password strength

12. **validateRoleSpecificFields(dto: CreateAccountDto)** (Private)
    - Test: Validate fields cho Supplier
    - Test: Validate fields cho Consignee
    - Test: Validate fields cho Staff

13. **createAccountEntity(dto: CreateAccountDto, user: User)** (Private)
    - Test: Tạo Supplier entity
    - Test: Tạo Consignee entity
    - Test: Tạo Staff entity

---

## 6. Harvest Schedules Module

### HarvestSchedulesService
14. **create(dto: CreateHarvestScheduleDto, userId: number)**
    - Test: Tạo harvest schedule với dữ liệu hợp lệ
    - Test: Tạo harvest schedule với supplier không tồn tại
    - Test: Tạo harvest schedule với product không tồn tại
    - Test: Tạo harvest schedule với quantity <= 0
    - Test: Tạo harvest schedule không có harvest details

15. **validateFields(dto: CreateHarvestScheduleDto)** (Private)
    - Test: Validate các trường bắt buộc
    - Test: Validate harvest date
    - Test: Validate address

16. **createTicketAndDetails(schedule: HarvestSchedule, dto: CreateHarvestScheduleDto)** (Private)
    - Test: Tạo ticket và details thành công
    - Test: Tính toán quantity tổng hợp đúng

17. **update(id: number, dto: UpdateHarvestScheduleDto, userId: number)**
    - Test: Update harvest schedule thành công
    - Test: Update harvest schedule không thuộc về supplier
    - Test: Update harvest schedule với status không cho phép

18. **validateOwnership(schedule: HarvestSchedule, supplier: Supplier)** (Private)
    - Test: Validate ownership đúng
    - Test: Validate ownership sai

19. **replaceTicketAndDetails(schedule: HarvestSchedule, dto: UpdateHarvestScheduleDto)** (Private)
    - Test: Replace ticket và details thành công
    - Test: Recalculate quantities đúng

20. **findById(id: number)**
    - Test: Tìm harvest schedule tồn tại
    - Test: Tìm harvest schedule không tồn tại

21. **updateStatus(id: number, status: string, reason?: string)**
    - Test: Approve harvest schedule
    - Test: Reject harvest schedule với reason
    - Test: Reject harvest schedule không có reason
    - Test: Cancel harvest schedule
    - Test: Update status với transition không hợp lệ

22. **approveNotification(schedule: HarvestSchedule)** (Private)
    - Test: Tạo notification khi approve

23. **rejectNotification(schedule: HarvestSchedule, reason: string)** (Private)
    - Test: Tạo notification khi reject với reason

24. **cancelNotification(schedule: HarvestSchedule)** (Private)
    - Test: Tạo notification khi cancel

---

## 7. Order Schedules Module

### OrderSchedulesService
25. **create(dto: CreateOrderScheduleDto, userId: number)**
    - Test: Tạo order schedule với dữ liệu hợp lệ
    - Test: Tạo order schedule với consignee không tồn tại
    - Test: Tạo order schedule với product không tồn tại
    - Test: Tạo order schedule không có order details

26. **validateCreate(dto: CreateOrderScheduleDto)** (Private)
    - Test: Validate các trường bắt buộc
    - Test: Validate delivery date
    - Test: Validate address

27. **update(id: number, dto: UpdateOrderScheduleDto, userId: number)**
    - Test: Update order schedule thành công
    - Test: Update order schedule không thuộc về consignee
    - Test: Update order schedule với status không cho phép

28. **validateOwnership(schedule: OrderSchedule, consignee: Consignee)** (Private)
    - Test: Validate ownership đúng
    - Test: Validate ownership sai

29. **upsertOrdersAndDetails(schedule: OrderSchedule, dto: UpdateOrderScheduleDto)** (Private)
    - Test: Upsert orders và details thành công
    - Test: Recalculate totals đúng

30. **findById(id: number)**
    - Test: Tìm order schedule tồn tại
    - Test: Tìm order schedule không tồn tại

31. **updateStatus(id: number, status: string, reason?: string)**
    - Test: Approve order schedule
    - Test: Reject order schedule với reason
    - Test: Cancel order schedule
    - Test: Update status với transition không hợp lệ

32. **ensureCancelable(schedule: OrderSchedule)** (Private)
    - Test: Validate có thể cancel
    - Test: Validate không thể cancel

33. **notifyCanceled(schedule: OrderSchedule)** (Private)
    - Test: Tạo notification khi cancel

---

## 8. Harvest Phases Module

### HarvestPhasesService
34. **create(dto: CreateHarvestPhaseDto)**
    - Test: Tạo harvest phase với dữ liệu hợp lệ
    - Test: Tạo harvest phase với harvest schedule không tồn tại
    - Test: Tạo harvest phase vượt quá quantity limit
    - Test: Tạo harvest phase với product không tồn tại
    - Test: Tính toán totals (totalAmount, vatAmount, totalPayment) đúng

35. **update(id: string, dto: UpdateHarvestPhaseDto)**
    - Test: Update harvest phase thành công
    - Test: Update harvest phase với harvest schedule không tồn tại
    - Test: Update harvest phase vượt quá quantity limit
    - Test: Rebuild invoice details đúng

36. **updateStatus(id: string, status: HarvestPhaseStatusEnum)**
    - Test: Update status từ PREPARING sang DELIVERING
    - Test: Update status từ DELIVERING sang DELIVERED
    - Test: Update status từ DELIVERED sang COMPLETED
    - Test: Update status với transition không hợp lệ
    - Test: Tạo inbound batches khi status COMPLETED

37. **createInboundBatchForHarvestPhase(id: string)** (Private)
    - Test: Tạo inbound batches từ harvest invoice details
    - Test: Tính toán quantity đúng

38. **findById(id: string)**
    - Test: Tìm harvest phase tồn tại
    - Test: Tìm harvest phase không tồn tại

39. **findByIds(ids: string[])**
    - Test: Tìm nhiều harvest phases
    - Test: Tìm với ids rỗng

40. **remove(id: string)**
    - Test: Xóa harvest phase thành công
    - Test: Xóa harvest phase không tồn tại

41. **uploadImgProof(id: string, file: Express.Multer.File)**
    - Test: Upload image proof thành công
    - Test: Upload với file không hợp lệ
    - Test: Upload với file size quá lớn

---

## 9. Order Phases Module

### OrderPhasesService
42. **create(dto: CreateOrderPhaseDto)**
    - Test: Tạo order phase với dữ liệu hợp lệ
    - Test: Tạo order phase với order schedule không tồn tại
    - Test: Tạo order phase vượt quá quantity limit
    - Test: Tính toán totals đúng

43. **createMultiple(dto: CreateMultipleOrderPhaseDto)**
    - Test: Tạo nhiều order phases thành công
    - Test: Tạo nhiều order phases với validation

44. **update(id: string, dto: UpdateOrderPhaseDto)**
    - Test: Update order phase thành công
    - Test: Update order phase vượt quá quantity limit
    - Test: Rebuild invoice details đúng

45. **updateStatus(id: string, status: OrderPhaseStatusEnum)**
    - Test: Update status với các transitions hợp lệ
    - Test: Update status với transition không hợp lệ

46. **findById(id: string)**
    - Test: Tìm order phase tồn tại
    - Test: Tìm order phase không tồn tại

47. **findAllByScheduleWithPagination(orderScheduleId: string, options: IPaginationOptions)**
    - Test: Lấy danh sách order phases với pagination
    - Test: Lấy với filter orderScheduleId

48. **remove(id: string)**
    - Test: Xóa order phase thành công

---

## 10. Deliveries Module

### DeliveriesService
49. **create(dto: CreateDeliveryDto)**
    - Test: Tạo delivery cho harvest phase
    - Test: Tạo delivery cho order phase
    - Test: Tạo delivery với truck không tồn tại
    - Test: Tạo delivery với truck không available
    - Test: Tạo delivery với delivery staff không tồn tại
    - Test: Tạo delivery với harvest phase không tồn tại
    - Test: Tạo delivery với order phase không tồn tại
    - Test: Geocoding addresses thành công
    - Test: Geocoding addresses thất bại
    - Test: Set phase status to PREPARING
    - Test: Update truck status to IN_USE

50. **updateStatus(id: string, status: DeliveryStatusEnum)**
    - Test: Update status từ SCHEDULED sang DELIVERING
    - Test: Update status từ DELIVERING sang DELIVERED
    - Test: Update status từ DELIVERED sang RETURNING
    - Test: Update status từ RETURNING sang COMPLETED
    - Test: Update status với transition không hợp lệ
    - Test: Synchronize harvest phase status
    - Test: Synchronize order phase status
    - Test: Update truck status to AVAILABLE khi COMPLETED
    - Test: Set endTime khi COMPLETED

51. **findById(id: string)**
    - Test: Tìm delivery tồn tại
    - Test: Tìm delivery không tồn tại

52. **findByIds(ids: string[])**
    - Test: Tìm nhiều deliveries

53. **findByOrderPhaseId(orderPhaseId: string)**
    - Test: Tìm delivery theo order phase id
    - Test: Tìm delivery không tồn tại

54. **findByHarvestPhaseId(harvestPhaseId: string)**
    - Test: Tìm delivery theo harvest phase id
    - Test: Tìm delivery không tồn tại

55. **findAllWithHarvestPhase(paginationOptions: IPaginationOptions)**
    - Test: Lấy deliveries có harvest phase với pagination

56. **findAllWithOrderPhase(paginationOptions: IPaginationOptions)**
    - Test: Lấy deliveries có order phase với pagination

57. **findAllWithPagination(options: {paginationOptions, filters})**
    - Test: Lấy deliveries với pagination và filters
    - Test: Filter theo orderPhaseId
    - Test: Filter theo harvestPhaseId

58. **update(id: string, dto: UpdateDeliveryDto)**
    - Test: Update delivery thành công
    - Test: Update delivery với truck không tồn tại
    - Test: Update delivery với delivery staff không tồn tại

59. **remove(id: string)**
    - Test: Xóa delivery thành công

60. **resolveCoords(address?: string | null)** (Private)
    - Test: Resolve coordinates thành công
    - Test: Resolve coordinates với address rỗng
    - Test: Resolve coordinates thất bại

---

## 11. Trucks Module

### TrucksService
61. **create(dto: CreateTruckDto)**
    - Test: Tạo truck với dữ liệu hợp lệ
    - Test: Tạo truck với warehouse không tồn tại
    - Test: Tạo truck với IoT devices không tồn tại

62. **findById(id: string)**
    - Test: Tìm truck tồn tại
    - Test: Tìm truck không tồn tại

63. **updateStatus(id: string, status: TruckStatusEnum)**
    - Test: Update status thành công
    - Test: Update status với transition hợp lệ

64. **update(id: string, dto: UpdateTruckDto)**
    - Test: Update truck thành công

65. **remove(id: string)**
    - Test: Xóa truck thành công

---

## 12. Payments Module

### PaymentsService
66. **create(dto: CreatePaymentDto)**
    - Test: Tạo payment với Transfer method
    - Test: Tạo payment với Cash method
    - Test: Tạo payment với order invoice không tồn tại
    - Test: Generate payment code thành công
    - Test: Tạo PayOS payment link thành công
    - Test: Tạo PayOS payment link thất bại

67. **generatePaymentCode()** (Private)
    - Test: Generate payment code unique
    - Test: Generate payment code format đúng

---

## 13. Import Tickets Module

### ImportTicketsService
68. **create(dto: CreateImportTicketDto)**
    - Test: Tạo import ticket với inbound batch
    - Test: Tạo import ticket không có inbound batch
    - Test: Tạo import ticket với inbound batch không tồn tại
    - Test: Tạo import ticket với area không tồn tại
    - Test: Reality quantity vượt quá inbound batch quantity
    - Test: Tính toán percent đúng
    - Test: Split vào batches đúng (20kg, 10kg, remainder)
    - Test: Update area quantity sau khi import

69. **splitIntoBatches(importTicket, dto, inboundBatch, area, product)** (Private)
    - Test: Split quantity >= 20kg
    - Test: Split quantity < 20kg nhưng >= 10kg
    - Test: Split quantity < 10kg
    - Test: Tính toán số lượng batches đúng

---

## 14. Export Tickets Module

### ExportTicketsService
70. **create(dto: CreateExportTicketDto)**
    - Test: Tạo export ticket với dữ liệu hợp lệ
    - Test: Tạo export ticket với order invoice detail không tồn tại
    - Test: Tạo export ticket với batch không tồn tại
    - Test: Validate product match giữa batch và order invoice detail
    - Test: Product không match giữa batch và order invoice detail
    - Test: Update area quantity sau khi export
    - Test: Link export ticket với batches

71. **validateProductMatch(batch: Batch, orderInvoiceDetail: OrderInvoiceDetail)** (Private)
    - Test: Validate product match đúng
    - Test: Validate product không match

---

## 15. Notifications Module

### NotificationsService
72. **findAllWithPagination(options: {paginationOptions, userId?})**
    - Test: Lấy notifications với pagination
    - Test: Filter theo userId
    - Test: Order by createdAt descending

73. **create(data: CreateNotificationDto)**
    - Test: Tạo notification thành công
    - Test: Tạo notification với user không tồn tại

---

## 16. Areas Module

### AreasService
74. **create(dto: CreateAreaDto)**
    - Test: Tạo area với dữ liệu hợp lệ
    - Test: Tạo area với warehouse không tồn tại

75. **findById(id: string)**
    - Test: Tìm area tồn tại
    - Test: Tìm area không tồn tại

76. **update(id: string, dto: UpdateAreaDto)**
    - Test: Update area thành công

77. **remove(id: string)**
    - Test: Xóa area thành công

---

## 17. Batches Module

### BatchesService
78. **create(dto: CreateBatchDto)**
    - Test: Tạo batch với dữ liệu hợp lệ
    - Test: Tạo batch với import ticket không tồn tại
    - Test: Tạo batch với area không tồn tại
    - Test: Tạo batch với product không tồn tại

79. **findById(id: string)**
    - Test: Tìm batch tồn tại

80. **findByIds(ids: string[])**
    - Test: Tìm nhiều batches

81. **update(id: string, dto: UpdateBatchDto)**
    - Test: Update batch thành công

---

## 18. Delivery Staffs Module

### DeliveryStaffsService
82. **create(dto: CreateDeliveryStaffDto)**
    - Test: Tạo delivery staff với dữ liệu hợp lệ
    - Test: Tạo delivery staff với user không tồn tại
    - Test: Tạo delivery staff với warehouse không tồn tại

83. **findById(id: string)**
    - Test: Tìm delivery staff tồn tại

84. **findByUserId(userId: number)**
    - Test: Tìm delivery staff theo user id

---

## 19. Suppliers Module

### SuppliersService
85. **findById(id: string)**
    - Test: Tìm supplier tồn tại

86. **findByUserId(userId: number)**
    - Test: Tìm supplier theo user id

---

## 20. Consignees Module

### ConsigneesService
87. **findById(id: string)**
    - Test: Tìm consignee tồn tại

88. **findByUserId(userId: number)**
    - Test: Tìm consignee theo user id

---

## 21. Order Invoices Module

### OrderInvoicesService
89. **findById(id: string)**
    - Test: Tìm order invoice tồn tại

90. **update(id: string, data: Partial<OrderInvoice>)**
    - Test: Update order invoice thành công

---

## 22. Order Invoice Details Module

### OrderInvoiceDetailsService
91. **findById(id: string)**
    - Test: Tìm order invoice detail tồn tại

92. **update(id: string, data: Partial<OrderInvoiceDetail>)**
    - Test: Update order invoice detail thành công

---

## 23. Harvest Invoices Module

### HarvestInvoicesService
93. **findById(id: string)**
    - Test: Tìm harvest invoice tồn tại

94. **findByHarvestPhaseId(harvestPhaseId: string)**
    - Test: Tìm harvest invoice theo harvest phase id

---

## 24. Harvest Invoice Details Module

### HarvestInvoiceDetailsService
95. **findById(id: string)**
    - Test: Tìm harvest invoice detail tồn tại

96. **findByHarvestInvoiceId(harvestInvoiceId: string)**
    - Test: Tìm harvest invoice details theo invoice id

---

## 25. Inbound Batches Module

### InboundBatchesService
97. **create(data: Partial<InboundBatch>)**
    - Test: Tạo inbound batch thành công
    - Test: Tạo inbound batch với harvest phase không tồn tại

98. **findById(id: string)**
    - Test: Tìm inbound batch tồn tại

99. **update(id: string, data: Partial<InboundBatch>)**
    - Test: Update inbound batch thành công

100. **getProductOfInboundBatch(inboundBatch: InboundBatch)**
    - Test: Lấy product từ inbound batch

---

## Tổng kết

### Số lượng Functions có thể viết Unit Test: **100 functions**

### Phân loại theo Module:
- **Authentication:** 3 functions
- **Categories:** 2 functions
- **Products:** 2 functions
- **Warehouses:** 2 functions
- **Accounts:** 4 functions
- **Harvest Schedules:** 11 functions
- **Order Schedules:** 9 functions
- **Harvest Phases:** 8 functions
- **Order Phases:** 7 functions
- **Deliveries:** 11 functions
- **Trucks:** 5 functions
- **Payments:** 2 functions
- **Import Tickets:** 2 functions
- **Export Tickets:** 2 functions
- **Notifications:** 2 functions
- **Areas:** 4 functions
- **Batches:** 4 functions
- **Delivery Staffs:** 3 functions
- **Suppliers:** 2 functions
- **Consignees:** 2 functions
- **Order Invoices:** 2 functions
- **Order Invoice Details:** 2 functions
- **Harvest Invoices:** 2 functions
- **Harvest Invoice Details:** 2 functions
- **Inbound Batches:** 4 functions

### Ưu tiên viết Unit Test (theo độ quan trọng):

#### **Priority 1 - Core Business Logic:**
1. DeliveriesService (11 functions) - Logic phức tạp với status transitions
2. HarvestPhasesService (8 functions) - Tính toán totals và validation
3. OrderPhasesService (7 functions) - Tính toán totals và validation
4. HarvestSchedulesService (11 functions) - Business logic quan trọng
5. OrderSchedulesService (9 functions) - Business logic quan trọng

#### **Priority 2 - Critical Services:**
6. PaymentsService (2 functions) - Xử lý thanh toán
7. ImportTicketsService (2 functions) - Logic split batches
8. ExportTicketsService (2 functions) - Validation product match
9. AccountsService (4 functions) - Tạo accounts

#### **Priority 3 - Supporting Services:**
10. AuthService (3 functions) - Authentication
11. ProductsService (2 functions)
12. CategoriesService (2 functions)
13. TrucksService (5 functions)
14. Các services còn lại

---

## Ghi chú

- Các function **Private** có thể test gián tiếp thông qua public methods
- Mỗi function nên có ít nhất 3-5 test cases:
  - Happy path (success case)
  - Error cases (validation errors, not found, etc.)
  - Edge cases (null, empty, boundary values)
- Ưu tiên test business logic và validation logic
- Mock các dependencies (repositories, external services)
- Test coverage mục tiêu: **80%+**

