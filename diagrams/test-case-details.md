# Test Case Details - Hệ thống FASCM

## Project Information
- **Project Name:** FASCM (Farm Supply Chain Management)
- **Project Code:** FA25SE172
- **Test Environment Setup:**
  1. PostgreSQL Database
  2. Google Chrome/Microsoft Edge
  3. Node.js & NestJS Backend
  4. Next.js Frontend

---

## Test Case Template

| Test Case ID | Test Case Description | Test Case Procedure | Expected Results | Pre-conditions | Round 1 | Round 2 | Round 3 | Note |
|--------------|----------------------|---------------------|------------------|----------------|---------|---------|---------|------|
|              |                      |                     |                  |                | Test date<br/>Tester<br/>Status | Test date<br/>Tester<br/>Status | Test date<br/>Tester<br/>Status |      |

---

## Function 1: Login

### Test Case Details

| Test Case ID | Test Case Description | Test Case Procedure | Expected Results | Pre-conditions | Round 1 | Round 2 | Round 3 | Note |
|--------------|----------------------|---------------------|------------------|----------------|---------|---------|---------|------|
| TC0101 | Navigate to the Login page | 1. Open the application<br/>2. Click on "Sign In" or "Login" button | The user is directed to the Login page and a login form appears | User is not logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0102 | UI display of login form fields | 1. Navigate to Login page<br/>2. Verify all form fields are displayed | The login form displays the following fields:<br/>- Email field<br/>- Password field<br/>- "Login" button<br/>- "Forgot Password" link (if available) | User is not logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0103 | Login with valid email and password | 1. On the Login page, enter valid email in the Email field<br/>2. Enter valid password in the Password field<br/>3. Click "Login" button | The system successfully authenticates the user and redirects to the dashboard/home page. User session is created and JWT token is stored | User exists in the system with valid credentials | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0104 | Validate email format | 1. On the Login page, enter invalid email format (e.g., "invalidemail", "test@", "@domain.com")<br/>2. Enter any password<br/>3. Click "Login" button | The system displays an error message such as "Invalid email format" or "Email format is invalid" under the Email field. The Login button may be disabled or the form shows validation error | User is not logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0105 | Validate password field is required | 1. On the Login page, enter valid email<br/>2. Leave password field empty<br/>3. Click "Login" button | The system displays an error message such as "Password is required" or "Password cannot be empty" under the Password field. Login button may be disabled | User is not logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0106 | Login with incorrect password | 1. On the Login page, enter valid email<br/>2. Enter incorrect password<br/>3. Click "Login" button | The system displays an error message such as "Invalid password" or "Incorrect password" and does not authenticate the user. User remains on the login page | User exists in the system | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0107 | Login with non-existent email | 1. On the Login page, enter email that does not exist in the system<br/>2. Enter any password<br/>3. Click "Login" button | The system displays an error message such as "Account does not exist" or "User not found" (404 Not Found). User is not authenticated | User is not logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0108 | Login with empty email field | 1. On the Login page, leave email field empty<br/>2. Enter any password<br/>3. Click "Login" button | The system displays an error message such as "Email is required" or "Email cannot be empty" under the Email field. Login button may be disabled | User is not logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0109 | Login button state - disabled when fields are empty | 1. Navigate to Login page<br/>2. Verify Login button state when both fields are empty | The Login button is disabled when email or password fields are empty | User is not logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0110 | Login button state - enabled when fields are valid | 1. Navigate to Login page<br/>2. Enter valid email format<br/>3. Enter password (at least 1 character)<br/>4. Verify Login button state | The Login button is enabled when both email and password fields have valid input | User is not logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |

### DATA TEST:
- **Valid email:** `admin@fascm.com`
- **Valid password:** `Admin123!`
- **Invalid email formats:** `invalidemail`, `test@`, `@domain.com`, `test@domain`
- **Non-existent email:** `nonexistent@test.com`
- **Incorrect password:** `WrongPassword123!`

---

## Function 2: Create Category

### Test Case Details

| Test Case ID | Test Case Description | Test Case Procedure | Expected Results | Pre-conditions | Round 1 | Round 2 | Round 3 | Note |
|--------------|----------------------|---------------------|------------------|----------------|---------|---------|---------|------|
| TC0201 | Navigate to the Create Category page | 1. Login as Admin<br/>2. Navigate to Categories section<br/>3. Click "Add New Category" or "Create Category" button | The user is directed to the Create Category page and a category form appears | Admin user is logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0202 | UI display of category form fields | 1. Navigate to Create Category page<br/>2. Verify all form fields are displayed | The category form displays the following fields:<br/>- Category Name field<br/>- Description field (if applicable)<br/>- "Save" or "Create" button<br/>- "Cancel" button | Admin user is logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0203 | Create category with valid data | 1. On the Create Category page, enter valid category name (e.g., "Fruits")<br/>2. Enter description (if applicable)<br/>3. Click "Save" or "Create" button | The system successfully creates the category and displays a success message. The user is redirected to the categories list page. The new category appears in the list | Admin user is logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0204 | Validate category name is required | 1. On the Create Category page, leave category name field empty<br/>2. Click "Save" or "Create" button | The system displays an error message such as "Category name is required" or "Name cannot be empty" under the Category Name field. Save button may be disabled | Admin user is logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0205 | Validate category name uniqueness | 1. On the Create Category page, enter a category name that already exists in the system<br/>2. Click "Save" or "Create" button | The system displays an error message such as "Category name already exists" or "This category name is already taken" and does not create the category | Admin user is logged in, category with same name already exists | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0206 | Create category with special characters in name | 1. On the Create Category page, enter category name with special characters (e.g., "Fruits & Vegetables!@#")<br/>2. Click "Save" or "Create" button | The system either accepts the name (if allowed) or displays validation error. Check system behavior based on business rules | Admin user is logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0207 | Create category with very long name | 1. On the Create Category page, enter category name exceeding maximum length (e.g., 200+ characters)<br/>2. Click "Save" or "Create" button | The system displays an error message such as "Category name is too long" or "Maximum length exceeded" and does not create the category | Admin user is logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0208 | Cancel category creation | 1. On the Create Category page, enter some data in the form<br/>2. Click "Cancel" button | The system discards the entered data and redirects the user back to the categories list page without creating the category | Admin user is logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Status: | |
| TC0209 | Create category without Admin role | 1. Login as non-Admin user (e.g., Supplier, Consignee)<br/>2. Try to navigate to Create Category page or access the API endpoint | The system denies access and displays an error message such as "Access denied" or "Unauthorized" (403 Forbidden). User cannot create category | Non-Admin user is logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0210 | Create category with minimum valid name length | 1. On the Create Category page, enter category name with minimum required length (e.g., 1-2 characters if applicable)<br/>2. Click "Save" or "Create" button | The system successfully creates the category if minimum length is met, or displays validation error if minimum length is not met | Admin user is logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |

