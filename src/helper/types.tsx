interface GeneratesData {
    data: {
        status: boolean;
        message: string;
        resource: {
            code_document: string;
            headers: {
                [key: string]: string[];
            };
            file_name: string;
            templateHeaders: string[];
            fileDetails: {
                total_column_count: number;
                total_row_count: number;
            };
        };
    };
}

export type { GeneratesData };

