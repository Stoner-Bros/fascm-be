# Files Upload Configuration

This module supports multiple file upload drivers: Local, S3, S3 Presigned, and Cloudinary.

## Configuration

Set the `FILE_DRIVER` environment variable to choose your preferred upload method:

### Local Storage
```bash
FILE_DRIVER=local
```
Files will be stored locally on the server.

### AWS S3
```bash
FILE_DRIVER=s3
ACCESS_KEY_ID=your_access_key
SECRET_ACCESS_KEY=your_secret_key
AWS_S3_REGION=us-east-1
AWS_DEFAULT_S3_BUCKET=your-bucket-name
```

### AWS S3 with Presigned URLs
```bash
FILE_DRIVER=s3-presigned
ACCESS_KEY_ID=your_access_key
SECRET_ACCESS_KEY=your_secret_key
AWS_S3_REGION=us-east-1
AWS_DEFAULT_S3_BUCKET=your-bucket-name
```

### Cloudinary
```bash
FILE_DRIVER=cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Installation

For Cloudinary support, install the required package:
```bash
npm install cloudinary
```

## Usage

Once configured, you can upload files using the `/api/v1/files/upload` endpoint.

### Supported File Types
- Images: jpg, jpeg, png, gif, webp
- Documents: pdf, doc, docx

### File Size Limit
Maximum file size: 5MB (configurable in `file.config.ts`)

## API Endpoints

### Upload File
```
POST /api/v1/files/upload
Content-Type: multipart/form-data

Body:
- file: (binary file)
```

Response:
```json
{
  "id": "file_id",
  "path": "file_url"
}
```

## Driver Features

| Driver | Local Storage | Cloud Storage | CDN | Presigned URLs | Auto-optimization |
|--------|---------------|---------------|-----|----------------|-------------------|
| local | ✅ | ❌ | ❌ | ❌ | ❌ |
| s3 | ❌ | ✅ | ❌ | ❌ | ❌ |
| s3-presigned | ❌ | ✅ | ❌ | ✅ | ❌ |
| cloudinary | ❌ | ✅ | ✅ | ❌ | ✅ |

## Cloudinary Features

When using Cloudinary driver, you get additional benefits:
- Automatic image optimization
- CDN delivery
- Multiple format support
- Automatic backup
- Advanced image transformations
- Real-time image analysis

Files are organized in the `fascm` folder on Cloudinary for better organization.