### DATA TEST:
- **Valid category name:** `Fruits`, `Vegetables`, `Grains`
- **Duplicate category name:** Use existing category name from database
- **Very long name:** `A` repeated 200+ times
- **Special characters:** `Fruits & Vegetables!@#`
- **Empty name:** (leave blank)

---

## Function 3: Create Product

### Test Case Details

| Test Case ID | Test Case Description | Test Case Procedure | Expected Results | Pre-conditions | Round 1 | Round 2 | Round 3 | Note |
|--------------|----------------------|---------------------|------------------|----------------|---------|---------|---------|------|
| TC0301 | Navigate to the Create Product page | 1. Login as Admin<br/>2. Navigate to Products section<br/>3. Click "Add New Product" or "Create Product" button | The user is directed to the Create Product page and a product form appears | Admin user is logged in, at least one category exists | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0302 | UI display of product form fields | 1. Navigate to Create Product page<br/>2. Verify all form fields are displayed | The product form displays the following fields:<br/>- Product Name field<br/>- Description field<br/>- Category dropdown/select<br/>- Image upload field<br/>- "Save" or "Create" button<br/>- "Cancel" button | Admin user is logged in, categories exist | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0303 | Create product with valid data | 1. On the Create Product page, fill in the fields:<br/>- Product Name: "Apple"<br/>- Description: "Fresh red apples"<br/>- Category: Select an existing category<br/>- Image: Upload a valid image file<br/>2. Click "Save" or "Create" button | The system successfully creates the product and displays a success message. The user is redirected to the products list page. The new product appears in the list with status "Active" | Admin user is logged in, category exists | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0304 | Validate product name is required | 1. On the Create Product page, leave product name field empty<br/>2. Fill other required fields<br/>3. Click "Save" or "Create" button | The system displays an error message such as "Product name is required" or "Name cannot be empty" under the Product Name field. Save button may be disabled | Admin user is logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0305 | Validate category is required | 1. On the Create Product page, fill product name and description<br/>2. Do not select a category<br/>3. Click "Save" or "Create" button | The system displays an error message such as "Category is required" or "Please select a category" and does not create the product | Admin user is logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0306 | Create product with non-existent category | 1. On the Create Product page, fill product name and description<br/>2. Select or enter a category ID that does not exist<br/>3. Click "Save" or "Create" button | The system displays an error message such as "Category not found" or "Invalid category" (422 Unprocessable Entity) and does not create the product | Admin user is logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0307 | Validate image file format | 1. On the Create Product page, fill all required fields<br/>2. Upload an invalid image file (e.g., .txt, .pdf, .doc)<br/>3. Click "Save" or "Create" button | The system displays an error message such as "Invalid file format" or "Only image files are allowed" and does not create the product | Admin user is logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0308 | Create product without image (if image is optional) | 1. On the Create Product page, fill product name, description, and select category<br/>2. Do not upload an image<br/>3. Click "Save" or "Create" button | The system successfully creates the product without image if image is optional, or displays error if image is required | Admin user is logged in, category exists | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0309 | Validate image file size | 1. On the Create Product page, fill all required fields<br/>2. Upload an image file exceeding maximum size limit (e.g., 10MB+ if limit is 5MB)<br/>3. Click "Save" or "Create" button | The system displays an error message such as "File size is too large" or "Maximum file size exceeded" and does not create the product | Admin user is logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0310 | Cancel product creation | 1. On the Create Product page, enter some data in the form<br/>2. Click "Cancel" button | The system discards the entered data and redirects the user back to the products list page without creating the product | Admin user is logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |

### DATA TEST:
- **Valid product data:**
  - Product Name: `Apple`
  - Description: `Fresh red apples from local farm`
  - Category: Select existing category (e.g., "Fruits")
  - Image: Valid image file (jpg, png, webp)
- **Invalid category ID:** `999999` (non-existent)
- **Invalid image formats:** `.txt`, `.pdf`, `.doc`
- **Large image file:** Image file > 5MB

---

## Function 4: Create Harvest Schedule

### Test Case Details

