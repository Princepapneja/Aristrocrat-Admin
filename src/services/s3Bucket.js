import { GetObjectAclCommand, S3Client } from "@aws-sdk/client-s3"
import { Bucket, Endpoint, Region, S3AccessKey, S3Secret } from "../../constants"
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const s3Client = new S3Client({
    region: Region, 
    endpoint: Endpoint, 
    credentials: {
      accessKeyId: S3AccessKey,
      secretAccessKey: S3Secret,
    },
  });
  async function uploadFile(file, relativePath) {
    
    try {
      const command = new PutObjectCommand({
        Bucket,
        Key: relativePath, 
        Body: file,
        ACL: 'public-read', // or 'private'
      });
  
      const response = await s3Client.send(command);
  
      if (response.$metadata.httpStatusCode !== 200) {
        throw new Error('Upload failed');
      }
  
      return `https://${Endpoint}/${relativePath}`;
    } catch (err) {
      console.error('Upload error:', err);
      throw err;
    }
  }
  

async function getObjectUrl(key) {
    const command = new GetObjectAclCommand({
        Bucket: Bucket,
        Key: key

    })
    const url = await getSignedUrl(s3Client, command)
    return url
}
export { uploadFile, getObjectUrl }