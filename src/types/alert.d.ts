import { PaginationResponse } from "./models";

export interface Alert {
    id: number;
    name: string;
    description: string;
    created_at: Date;
    update_at: Date;
    is_read: boolean;
    user: number;
}

export interface AlertPagination extends PaginationResponse<Alert> {
    unread_count: number;
}
