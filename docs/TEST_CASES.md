# FASCM System - Comprehensive Test Case Documentation

**Version:** 1.0.0  
**Last Updated:** December 12, 2024  
**Document Purpose:** Comprehensive test case documentation for QA testing across all FASCM system features

---

## Table of Contents

1. [Authentication Test Cases](#1-authentication-test-cases)
2. [User Management Test Cases](#2-user-management-test-cases)
3. [IoT Device Management Test Cases](#3-iot-device-management-test-cases)
4. [Supplier Dashboard Test Cases](#4-supplier-dashboard-test-cases)
5. [Consignee Dashboard Test Cases](#5-consignee-dashboard-test-cases)
6. [Fruit Quality Detection System Test Cases](#6-fruit-quality-detection-system-test-cases)
7. [File Upload Test Cases](#7-file-upload-test-cases)
8. [Order Management Test Cases](#8-order-management-test-cases)
9. [Delivery Management Test Cases](#9-delivery-management-test-cases)

---

## 1. Authentication Test Cases

**Feature Scope:** Email/password login, JWT token management, session handling, token refresh, password reset, Google OAuth integration, and user account security.

| Test Case ID | Test Case Description | Test Case Procedure | Expected Results | Pre-conditions | Round 1 | Test date | Tester | Round 2 | Test date | Tester | Round 3 | Test date | Tester | Note |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| TC_AUTH_001 | Successful login with valid credentials | 1. Send POST to /api/v1/auth/email/login 2. Include valid email and password 3. Verify response | Status 200, JWT token returned, refresh token present, token expires in 3600s, user object with role | User exists in database with active status | | | | | | | | | | |
| TC_AUTH_002 | Login with invalid email | 1. Send POST to /api/v1/auth/email/login 2. Include non-existent email 3. Verify error response | Status 401, error message "Invalid credentials", no token returned | None | | | | | | | | | | |
| TC_AUTH_003 | Login with incorrect password | 1. Send POST to /api/v1/auth/email/login 2. Include valid email but wrong password 3. Verify error response | Status 401, error message "Invalid credentials", no token returned | User exists in database | | | | | | | | | | |
| TC_AUTH_004 | Login with inactive user account | 1. Send POST to /api/v1/auth/email/login 2. Use credentials of inactive user 3. Verify rejection | Status 401, error message "Account is inactive", no token returned | User exists but status is inactive | | | | | | | | | | |
| TC_AUTH_005 | Login with missing required fields | 1. Send POST to /api/v1/auth/email/login 2. Omit email or password field 3. Verify validation error | Status 400, validation error message, fields "email" and "password" are required | None | | | | | | | | | | |
| TC_AUTH_006 | Login with SQL injection attempt | 1. Send POST to /api/v1/auth/email/login 2. Include SQL injection in email field (e.g., "admin'--") 3. Verify rejection | Status 400 or 401, no SQL error exposed, no unauthorized access | Database has users | | | | | | | | | | |
| TC_AUTH_007 | Token refresh with valid refresh token | 1. Login to obtain refresh token 2. Send POST to /api/v1/auth/refresh with valid refresh token 3. Verify new token | Status 200, new JWT token returned, new expiry time set | Valid refresh token from previous login | | | | | | | | | | |
| TC_AUTH_008 | Token refresh with expired refresh token | 1. Obtain refresh token 2. Wait for token expiration 3. Send POST to /api/v1/auth/refresh 4. Verify rejection | Status 401, error message "Token expired", user must re-login | Expired refresh token | | | | | | | | | | |
| TC_AUTH_009 | Token refresh with invalid token | 1. Send POST to /api/v1/auth/refresh 2. Include malformed or invalid token 3. Verify rejection | Status 401, error message "Invalid token", no new token issued | None | | | | | | | | | | |
| TC_AUTH_010 | Logout with valid JWT token | 1. Login to obtain JWT token 2. Send POST to /api/v1/auth/logout with Authorization header 3. Verify session termination | Status 204, session removed from database, subsequent requests with same token fail | Valid active session | | | | | | | | | | |
| TC_AUTH_011 | Logout without authentication | 1. Send POST to /api/v1/auth/logout without Authorization header 2. Verify rejection | Status 401, error message "Unauthorized" | None | | | | | | | | | | |
| TC_AUTH_012 | Get current user profile (me endpoint) | 1. Login to obtain JWT token 2. Send GET to /api/v1/auth/me with Authorization header 3. Verify user data | Status 200, user object returned with email, role, id, profile data | Valid JWT token | | | | | | | | | | |
| TC_AUTH_013 | Access protected endpoint without token | 1. Send GET to /api/v1/auth/me without Authorization header 2. Verify rejection | Status 401, error message "Unauthorized", no user data returned | None | | | | | | | | | | |
| TC_AUTH_014 | Access protected endpoint with expired token | 1. Obtain JWT token 2. Wait for expiration 3. Send GET to /api/v1/auth/me 4. Verify rejection | Status 401, error message "Token expired" | Expired JWT token | | | | | | | | | | |
| TC_AUTH_015 | Forgot password with valid email | 1. Send POST to /api/v1/auth/forgot/password 2. Include registered email 3. Verify email sent | Status 204, password reset email sent to user, hash generated | User exists with valid email | | | | | | | | | | |
| TC_AUTH_016 | Forgot password with non-existent email | 1. Send POST to /api/v1/auth/forgot/password 2. Include unregistered email 3. Verify response | Status 204 (security: don't reveal user existence), no email sent | None | | | | | | | | | | |
| TC_AUTH_017 | Reset password with valid hash | 1. Request password reset 2. Send POST to /api/v1/auth/reset/password with valid hash and new password 3. Verify success | Status 204, password updated in database, user can login with new password | Valid reset hash from forgot password | | | | | | | | | | |
| TC_AUTH_018 | Reset password with expired hash | 1. Obtain reset hash 2. Wait for expiration 3. Send POST to /api/v1/auth/reset/password 4. Verify rejection | Status 400, error message "Reset link expired", password not changed | Expired reset hash | | | | | | | | | | |
| TC_AUTH_019 | Reset password with weak password | 1. Send POST to /api/v1/auth/reset/password 2. Include password less than minimum length 3. Verify validation error | Status 400, validation error "Password must be at least 8 characters" | Valid reset hash | | | | | | | | | | |
| TC_AUTH_020 | Confirm email with valid hash | 1. Send POST to /api/v1/auth/email/confirm 2. Include valid confirmation hash 3. Verify account activation | Status 200, JWT token returned, account status set to active | User registered but not confirmed | | | | | | | | | | |
| TC_AUTH_021 | Update user profile (PATCH /me) | 1. Login with valid credentials 2. Send PATCH to /api/v1/auth/me with updated data 3. Verify changes | Status 200, user object returned with updated fields | Valid JWT token | | | | | | | | | | |
| TC_AUTH_022 | Delete user account (soft delete) | 1. Login with valid credentials 2. Send DELETE to /api/v1/auth/me 3. Verify account deactivation | Status 204, account marked as deleted, cannot login afterward | Valid JWT token | | | | | | | | | | |
| TC_AUTH_023 | Google OAuth login with valid token | 1. Send POST to /api/v1/auth/google/login 2. Include valid Google ID token 3. Verify authentication | Status 200, JWT token returned, user created or logged in, social provider set to "google" | Valid Google ID token | | | | | | | | | | |
| TC_AUTH_024 | Google OAuth login with invalid token | 1. Send POST to /api/v1/auth/google/login 2. Include invalid or malformed token 3. Verify rejection | Status 401, error message "Invalid Google token" | None | | | | | | | | | | |
| TC_AUTH_025 | Concurrent login sessions | 1. Login from multiple devices/browsers simultaneously 2. Verify each session is independent 3. Test logout from one session | Each session gets unique tokens, logout affects only the specific session | User account exists | | | | | | | | | | |

---

## 2. User Management Test Cases

**Feature Scope:** CRUD operations for users, role-based access control (Admin/Manager/Supplier/Consignee), user status management, pagination and filtering.

| Test Case ID | Test Case Description | Test Case Procedure | Expected Results | Pre-conditions | Round 1 | Test date | Tester | Round 2 | Test date | Tester | Round 3 | Test date | Tester | Note |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| TC_USER_001 | Create user with valid data (Admin role) | 1. Login as Admin 2. Send POST to /api/v1/users 3. Include complete user data with valid role 4. Verify creation | Status 201, user object returned with generated ID, password hashed, role assigned | Admin JWT token | | | | | | | | | | |
| TC_USER_002 | Create user with duplicate email | 1. Login as Admin 2. Send POST to /api/v1/users with existing email 3. Verify rejection | Status 409, error message "Email already exists" | Admin JWT token, user with email exists | | | | | | | | | | |
| TC_USER_003 | Create user without required fields | 1. Login as Admin 2. Send POST to /api/v1/users with missing email 3. Verify validation error | Status 400, validation error listing required fields | Admin JWT token | | | | | | | | | | |
| TC_USER_004 | Create user with invalid email format | 1. Login as Admin 2. Send POST to /api/v1/users with invalid email format 3. Verify validation error | Status 400, error message "Invalid email format" | Admin JWT token | | | | | | | | | | |
| TC_USER_005 | Create user without Admin authorization | 1. Login as non-Admin user 2. Send POST to /api/v1/users 3. Verify rejection | Status 403, error message "Forbidden - Admin access required" | Non-admin JWT token | | | | | | | | | | |
| TC_USER_006 | Get all users with pagination | 1. Login as Admin 2. Send GET to /api/v1/users?page=1&limit=10 3. Verify response | Status 200, array of users returned, pagination metadata included (hasNextPage) | Admin JWT token, users exist in DB | | | | | | | | | | |
| TC_USER_007 | Get users with limit exceeding maximum | 1. Login as Admin 2. Send GET to /api/v1/users?limit=100 3. Verify limit capped | Status 200, maximum 50 users returned regardless of requested limit | Admin JWT token, 50+ users exist | | | | | | | | | | |
| TC_USER_008 | Get users with filter by role | 1. Login as Admin 2. Send GET to /api/v1/users?filters[role.id]=2 3. Verify filtered results | Status 200, only users with specified role returned | Admin JWT token, users with various roles exist | | | | | | | | | | |
| TC_USER_009 | Get users with sort by created date | 1. Login as Admin 2. Send GET to /api/v1/users?sort[createdAt]=DESC 3. Verify ordering | Status 200, users returned in descending order by creation date | Admin JWT token, multiple users exist | | | | | | | | | | |
| TC_USER_010 | Get single user by ID | 1. Login as Admin 2. Send GET to /api/v1/users/{valid_id} 3. Verify user data | Status 200, complete user object returned including role and status | Admin JWT token, user with specified ID exists | | | | | | | | | | |
| TC_USER_011 | Get user with non-existent ID | 1. Login as Admin 2. Send GET to /api/v1/users/{invalid_id} 3. Verify error | Status 404, error message "User not found" | Admin JWT token | | | | | | | | | | |
| TC_USER_012 | Update user profile with valid data | 1. Login as Admin 2. Send PATCH to /api/v1/users/{id} with updated fields 3. Verify changes | Status 200, updated user object returned, changes persisted in database | Admin JWT token, user exists | | | | | | | | | | |
| TC_USER_013 | Update user email to duplicate value | 1. Login as Admin 2. Send PATCH to /api/v1/users/{id} with existing email 3. Verify rejection | Status 409, error message "Email already in use" | Admin JWT token, two users exist | | | | | | | | | | |
| TC_USER_014 | Update user role from Supplier to Admin | 1. Login as Admin 2. Send PATCH to /api/v1/users/{id} changing role 3. Verify role change | Status 200, user role updated, permissions reflect new role | Admin JWT token, user with Supplier role exists | | | | | | | | | | |
| TC_USER_015 | Delete user (soft delete) | 1. Login as Admin 2. Send DELETE to /api/v1/users/{id} 3. Verify soft deletion | Status 204, user marked as deleted, not returned in GET requests, data retained | Admin JWT token, user exists | | | | | | | | | | |
| TC_USER_016 | Delete non-existent user | 1. Login as Admin 2. Send DELETE to /api/v1/users/{invalid_id} 3. Verify error | Status 404, error message "User not found" | Admin JWT token | | | | | | | | | | |
| TC_USER_017 | Create user with Supplier role | 1. Login as Admin 2. Send POST to /api/v1/users with role set to Supplier 3. Verify creation | Status 201, user created with Supplier role, appropriate permissions assigned | Admin JWT token | | | | | | | | | | |
| TC_USER_018 | Create user with Consignee role | 1. Login as Admin 2. Send POST to /api/v1/users with role set to Consignee 3. Verify creation | Status 201, user created with Consignee role, appropriate permissions assigned | Admin JWT token | | | | | | | | | | |
| TC_USER_019 | Verify role-based access control for Supplier | 1. Login as Supplier 2. Attempt to access admin-only endpoint 3. Verify rejection | Status 403, error message "Insufficient permissions" | Supplier JWT token | | | | | | | | | | |
| TC_USER_020 | User registration with duplicate email | 1. Attempt to register new user 2. Use email that already exists 3. Verify rejection | Status 409, error message "Email already registered" | User with email exists in database | | | | | | | | | | |

---

## 3. IoT Device Management Test Cases

**Feature Scope:** MQTT connection management, sensor data ingestion (temperature/humidity), WebSocket broadcasting, device status monitoring, alert generation for threshold breaches.

| Test Case ID | Test Case Description | Test Case Procedure | Expected Results | Pre-conditions | Round 1 | Test date | Tester | Round 2 | Test date | Tester | Round 3 | Test date | Tester | Note |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| TC_IOT_001 | MQTT broker connection on startup | 1. Start the backend application 2. Verify MQTT connection established 3. Check console logs | Connection successful to HiveMQ broker, subscribed to topics "sensors/dht22/data" and "sensors/dht22/status" | MQTT broker online and accessible | | | | | | | | | | |
| TC_IOT_002 | Receive sensor data via MQTT | 1. Ensure MQTT connection active 2. Publish sensor data to "sensors/dht22/data" 3. Verify data processing | Data received, parsed correctly, stored in database, WebSocket broadcast sent | MQTT connected, IoT device registered | | | | | | | | | | |
| TC_IOT_003 | MQTT message with valid JSON payload | 1. Publish message with deviceId, temperature, humidity 2. Verify processing | Status saved, data stored with timestamp, alerts checked against thresholds | MQTT connected, device exists | | | | | | | | | | |
| TC_IOT_004 | MQTT message with malformed JSON | 1. Publish invalid JSON to "sensors/dht22/data" 2. Verify error handling | Error logged, message rejected, no database entry, system remains stable | MQTT connected | | | | | | | | | | |
| TC_IOT_005 | MQTT message with missing deviceId | 1. Publish sensor data without deviceId field 2. Verify rejection | Error logged "Device ID missing", data not stored, no crash | MQTT connected | | | | | | | | | | |
| TC_IOT_006 | IoT device connection with invalid device ID | 1. Publish data with unregistered deviceId 2. Verify handling | Warning logged, data may be rejected or device auto-created based on config | MQTT connected, deviceId not in database | | | | | | | | | | |
| TC_IOT_007 | Create IoT device via API | 1. Login with valid JWT 2. Send POST to /api/v1/io-t-devices 3. Include device name and location 4. Verify creation | Status 201, device object returned with generated ID, online status set to false | Valid JWT token | | | | | | | | | | |
| TC_IOT_008 | Create IoT device with duplicate name | 1. Login with valid JWT 2. Send POST to /api/v1/io-t-devices with existing device name 3. Verify handling | Device created (names can be duplicated) or error if name must be unique | Valid JWT token, device with same name exists | | | | | | | | | | |
| TC_IOT_009 | Get all IoT devices with pagination | 1. Login with valid JWT 2. Send GET to /api/v1/io-t-devices?page=1&limit=10 3. Verify response | Status 200, array of devices with pagination metadata | Valid JWT token, devices exist | | | | | | | | | | |
| TC_IOT_010 | Get single IoT device by ID | 1. Login with valid JWT 2. Send GET to /api/v1/io-t-devices/{id} 3. Verify device details | Status 200, device object with latest sensor readings, online status | Valid JWT token, device exists | | | | | | | | | | |
| TC_IOT_011 | Update IoT device information | 1. Login with valid JWT 2. Send PATCH to /api/v1/io-t-devices/{id} with updated name 3. Verify changes | Status 200, device updated, changes persisted | Valid JWT token, device exists | | | | | | | | | | |
| TC_IOT_012 | Delete IoT device | 1. Login with valid JWT 2. Send DELETE to /api/v1/io-t-devices/{id} 3. Verify deletion | Status 200 or 204, device removed from database | Valid JWT token, device exists | | | | | | | | | | |
| TC_IOT_013 | Temperature alert when threshold exceeded | 1. Configure area settings with max temperature 2. Publish sensor data exceeding threshold 3. Verify alert generation | Alert created in database, notification sent via WebSocket, alert status "active" | Device assigned to area, area settings configured | | | | | | | | | | |
| TC_IOT_014 | Humidity alert when threshold exceeded | 1. Configure area settings with humidity thresholds 2. Publish data outside range 3. Verify alert | Alert generated for humidity breach, stored in area_alerts table | Device in area with humidity settings | | | | | | | | | | |
| TC_IOT_015 | WebSocket broadcast of sensor data | 1. Connect WebSocket client 2. Publish sensor data via MQTT 3. Verify WebSocket receives update | Real-time data broadcast to all connected clients via Socket.IO | WebSocket connection established, MQTT active | | | | | | | | | | |
| TC_IOT_016 | Device status update (online/offline) | 1. Device publishes status message "online" 2. Verify status update 3. Send "offline" via LWT 4. Verify offline status | Device status updated in database, last seen timestamp updated | MQTT connected, device exists | | | | | | | | | | |
| TC_IOT_017 | MQTT reconnection after network failure | 1. Simulate network disconnect 2. Wait for reconnection (reconnectPeriod: 5000ms) 3. Verify reconnection | MQTT client reconnects automatically, subscriptions restored | MQTT was previously connected | | | | | | | | | | |
| TC_IOT_018 | Concurrent sensor data updates | 1. Publish sensor data from multiple devices simultaneously 2. Verify all data processed | All sensor readings saved correctly, no data loss, proper transaction handling | Multiple IoT devices registered, MQTT connected | | | | | | | | | | |
| TC_IOT_019 | Sensor data with extreme values | 1. Publish temperature = -50°C and humidity = 0% 2. Verify handling | Data accepted if within sensor range, validation applied, alerts checked | MQTT connected, device exists | | | | | | | | | | |
| TC_IOT_020 | Access IoT device without authentication | 1. Send GET to /api/v1/io-t-devices without JWT 2. Verify rejection | Status 401, error message "Unauthorized" | None | | | | | | | | | | |

---

## 4. Supplier Dashboard Test Cases

**Feature Scope:** Supplier profile management, product listings, harvest management, supplier-specific data views, role-based access for supplier users.

| Test Case ID | Test Case Description | Test Case Procedure | Expected Results | Pre-conditions | Round 1 | Test date | Tester | Round 2 | Test date | Tester | Round 3 | Test date | Tester | Note |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| TC_SUP_001 | Create supplier profile with valid data | 1. Login as Admin/Manager 2. Send POST to /api/v1/suppliers 3. Include company name, contact info 4. Verify creation | Status 201, supplier profile created with unique ID | Admin or Manager JWT token | | | | | | | | | | |
| TC_SUP_002 | Create supplier without required fields | 1. Login as Admin 2. Send POST to /api/v1/suppliers with missing fields 3. Verify validation error | Status 400, validation errors for required fields | Admin JWT token | | | | | | | | | | |
| TC_SUP_003 | Get all suppliers with pagination | 1. Login as Admin/Manager 2. Send GET to /api/v1/suppliers?page=1&limit=10 3. Verify response | Status 200, paginated list of suppliers, metadata included | Admin or Manager JWT token, suppliers exist | | | | | | | | | | |
| TC_SUP_004 | Get single supplier by ID | 1. Login as Admin/Manager 2. Send GET to /api/v1/suppliers/{id} 3. Verify supplier details | Status 200, complete supplier profile returned | Admin or Manager JWT token, supplier exists | | | | | | | | | | |
| TC_SUP_005 | Update supplier profile | 1. Login as Admin/Manager 2. Send PATCH to /api/v1/suppliers/{id} with updates 3. Verify changes | Status 200, supplier data updated successfully | Admin or Manager JWT token, supplier exists | | | | | | | | | | |
| TC_SUP_006 | Delete supplier profile | 1. Login as Admin/Manager 2. Send DELETE to /api/v1/suppliers/{id} 3. Verify deletion | Status 204, supplier removed or soft deleted | Admin or Manager JWT token, supplier exists | | | | | | | | | | |
| TC_SUP_007 | Supplier access own profile | 1. Login as Supplier user 2. Send GET to /api/v1/suppliers/{own_id} 3. Verify access granted | Status 200, own supplier profile data returned | Supplier JWT token linked to supplier profile | | | | | | | | | | |
| TC_SUP_008 | Supplier access other supplier profile | 1. Login as Supplier user 2. Attempt GET to /api/v1/suppliers/{other_id} 3. Verify restriction | Status 403 or filtered data, cannot view competitor data | Supplier JWT token | | | | | | | | | | |
| TC_SUP_009 | Create supplier without admin authorization | 1. Login as Supplier 2. Send POST to /api/v1/suppliers 3. Verify rejection | Status 403, error "Admin or Manager role required" | Supplier JWT token | | | | | | | | | | |
| TC_SUP_010 | View supplier harvest schedules | 1. Login as Supplier 2. Request harvest schedules for own supplier 3. Verify data | Status 200, list of harvest schedules associated with supplier | Supplier JWT token, harvest schedules exist | | | | | | | | | | |

---

## 5. Consignee Dashboard Test Cases

**Feature Scope:** Consignee profile management, order tracking, delivery management, consignee-specific views, role-based access control.

| Test Case ID | Test Case Description | Test Case Procedure | Expected Results | Pre-conditions | Round 1 | Test date | Tester | Round 2 | Test date | Tester | Round 3 | Test date | Tester | Note |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| TC_CON_001 | Create consignee profile with valid data | 1. Login as Admin/Manager 2. Send POST to /api/v1/consignees 3. Include company details 4. Verify creation | Status 201, consignee profile created with unique ID | Admin or Manager JWT token | | | | | | | | | | |
| TC_CON_002 | Create consignee without required fields | 1. Login as Admin 2. Send POST to /api/v1/consignees with incomplete data 3. Verify validation | Status 400, validation errors listed | Admin JWT token | | | | | | | | | | |
| TC_CON_003 | Get all consignees with pagination | 1. Login as Admin/Manager 2. Send GET to /api/v1/consignees?page=1&limit=10 3. Verify response | Status 200, paginated list of consignees returned | Admin or Manager JWT token, consignees exist | | | | | | | | | | |
| TC_CON_004 | Get single consignee by ID | 1. Login as Admin/Manager 2. Send GET to /api/v1/consignees/{id} 3. Verify details | Status 200, complete consignee profile returned | Admin or Manager JWT token, consignee exists | | | | | | | | | | |
| TC_CON_005 | Update consignee profile | 1. Login as Admin/Manager 2. Send PATCH to /api/v1/consignees/{id} with updates 3. Verify changes | Status 200, consignee data updated successfully | Admin or Manager JWT token, consignee exists | | | | | | | | | | |
| TC_CON_006 | Delete consignee profile | 1. Login as Admin/Manager 2. Send DELETE to /api/v1/consignees/{id} 3. Verify deletion | Status 204, consignee removed or soft deleted | Admin or Manager JWT token, consignee exists | | | | | | | | | | |
| TC_CON_007 | Consignee access own profile | 1. Login as Consignee user 2. Request own consignee profile 3. Verify access | Status 200, own profile data returned | Consignee JWT token linked to profile | | | | | | | | | | |
| TC_CON_008 | Consignee access other consignee profile | 1. Login as Consignee 2. Attempt to access another consignee profile 3. Verify restriction | Status 403, access denied | Consignee JWT token | | | | | | | | | | |
| TC_CON_009 | View consignee orders | 1. Login as Consignee 2. Request orders list for own profile 3. Verify data | Status 200, list of orders associated with consignee | Consignee JWT token, orders exist | | | | | | | | | | |
| TC_CON_010 | Track delivery status | 1. Login as Consignee 2. Request delivery status for own order 3. Verify real-time updates | Status 200, current delivery status and location returned | Consignee JWT token, delivery in progress | | | | | | | | | | |

---

## 6. Fruit Quality Detection System Test Cases

**Feature Scope:** Image proof management for fruit quality detection, integration with YOLO-based detection system, conveyor belt control, good/bad fruit classification.

| Test Case ID | Test Case Description | Test Case Procedure | Expected Results | Pre-conditions | Round 1 | Test date | Tester | Round 2 | Test date | Tester | Round 3 | Test date | Tester | Note |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| TC_DETECT_001 | Create image proof with valid data | 1. Login with valid JWT 2. Send POST to /api/v1/image-proofs 3. Include image file and metadata 4. Verify creation | Status 201, image proof record created, file stored, unique ID assigned | Valid JWT token, image file available | | | | | | | | | | |
| TC_DETECT_002 | Create image proof without image file | 1. Login with valid JWT 2. Send POST to /api/v1/image-proofs without image 3. Verify validation error | Status 400, error "Image file required" | Valid JWT token | | | | | | | | | | |
| TC_DETECT_003 | Get all image proofs with pagination | 1. Login with valid JWT 2. Send GET to /api/v1/image-proofs?page=1&limit=10 3. Verify response | Status 200, paginated list of image proofs with image URLs | Valid JWT token, image proofs exist | | | | | | | | | | |
| TC_DETECT_004 | Get single image proof by ID | 1. Login with valid JWT 2. Send GET to /api/v1/image-proofs/{id} 3. Verify details | Status 200, image proof record with complete metadata returned | Valid JWT token, image proof exists | | | | | | | | | | |
| TC_DETECT_005 | Update image proof metadata | 1. Login with valid JWT 2. Send PATCH to /api/v1/image-proofs/{id} with updates 3. Verify changes | Status 200, metadata updated, image unchanged unless new file provided | Valid JWT token, image proof exists | | | | | | | | | | |
| TC_DETECT_006 | Delete image proof | 1. Login with valid JWT 2. Send DELETE to /api/v1/image-proofs/{id} 3. Verify deletion | Status 200 or 204, image proof removed, associated file deleted | Valid JWT token, image proof exists | | | | | | | | | | |
| TC_DETECT_007 | Fruit detection with empty frame | 1. Send image with no fruits 2. Verify detection result | Detection returns empty array or "no fruits detected", no errors | Detection system active | | | | | | | | | | |
| TC_DETECT_008 | Fruit quality classification (good fruit) | 1. Send image of high-quality fruit 2. Verify classification | Classification result "good", confidence score >0.8, proper labeling | Detection system trained and active | | | | | | | | | | |
| TC_DETECT_009 | Fruit quality classification (bad fruit) | 1. Send image of damaged/rotten fruit 2. Verify classification | Classification result "bad", confidence score >0.8, defects identified | Detection system trained and active | | | | | | | | | | |
| TC_DETECT_010 | Batch fruit detection processing | 1. Submit multiple fruit images 2. Verify batch processing | All images processed, results returned for each, processing time acceptable | Detection system active, multiple images available | | | | | | | | | | |
| TC_DETECT_011 | Access image proofs without authentication | 1. Send GET to /api/v1/image-proofs without JWT 2. Verify rejection | Status 401, error "Unauthorized" | None | | | | | | | | | | |
| TC_DETECT_012 | Image proof with invalid file format | 1. Login with valid JWT 2. Upload non-image file (e.g., .txt) 3. Verify rejection | Status 400, error "Invalid file format, only images allowed" | Valid JWT token | | | | | | | | | | |
| TC_DETECT_013 | Conveyor belt control integration | 1. Detection classifies fruit as "bad" 2. Verify control signal sent 3. Check conveyor response | Control signal sent to reject bad fruit, conveyor sorts correctly | Detection system and conveyor integrated | | | | | | | | | | |
| TC_DETECT_014 | Real-time detection performance test | 1. Process fruits at high speed 2. Measure detection latency 3. Verify accuracy maintained | Latency <500ms per frame, accuracy >90% maintained at speed | Detection system optimized, conveyor running | | | | | | | | | | |
| TC_DETECT_015 | Detection with poor lighting conditions | 1. Submit image with low light 2. Verify detection handles gracefully | Detection attempts classification, may flag low confidence, no crash | Detection system active | | | | | | | | | | |

---

## 7. File Upload Test Cases

**Feature Scope:** Multi-driver file upload (Local/S3/S3-Presigned/Cloudinary), file validation, size limits (5MB), format restrictions, CDN integration.

| Test Case ID | Test Case Description | Test Case Procedure | Expected Results | Pre-conditions | Round 1 | Test date | Tester | Round 2 | Test date | Tester | Round 3 | Test date | Tester | Note |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| TC_FILE_001 | Upload image file with local driver | 1. Configure FILE_DRIVER=local 2. Send POST to /api/v1/files/upload with image 3. Verify upload | Status 201, file saved locally, file path returned, record in database | FILE_DRIVER=local configured | | | | | | | | | | |
| TC_FILE_002 | Upload image file with S3 driver | 1. Configure FILE_DRIVER=s3 2. Send POST to /api/v1/files/upload with image 3. Verify upload | Status 201, file uploaded to S3 bucket, public URL returned | FILE_DRIVER=s3, AWS credentials configured | | | | | | | | | | |
| TC_FILE_003 | Upload file with S3 presigned URL | 1. Configure FILE_DRIVER=s3-presigned 2. Request presigned URL 3. Upload file using presigned URL | Presigned URL generated, file uploaded to S3, expires after time limit | FILE_DRIVER=s3-presigned, AWS configured | | | | | | | | | | |
| TC_FILE_004 | Upload image with Cloudinary driver | 1. Configure FILE_DRIVER=cloudinary 2. Send POST with image 3. Verify upload and optimization | Status 201, file uploaded to Cloudinary, CDN URL returned, auto-optimized | FILE_DRIVER=cloudinary, Cloudinary credentials set | | | | | | | | | | |
| TC_FILE_005 | Upload file exceeding 5MB limit | 1. Attempt to upload file >5MB 2. Verify rejection | Status 413, error "File size exceeds maximum limit of 5MB" | Any file driver configured | | | | | | | | | | |
| TC_FILE_006 | Upload file with unsupported format | 1. Upload file with extension .exe or .sh 2. Verify rejection | Status 400, error "File type not supported" | Any file driver configured | | | | | | | | | | |
| TC_FILE_007 | Upload valid document (PDF) | 1. Upload PDF file within size limit 2. Verify acceptance | Status 201, file uploaded successfully, file URL returned | Any file driver configured | | | | | | | | | | |
| TC_FILE_008 | Upload image in JPEG format | 1. Upload .jpg file 2. Verify acceptance | Status 201, image uploaded, URL returned | Any file driver configured | | | | | | | | | | |
| TC_FILE_009 | Upload image in PNG format | 1. Upload .png file 2. Verify acceptance | Status 201, image uploaded, URL returned | Any file driver configured | | | | | | | | | | |
| TC_FILE_010 | Upload image in WebP format | 1. Upload .webp file 2. Verify acceptance | Status 201, image uploaded, URL returned | Any file driver configured | | | | | | | | | | |
| TC_FILE_011 | Upload without authentication | 1. Send POST to /api/v1/files/upload without JWT 2. Verify rejection | Status 401, error "Unauthorized" | None | | | | | | | | | | |
| TC_FILE_012 | Upload file with XSS attempt in filename | 1. Upload file with malicious name like "<script>alert()</script>.jpg" 2. Verify sanitization | Filename sanitized, special characters removed, file uploaded safely | Any file driver configured | | | | | | | | | | |
| TC_FILE_013 | Retrieve file by ID | 1. Upload file successfully 2. Send GET to /api/v1/files/{id} 3. Verify file metadata | Status 200, file metadata returned including path/URL | File uploaded and exists in database | | | | | | | | | | |
| TC_FILE_014 | Retrieve non-existent file | 1. Send GET to /api/v1/files/{invalid_id} 2. Verify error | Status 404, error "File not found" | None | | | | | | | | | | |
| TC_FILE_015 | Concurrent file uploads | 1. Upload multiple files simultaneously 2. Verify all uploads succeed | All files uploaded successfully, no conflicts, unique IDs assigned | File driver configured | | | | | | | | | | |
| TC_FILE_016 | Cloudinary auto-optimization verification | 1. Upload high-resolution image to Cloudinary 2. Retrieve URL 3. Verify optimization | Image optimized for web, smaller file size, CDN delivery | FILE_DRIVER=cloudinary configured | | | | | | | | | | |
| TC_FILE_017 | S3 bucket permission error handling | 1. Configure S3 with invalid credentials 2. Attempt file upload 3. Verify error handling | Status 500, error "Upload failed", descriptive error logged | FILE_DRIVER=s3, invalid AWS credentials | | | | | | | | | | |
| TC_FILE_018 | Local storage disk space limit | 1. Fill local storage to near capacity 2. Attempt file upload 3. Verify handling | Error "Insufficient storage space" or upload succeeds if space available | FILE_DRIVER=local, low disk space | | | | | | | | | | |
| TC_FILE_019 | Upload file with special characters in name | 1. Upload file named "test file (1).jpg" 2. Verify handling | Filename sanitized to "test_file_1.jpg" or similar, upload succeeds | Any file driver configured | | | | | | | | | | |
| TC_FILE_020 | Retrieve multiple files by IDs | 1. Upload several files 2. Send request with array of file IDs 3. Verify batch retrieval | Status 200, array of file objects returned | Multiple files exist in database | | | | | | | | | | |

---

## 8. Order Management Test Cases

**Feature Scope:** Order creation, retrieval, status updates, order phases, order invoices, order details, consignee-supplier relationships.

| Test Case ID | Test Case Description | Test Case Procedure | Expected Results | Pre-conditions | Round 1 | Test date | Tester | Round 2 | Test date | Tester | Round 3 | Test date | Tester | Note |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| TC_ORD_001 | Create order with valid data | 1. Login with valid JWT 2. Send POST to /api/v1/orders 3. Include consignee, products, quantities 4. Verify creation | Status 201, order created with unique ID, order details saved, status "pending" | Valid JWT, consignee and products exist | | | | | | | | | | |
| TC_ORD_002 | Create order without required fields | 1. Login with valid JWT 2. Send POST to /api/v1/orders with missing data 3. Verify validation | Status 400, validation errors for required fields | Valid JWT | | | | | | | | | | |
| TC_ORD_003 | Get single order by ID | 1. Login with valid JWT 2. Send GET to /api/v1/orders/{id} 3. Verify order details | Status 200, complete order object with all details, products, and status | Valid JWT, order exists | | | | | | | | | | |
| TC_ORD_004 | Get order with non-existent ID | 1. Login with valid JWT 2. Send GET to /api/v1/orders/{invalid_id} 3. Verify error | Status 404, error "Order not found" | Valid JWT | | | | | | | | | | |
| TC_ORD_005 | Update order status to "confirmed" | 1. Login with valid JWT 2. Send PATCH to /api/v1/orders/{id} with status update 3. Verify change | Status 200, order status updated to "confirmed", timestamp recorded | Valid JWT, order in "pending" status | | | | | | | | | | |
| TC_ORD_006 | Update order status to "cancelled" | 1. Login with valid JWT 2. Send PATCH to /api/v1/orders/{id} with status "cancelled" 3. Verify | Status 200, order status "cancelled", inventory released if applicable | Valid JWT, order exists | | | | | | | | | | |
| TC_ORD_007 | Update order status to "completed" | 1. Login with valid JWT 2. Update order status to "completed" 3. Verify completion | Status 200, order marked completed, delivery status verified, invoice finalized | Valid JWT, order delivered | | | | | | | | | | |
| TC_ORD_008 | Consignee views own orders | 1. Login as Consignee 2. Request orders list 3. Verify only own orders returned | Status 200, list of orders for logged-in consignee, no other consignee data | Consignee JWT token, orders exist | | | | | | | | | | |
| TC_ORD_009 | Supplier views orders for own products | 1. Login as Supplier 2. Request orders containing own products 3. Verify data | Status 200, orders containing supplier's products returned | Supplier JWT token, orders with supplier products exist | | | | | | | | | | |
| TC_ORD_010 | Create order with invalid product ID | 1. Login with valid JWT 2. Create order with non-existent product 3. Verify error | Status 404, error "Product not found" | Valid JWT | | | | | | | | | | |
| TC_ORD_011 | Create order with zero quantity | 1. Login with valid JWT 2. Create order with quantity = 0 3. Verify validation error | Status 400, error "Quantity must be greater than zero" | Valid JWT | | | | | | | | | | |
| TC_ORD_012 | Order total calculation verification | 1. Create order with multiple products 2. Verify total calculated correctly 3. Check invoice | Total = sum(price × quantity) for all items, taxes applied correctly | Valid JWT, products with prices exist | | | | | | | | | | |
| TC_ORD_013 | Access order without authentication | 1. Send GET to /api/v1/orders/{id} without JWT 2. Verify rejection | Status 401, error "Unauthorized" | None | | | | | | | | | | |
| TC_ORD_014 | Order with SQL injection in product name | 1. Attempt to create order with SQL in product name 2. Verify sanitization | Input sanitized, no SQL injection executed, order created safely or rejected | Valid JWT | | | | | | | | | | |
| TC_ORD_015 | Concurrent order creation by same consignee | 1. Create multiple orders simultaneously 2. Verify all processed correctly | All orders created with unique IDs, no conflicts, proper transaction handling | Valid JWT, sufficient inventory | | | | | | | | | | |

---

## 9. Delivery Management Test Cases

**Feature Scope:** Delivery creation, status tracking, real-time updates via WebSocket, delivery staff assignment, location tracking, delivery phases.

| Test Case ID | Test Case Description | Test Case Procedure | Expected Results | Pre-conditions | Round 1 | Test date | Tester | Round 2 | Test date | Tester | Round 3 | Test date | Tester | Note |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| TC_DEL_001 | Create delivery with valid data | 1. Login with valid JWT 2. Send POST to /api/v1/deliveries 3. Include order ID, delivery staff 4. Verify creation | Status 201, delivery created with unique ID, status "pending", assigned to order | Valid JWT, order exists | | | | | | | | | | |
| TC_DEL_002 | Create delivery without order ID | 1. Login with valid JWT 2. Send POST to /api/v1/deliveries without order 3. Verify validation error | Status 400, error "Order ID required" | Valid JWT | | | | | | | | | | |
| TC_DEL_003 | Get all deliveries with pagination | 1. Login with valid JWT 2. Send GET to /api/v1/deliveries?page=1&limit=10 3. Verify response | Status 200, paginated list of deliveries with metadata | Valid JWT, deliveries exist | | | | | | | | | | |
| TC_DEL_004 | Get deliveries filtered by order phase | 1. Login with valid JWT 2. Send GET with orderPhaseId filter 3. Verify filtered results | Status 200, only deliveries for specified order phase returned | Valid JWT, deliveries with various phases exist | | | | | | | | | | |
| TC_DEL_005 | Get deliveries filtered by harvest phase | 1. Login with valid JWT 2. Send GET with harvestPhaseId filter 3. Verify filtered results | Status 200, only deliveries for specified harvest phase returned | Valid JWT, deliveries linked to harvest phases | | | | | | | | | | |
| TC_DEL_006 | Get single delivery by ID | 1. Login with valid JWT 2. Send GET to /api/v1/deliveries/{id} 3. Verify details | Status 200, complete delivery object with order details, staff, status | Valid JWT, delivery exists | | | | | | | | | | |
| TC_DEL_007 | Update delivery status to "in_progress" | 1. Login with valid JWT 2. Send PATCH to /api/v1/deliveries/{id} with status update 3. Verify | Status 200, delivery status "in_progress", start time recorded | Valid JWT, delivery in "pending" status | | | | | | | | | | |
| TC_DEL_008 | Update delivery status to "completed" | 1. Login with valid JWT 2. Update delivery status to "completed" 3. Verify completion | Status 200, delivery status "completed", completion time recorded, order updated | Valid JWT, delivery "in_progress" | | | | | | | | | | |
| TC_DEL_009 | Update delivery status to "cancelled" | 1. Login with valid JWT 2. Update delivery status to "cancelled" 3. Verify cancellation | Status 200, delivery cancelled, reason recorded, order notified | Valid JWT, delivery exists | | | | | | | | | | |
| TC_DEL_010 | Update delivery information (address) | 1. Login with valid JWT 2. Send PATCH to /api/v1/deliveries/{id} with new address 3. Verify | Status 200, delivery address updated, change logged | Valid JWT, delivery exists | | | | | | | | | | |
| TC_DEL_011 | Delete delivery | 1. Login with valid JWT 2. Send DELETE to /api/v1/deliveries/{id} 3. Verify deletion | Status 204, delivery removed or soft deleted | Valid JWT, delivery exists | | | | | | | | | | |
| TC_DEL_012 | Real-time delivery status via WebSocket | 1. Connect WebSocket client 2. Update delivery status 3. Verify WebSocket broadcast | Status update broadcast to all connected clients in real-time via Socket.IO | WebSocket connection active, delivery exists | | | | | | | | | | |
| TC_DEL_013 | Assign delivery staff to delivery | 1. Login with valid JWT 2. Assign delivery staff to delivery 3. Verify assignment | Delivery staff assigned, staff can view assigned deliveries | Valid JWT, delivery and staff exist | | | | | | | | | | |
| TC_DEL_014 | Delivery staff views assigned deliveries | 1. Login as Delivery Staff 2. Request assigned deliveries 3. Verify data | Status 200, only deliveries assigned to logged-in staff returned | Delivery Staff JWT, assignments exist | | | | | | | | | | |
| TC_DEL_015 | Access delivery without authentication | 1. Send GET to /api/v1/deliveries without JWT 2. Verify rejection | Status 401, error "Unauthorized" | None | | | | | | | | | | |
| TC_DEL_016 | Update delivery location tracking | 1. Delivery staff updates current location 2. Verify location saved 3. Check WebSocket broadcast | Location coordinates saved, real-time update sent to consignee | Delivery Staff JWT, delivery "in_progress" | | | | | | | | | | |
| TC_DEL_017 | Delivery timeout scenario | 1. Create delivery with expected time 2. Simulate timeout (time exceeded) 3. Verify alert | Alert generated for delayed delivery, notifications sent to stakeholders | Delivery exists with expected time, time exceeded | | | | | | | | | | |
| TC_DEL_018 | Concurrent delivery status updates | 1. Update delivery status from multiple clients simultaneously 2. Verify data integrity | Last update wins or proper conflict resolution, no data corruption | Multiple clients, delivery exists | | | | | | | | | | |
| TC_DEL_019 | Get delivery with non-existent ID | 1. Login with valid JWT 2. Send GET to /api/v1/deliveries/{invalid_id} 3. Verify error | Status 404, error "Delivery not found" | Valid JWT | | | | | | | | | | |
| TC_DEL_020 | Delivery creation for completed order | 1. Attempt to create delivery for already completed order 2. Verify handling | Error or warning "Order already completed" or delivery created with special status | Valid JWT, completed order exists | | | | | | | | | | |

---

## Notes

### General Testing Guidelines

1. **Authentication Required**: Most endpoints require valid JWT tokens. Ensure proper token management during testing.
2. **Role-Based Access**: Test cases assume proper role assignment (Admin, Manager, Supplier, Consignee, Delivery Staff).
3. **Data Dependencies**: Many test cases depend on existing data (users, products, orders). Set up test data before execution.
4. **Environment Configuration**: Some features (MQTT, file upload drivers) require specific environment variable configuration.
5. **Real-Time Features**: IoT and delivery tracking use WebSocket connections. Ensure WebSocket functionality is tested separately.

### Security Considerations

- All endpoints must validate authentication tokens
- SQL injection and XSS attempts should be properly sanitized
- Sensitive data (passwords, tokens) should never be exposed in error messages
- File uploads must validate file types and sizes to prevent malicious uploads
- Rate limiting should be implemented to prevent abuse

### Performance Considerations

- Pagination limits are capped at 50 items per page
- Concurrent operations should maintain data integrity
- MQTT reconnection should be automatic with 5-second intervals
- File upload timeout should be configured appropriately for 5MB limit
- Database queries should be optimized for large datasets

### Test Execution Workflow

1. Set up test environment with required services (database, MQTT broker, file storage)
2. Create seed data (users with various roles, products, IoT devices)
3. Execute positive test cases first to validate happy paths
4. Execute negative test cases to verify error handling
5. Execute security test cases to validate protection mechanisms
6. Execute edge cases and concurrent operation tests
7. Document results in the Round 1/2/3 columns
8. Log any issues or bugs discovered during testing

---

**Document End**