| Test Case ID | Test Case Description | Test Case Procedure | Expected Results | Pre-conditions | Round 1 | Round 2 | Round 3 | Note |
|--------------|----------------------|---------------------|------------------|----------------|---------|---------|---------|------|
| TC0401 | Navigate to the Create Harvest Schedule page | 1. Login as Supplier<br/>2. Navigate to Harvest Schedules section<br/>3. Click "Create Harvest Schedule" or "Add New" button | The user is directed to the Create Harvest Schedule page and a harvest schedule form appears | Supplier user is logged in, supplier record exists | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0402 | UI display of harvest schedule form fields | 1. Navigate to Create Harvest Schedule page<br/>2. Verify all form fields are displayed | The harvest schedule form displays the following fields:<br/>- Description field<br/>- Harvest Date field<br/>- Address field<br/>- Harvest Ticket section (Ticket Number, Ticket URL)<br/>- Harvest Details section (Product, Unit Price, Quantity, Unit)<br/>- "Save" or "Create" button<br/>- "Cancel" button | Supplier user is logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0403 | Create harvest schedule with valid data | 1. On the Create Harvest Schedule page, fill in the fields:<br/>- Description: "Harvest batch for March 2025"<br/>- Harvest Date: Select future date<br/>- Address: "123 Farm Road, District 1"<br/>- Ticket Number: "HT-001"<br/>- Ticket URL: "https://example.com/ticket"<br/>- Add harvest details: Select product, enter unit price, quantity, unit<br/>2. Click "Save" or "Create" button | The system successfully creates the harvest schedule with status "PENDING". Harvest ticket and harvest details are created. User is redirected to harvest schedules list page. Success message is displayed | Supplier user is logged in, supplier record exists, products exist | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0404 | Validate description is required | 1. On the Create Harvest Schedule page, leave description field empty<br/>2. Fill other required fields<br/>3. Click "Save" or "Create" button | The system displays an error message such as "Description is required" or "Description cannot be empty" under the Description field. Save button may be disabled | Supplier user is logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0405 | Validate harvest date is required | 1. On the Create Harvest Schedule page, fill description and address<br/>2. Do not select harvest date<br/>3. Click "Save" or "Create" button | The system displays an error message such as "Harvest date is required" or "Please select a harvest date" and does not create the harvest schedule | Supplier user is logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0406 | Validate address is required | 1. On the Create Harvest Schedule page, fill description and harvest date<br/>2. Leave address field empty<br/>3. Click "Save" or "Create" button | The system displays an error message such as "Address is required" or "Address cannot be empty" and does not create the harvest schedule | Supplier user is logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0407 | Validate at least one harvest detail is required | 1. On the Create Harvest Schedule page, fill description, harvest date, address, and ticket info<br/>2. Do not add any harvest details<br/>3. Click "Save" or "Create" button | The system displays an error message such as "At least one harvest detail is required" or "Please add at least one product" and does not create the harvest schedule | Supplier user is logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0408 | Validate harvest detail product is required | 1. On the Create Harvest Schedule page, fill all required fields<br/>2. Add harvest detail but do not select a product<br/>3. Click "Save" or "Create" button | The system displays an error message such as "Product is required" for the harvest detail and does not create the harvest schedule | Supplier user is logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0409 | Validate harvest detail quantity is positive | 1. On the Create Harvest Schedule page, fill all required fields<br/>2. Add harvest detail with quantity = 0 or negative number<br/>3. Click "Save" or "Create" button | The system displays an error message such as "Quantity must be greater than 0" and does not create the harvest schedule | Supplier user is logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0410 | Create harvest schedule with non-existent product | 1. On the Create Harvest Schedule page, fill all required fields<br/>2. Add harvest detail with product ID that does not exist<br/>3. Click "Save" or "Create" button | The system displays an error message such as "Product not found" (422 Unprocessable Entity) and does not create the harvest schedule | Supplier user is logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0411 | Create harvest schedule without supplier record | 1. Login as user who is not a Supplier or Supplier record does not exist<br/>2. Try to create harvest schedule | The system displays an error message such as "Supplier not found" or "You are not authorized" (422 Unprocessable Entity) and does not create the harvest schedule | User is logged in but supplier record does not exist | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0412 | Verify harvest ticket quantity calculation | 1. On the Create Harvest Schedule page, fill all required fields<br/>2. Add multiple harvest details with different quantities (e.g., 10kg, 20kg, 15kg)<br/>3. Click "Save" or "Create" button | The system creates harvest schedule and harvest ticket. The ticket quantity is automatically calculated as the sum of all harvest detail quantities (e.g., 45kg) | Supplier user is logged in, products exist | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |

### DATA TEST:
- **Valid harvest schedule data:**
  - Description: `Harvest batch for March 2025`
  - Harvest Date: `2025-03-15`
  - Address: `123 Farm Road, District 1, Ho Chi Minh City`
  - Ticket Number: `HT-001`
  - Ticket URL: `https://example.com/ticket/HT-001`
  - Harvest Details:
    - Product: Select existing product (e.g., "Apple")
    - Unit Price: `50000`
    - Quantity: `100`
    - Unit: `kg`
- **Invalid product ID:** `999999` (non-existent)
- **Invalid quantity:** `0`, `-10`
- **Past harvest date:** `2020-01-01`

---

## Function 5: Update Harvest Schedule Status (Approve/Reject/Cancel)

### Test Case Details

