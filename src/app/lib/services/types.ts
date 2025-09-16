export interface PaginationDto {
    page: number;
    take: number;
    totalRecord: number;
    totalPage: number;
    nextPage?: number;
    prevPage?: number;
}

export interface ApiResponseDto<T = any> {
    message: string;
    data: T;
    pagination?: PaginationDto;
}

export interface ApiError<T = any> {
    code: string;
    message: string;
    detail: T;
    status?: number;
}