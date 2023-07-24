const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  ListObjectsV2Command,
  DeleteObjectCommand
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: "",
    secretAccessKey: "",
  },
});
async function getObjectURL(key) {
  const command = new GetObjectCommand({
    Bucket: "vakil-private",
    Key: key,
  });
  const url = await getSignedUrl(s3Client, command, { expiresIn: 20 });
  return url;
}
async function putObject(filename,contentType) {
    const command=new PutObjectCommand({
        Bucket:'vakil-private',
        Key:`/uploads/users-uploads/${filename}`,
        ContentType:contentType
    })
    const url=await getSignedUrl(s3Client,command);
    return url;
}
async function listObjects(key){
    const command=new ListObjectsV2Command({
        Bucket:'vakil-private',
        Key:'/'
    });
    const result=await s3Client.send(command)
    console.log(result)
}
async function init() {
    // await listObjects();
//   console.log("url is ====>", await getObjectURL("/uploads/users-uploads/image-1690117728493.jpeg"));
//   console.log("url for put ====>", await putObject(`image-${Date.now()}.jpeg`,'image/jpeg'));
const cmd=new DeleteObjectCommand({
    Bucket:'vakil-private',
    Key:'hello.jpg'
})
await s3Client.send(cmd)
}
init();