| Test Case ID | Test Case Description | Test Case Procedure | Expected Results | Pre-conditions | Round 1 | Round 2 | Round 3 | Note |
|--------------|----------------------|---------------------|------------------|----------------|---------|---------|---------|------|
| TC0501 | Navigate to harvest schedule detail page | 1. Login as Admin<br/>2. Navigate to Harvest Schedules list<br/>3. Click on a harvest schedule with status "PENDING" | The user is directed to the harvest schedule detail page showing all schedule information and action buttons (Approve, Reject, Cancel) | Admin user is logged in, harvest schedule with status PENDING exists | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0502 | Approve harvest schedule with PENDING status | 1. Navigate to harvest schedule detail page with status "PENDING"<br/>2. Click "Approve" button<br/>3. Confirm the action (if confirmation dialog appears) | The system updates harvest schedule status to "APPROVED". Success message is displayed. Notification is sent to the supplier. User can see updated status on the detail page | Admin user is logged in, harvest schedule with status PENDING exists | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0503 | Reject harvest schedule with PENDING status | 1. Navigate to harvest schedule detail page with status "PENDING"<br/>2. Click "Reject" button<br/>3. Enter rejection reason in the reason field<br/>4. Confirm the action | The system updates harvest schedule status to "REJECTED" with the provided reason. Success message is displayed. Notification is sent to the supplier with the reason. User can see updated status | Admin user is logged in, harvest schedule with status PENDING exists | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0504 | Reject harvest schedule without reason | 1. Navigate to harvest schedule detail page with status "PENDING"<br/>2. Click "Reject" button<br/>3. Do not enter rejection reason<br/>4. Try to confirm the action | The system displays an error message such as "Reason is required for rejection" and does not update the status. The harvest schedule remains in PENDING status | Admin user is logged in, harvest schedule with status PENDING exists | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0505 | Approve harvest schedule with non-PENDING status | 1. Navigate to harvest schedule detail page with status "APPROVED" or "PROCESSING"<br/>2. Try to click "Approve" button (if visible) or send API request | The system displays an error message such as "Cannot approve harvest schedule in current status" or "Invalid status transition" (400 Bad Request). Status remains unchanged | Admin user is logged in, harvest schedule with status APPROVED or PROCESSING exists | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0506 | Supplier cancels own harvest schedule with PENDING status | 1. Login as Supplier<br/>2. Navigate to own harvest schedule with status "PENDING"<br/>3. Click "Cancel" button<br/>4. Confirm the action | The system updates harvest schedule status to "CANCELED". Success message is displayed. Notification is sent to the supplier. User can see updated status | Supplier user is logged in, owns harvest schedule with status PENDING | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0507 | Supplier cancels harvest schedule with APPROVED status | 1. Login as Supplier<br/>2. Navigate to own harvest schedule with status "APPROVED"<br/>3. Click "Cancel" button<br/>4. Confirm the action | The system updates harvest schedule status to "CANCELED". Success message is displayed. Notification is sent. Status transition from APPROVED to CANCELED is allowed | Supplier user is logged in, owns harvest schedule with status APPROVED | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0508 | Supplier cancels harvest schedule with COMPLETED status | 1. Login as Supplier<br/>2. Navigate to own harvest schedule with status "COMPLETED"<br/>3. Try to cancel the schedule | The system displays an error message such as "Cannot cancel harvest schedule in current status" or "Invalid status transition" (400 Bad Request). Status remains COMPLETED | Supplier user is logged in, owns harvest schedule with status COMPLETED | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0509 | Non-Admin user tries to approve harvest schedule | 1. Login as Supplier or Consignee<br/>2. Navigate to harvest schedule detail page<br/>3. Try to approve the schedule (via UI or API) | The system denies access and displays an error message such as "Access denied" or "Unauthorized" (403 Forbidden). Status is not changed | Non-Admin user is logged in, harvest schedule exists | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0510 | Verify notification is sent after status change | 1. Admin approves or rejects a harvest schedule<br/>2. Login as the supplier who owns the schedule<br/>3. Check notifications | The supplier receives a notification about the status change. Notification contains appropriate message based on the action (approved/rejected/canceled) | Admin user is logged in, harvest schedule exists, supplier user exists | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |

### DATA TEST:
- **Valid rejection reason:** `Product quality does not meet requirements`
- **Empty rejection reason:** (leave blank)
- **Harvest schedule statuses to test:**
  - PENDING → APPROVED
  - PENDING → REJECTED
  - PENDING → CANCELED
  - APPROVED → CANCELED
  - APPROVED → PROCESSING
  - COMPLETED → (cannot change)

---

## Function 6: Create Order Schedule

### Test Case Details

| Test Case ID | Test Case Description | Test Case Procedure | Expected Results | Pre-conditions | Round 1 | Round 2 | Round 3 | Note |
|--------------|----------------------|---------------------|------------------|----------------|---------|---------|---------|------|
| TC0601 | Navigate to the Create Order Schedule page | 1. Login as Consignee<br/>2. Navigate to Order Schedules section<br/>3. Click "Create Order Schedule" or "Add New" button | The user is directed to the Create Order Schedule page and an order schedule form appears | Consignee user is logged in, consignee record exists | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0602 | UI display of order schedule form fields | 1. Navigate to Create Order Schedule page<br/>2. Verify all form fields are displayed | The order schedule form displays the following fields:<br/>- Description field<br/>- Delivery Date field<br/>- Address field<br/>- Order section (Order Number, Order URL)<br/>- Order Details section (Product, Unit Price, Quantity, Unit)<br/>- "Save" or "Create" button<br/>- "Cancel" button | Consignee user is logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0603 | Create order schedule with valid data | 1. On the Create Order Schedule page, fill in the fields:<br/>- Description: "Order for March 2025"<br/>- Delivery Date: Select future date<br/>- Address: "456 Business Street, District 2"<br/>- Order Number: "ORD-001"<br/>- Order URL: "https://example.com/order"<br/>- Add order details: Select product, enter unit price, quantity, unit<br/>2. Click "Save" or "Create" button | The system successfully creates the order schedule with status "PENDING". Order and order details are created. User is redirected to order schedules list page. Success message is displayed | Consignee user is logged in, consignee record exists, products exist | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0604 | Validate description is required | 1. On the Create Order Schedule page, leave description field empty<br/>2. Fill other required fields<br/>3. Click "Save" or "Create" button | The system displays an error message such as "Description is required" or "Description cannot be empty" under the Description field. Save button may be disabled | Consignee user is logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0605 | Validate delivery date is required | 1. On the Create Order Schedule page, fill description and address<br/>2. Do not select delivery date<br/>3. Click "Save" or "Create" button | The system displays an error message such as "Delivery date is required" or "Please select a delivery date" and does not create the order schedule | Consignee user is logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0606 | Validate at least one order detail is required | 1. On the Create Order Schedule page, fill description, delivery date, address, and order info<br/>2. Do not add any order details<br/>3. Click "Save" or "Create" button | The system displays an error message such as "At least one order detail is required" or "Please add at least one product" and does not create the order schedule | Consignee user is logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0607 | Validate order detail quantity is positive | 1. On the Create Order Schedule page, fill all required fields<br/>2. Add order detail with quantity = 0 or negative number<br/>3. Click "Save" or "Create" button | The system displays an error message such as "Quantity must be greater than 0" and does not create the order schedule | Consignee user is logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0608 | Create order schedule with non-existent product | 1. On the Create Order Schedule page, fill all required fields<br/>2. Add order detail with product ID that does not exist<br/>3. Click "Save" or "Create" button | The system displays an error message such as "Product not found" (422 Unprocessable Entity) and does not create the order schedule | Consignee user is logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0609 | Verify order quantity calculation | 1. On the Create Order Schedule page, fill all required fields<br/>2. Add multiple order details with different quantities (e.g., 10kg, 20kg, 15kg)<br/>3. Click "Save" or "Create" button | The system creates order schedule and order. The order quantity is automatically calculated as the sum of all order detail quantities (e.g., 45kg) | Consignee user is logged in, products exist | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0610 | Create order schedule without consignee record | 1. Login as user who is not a Consignee or Consignee record does not exist<br/>2. Try to create order schedule | The system displays an error message such as "Consignee not found" or "You are not authorized" (422 Unprocessable Entity) and does not create the order schedule | User is logged in but consignee record does not exist | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |

