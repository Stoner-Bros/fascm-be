# Danh sách Functions để viết TestCase - Hệ thống FASCM

## Project Information
- **Project Name:** FASCM (Farm Supply Chain Management)
- **Project Code:** FA25SE172
- **Test Environment Setup:**
  1. PostgreSQL Database
  2. Google Chrome/Microsoft Edge
  3. Node.js & NestJS Backend
  4. Next.js Frontend

---

## Functions List (Vietnamese)

| No | Function Name | Sheet Name | Description | Pre-Condition |
|----|---------------|------------|-------------|---------------|
| 1 | Login | Authentication | Đăng nhập bằng email và password | User đã được tạo trong hệ thống |
| 2 | Confirm Email | Authentication | Xác nhận email sau khi đăng ký | User có hash xác nhận email hợp lệ |
| 3 | Confirm New Email | Authentication | Xác nhận email mới khi thay đổi | User đã yêu cầu thay đổi email |
| 4 | Forgot Password | Authentication | Yêu cầu reset password | User tồn tại trong hệ thống |
| 5 | Reset Password | Authentication | Đặt lại mật khẩu mới | User có hash reset password hợp lệ |
| 6 | Get Current User | Authentication | Lấy thông tin user hiện tại | User đã đăng nhập (có JWT token) |
| 7 | Refresh Token | Authentication | Làm mới access token | User có refresh token hợp lệ |
| 8 | Logout | Authentication | Đăng xuất khỏi hệ thống | User đã đăng nhập |
| 9 | Update Profile | Authentication | Cập nhật thông tin profile | User đã đăng nhập |
| 10 | Delete Account | Authentication | Xóa tài khoản (soft delete) | User đã đăng nhập |
| 11 | Create Category | Category Management | Tạo danh mục sản phẩm mới | User đã đăng nhập, có quyền Admin |
| 12 | Get All Categories | Category Management | Lấy danh sách tất cả categories (có phân trang) | User đã đăng nhập |
| 13 | Get Category By ID | Category Management | Lấy thông tin chi tiết category | User đã đăng nhập, category tồn tại |
| 14 | Update Category | Category Management | Cập nhật thông tin category | User đã đăng nhập, có quyền Admin, category tồn tại |
| 15 | Delete Category | Category Management | Xóa category | User đã đăng nhập, có quyền Admin, category tồn tại |
| 16 | Create Product | Product Management | Tạo sản phẩm mới | User đã đăng nhập, có quyền Admin, category tồn tại |
| 17 | Get All Products | Product Management | Lấy danh sách tất cả products (có phân trang, filter) | User đã đăng nhập |
| 18 | Get Product By ID | Product Management | Lấy thông tin chi tiết product | User đã đăng nhập, product tồn tại |
| 19 | Update Product | Product Management | Cập nhật thông tin product | User đã đăng nhập, có quyền Admin, product tồn tại |
| 20 | Delete Product | Product Management | Xóa product | User đã đăng nhập, có quyền Admin, product tồn tại |
| 21 | Update Product Status | Product Management | Cập nhật trạng thái product | User đã đăng nhập, có quyền Admin, product tồn tại |
| 22 | Create Harvest Schedule | Harvest Management | Supplier tạo harvest schedule mới | User đã đăng nhập, là Supplier, có supplier record |
| 23 | Get All Harvest Schedules | Harvest Management | Lấy danh sách tất cả harvest schedules (có phân trang, filter) | User đã đăng nhập |
| 24 | Get Harvest Schedules By Supplier | Harvest Management | Lấy danh sách harvest schedules theo supplier ID | User đã đăng nhập, supplier tồn tại |
| 25 | Get My Harvest Schedules | Harvest Management | Lấy danh sách harvest schedules của supplier hiện tại | User đã đăng nhập, là Supplier |
| 26 | Get Harvest Schedule By ID | Harvest Management | Lấy thông tin chi tiết harvest schedule | User đã đăng nhập, harvest schedule tồn tại |
| 27 | Update Harvest Schedule | Harvest Management | Cập nhật harvest schedule | User đã đăng nhập, là Supplier, harvest schedule tồn tại, status = PENDING |
| 28 | Update Harvest Schedule Status | Harvest Management | Cập nhật trạng thái harvest schedule (APPROVE/REJECT/CANCEL) | User đã đăng nhập, harvest schedule tồn tại, có quyền thay đổi status |
| 29 | Create Order Schedule | Order Management | Consignee tạo order schedule mới | User đã đăng nhập, là Consignee, có consignee record |
| 30 | Get All Order Schedules | Order Management | Lấy danh sách tất cả order schedules (có phân trang, filter) | User đã đăng nhập |
| 31 | Get Order Schedules By Consignee | Order Management | Lấy danh sách order schedules theo consignee ID | User đã đăng nhập, consignee tồn tại |
| 32 | Get My Order Schedules | Order Management | Lấy danh sách order schedules của consignee hiện tại | User đã đăng nhập, là Consignee |
| 33 | Get Order Schedule By ID | Order Management | Lấy thông tin chi tiết order schedule | User đã đăng nhập, order schedule tồn tại |
| 34 | Update Order Schedule | Order Management | Cập nhật order schedule | User đã đăng nhập, là Consignee, order schedule tồn tại, status = PENDING |
| 35 | Update Order Schedule Status | Order Management | Cập nhật trạng thái order schedule (APPROVE/REJECT/CANCEL) | User đã đăng nhập, order schedule tồn tại, có quyền thay đổi status |
| 36 | Create Harvest Phase | Harvest Phase Management | Tạo harvest phase mới cho harvest schedule | User đã đăng nhập, harvest schedule tồn tại, status = APPROVED |
| 37 | Create Multiple Harvest Phases | Harvest Phase Management | Tạo nhiều harvest phases cùng lúc | User đã đăng nhập, harvest schedule tồn tại, status = APPROVED |
| 38 | Get All Harvest Phases | Harvest Phase Management | Lấy danh sách tất cả harvest phases (có phân trang) | User đã đăng nhập |
| 39 | Get Harvest Phases By Schedule | Harvest Phase Management | Lấy danh sách harvest phases theo harvest schedule ID | User đã đăng nhập, harvest schedule tồn tại |
| 40 | Get Harvest Phase By ID | Harvest Phase Management | Lấy thông tin chi tiết harvest phase | User đã đăng nhập, harvest phase tồn tại |
| 41 | Update Harvest Phase | Harvest Phase Management | Cập nhật harvest phase | User đã đăng nhập, harvest phase tồn tại |
| 42 | Delete Harvest Phase | Harvest Phase Management | Xóa harvest phase | User đã đăng nhập, harvest phase tồn tại |
| 43 | Update Harvest Phase Status | Harvest Phase Management | Cập nhật trạng thái harvest phase | User đã đăng nhập, harvest phase tồn tại, status transition hợp lệ |
| 44 | Upload Image Proof - Harvest Phase | Harvest Phase Management | Upload ảnh chứng minh giao hàng cho harvest phase | User đã đăng nhập, harvest phase tồn tại, có file ảnh |
| 45 | Create Order Phase | Order Phase Management | Tạo order phase mới cho order schedule | User đã đăng nhập, order schedule tồn tại, status = APPROVED |
| 46 | Create Multiple Order Phases | Order Phase Management | Tạo nhiều order phases cùng lúc | User đã đăng nhập, order schedule tồn tại, status = APPROVED |
| 47 | Get All Order Phases | Order Phase Management | Lấy danh sách tất cả order phases (có phân trang) | User đã đăng nhập |
| 48 | Get Order Phases By Schedule | Order Phase Management | Lấy danh sách order phases theo order schedule ID | User đã đăng nhập, order schedule tồn tại |
| 49 | Get Order Phase By ID | Order Phase Management | Lấy thông tin chi tiết order phase | User đã đăng nhập, order phase tồn tại |
| 50 | Update Order Phase | Order Phase Management | Cập nhật order phase | User đã đăng nhập, order phase tồn tại |
| 51 | Delete Order Phase | Order Phase Management | Xóa order phase | User đã đăng nhập, order phase tồn tại |
| 52 | Update Order Phase Status | Order Phase Management | Cập nhật trạng thái order phase | User đã đăng nhập, order phase tồn tại, status transition hợp lệ |
| 53 | Upload Image Proof - Order Phase | Order Phase Management | Upload ảnh chứng minh giao hàng cho order phase | User đã đăng nhập, order phase tồn tại, có file ảnh |
| 54 | Create Delivery | Delivery Management | Tạo delivery mới cho harvest phase hoặc order phase | User đã đăng nhập, phase tồn tại, truck và delivery staff tồn tại |
| 55 | Get All Deliveries | Delivery Management | Lấy danh sách tất cả deliveries (có phân trang, filter) | User đã đăng nhập |
| 56 | Get Delivery By ID | Delivery Management | Lấy thông tin chi tiết delivery | User đã đăng nhập, delivery tồn tại |
| 57 | Update Delivery | Delivery Management | Cập nhật thông tin delivery | User đã đăng nhập, delivery tồn tại |
| 58 | Delete Delivery | Delivery Management | Xóa delivery | User đã đăng nhập, delivery tồn tại |
| 59 | Update Delivery Status | Delivery Management | Cập nhật trạng thái delivery (SCHEDULED/DELIVERING/DELIVERED/COMPLETED/CANCELED) | User đã đăng nhập, delivery tồn tại, status transition hợp lệ |
| 60 | Create Payment | Payment Management | Tạo payment mới (Transfer hoặc Cash) | User đã đăng nhập |
| 61 | Get All Payments | Payment Management | Lấy danh sách tất cả payments (có phân trang) | User đã đăng nhập |
| 62 | Get Payment By ID | Payment Management | Lấy thông tin chi tiết payment | User đã đăng nhập, payment tồn tại |
| 63 | Delete Payment | Payment Management | Xóa payment | User đã đăng nhập, payment tồn tại |
| 64 | Get PayOS Payment Info | Payment Management | Lấy thông tin payment từ PayOS | User đã đăng nhập, payment code tồn tại |
| 65 | Cancel PayOS Payment | Payment Management | Hủy payment trên PayOS | User đã đăng nhập, payment tồn tại, status = PENDING, method = TRANSFER |
| 66 | Confirm Payment Paid By Cash | Payment Management | Xác nhận payment đã thanh toán bằng tiền mặt | User đã đăng nhập, có quyền Staff/Admin, payment tồn tại, status = PENDING, method = CASH |
| 67 | Create Import Ticket | Inventory Management | Tạo import ticket và tự động chia thành batches | User đã đăng nhập, có quyền Staff, inbound batch tồn tại (nếu có) |
| 68 | Get All Import Tickets | Inventory Management | Lấy danh sách tất cả import tickets (có phân trang) | User đã đăng nhập |
| 69 | Get Import Ticket By ID | Inventory Management | Lấy thông tin chi tiết import ticket | User đã đăng nhập, import ticket tồn tại |
| 70 | Delete Import Ticket | Inventory Management | Xóa import ticket | User đã đăng nhập, có quyền Staff, import ticket tồn tại |
| 71 | Get Import Tickets By Area | Inventory Management | Lấy danh sách import tickets theo area ID | User đã đăng nhập, area tồn tại |
| 72 | Create Export Ticket | Inventory Management | Tạo export ticket từ order invoice details và batches | User đã đăng nhập, có quyền Staff, order invoice details và batches tồn tại |
| 73 | Get All Export Tickets | Inventory Management | Lấy danh sách tất cả export tickets (có phân trang) | User đã đăng nhập |
| 74 | Get Export Ticket By ID | Inventory Management | Lấy thông tin chi tiết export ticket | User đã đăng nhập, export ticket tồn tại |
| 75 | Delete Export Ticket | Inventory Management | Xóa export ticket | User đã đăng nhập, có quyền Staff, export ticket tồn tại |
| 76 | Get Export Tickets By Area | Inventory Management | Lấy danh sách export tickets theo area ID | User đã đăng nhập, area tồn tại |
| 77 | Create Supplier | Account Management | Tạo tài khoản supplier mới | User đã đăng nhập, có quyền Admin |
| 78 | Get All Suppliers | Account Management | Lấy danh sách tất cả suppliers (có phân trang) | User đã đăng nhập |
| 79 | Get Supplier By ID | Account Management | Lấy thông tin chi tiết supplier | User đã đăng nhập, supplier tồn tại |
| 80 | Update Supplier | Account Management | Cập nhật thông tin supplier | User đã đăng nhập, có quyền Admin, supplier tồn tại |
| 81 | Delete Supplier | Account Management | Xóa supplier | User đã đăng nhập, có quyền Admin, supplier tồn tại |
| 82 | Create Consignee | Account Management | Tạo tài khoản consignee mới | User đã đăng nhập, có quyền Admin |
| 83 | Get All Consignees | Account Management | Lấy danh sách tất cả consignees (có phân trang) | User đã đăng nhập |
| 84 | Get Consignee By ID | Account Management | Lấy thông tin chi tiết consignee | User đã đăng nhập, consignee tồn tại |
| 85 | Update Consignee | Account Management | Cập nhật thông tin consignee | User đã đăng nhập, có quyền Admin, consignee tồn tại |
| 86 | Delete Consignee | Account Management | Xóa consignee | User đã đăng nhập, có quyền Admin, consignee tồn tại |
| 87 | Create Staff | Account Management | Tạo tài khoản staff mới | User đã đăng nhập, có quyền Admin, warehouse tồn tại (nếu có) |
| 88 | Get All Staffs | Account Management | Lấy danh sách tất cả staffs (có phân trang) | User đã đăng nhập |
| 89 | Get Staff By ID | Account Management | Lấy thông tin chi tiết staff | User đã đăng nhập, staff tồn tại |
| 90 | Update Staff | Account Management | Cập nhật thông tin staff | User đã đăng nhập, có quyền Admin, staff tồn tại |
| 91 | Delete Staff | Account Management | Xóa staff | User đã đăng nhập, có quyền Admin, staff tồn tại |
| 92 | Create Delivery Staff | Account Management | Tạo tài khoản delivery staff mới | User đã đăng nhập, có quyền Admin, warehouse tồn tại (nếu có) |
| 93 | Get All Delivery Staffs | Account Management | Lấy danh sách tất cả delivery staffs (có phân trang) | User đã đăng nhập |
| 94 | Get Delivery Staff By ID | Account Management | Lấy thông tin chi tiết delivery staff | User đã đăng nhập, delivery staff tồn tại |
| 95 | Update Delivery Staff | Account Management | Cập nhật thông tin delivery staff | User đã đăng nhập, có quyền Admin, delivery staff tồn tại |
| 96 | Delete Delivery Staff | Account Management | Xóa delivery staff | User đã đăng nhập, có quyền Admin, delivery staff tồn tại |
| 97 | Create Manager | Account Management | Tạo tài khoản manager mới | User đã đăng nhập, có quyền Admin, warehouse tồn tại (nếu có) |
| 98 | Get All Managers | Account Management | Lấy danh sách tất cả managers (có phân trang) | User đã đăng nhập |
| 99 | Get Manager By ID | Account Management | Lấy thông tin chi tiết manager | User đã đăng nhập, manager tồn tại |
| 100 | Update Manager | Account Management | Cập nhật thông tin manager | User đã đăng nhập, có quyền Admin, manager tồn tại |
| 101 | Delete Manager | Account Management | Xóa manager | User đã đăng nhập, có quyền Admin, manager tồn tại |
| 102 | Create Warehouse | Warehouse Management | Tạo warehouse mới | User đã đăng nhập, có quyền Admin |
| 103 | Get All Warehouses | Warehouse Management | Lấy danh sách tất cả warehouses (có phân trang) | User đã đăng nhập |
| 104 | Get Warehouse By ID | Warehouse Management | Lấy thông tin chi tiết warehouse | User đã đăng nhập, warehouse tồn tại |
| 105 | Update Warehouse | Warehouse Management | Cập nhật thông tin warehouse | User đã đăng nhập, có quyền Admin, warehouse tồn tại |
| 106 | Delete Warehouse | Warehouse Management | Xóa warehouse | User đã đăng nhập, có quyền Admin, warehouse tồn tại |
| 107 | Create Area | Warehouse Management | Tạo area mới trong warehouse | User đã đăng nhập, có quyền Staff/Admin, warehouse tồn tại |
| 108 | Get All Areas | Warehouse Management | Lấy danh sách tất cả areas (có phân trang) | User đã đăng nhập |
| 109 | Get Area By ID | Warehouse Management | Lấy thông tin chi tiết area | User đã đăng nhập, area tồn tại |
| 110 | Update Area | Warehouse Management | Cập nhật thông tin area | User đã đăng nhập, có quyền Staff/Admin, area tồn tại |
| 111 | Delete Area | Warehouse Management | Xóa area | User đã đăng nhập, có quyền Staff/Admin, area tồn tại |
| 112 | Create Truck | Delivery Management | Tạo truck mới | User đã đăng nhập, có quyền Admin |
| 113 | Get All Trucks | Delivery Management | Lấy danh sách tất cả trucks (có phân trang) | User đã đăng nhập |
| 114 | Get Truck By ID | Delivery Management | Lấy thông tin chi tiết truck | User đã đăng nhập, truck tồn tại |
| 115 | Update Truck | Delivery Management | Cập nhật thông tin truck | User đã đăng nhập, có quyền Admin, truck tồn tại |
| 116 | Delete Truck | Delivery Management | Xóa truck | User đã đăng nhập, có quyền Admin, truck tồn tại |
| 117 | Create Notification | Notification Management | Tạo notification mới | User đã đăng nhập, user target tồn tại |
| 118 | Get All Notifications | Notification Management | Lấy danh sách notifications của user hiện tại (có phân trang) | User đã đăng nhập |
| 119 | Get Notification By ID | Notification Management | Lấy thông tin chi tiết notification | User đã đăng nhập, notification tồn tại |
| 120 | Mark Notification As Read | Notification Management | Đánh dấu notification đã đọc | User đã đăng nhập, notification tồn tại |
| 121 | Delete Notification | Notification Management | Xóa notification | User đã đăng nhập, notification tồn tại |
| 122 | Create Batch | Inventory Management | Tạo batch mới | User đã đăng nhập, có quyền Staff, product và area tồn tại |
| 123 | Get All Batches | Inventory Management | Lấy danh sách tất cả batches (có phân trang) | User đã đăng nhập |
| 124 | Get Batch By ID | Inventory Management | Lấy thông tin chi tiết batch | User đã đăng nhập, batch tồn tại |
| 125 | Update Batch | Inventory Management | Cập nhật thông tin batch | User đã đăng nhập, có quyền Staff, batch tồn tại |
| 126 | Delete Batch | Inventory Management | Xóa batch | User đã đăng nhập, có quyền Staff, batch tồn tại |
| 127 | Create Inbound Batch | Inventory Management | Tạo inbound batch từ harvest phase | User đã đăng nhập, có quyền Staff, harvest phase tồn tại |
| 128 | Get All Inbound Batches | Inventory Management | Lấy danh sách tất cả inbound batches (có phân trang) | User đã đăng nhập |
| 129 | Get Inbound Batch By ID | Inventory Management | Lấy thông tin chi tiết inbound batch | User đã đăng nhập, inbound batch tồn tại |
| 130 | Update Inbound Batch | Inventory Management | Cập nhật thông tin inbound batch | User đã đăng nhập, có quyền Staff, inbound batch tồn tại |
| 131 | Delete Inbound Batch | Inventory Management | Xóa inbound batch | User đã đăng nhập, có quyền Staff, inbound batch tồn tại |
| 132 | Create Harvest Invoice | Invoice Management | Tạo harvest invoice cho harvest phase | User đã đăng nhập, harvest phase tồn tại |
| 133 | Get All Harvest Invoices | Invoice Management | Lấy danh sách tất cả harvest invoices (có phân trang) | User đã đăng nhập |
| 134 | Get Harvest Invoice By ID | Invoice Management | Lấy thông tin chi tiết harvest invoice | User đã đăng nhập, harvest invoice tồn tại |
| 135 | Update Harvest Invoice | Invoice Management | Cập nhật thông tin harvest invoice | User đã đăng nhập, harvest invoice tồn tại |
| 136 | Delete Harvest Invoice | Invoice Management | Xóa harvest invoice | User đã đăng nhập, harvest invoice tồn tại |
| 137 | Create Order Invoice | Invoice Management | Tạo order invoice cho order phase | User đã đăng nhập, order phase tồn tại |
| 138 | Get All Order Invoices | Invoice Management | Lấy danh sách tất cả order invoices (có phân trang) | User đã đăng nhập |
| 139 | Get Order Invoice By ID | Invoice Management | Lấy thông tin chi tiết order invoice | User đã đăng nhập, order invoice tồn tại |
| 140 | Update Order Invoice | Invoice Management | Cập nhật thông tin order invoice | User đã đăng nhập, order invoice tồn tại |
| 141 | Delete Order Invoice | Invoice Management | Xóa order invoice | User đã đăng nhập, order invoice tồn tại |
| 142 | PayOS Webhook | Payment Management | Nhận webhook từ PayOS khi thanh toán | PayOS gửi webhook hợp lệ |
| 143 | Get Home Statistics | Dashboard | Lấy thống kê tổng quan cho dashboard | User đã đăng nhập |

