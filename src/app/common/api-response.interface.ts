export interface ApiResponse<T = any> {
  response: number;
  success: string | null;
  error: string | null;
  data: T | null;
}

export class ApiResponseDto<T = any> implements ApiResponse<T> {
  response: number;
  success: string | null;
  error: string | null;
  data: T | null;

  constructor(
    response: number,
    success: string | null = null,
    error: string | null = null,
    data: T | null = null,
  ) {
    this.response = response;
    this.success = success;
    this.error = error;
    this.data = data;
  }

  static ok<T>(message: string, data?: T): ApiResponse<T> {
    return new ApiResponseDto(200, message, null, data || null);
  }

  static created<T>(message: string, data?: T): ApiResponse<T> {
    return new ApiResponseDto(201, message, null, data || null);
  }

  static badRequest(error: string): ApiResponse<null> {
    return new ApiResponseDto(400, null, error, null);
  }

  static unauthorized(error: string): ApiResponse<null> {
    return new ApiResponseDto(401, null, error, null);
  }

  static forbidden(error: string): ApiResponse<null> {
    return new ApiResponseDto(403, null, error, null);
  }

  static notFound(error: string): ApiResponse<null> {
    return new ApiResponseDto(404, null, error, null);
  }

  static serverError(error: string): ApiResponse<null> {
    return new ApiResponseDto(500, null, error, null);
  }
}