### DATA TEST:
- **Valid order schedule data:**
  - Description: `Order for March 2025`
  - Delivery Date: `2025-03-20`
  - Address: `456 Business Street, District 2, Ho Chi Minh City`
  - Order Number: `ORD-001`
  - Order URL: `https://example.com/order/ORD-001`
  - Order Details:
    - Product: Select existing product (e.g., "Apple")
    - Unit Price: `60000`
    - Quantity: `50`
    - Unit: `kg`
- **Invalid product ID:** `999999` (non-existent)
- **Invalid quantity:** `0`, `-10`
- **Past delivery date:** `2020-01-01`

---

## Function 7: Create Payment

### Test Case Details

| Test Case ID | Test Case Description | Test Case Procedure | Expected Results | Pre-conditions | Round 1 | Round 2 | Round 3 | Note |
|--------------|----------------------|---------------------|------------------|----------------|---------|---------|---------|------|
| TC0701 | Navigate to the Create Payment page | 1. Login as any user<br/>2. Navigate to Payments section<br/>3. Click "Create Payment" or "New Payment" button | The user is directed to the Create Payment page and a payment form appears | User is logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0702 | UI display of payment form fields | 1. Navigate to Create Payment page<br/>2. Verify all form fields are displayed | The payment form displays the following fields:<br/>- Amount field<br/>- Payment Method dropdown (Transfer/Cash)<br/>- "Create" or "Submit" button<br/>- "Cancel" button | User is logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0703 | Create payment with Transfer method | 1. On the Create Payment page, enter amount (e.g., 1000000)<br/>2. Select "Transfer" as payment method<br/>3. Click "Create" or "Submit" button | The system creates payment with status "PENDING". Payment code is generated. PayOS payment request is created. Checkout URL and QR code are returned. User can see payment details with QR code/checkout URL | User is logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0704 | Create payment with Cash method | 1. On the Create Payment page, enter amount (e.g., 1000000)<br/>2. Select "Cash" as payment method<br/>3. Click "Create" or "Submit" button | The system creates payment with status "PENDING". Payment code is generated. Payment details are displayed with payment code. No PayOS integration is used | User is logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0705 | Validate amount is required | 1. On the Create Payment page, leave amount field empty<br/>2. Select payment method<br/>3. Click "Create" or "Submit" button | The system displays an error message such as "Amount is required" or "Amount cannot be empty" under the Amount field. Create button may be disabled | User is logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0706 | Validate amount is positive | 1. On the Create Payment page, enter amount = 0 or negative number<br/>2. Select payment method<br/>3. Click "Create" or "Submit" button | The system displays an error message such as "Amount must be greater than 0" and does not create the payment | User is logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0707 | Validate payment method is required | 1. On the Create Payment page, enter valid amount<br/>2. Do not select payment method<br/>3. Click "Create" or "Submit" button | The system displays an error message such as "Payment method is required" or "Please select a payment method" and does not create the payment | User is logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0708 | Verify payment code is generated | 1. Create a payment with valid data<br/>2. Check the returned payment object | The system returns payment object with a unique payment code. Payment code is displayed to the user | User is logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0709 | Verify PayOS checkout URL for Transfer payment | 1. Create payment with Transfer method<br/>2. Check the returned payment object | The system returns payment object with checkoutUrl and qrCode fields populated. User can use these to complete payment on PayOS | User is logged in, PayOS is configured | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0710 | Verify no PayOS fields for Cash payment | 1. Create payment with Cash method<br/>2. Check the returned payment object | The system returns payment object without checkoutUrl and qrCode fields. Only payment code is provided | User is logged in | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |

### DATA TEST:
- **Valid payment data:**
  - Amount: `1000000` (1,000,000 VND)
  - Payment Method: `Transfer` or `Cash`
- **Invalid amounts:** `0`, `-1000`
- **Large amount:** `999999999` (test maximum limit if applicable)

---

## Function 8: Create Delivery

### Test Case Details

