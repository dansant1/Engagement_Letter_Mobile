import { Logos, Signatures } from '../../both/conexion'

// SIGNATURES
Slingshot.fileRestrictions( "Upload", {
  allowedFileTypes: [ "image/png", "image/jpeg"],
  maxSize: 1 * 1024 * 1024
})

Slingshot.createDirective( "Upload", Slingshot.S3Storage, {
  bucket: "engagement-letter-app",
  acl: "public-read",
  authorize() {
    return true
  },
  key( file, data) {
    
    return data.email + "/" + file.name;
  }
})

// LOGOS
Slingshot.fileRestrictions( "UploadLogos", {
  allowedFileTypes: [ "image/png", "image/jpeg"],
  maxSize: 1 * 1024 * 1024
})

Slingshot.createDirective( "UploadLogos", Slingshot.S3Storage, {
  bucket: "engagement-letter-app",
  acl: "public-read",
  authorize() {
   
    return true;
  },
  key( file, data ) {
    return data.firmId + "/" + file.name;
  }
})

