import {
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFile,
} from '@nestjs/common';

const DEFAULT_MAX_SIZE = 10 * 1024 * 1024; // default 10MB
const DEFAULT_FILE_TYPE = '.(png|jpg|jpeg)';

export function FileUpload(options?: {
  maxSize?: number;
  required?: boolean;
  fileType: string;
}) {
  const maxSize = options?.maxSize ?? DEFAULT_MAX_SIZE; // default 10MB
  const required = options?.required ?? true;
  const fileType = options?.fileType ?? DEFAULT_FILE_TYPE;

  return UploadedFile(
    new ParseFilePipe({
      validators: [
        new FileTypeValidator({ fileType }),
        new MaxFileSizeValidator({
          maxSize,
          message: `File is too large. Max size is ${maxSize / 1024 / 1024}MB`,
        }),
      ],
      fileIsRequired: required,
    }),
  );
}