| Test Case ID | Test Case Description | Test Case Procedure | Expected Results | Pre-conditions | Round 1 | Round 2 | Round 3 | Note |
|--------------|----------------------|---------------------|------------------|----------------|---------|---------|---------|------|
| TC0801 | Navigate to the Create Delivery page | 1. Login as Warehouse Staff or Admin<br/>2. Navigate to Deliveries section<br/>3. Click "Create Delivery" or "Schedule Delivery" button | The user is directed to the Create Delivery page and a delivery form appears | User is logged in, has Staff/Admin role | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0802 | UI display of delivery form fields | 1. Navigate to Create Delivery page<br/>2. Verify all form fields are displayed | The delivery form displays the following fields:<br/>- Start Address field<br/>- End Address field<br/>- Start Time field<br/>- Truck dropdown/select<br/>- Delivery Staff dropdown/select<br/>- Harvest Phase or Order Phase selection<br/>- "Create" or "Save" button<br/>- "Cancel" button | User is logged in, has Staff/Admin role | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0803 | Create delivery for harvest phase with valid data | 1. On the Create Delivery page, fill in the fields:<br/>- Start Address: "Warehouse A, District 1"<br/>- End Address: "Farm Location, District 3"<br/>- Start Time: Select future date/time<br/>- Truck: Select available truck<br/>- Delivery Staff: Select delivery staff<br/>- Harvest Phase: Select harvest phase<br/>2. Click "Create" or "Save" button | The system creates delivery with status "SCHEDULED". Geocoding is performed for addresses. Harvest phase status is updated to "PREPARING". Truck status is updated to "IN_USE". Success message is displayed | User is logged in, has Staff/Admin role, harvest phase exists, truck and delivery staff exist | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0804 | Create delivery for order phase with valid data | 1. On the Create Delivery page, fill in the fields:<br/>- Start Address: "Warehouse A, District 1"<br/>- End Address: "Customer Location, District 5"<br/>- Start Time: Select future date/time<br/>- Truck: Select available truck<br/>- Delivery Staff: Select delivery staff<br/>- Order Phase: Select order phase<br/>2. Click "Create" or "Save" button | The system creates delivery with status "SCHEDULED". Geocoding is performed for addresses. Order phase status is updated to "PREPARING". Truck status is updated to "IN_USE". Success message is displayed | User is logged in, has Staff/Admin role, order phase exists, truck and delivery staff exist | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0805 | Validate start address is required | 1. On the Create Delivery page, leave start address field empty<br/>2. Fill other required fields<br/>3. Click "Create" or "Save" button | The system displays an error message such as "Start address is required" or "Start address cannot be empty" and does not create the delivery | User is logged in, has Staff/Admin role | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0806 | Validate end address is required | 1. On the Create Delivery page, fill start address<br/>2. Leave end address field empty<br/>3. Click "Create" or "Save" button | The system displays an error message such as "End address is required" or "End address cannot be empty" and does not create the delivery | User is logged in, has Staff/Admin role | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0807 | Validate truck is required | 1. On the Create Delivery page, fill addresses and start time<br/>2. Do not select a truck<br/>3. Click "Create" or "Save" button | The system displays an error message such as "Truck is required" or "Please select a truck" and does not create the delivery | User is logged in, has Staff/Admin role | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0808 | Validate delivery staff is required | 1. On the Create Delivery page, fill addresses, start time, and truck<br/>2. Do not select delivery staff<br/>3. Click "Create" or "Save" button | The system displays an error message such as "Delivery staff is required" or "Please select a delivery staff" and does not create the delivery | User is logged in, has Staff/Admin role | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0809 | Create delivery with non-existent truck | 1. On the Create Delivery page, fill all required fields<br/>2. Select or enter truck ID that does not exist<br/>3. Click "Create" or "Save" button | The system displays an error message such as "Truck not found" (422 Unprocessable Entity) and does not create the delivery | User is logged in, has Staff/Admin role | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0810 | Create delivery with non-existent delivery staff | 1. On the Create Delivery page, fill all required fields<br/>2. Select or enter delivery staff ID that does not exist<br/>3. Click "Create" or "Save" button | The system displays an error message such as "Delivery staff not found" (422 Unprocessable Entity) and does not create the delivery | User is logged in, has Staff/Admin role | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0811 | Create delivery with unavailable truck | 1. On the Create Delivery page, fill all required fields<br/>2. Select truck with status "IN_USE" or "MAINTENANCE"<br/>3. Click "Create" or "Save" button | The system either allows the delivery (if business rules allow) or displays an error message such as "Truck is not available" and does not create the delivery | User is logged in, has Staff/Admin role, truck with unavailable status exists | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0812 | Verify geocoding is performed for addresses | 1. Create delivery with valid addresses<br/>2. Check the created delivery object | The system performs geocoding and stores latitude/longitude coordinates for both start and end addresses. Delivery object contains startLat, startLng, endLat, endLng fields | User is logged in, has Staff/Admin role, valid addresses provided | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |

### DATA TEST:
- **Valid delivery data:**
  - Start Address: `Warehouse A, 123 Storage Street, District 1, Ho Chi Minh City`
  - End Address: `Farm Location, 456 Farm Road, District 3, Ho Chi Minh City`
  - Start Time: `2025-03-20 08:00:00`
  - Truck: Select available truck from list
  - Delivery Staff: Select delivery staff from list
  - Harvest Phase: Select harvest phase (or Order Phase)
- **Invalid truck ID:** `999999` (non-existent)
- **Invalid delivery staff ID:** `999999` (non-existent)
- **Unavailable truck:** Truck with status IN_USE

---

## Function 9: Update Delivery Status

### Test Case Details