---

## Functions List (English)

| No | Function Name | Sheet Name | Description | Pre-Condition |
|----|---------------|------------|-------------|---------------|
| 1 | Login | Authentication | Login with email and password | User exists in the system |
| 2 | Confirm Email | Authentication | Confirm email after registration | User has valid email confirmation hash |
| 3 | Confirm New Email | Authentication | Confirm new email when changing | User has requested email change |
| 4 | Forgot Password | Authentication | Request password reset | User exists in the system |
| 5 | Reset Password | Authentication | Set new password | User has valid password reset hash |
| 6 | Get Current User | Authentication | Get current user information | User is logged in (has JWT token) |
| 7 | Refresh Token | Authentication | Refresh access token | User has valid refresh token |
| 8 | Logout | Authentication | Logout from the system | User is logged in |
| 9 | Update Profile | Authentication | Update profile information | User is logged in |
| 10 | Delete Account | Authentication | Delete account (soft delete) | User is logged in |
| 11 | Create Category | Category Management | Create new product category | User is logged in, has Admin role |
| 12 | Get All Categories | Category Management | Get all categories list (with pagination) | User is logged in |
| 13 | Get Category By ID | Category Management | Get category details | User is logged in, category exists |
| 14 | Update Category | Category Management | Update category information | User is logged in, has Admin role, category exists |
| 15 | Delete Category | Category Management | Delete category | User is logged in, has Admin role, category exists |
| 16 | Create Product | Product Management | Create new product | User is logged in, has Admin role, category exists |
| 17 | Get All Products | Product Management | Get all products list (with pagination, filter) | User is logged in |
| 18 | Get Product By ID | Product Management | Get product details | User is logged in, product exists |
| 19 | Update Product | Product Management | Update product information | User is logged in, has Admin role, product exists |
| 20 | Delete Product | Product Management | Delete product | User is logged in, has Admin role, product exists |
| 21 | Update Product Status | Product Management | Update product status | User is logged in, has Admin role, product exists |
| 22 | Create Harvest Schedule | Harvest Management | Supplier creates new harvest schedule | User is logged in, is Supplier, has supplier record |
| 23 | Get All Harvest Schedules | Harvest Management | Get all harvest schedules list (with pagination, filter) | User is logged in |
| 24 | Get Harvest Schedules By Supplier | Harvest Management | Get harvest schedules list by supplier ID | User is logged in, supplier exists |
| 25 | Get My Harvest Schedules | Harvest Management | Get current supplier's harvest schedules list | User is logged in, is Supplier |
| 26 | Get Harvest Schedule By ID | Harvest Management | Get harvest schedule details | User is logged in, harvest schedule exists |
| 27 | Update Harvest Schedule | Harvest Management | Update harvest schedule | User is logged in, is Supplier, harvest schedule exists, status = PENDING |
| 28 | Update Harvest Schedule Status | Harvest Management | Update harvest schedule status (APPROVE/REJECT/CANCEL) | User is logged in, harvest schedule exists, has permission to change status |
| 29 | Create Order Schedule | Order Management | Consignee creates new order schedule | User is logged in, is Consignee, has consignee record |
| 30 | Get All Order Schedules | Order Management | Get all order schedules list (with pagination, filter) | User is logged in |
| 31 | Get Order Schedules By Consignee | Order Management | Get order schedules list by consignee ID | User is logged in, consignee exists |
| 32 | Get My Order Schedules | Order Management | Get current consignee's order schedules list | User is logged in, is Consignee |
| 33 | Get Order Schedule By ID | Order Management | Get order schedule details | User is logged in, order schedule exists |
| 34 | Update Order Schedule | Order Management | Update order schedule | User is logged in, is Consignee, order schedule exists, status = PENDING |
| 35 | Update Order Schedule Status | Order Management | Update order schedule status (APPROVE/REJECT/CANCEL) | User is logged in, order schedule exists, has permission to change status |
| 36 | Create Harvest Phase | Harvest Phase Management | Create new harvest phase for harvest schedule | User is logged in, harvest schedule exists, status = APPROVED |
| 37 | Create Multiple Harvest Phases | Harvest Phase Management | Create multiple harvest phases at once | User is logged in, harvest schedule exists, status = APPROVED |
| 38 | Get All Harvest Phases | Harvest Phase Management | Get all harvest phases list (with pagination) | User is logged in |
| 39 | Get Harvest Phases By Schedule | Harvest Phase Management | Get harvest phases list by harvest schedule ID | User is logged in, harvest schedule exists |
| 40 | Get Harvest Phase By ID | Harvest Phase Management | Get harvest phase details | User is logged in, harvest phase exists |
| 41 | Update Harvest Phase | Harvest Phase Management | Update harvest phase | User is logged in, harvest phase exists |
| 42 | Delete Harvest Phase | Harvest Phase Management | Delete harvest phase | User is logged in, harvest phase exists |
| 43 | Update Harvest Phase Status | Harvest Phase Management | Update harvest phase status | User is logged in, harvest phase exists, valid status transition |
| 44 | Upload Image Proof - Harvest Phase | Harvest Phase Management | Upload delivery proof image for harvest phase | User is logged in, harvest phase exists, has image file |
| 45 | Create Order Phase | Order Phase Management | Create new order phase for order schedule | User is logged in, order schedule exists, status = APPROVED |
| 46 | Create Multiple Order Phases | Order Phase Management | Create multiple order phases at once | User is logged in, order schedule exists, status = APPROVED |
| 47 | Get All Order Phases | Order Phase Management | Get all order phases list (with pagination) | User is logged in |
| 48 | Get Order Phases By Schedule | Order Phase Management | Get order phases list by order schedule ID | User is logged in, order schedule exists |
| 49 | Get Order Phase By ID | Order Phase Management | Get order phase details | User is logged in, order phase exists |
| 50 | Update Order Phase | Order Phase Management | Update order phase | User is logged in, order phase exists |
| 51 | Delete Order Phase | Order Phase Management | Delete order phase | User is logged in, order phase exists |
| 52 | Update Order Phase Status | Order Phase Management | Update order phase status | User is logged in, order phase exists, valid status transition |
| 53 | Upload Image Proof - Order Phase | Order Phase Management | Upload delivery proof image for order phase | User is logged in, order phase exists, has image file |
| 54 | Create Delivery | Delivery Management | Create new delivery for harvest phase or order phase | User is logged in, phase exists, truck and delivery staff exist |
| 55 | Get All Deliveries | Delivery Management | Get all deliveries list (with pagination, filter) | User is logged in |
| 56 | Get Delivery By ID | Delivery Management | Get delivery details | User is logged in, delivery exists |
| 57 | Update Delivery | Delivery Management | Update delivery information | User is logged in, delivery exists |
| 58 | Delete Delivery | Delivery Management | Delete delivery | User is logged in, delivery exists |
| 59 | Update Delivery Status | Delivery Management | Update delivery status (SCHEDULED/DELIVERING/DELIVERED/COMPLETED/CANCELED) | User is logged in, delivery exists, valid status transition |
| 60 | Create Payment | Payment Management | Create new payment (Transfer or Cash) | User is logged in |
| 61 | Get All Payments | Payment Management | Get all payments list (with pagination) | User is logged in |
| 62 | Get Payment By ID | Payment Management | Get payment details | User is logged in, payment exists |
| 63 | Delete Payment | Payment Management | Delete payment | User is logged in, payment exists |
| 64 | Get PayOS Payment Info | Payment Management | Get payment information from PayOS | User is logged in, payment code exists |
| 65 | Cancel PayOS Payment | Payment Management | Cancel payment on PayOS | User is logged in, payment exists, status = PENDING, method = TRANSFER |
| 66 | Confirm Payment Paid By Cash | Payment Management | Confirm payment paid by cash | User is logged in, has Staff/Admin role, payment exists, status = PENDING, method = CASH |
| 67 | Create Import Ticket | Inventory Management | Create import ticket and automatically split into batches | User is logged in, has Staff role, inbound batch exists (if provided) |
| 68 | Get All Import Tickets | Inventory Management | Get all import tickets list (with pagination) | User is logged in |
| 69 | Get Import Ticket By ID | Inventory Management | Get import ticket details | User is logged in, import ticket exists |
| 70 | Delete Import Ticket | Inventory Management | Delete import ticket | User is logged in, has Staff role, import ticket exists |
| 71 | Get Import Tickets By Area | Inventory Management | Get import tickets list by area ID | User is logged in, area exists |
| 72 | Create Export Ticket | Inventory Management | Create export ticket from order invoice details and batches | User is logged in, has Staff role, order invoice details and batches exist |
| 73 | Get All Export Tickets | Inventory Management | Get all export tickets list (with pagination) | User is logged in |
| 74 | Get Export Ticket By ID | Inventory Management | Get export ticket details | User is logged in, export ticket exists |
| 75 | Delete Export Ticket | Inventory Management | Delete export ticket | User is logged in, has Staff role, export ticket exists |
| 76 | Get Export Tickets By Area | Inventory Management | Get export tickets list by area ID | User is logged in, area exists |
| 77 | Create Supplier | Account Management | Create new supplier account | User is logged in, has Admin role |
| 78 | Get All Suppliers | Account Management | Get all suppliers list (with pagination) | User is logged in |
| 79 | Get Supplier By ID | Account Management | Get supplier details | User is logged in, supplier exists |
| 80 | Update Supplier | Account Management | Update supplier information | User is logged in, has Admin role, supplier exists |
| 81 | Delete Supplier | Account Management | Delete supplier | User is logged in, has Admin role, supplier exists |
| 82 | Create Consignee | Account Management | Create new consignee account | User is logged in, has Admin role |
| 83 | Get All Consignees | Account Management | Get all consignees list (with pagination) | User is logged in |
| 84 | Get Consignee By ID | Account Management | Get consignee details | User is logged in, consignee exists |
| 85 | Update Consignee | Account Management | Update consignee information | User is logged in, has Admin role, consignee exists |
| 86 | Delete Consignee | Account Management | Delete consignee | User is logged in, has Admin role, consignee exists |
| 87 | Create Staff | Account Management | Create new staff account | User is logged in, has Admin role, warehouse exists (if provided) |
| 88 | Get All Staffs | Account Management | Get all staffs list (with pagination) | User is logged in |
| 89 | Get Staff By ID | Account Management | Get staff details | User is logged in, staff exists |
| 90 | Update Staff | Account Management | Update staff information | User is logged in, has Admin role, staff exists |
| 91 | Delete Staff | Account Management | Delete staff | User is logged in, has Admin role, staff exists |
| 92 | Create Delivery Staff | Account Management | Create new delivery staff account | User is logged in, has Admin role, warehouse exists (if provided) |
| 93 | Get All Delivery Staffs | Account Management | Get all delivery staffs list (with pagination) | User is logged in |
| 94 | Get Delivery Staff By ID | Account Management | Get delivery staff details | User is logged in, delivery staff exists |
| 95 | Update Delivery Staff | Account Management | Update delivery staff information | User is logged in, has Admin role, delivery staff exists |
| 96 | Delete Delivery Staff | Account Management | Delete delivery staff | User is logged in, has Admin role, delivery staff exists |
| 97 | Create Manager | Account Management | Create new manager account | User is logged in, has Admin role, warehouse exists (if provided) |
| 98 | Get All Managers | Account Management | Get all managers list (with pagination) | User is logged in |
| 99 | Get Manager By ID | Account Management | Get manager details | User is logged in, manager exists |
| 100 | Update Manager | Account Management | Update manager information | User is logged in, has Admin role, manager exists |
| 101 | Delete Manager | Account Management | Delete manager | User is logged in, has Admin role, manager exists |
| 102 | Create Warehouse | Warehouse Management | Create new warehouse | User is logged in, has Admin role |
| 103 | Get All Warehouses | Warehouse Management | Get all warehouses list (with pagination) | User is logged in |
| 104 | Get Warehouse By ID | Warehouse Management | Get warehouse details | User is logged in, warehouse exists |
| 105 | Update Warehouse | Warehouse Management | Update warehouse information | User is logged in, has Admin role, warehouse exists |
| 106 | Delete Warehouse | Warehouse Management | Delete warehouse | User is logged in, has Admin role, warehouse exists |
| 107 | Create Area | Warehouse Management | Create new area in warehouse | User is logged in, has Staff/Admin role, warehouse exists |
| 108 | Get All Areas | Warehouse Management | Get all areas list (with pagination) | User is logged in |
| 109 | Get Area By ID | Warehouse Management | Get area details | User is logged in, area exists |
| 110 | Update Area | Warehouse Management | Update area information | User is logged in, has Staff/Admin role, area exists |
| 111 | Delete Area | Warehouse Management | Delete area | User is logged in, has Staff/Admin role, area exists |
| 112 | Create Truck | Delivery Management | Create new truck | User is logged in, has Admin role |
| 113 | Get All Trucks | Delivery Management | Get all trucks list (with pagination) | User is logged in |
| 114 | Get Truck By ID | Delivery Management | Get truck details | User is logged in, truck exists |
| 115 | Update Truck | Delivery Management | Update truck information | User is logged in, has Admin role, truck exists |
| 116 | Delete Truck | Delivery Management | Delete truck | User is logged in, has Admin role, truck exists |
| 117 | Create Notification | Notification Management | Create new notification | User is logged in, target user exists |
| 118 | Get All Notifications | Notification Management | Get current user's notifications list (with pagination) | User is logged in |
| 119 | Get Notification By ID | Notification Management | Get notification details | User is logged in, notification exists |
| 120 | Mark Notification As Read | Notification Management | Mark notification as read | User is logged in, notification exists |
| 121 | Delete Notification | Notification Management | Delete notification | User is logged in, notification exists |
| 122 | Create Batch | Inventory Management | Create new batch | User is logged in, has Staff role, product and area exist |
| 123 | Get All Batches | Inventory Management | Get all batches list (with pagination) | User is logged in |
| 124 | Get Batch By ID | Inventory Management | Get batch details | User is logged in, batch exists |
| 125 | Update Batch | Inventory Management | Update batch information | User is logged in, has Staff role, batch exists |
| 126 | Delete Batch | Inventory Management | Delete batch | User is logged in, has Staff role, batch exists |
| 127 | Create Inbound Batch | Inventory Management | Create inbound batch from harvest phase | User is logged in, has Staff role, harvest phase exists |
| 128 | Get All Inbound Batches | Inventory Management | Get all inbound batches list (with pagination) | User is logged in |
| 129 | Get Inbound Batch By ID | Inventory Management | Get inbound batch details | User is logged in, inbound batch exists |
| 130 | Update Inbound Batch | Inventory Management | Update inbound batch information | User is logged in, has Staff role, inbound batch exists |
| 131 | Delete Inbound Batch | Inventory Management | Delete inbound batch | User is logged in, has Staff role, inbound batch exists |
| 132 | Create Harvest Invoice | Invoice Management | Create harvest invoice for harvest phase | User is logged in, harvest phase exists |
| 133 | Get All Harvest Invoices | Invoice Management | Get all harvest invoices list (with pagination) | User is logged in |
| 134 | Get Harvest Invoice By ID | Invoice Management | Get harvest invoice details | User is logged in, harvest invoice exists |
| 135 | Update Harvest Invoice | Invoice Management | Update harvest invoice information | User is logged in, harvest invoice exists |
| 136 | Delete Harvest Invoice | Invoice Management | Delete harvest invoice | User is logged in, harvest invoice exists |
| 137 | Create Order Invoice | Invoice Management | Create order invoice for order phase | User is logged in, order phase exists |
| 138 | Get All Order Invoices | Invoice Management | Get all order invoices list (with pagination) | User is logged in |
| 139 | Get Order Invoice By ID | Invoice Management | Get order invoice details | User is logged in, order invoice exists |
| 140 | Update Order Invoice | Invoice Management | Update order invoice information | User is logged in, order invoice exists |
| 141 | Delete Order Invoice | Invoice Management | Delete order invoice | User is logged in, order invoice exists |
| 142 | PayOS Webhook | Payment Management | Receive webhook from PayOS when payment is processed | PayOS sends valid webhook |
| 143 | Get Home Statistics | Dashboard | Get overview statistics for dashboard | User is logged in |

---

## Notes

- Tất cả các API endpoints đều yêu cầu JWT token (trừ một số public endpoints)
- Phân trang: mặc định page=1, limit=10, tối đa limit=50
- Status transitions phải tuân theo quy tắc nghiệp vụ
- File upload yêu cầu multipart/form-data
- Webhook từ PayOS không yêu cầu authentication

---

## Test Priority

### High Priority (Core Features)
- Authentication (Functions 1-10)
- Harvest Management (Functions 22-28)
- Order Management (Functions 29-35)
- Payment Management (Functions 60-66)
- Delivery Management (Functions 54-59)

### Medium Priority
- Product & Category Management (Functions 11-21)
- Inventory Management (Functions 67-76, 122-131)
- Account Management (Functions 77-101)

### Low Priority
- Warehouse Management (Functions 102-111)
- Notification Management (Functions 117-121)
- Invoice Management (Functions 132-141)