| Test Case ID | Test Case Description | Test Case Procedure | Expected Results | Pre-conditions | Round 1 | Round 2 | Round 3 | Note |
|--------------|----------------------|---------------------|------------------|----------------|---------|---------|---------|------|
| TC0901 | Navigate to delivery detail page | 1. Login as Delivery Staff or Admin<br/>2. Navigate to Deliveries list<br/>3. Click on a delivery with status "SCHEDULED" | The user is directed to the delivery detail page showing all delivery information and status update buttons | User is logged in, delivery with status SCHEDULED exists | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0902 | Update delivery status from SCHEDULED to DELIVERING | 1. Navigate to delivery detail page with status "SCHEDULED"<br/>2. Click "Start Delivery" or update status to "DELIVERING"<br/>3. Confirm the action | The system updates delivery status to "DELIVERING". If linked to harvest phase, phase status is updated to "DELIVERING". If linked to order phase, phase status is updated to "DELIVERING". Success message is displayed | User is logged in, delivery with status SCHEDULED exists | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0903 | Update delivery status from DELIVERING to DELIVERED | 1. Navigate to delivery detail page with status "DELIVERING"<br/>2. Click "Mark as Delivered" or update status to "DELIVERED"<br/>3. Confirm the action | The system updates delivery status to "DELIVERED". If linked to harvest phase, phase status is updated to "DELIVERED". If linked to order phase, phase status is updated to "DELIVERED". Success message is displayed | User is logged in, delivery with status DELIVERING exists | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0904 | Update delivery status from DELIVERED to RETURNING | 1. Navigate to delivery detail page with status "DELIVERED"<br/>2. Click "Start Return" or update status to "RETURNING"<br/>3. Confirm the action | The system updates delivery status to "RETURNING". Success message is displayed. Delivery staff is returning to warehouse | User is logged in, delivery with status DELIVERED exists | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0905 | Update delivery status from RETURNING to COMPLETED | 1. Navigate to delivery detail page with status "RETURNING"<br/>2. Click "Complete Delivery" or update status to "COMPLETED"<br/>3. Confirm the action | The system updates delivery status to "COMPLETED". End time is set to current time. Truck status is updated to "AVAILABLE". Success message is displayed | User is logged in, delivery with status RETURNING exists | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0906 | Cancel delivery from SCHEDULED status | 1. Navigate to delivery detail page with status "SCHEDULED"<br/>2. Click "Cancel Delivery" or update status to "CANCELED"<br/>3. Confirm the action | The system updates delivery status to "CANCELED". Truck status is updated to "AVAILABLE". Success message is displayed | User is logged in, delivery with status SCHEDULED exists | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0907 | Cancel delivery from DELIVERING status | 1. Navigate to delivery detail page with status "DELIVERING"<br/>2. Click "Cancel Delivery" or update status to "CANCELED"<br/>3. Confirm the action | The system updates delivery status to "CANCELED". Truck status is updated to "AVAILABLE". Success message is displayed | User is logged in, delivery with status DELIVERING exists | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0908 | Invalid status transition - COMPLETED to DELIVERING | 1. Navigate to delivery detail page with status "COMPLETED"<br/>2. Try to update status to "DELIVERING" | The system displays an error message such as "Cannot change status from COMPLETED to DELIVERING" or "Invalid status transition" (400 Bad Request). Status remains COMPLETED | User is logged in, delivery with status COMPLETED exists | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0909 | Invalid status transition - DELIVERED to SCHEDULED | 1. Navigate to delivery detail page with status "DELIVERED"<br/>2. Try to update status to "SCHEDULED" | The system displays an error message such as "Cannot change status from DELIVERED to SCHEDULED" or "Invalid status transition" (400 Bad Request). Status remains DELIVERED | User is logged in, delivery with status DELIVERED exists | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0910 | Verify truck status is updated when delivery is completed | 1. Create delivery with a truck<br/>2. Update delivery status to COMPLETED<br/>3. Check truck status | The truck status is automatically updated to "AVAILABLE" when delivery is completed. Truck can be used for other deliveries | User is logged in, delivery exists, truck exists | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC0911 | Verify phase status synchronization with delivery status | 1. Create delivery linked to harvest phase or order phase<br/>2. Update delivery status through the flow (SCHEDULED → DELIVERING → DELIVERED → COMPLETED)<br/>3. Check phase status at each step | The phase status is automatically synchronized with delivery status:<br/>- Delivery SCHEDULED → Phase PREPARING<br/>- Delivery DELIVERING → Phase DELIVERING<br/>- Delivery DELIVERED → Phase DELIVERED<br/>- Delivery COMPLETED → Phase COMPLETED | User is logged in, delivery with linked phase exists | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |

### DATA TEST:
- **Valid status transitions:**
  - SCHEDULED → DELIVERING
  - SCHEDULED → CANCELED
  - DELIVERING → DELIVERED
  - DELIVERING → CANCELED
  - DELIVERED → RETURNING
  - DELIVERED → CANCELED
  - RETURNING → COMPLETED
  - RETURNING → CANCELED
- **Invalid status transitions:**
  - COMPLETED → any status
  - CANCELED → any status
  - DELIVERED → SCHEDULED
  - COMPLETED → DELIVERING

---

## Function 10: Create Import Ticket

### Test Case Details

| Test Case ID | Test Case Description | Test Case Procedure | Expected Results | Pre-conditions | Round 1 | Round 2 | Round 3 | Note |
|--------------|----------------------|---------------------|------------------|----------------|---------|---------|---------|------|
| TC1001 | Navigate to the Create Import Ticket page | 1. Login as Staff or Admin<br/>2. Navigate to Import Tickets section<br/>3. Click "Create Import Ticket" or "New Import Ticket" button | The user is directed to the Create Import Ticket page and an import ticket form appears | User is logged in, has Staff/Admin role | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC1002 | UI display of import ticket form fields | 1. Navigate to Create Import Ticket page<br/>2. Verify all form fields are displayed | The import ticket form displays the following fields:<br/>- Reality Quantity field<br/>- Expired At field (date)<br/>- Inbound Batch dropdown/select (optional)<br/>- Area dropdown/select (optional)<br/>- "Create" or "Save" button<br/>- "Cancel" button | User is logged in, has Staff/Admin role | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC1003 | Create import ticket with valid data and inbound batch | 1. On the Create Import Ticket page, fill in the fields:<br/>- Reality Quantity: 100<br/>- Expired At: Select future date<br/>- Inbound Batch: Select existing inbound batch<br/>- Area: Select area (optional)<br/>2. Click "Create" or "Save" button | The system creates import ticket. Batches are automatically created and split (20kg, 10kg, remainder). Percent is calculated. Success message is displayed with list of created batches | User is logged in, has Staff/Admin role, inbound batch exists | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC1004 | Create import ticket without inbound batch | 1. On the Create Import Ticket page, fill in the fields:<br/>- Reality Quantity: 50<br/>- Expired At: Select future date<br/>- Do not select inbound batch<br/>- Area: Select area (optional)<br/>2. Click "Create" or "Save" button | The system creates import ticket. Batches are automatically created and split (20kg, 10kg, remainder). Percent is calculated as realityQuantity * 100. Success message is displayed | User is logged in, has Staff/Admin role | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC1005 | Validate reality quantity is required | 1. On the Create Import Ticket page, leave reality quantity field empty<br/>2. Fill other fields<br/>3. Click "Create" or "Save" button | The system displays an error message such as "Reality quantity is required" or "Quantity cannot be empty" and does not create the import ticket | User is logged in, has Staff/Admin role | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC1006 | Validate reality quantity is positive | 1. On the Create Import Ticket page, enter reality quantity = 0 or negative number<br/>2. Click "Create" or "Save" button | The system displays an error message such as "Quantity must be greater than 0" and does not create the import ticket | User is logged in, has Staff/Admin role | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC1007 | Verify batch splitting logic - quantity >= 20kg | 1. Create import ticket with reality quantity = 45kg<br/>2. Check created batches | The system creates batches: 2 batches of 20kg each, 1 batch of 5kg (remainder). Total quantity matches reality quantity | User is logged in, has Staff/Admin role | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC1008 | Verify batch splitting logic - quantity < 20kg but >= 10kg | 1. Create import ticket with reality quantity = 15kg<br/>2. Check created batches | The system creates batches: 1 batch of 10kg, 1 batch of 5kg (remainder). Total quantity matches reality quantity | User is logged in, has Staff/Admin role | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC1009 | Verify batch splitting logic - quantity < 10kg | 1. Create import ticket with reality quantity = 7kg<br/>2. Check created batches | The system creates 1 batch of 7kg (remainder only). Total quantity matches reality quantity | User is logged in, has Staff/Admin role | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC1010 | Verify percent calculation with inbound batch | 1. Create import ticket with reality quantity = 80kg and inbound batch quantity = 100kg<br/>2. Check import ticket percent field | The system calculates percent = (80/100) * 100 = 80%. Percent field is correctly set | User is logged in, has Staff/Admin role, inbound batch with quantity 100kg exists | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC1011 | Verify percent calculation without inbound batch | 1. Create import ticket with reality quantity = 50kg without inbound batch<br/>2. Check import ticket percent field | The system calculates percent = 50 * 100 = 5000%. Percent field is correctly set | User is logged in, has Staff/Admin role | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TC1012 | Create import ticket with non-existent inbound batch | 1. On the Create Import Ticket page, select inbound batch ID that does not exist<br/>2. Fill other required fields<br/>3. Click "Create" or "Save" button | The system displays an error message such as "Inbound batch not found" (422 Unprocessable Entity) and does not create the import ticket | User is logged in, has Staff/Admin role | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |

### DATA TEST:
- **Valid import ticket data:**
  - Reality Quantity: `100` (kg)
  - Expired At: `2025-06-30`
  - Inbound Batch: Select existing inbound batch (optional)
  - Area: Select area (optional)
- **Test quantities for batch splitting:**
  - 45kg → 2x20kg + 1x5kg
  - 15kg → 1x10kg + 1x5kg
  - 7kg → 1x7kg
  - 30kg → 1x20kg + 1x10kg
- **Invalid quantity:** `0`, `-10`

---

## Notes for Test Execution

- **Test Date Format:** DD/MM/YYYY (e.g., 19/09/2025)
- **Tester Name:** Enter tester's name/initials
- **Status Values:** Passed / Failed / Blocked / Not Executed
- **Test Environment:** Ensure test database is set up with seed data
- **API Testing:** Use Postman/Insomnia for API endpoint testing
- **UI Testing:** Use browser automation tools (Selenium, Playwright) for UI testing

---

## Test Data Setup Requirements

### Required Test Data:
1. **Users:**
   - Admin user
   - Supplier user (with supplier record)
   - Consignee user (with consignee record)
   - Staff user
   - Delivery Staff user
   - Manager user

2. **Products & Categories:**
   - At least 3 categories
   - At least 5 products (linked to categories)

3. **Warehouses & Areas:**
   - At least 2 warehouses
   - At least 3 areas (linked to warehouses)

4. **Trucks:**
   - At least 2 trucks with status AVAILABLE

5. **Delivery Staffs:**
   - At least 2 delivery staffs

6. **Harvest Schedules:**
   - At least 3 harvest schedules with different statuses (PENDING, APPROVED, PROCESSING)

7. **Order Schedules:**
   - At least 3 order schedules with different statuses (PENDING, APPROVED, PROCESSING)

---

## Template for Additional Functions

To create test cases for other functions, use the following template:

### Function X: [Function Name]

| Test Case ID | Test Case Description | Test Case Procedure | Expected Results | Pre-conditions | Round 1 | Round 2 | Round 3 | Note |
|--------------|----------------------|---------------------|------------------|----------------|---------|---------|---------|------|
| TCX001 | Navigate to the [Function] page | [Steps] | [Expected result] | [Pre-conditions] | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TCX002 | UI display of [Function] form fields | [Steps] | [Expected result] | [Pre-conditions] | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| TCX003 | [Function] with valid data | [Steps] | [Expected result] | [Pre-conditions] | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | Test date:<br/>Tester:<br/>Status: | |
| ... | ... | ... | ... | ... | ... | ... | ... | ... |

### DATA TEST:
- **Valid data:** [Example data]
- **Invalid data:** [Example invalid data]

