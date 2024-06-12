import { Pagination } from '@mantine/core';

interface UserDataItem {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    };
    phone: string;
    website: string;
    company: {
        name: string;
        catchPhrase: string;
        bs: string;
    };
}
interface GenerateInboundDataProcessResponse {
    data: {
        status: boolean;
        message: string;
        resource: {
            code_document: string;
            headers: any;
            file_name: string;
            templateHeaders: string[];
            fileDetails: {
                total_column_count: number;
                total_row_count: number;
            };
        };
    };
}
interface ProductOldsItem {
    id: number;
    code_document: string;
    old_barcode_product: string;
    old_name_product: string;
    old_quantity_product: string;
    old_price_product: string;
    created_at: string;
    updated_at: string;
}
interface ProductOlds {
    data: {
        status: boolean;
        message: string;
        resource: {
            current_page: number;
            data: ProductOldsItem[];
        };
        next_page_url: string;
        path: string;
        per_page: number;
        prev_page_url: string;
        to: number;
        total: number;
    };
}
interface MergeHeader {
    data: {
        status: boolean;
        message: string;
        resource: {
            code_document: string;
            old_barcode_product: string;
            old_name_product: string;
            old_quantity_product: number;
            old_price_product: number;
            updated_at: string;
            created_at: string;
            id: number;
        };
    };
}
interface MergeHeaderBody {
    code_document: string | undefined;
    headerMappings: {
        old_barcode_product: string[] | undefined;
        old_name_product: string[] | undefined;
        old_quantity_product: string[] | undefined;
        old_price_product: string[] | undefined;
    };
}
interface Barcode {
    data: {
        status: boolean;
        message: string;
        resource: {
            id: number;
            code_document: string;
            old_barcode_product: string;
            old_name_product: string;
            old_quantity_product: string;
            old_price_product: string;
            created_at: string;
            updated_at: string;
        };
    };
}
interface CheckProductDocumentLinks {
    url: null;
    label: string;
    active: boolean;
}

interface CheckProductDocumentItem {
    id: number;
    code_document: string;
    base_document: string;
    total_column_document: string;
    total_column_in_document: string;
    date_document: string;
    status_document: string;
    created_at: string;
    updated_at: string;
}
interface CheckProductDocument {
    data: {
        status: boolean;
        message: string;
        resource: {
            current_page: number;
            data: CheckProductDocumentItem[];
            first_page_url: string;
            from: number;
            last_page: number;
            last_page_url: string;
            links: CheckProductDocumentLinks[];
            next_page_url: null;
            path: string;
            per_page: number;
            prev_page_url: null;
            to: number;
            total: number;
        };
    };
}
interface ProductApprovmentItem {
    id: number;
    code_document: string;
    old_barcode_product: string;
    new_barcode_product: string;
    new_name_product: string;
    new_quantity_product: number;
    new_price_product: string;
    old_price_product: string;
    new_date_in_product: string;
    new_status_product: string;
    new_quality: string;
    new_category_product: string;
    new_tag_product: null | string;
    created_at: string;
    updated_at: string;
}
interface ProductApprovment {
    data: {
        status: boolean;
        message: string;
        resource: {
            current_page: number;
            data: ProductApprovmentItem[];
            first_page_url: string;
            from: number;
            last_page: number;
            last_page_url: string;
            links: CheckProductDocumentLinks[];
            next_page_url: null;
            path: string;
            per_page: number;
            prev_page_url: null;
            to: number;
            total: number;
        };
    };
}

interface GetBarcodeBody {
    code_document: string;
    old_barcode_product: string;
}

interface Product {
    id: number;
    code_document: string;
    old_barcode_product: string;
    old_name_product: string;
    old_quantity_product: string;
    old_price_product: string;
    created_at: string;
    updated_at: string;
}
interface Color {
    id: number;
    hexa_code_color: string;
    name_color: string;
    min_price_color: string;
    max_price_color: string;
    fixed_price_color: string;
    created_at: string;
    updated_at: string;
}
interface GetBarcodeResponse {
    data: {
        status: boolean;
        message: string | undefined;
        resource: any;
    };
}
interface DetailProductOld {
    data: {
        status: boolean;
        message: string;
        resource: {
            current_page: number;
            data: ItemDetailOldsProduct[];
            first_page_url: string;
            from: number;
            last_page: number;
            last_page_url: string;
            links: {
                url: null | string;
                label: string;
                active: boolean;
            }[];
            next_page_url: string;
            path: string;
            per_page: number;
            prev_page_url: null | number;
            to: number;
            total: number;
        };
    };
}
interface ItemDetailOldsProduct {
    id: number;
    code_document: string;
    old_barcode_product: string;
    old_name_product: string;
    old_quantity_product: string;
    old_price_product: string;
    created_at: string;
    updated_at: string;
}

interface GetCategoriesItem {
    id: number;
    name_category: string;
    discount_category: string;
    max_price_category: string;
    created_at: string;
    updated_at: string;
}
interface GetCategories {
    data: {
        status: boolean;
        message: string;
        resource: GetCategoriesItem[];
    };
}
interface ProdcutItem {
    code_document: string;
    old_barcode_product: string;
    new_barcode_product: string;
    new_name_product: string;
    new_quantity_product: string;
    old_price_product: string;
    new_price_product: string;
    new_date_in_product: string;
    new_status_product: string;
    new_category_product: string;
    new_tag_product: string;
    new_quality: string;
    updated_at: string;
    created_at: string;
    id: number;
}
interface NewProduct {
    data: {
        status: boolean;
        message: string;
        resource: ProdcutItem;
    };
}
interface NewProductBody {
    code_document: string | undefined;
    old_barcode_product: string | undefined;
    new_barcode_product: string | undefined;
    new_name_product: string | undefined;
    old_name_product: string | undefined;
    new_quantity_product: number | undefined;
    new_price_product: number | undefined;
    new_date_in_product: string | undefined;
    new_status_product: string | undefined;
    condition: string | undefined;
    new_category_product: string | undefined;
    new_tag_product: string | undefined;
    deskripsi: string | undefined;
}

interface ColorTagItem {
    id: number;
    hexa_code_color: string;
    name_color: string;
    min_price_color: string;
    max_price_color: string;
    fixed_price_color: string;
    created_at: string;
    updated_at: string;
}
interface ColorTag {
    data: {
        status: boolean;
        message: string;
        resource: {
            current_page: number;
            data: ColorTagItem[];
            first_page_url: string;
            from: number;
            last_page: number;
            last_page_url: string;
            links: CheckProductDocumentLinks[];
            next_page_url: null | string;
            path: string;
            per_page: number;
            prev_page_url: null | string;
            to: number;
            total: number;
        };
    };
}
interface CheckAllProducts {
    data: {
        status: boolean;
        message: string;
        resource: {
            code_document: string;
            total_data: string;
            total_data_in: number;
            total_data_lolos: number;
            total_data_damaged: number;
            total_data_abnormal: number;
            total_discrepancy: number;
            precentage_total_data: number;
            percentage_in: number;
            percentage_lolos: number;
            percentage_damaged: number;
            percentage_abnormal: number;
            percentage_discrepancy: number;
            updated_at: string;
            created_at: string;
            id: number;
        };
    };
}
interface HistorySubProductItem {
    code_document: string;
    old_barcode_product: string;
    new_barcode_product: string;
    old_name_product: string;
    new_name_product: string;
    damaged_value: string;
    old_quantity_product: number;
    new_quantity_product: number;
    old_price_product: string;
}
interface GetRiwayatcheckItem {
    id: number;
    code_document: string;
    total_data: string;
    total_data_in: string;
    total_data_lolos: string;
    total_data_damaged: string;
    total_data_abnormal: string;
    total_discrepancy: string;
    precentage_total_data: string;
    percentage_in: string;
    percentage_lolos: string;
    percentage_damaged: string;
    percentage_abnormal: string;
    percentage_discrepancy: string;
    status_approve: string;
    total_price_discrepancy: number;
    total_price: number;
    created_at: string;
    updated_at: string;
    damaged: {
        products: HistorySubProductItem[];
        total_old_price: number;
        price_percentage: number;
    };
    lolos: {
        products: HistorySubProductItem[];
        total_old_price: number;
        price_percentage: number;
    };
    abnormal: {
        products: HistorySubProductItem[];
        total_old_price: number;
        price_percentage: number;
    };
    priceDiscrepancy: number;
    price_percentage: number;
}

interface DetailGetRiwayatcheck {
    data: {
        status: boolean;
        message: string;
        resource: GetRiwayatcheckItem;
    };
}
interface Links {
    url: string | null;
    label: string;
    active: boolean;
}
interface GetRiwayatcheck {
    data: {
        status: true;
        message: 'list riwayat';
        resource: {
            current_page: number;
            data: GetRiwayatcheckItem[];
            first_page_url: string;
            from: number;
            last_page: number;
            last_page_url: string;
            links: Links[];
            next_page_url: null | string;
            path: string;
            per_page: number;
            prev_page_url: null | string;
            to: number;
            total: number;
        };
    };
}
interface NewProductItem {
    id: number;
    code_document: string;
    old_barcode_product: string;
    old_price_product: string;
    new_barcode_product: string;
    new_name_product: string;
    new_quantity_product: string;
    new_price_product: string;
    new_date_in_product: string;
    new_status_product: string;
    new_quality: string;
    new_category_product: string;
    new_tag_product: null | string;
    condition?: string;
    deskripsi?: string;
    created_at: string;
    updated_at: string;
}
interface GetAllNewProduct {
    data: {
        status: boolean;
        message: string;
        resource: {
            current_page: number;
            data: NewProductItem[];
            first_page_url: string;
            from: null | string;
            last_page: number;
            last_page_url: string;
            links: Links[];
            next_page_url: null | string;
            path: string;
            per_page: number;
            prev_page_url: null | string;
            to: number;
            total: number;
        };
    };
}
interface DeleteNewProductResponse {
    data: {
        status: boolean;
        message: string;
        resource: NewProductItem;
    };
}

interface DetailNewProduct {
    data: {
        status: boolean;
        message: string;
        resource: NewProductItem;
    };
}
interface ProductExpiredItem {
    id: number;
    code_document: string;
    old_barcode_product: string;
    new_barcode_product: null | string;
    new_name_product: null | string;
    new_quantity_product: string;
    new_price_product: string;
    old_price_product?: string;
    new_date_in_product: string;
    new_status_product: string;
    new_quality: string;
    new_category_product: null | string;
    new_tag_product: any;
    fixed_price: string;
    created_at: string;
    updated_at: string;
}
interface ProductExpired {
    data: {
        status: boolean;
        message: string;
        resource: {
            current_page: number;
            data: ProductExpiredItem[];
            first_page_url: string;
            from: number;
            last_page: number;
            last_page_url: string;
            links: Links[];
            next_page_url: null | string;
            path: string;
            per_page: number;
            prev_page_url: null | string;
            to: number;
            total: number;
        };
    };
}
interface DetailExpiredProduct {
    data: {
        status: boolean;
        message: string;
        resource: ProductExpiredItem;
    };
}
interface BundleSubItem {
    id: number;
    bundle_id: string;
    code_document: string;
    old_barcode_product: string;
    new_barcode_product: string;
    new_name_product: string;
    new_quantity_product: string;
    new_price_product: string;
    new_date_in_product: string;
    new_status_product: string;
    new_quality: string;
    new_category_product: null | string;
    new_tag_product: null | string;
    created_at: null | string;
    updated_at: null | string;
}
interface BundleItem {
    id: number;
    name_bundle: string;
    total_price_bundle: string;
    total_price_custom_bundle: string;
    total_product_bundle: string;
    barcode_bundle: string;
    created_at: string;
    updated_at: string;
    product_bundles: BundleSubItem[];
}
interface BundleResponse {
    data: {
        status: boolean;
        message: string;
        resource: {
            current_page: number;
            data: BundleItem[];
            first_page_url: string;
            from: number;
            last_page: number;
            last_page_url: string;
            links: Links[];
            next_page_url: null | string;
            path: string;
            per_page: number;
            prev_page_url: null | string;
            to: number;
            total: number;
        };
    };
}
interface QCDResponse {
    data: {
        status: boolean;
        message: string;
        resource: {
            current_page: number;
            data: QCDItem[];
            first_page_url: string;
            from: number;
            last_page: number;
            last_page_url: string;
            links: Links[];
            next_page_url: null | string;
            path: string;
            per_page: number;
            prev_page_url: null | string;
            to: number;
            total: number;
        };
    };
}
interface QCDItem {
    id: number;
    name_bundle: string;
    total_price_bundle: string;
    total_price_custom_bundle: string;
    total_product_bundle: string;
    barcode_bundle: string;
    created_at: string;
    updated_at: string;
    product_qcds: BundleSubItem[];
}
interface DetailBundleResponse {
    data: {
        status: boolean;
        message: string;
        resource: {
            id: number;
            name_bundle: string;
            total_price_bundle: string;
            total_price_custom_bundle: string;
            total_product_bundle: string;
            barcode_bundle: string;
            product_bundles: NewProductItem[];
            created_at: string;
            updated_at: string;
        };
    };
}
interface DetailQCDResponse {
    data: {
        status: boolean;
        message: string;
        resource: {
            id: number;
            name_bundle: string;
            total_price_bundle: string;
            total_price_custom_bundle: string;
            total_product_bundle: string;
            barcode_bundle: string;
            product_qcds: NewProductItem[];
            created_at: string;
            updated_at: string;
        };
    };
}
interface DeleteBundleResponse {
    data: {
        status: boolean;
        message: string;
        resource: null;
    };
}
interface FilterProduct {
    data: {
        status: boolean;
        message: string;
        resource: ProductExpiredItem;
    };
}
interface GetFilterProductBundles {
    data: {
        status: boolean;
        message: string;
        resource: {
            total_new_price: number;
            category: any;
            data: {
                current_page: number;
                data: ProductExpiredItem[];
                first_page_url: string;
                from: number;
                last_page: number;
                last_page_url: string;
                links: Links[];
                next_page_url: null | string;
                path: string;
                per_page: number;
                prev_page_url: null | string;
                to: number;
                total: number;
            };
        };
    };
}
interface CreateBundle {
    data: {
        status: boolean;
        message: string;
        resource: {
            name_bundle: string;
            total_price_bundle: string;
            total_price_custom_bundle: string;
            total_product_bundle: string;
            barcode_bundle: string;
            updated_at: string;
            created_at: string;
            id: number;
        };
    };
}
interface CreateBundleBody {
    name_bundle: string;
    total_price_bundle: number;
    total_price_custom_bundle: number;
    total_product_bundle: number | undefined;
    barcode_bundle: string;
    category: string | undefined;
    name_color: string | undefined;
}
interface PromoListItem {
    id: number;
    new_product_id: string;
    name_promo: string;
    discount_promo: string;
    price_promo: string;
    created_at: string;
    updated_at: string;
    new_product: {
        id: number;
        code_document: string;
        old_barcode_product: string;
        new_barcode_product: null | string;
        new_name_product: null | string;
        new_quantity_product: string;
        new_price_product: string;
        new_date_in_product: string;
        new_status_product: string;
        new_quality: string;
        new_category_product: null | string;
        new_tag_product: null | string;
        created_at: string;
        updated_at: string;
    };
}
interface PromoLists {
    data: {
        status: true;
        message: 'list promo';
        resource: {
            current_page: 1;
            data: PromoListItem[];
            first_page_url: string;
            from: number;
            last_page: number;
            last_page_url: string;
            links: Links[];
            next_page_url: null | string;
            path: string;
            per_page: number;
            prev_page_url: null | string;
            to: number;
            total: number;
        };
    };
}
interface DetailPromo {
    data: {
        status: boolean;
        message: string;
        resource: PromoListItem;
    };
}
interface EditPromoBody {
    name_promo: string;
    discount_promo: string;
    price_promo: string;
}
interface EditPromoResponse {
    data: {
        status: boolean;
        message: string;
        resource: {
            id: number;
            new_product_id: string;
            name_promo: string;
            discount_promo: string;
            price_promo: string;
            created_at: string;
            updated_at: string;
        };
    };
}
interface PaletListItemArray {
    id: number;
    palet_id: string;
    code_document: string;
    old_barcode_product: null | string;
    new_barcode_product: string;
    new_name_product: string;
    new_quantity_product: string;
    new_price_product: string;
    new_date_in_product: string;
    new_status_product: string;
    new_quality: null | string;
    new_category_product: string;
    new_tag_product: null | string;
    created_at: null | string;
    updated_at: null | string;
}
interface PaletListItem {
    id: number;
    name_palet: string;
    category_palet: string;
    total_price_palet: string;
    total_product_palet: string;
    palet_barcode: string;
    created_at: string;
    updated_at: string;
    palet_products: PaletListItemArray[];
}
interface PaletLists {
    data: {
        status: boolean;
        message: string;
        resource: {
            current_page: number;
            data: PaletListItem[];
            first_page_url: string;
            from: number;
            last_page: number;
            last_page_url: string;
            links: Links[];
            next_page_url: null | string;
            path: string;
            per_page: number;
            prev_page_url: null | string;
            to: number;
            total: number;
        };
    };
}
interface DeletePaletList {
    data: {
        status: boolean;
        message: string;
        resource: null;
    };
}
interface DisplayPallet {
    data: {
        status: boolean;
        message: string;
        resource: {
            current_page: number;
            data: ProdcutItem[];
            first_page_url: string;
            from: number;
            last_page: number;
            last_page_url: string;
            links: Links[];
            next_page_url: null | string;
            path: string;
            per_page: number;
            prev_page_url: null | string;
            to: number;
            total: number;
        };
    };
}
interface filterPalletLists {
    data: {
        status: boolean;
        message: string;
        resource: {
            total_new_price: number;
            data: {
                current_page: number;
                data: ProdcutItem[];
                first_page_url: string;
                from: number;
                last_page: number;
                last_page_url: string;
                links: Links[];
                next_page_url: null | string;
                path: string;
                per_page: number;
                prev_page_url: null | string;
                to: number;
                total: number;
            };
        };
    };
}
interface FilterDisplayPallet {
    data: {
        status: boolean;
        message: string;
        resource: ProdcutItem;
    };
}
interface CreatePaletBody {
    name_palet: string;
    category_palet: string;
    total_price_palet: string;
    total_product_palet: number | undefined;
    palet_barcode: string;
}
interface CreatePaletResponse {
    data: {
        status: boolean;
        message: string;
        resource: {
            name_palet: string;
            category_palet: string;
            total_price_palet: string;
            total_product_palet: string;
            palet_barcode: string;
            updated_at: string;
            created_at: string;
            id: number;
        };
    };
}

interface GetListProductRepairItem {
    id: number;
    code_document: string;
    old_barcode_product: string;
    new_barcode_product: string;
    new_name_product: string;
    new_quantity_product: string;
    new_price_product: string;
    old_price_product: string;
    new_date_in_product: string;
    new_status_product: string;
    new_quality: string;
    new_category_product: string;
    new_tag_product: string;
    created_at: string;
    updated_at: string;
}

interface GetListProductRepair {
    id: number;
    data: {
        status: boolean;
        message: string;
        resource: {
            current_page: number;
            data: GetListProductRepairItem[];
            first_page_url: string;
            from: null | string;
            last_page: number;
            last_page_url: string;
            links: Links[];
            next_page_url: null | string;
            path: string;
            per_page: number;
            prev_page_url: null | string;
            to: number;
            total: number;
        };
    };
}

interface GetListDumpItem {
    id: number;
    code_document: string;
    old_barcode_product: string;
    new_barcode_product: string;
    new_name_product: string;
    new_quantity_product: string;
    new_price_product: string;
    old_price_product: string;
    new_date_in_product: string;
    new_status_product: string;
    new_quality: string;
    new_category_product: string;
    new_tag_product: string;
    created_at: string;
    updated_at: string;
}

interface GetListDump {
    data: {
        status: boolean;
        message: string;
        resource: {
            current_page: number;
            data: GetListDumpItem[];
            first_page_url: string;
            from: null | string;
            last_page: number;
            last_page_url: string;
            links: Links[];
            next_page_url: null | string;
            path: string;
            per_page: number;
            prev_page_url: null | string;
            to: number;
            total: number;
        };
    };
}
interface CreatePromo {
    data: {
        status: boolean;
        message: string;
        resource: {
            new_product_id: string;
            name_promo: string;
            discount_promo: string;
            price_promo: string;
            updated_at: string;
            created_at: string;
            id: number;
        };
    };
}
interface CreatePromoBody {
    new_product_id: number | string | undefined;
    name_promo: string | string;
    discount_promo: number | string;
    price_promo: number | string;
}

interface GetListRoleItem {
    id: number;
    role_name: string;
    created_at: string;
    updated_at: string;
}

interface GetListRole {
    data: {
        status: boolean;
        message: string;
        resource: GetListRoleItem;
    };
}

interface GetListAkunItem {
    id: number;
    name: string;
    username: string;
    email: string;
    email_verified_at: string;
    password: string;
    role_id: string;
    created_at: string;
    updated_at: string;
}

interface GetListAkun {
    data: {
        status: boolean;
        message: string;
        resource: {
            current_page: number;
            data: GetListAkunItem[];
            first_page_url: string;
            from: null | string;
            last_page: number;
            last_page_url: string;
            links: Links[];
            next_page_url: null | string;
            path: string;
            per_page: number;
            prev_page_url: null | string;
            to: number;
            total: number;
        };
    };
}

interface GetTotalSaleItem {
    status_sale: string;
    total_sale: string;
}

interface GetListSaleItem {
    id: number;
    code_document_sale?: string;
    product_name_sale?: string;
    product_price_sale: string;
    product_qty_sale?: string;
    product_barcode_sale?: string;
    status_sale?: string;
    created_at: string;
    updated_at: string;
}

interface GetListSale {
    data: {
        status: boolean;
        message: string;
        resource: {
            code_document_sale: string;
            sale_buyer_id: number;
            current_page: number;
            data: GetListSaleItem[];
            first_page_url: string;
            from: number;
            last_page: number;
            last_page_url: string;
            links: Links[];
            next_page_url: string | null;
            path: string;
            per_page: number;
            prev_page_url: string | null;
            sale_buyer_name: string;
            to: number;
            total: number;
            total_sale: number;
        };
    };
}

interface GetListMigrateItem {
    id: number;
    code_document_migrate: string;
    destiny_document_migrate: string;
    total_product_document_migrate: string;
    total_price_document_migrate: string;
    created_at: string;
    updated_at: string;
}

interface GetListMigrate {
    data: {
        status: boolean;
        message: string;
        resource: {
            current_page: number;
            data: GetListMigrateItem[];
            first_page_url: string;
            from: null | string;
            last_page: number;
            last_page_url: string;
            links: Links[];
            next_page_url: null | string;
            path: string;
            per_page: number;
            prev_page_url: null | string;
            to: number;
            total: number;
        };
    };
}

interface GetListSaleDocumentItem {
    id: number;
    code_document_sale: string;
    buyer_name_document_sale: string;
    total_product_document_sale: string;
    total_price_document_sale: string;
    status_document_sale: string;
    created_at: string;
    updated_at: string;
}

interface GetListSaleDocument {
    data: {
        status: boolean;
        message: string;
        resource: {
            current_page: number;
            data: GetListSaleDocumentItem[];
            first_page_url: string;
            from: null | string;
            last_page: number;
            last_page_url: string;
            links: Links[];
            next_page_url: null | string;
            path: string;
            per_page: number;
            prev_page_url: null | string;
            to: number;
            total: number;
        };
    };
}

interface GetShowSaleDocumentItem {
    id: number;
    code_document_sale: string;
    product_name_sale: string;
    product_barcode_sale: string;
    product_price_sale: string;
    product_qty_sale: string;
    status_sale: string;
    created_at: string;
    updated_at: string;
}

interface GetShowSaleDocument {
    data: {
        status: boolean;
        message: string;
        resource: {
            id: number;
            code_document_sale: string;
            buyer_name_document_sale: string;
            total_product_document_sale: string;
            total_price_document_sale: string;
            status_document_sale: string;
            created_at: string;
            updated_at: string;
            sales: GetShowSaleDocumentItem[];
        };
    };
}
interface ExportToExcel {
    data: {
        status: boolean;
        message: string;
        resource: string;
    };
}

interface GetProductSales {
    new_category_product: string;
    total: number;
    all_total: number;
}

interface GetShowChartInboundOutbound {
    month: string;
    outbound_count: string;
    inbound_count: string;
}

interface GetInboundData {
    base_document: string;
    created_at: string;
    total_column_in_document: number;
}

interface GetDashboard {
    data: {
        status: boolean;
        message: string;
        resource: {
            chart_inbound_outbound: GetShowChartInboundOutbound[];
            product_sales: GetProductSales[];
            inbound_data: {
                current_page: number;
                data: GetInboundData[];
                first_page_url: string;
                from: number;
                last_page: number;
                last_page_url: string;
                links: Links[];
                next_page_url: string | null;
                path: string;
                per_page: number;
                prev_page_url: string | null;
                to: number;
                total: number;
            };
            expired_data: GetProductSales[];
            product_data: GetProductSales[];
        };
    };
}

interface GetListBuyerItem {
    id: number;
    name_buyer: string;
    phone_buyer: string;
    address_buyer: string;
    created_at: string;
    updated_at: string;
}

interface GetListBuyer {
    data: {
        status: boolean;
        message: string;
        resource: {
            current_page: number;
            data: GetListBuyerItem[];
            first_page_url: string;
            from: null | string;
            last_page: number;
            last_page_url: string;
            links: Links[];
            next_page_url: null | string;
            path: string;
            per_page: number;
            prev_page_url: null | string;
            to: number;
            total: number;
        };
    };
}
interface GetNotifByRoleItem {
    id: number;
    user_id: string;
    notification_name: string;
    status: string;
    spv_id: string;
    riwayat_check_id: string;
    read_at: string;
    created_at: string;
    updated_at: string;
    role_name: 'Spv' | 'Crew' | 'Reparasi';
    role_id: number;
}
interface GetNotifByRole {
    data: {
        status: boolean;
        message: string;
        resource: {
            current_page: number;
            data: GetNotifByRoleItem[];
            first_page_url: string;
            from: null | string;
            last_page: number;
            last_page_url: string;
            links: Links[];
            next_page_url: null | string;
            path: string;
            per_page: number;
            prev_page_url: null | string;
            to: number;
            total: number;
        };
    };
}
interface SpvAprroval {
    data: {
        status: boolean;
        message: string;
        resource: GetNotifByRoleItem;
    };
}

interface RepairItem {
    id: number;
    repair_name: string;
    total_price: string;
    total_price_custom: string;
    total_products: string;
    barcode: string;
    created_at: string;
    updated_at: string;
    repair_products: RepairSubItem[];
}

interface RepairSubItem {
    id: number;
    repair_id: string;
    code_document: string;
    old_barcode_product: string;
    new_barcode_product: string;
    new_name_product: string;
    new_quantity_product: string;
    new_price_product: string;
    new_date_in_product: string;
    new_status_product: string;
    new_quality: string;
    new_category_product: null | string;
    new_tag_product: null | string;
    created_at: null | string;
    updated_at: null | string;
}

interface RepairResponse {
    data: {
        status: boolean;
        message: string;
        resource: {
            current_page: number;
            data: RepairItem[];
            first_page_url: string;
            from: number;
            last_page: number;
            last_page_url: string;
            links: Links[];
            next_page_url: null | string;
            path: string;
            per_page: number;
            prev_page_url: null | string;
            to: number;
            total: number;
        };
    };
}

interface DetailRepairResponse {
    data: {
        status: boolean;
        message: string;
        resource: {
            id: number;
            repair_name: string;
            total_price: string;
            total_custom_price: string;
            total_products: string;
            barcode: string;
            created_at: string;
            updated_at: string;
            repair_products: {
                id: number;
                new_barcode_product: string;
                new_name_product: string;
                new_quantity_product: number;
                new_price_product: number;
            }[];
        };
    };
}
interface SaleReportResponse {
    data: {
        category_report: {
            category_list: {
                category: string | null;
                total_quantity: number;
                total_price: number;
            }[];
            total_harga: number;
        };
    };
    message: string;
    buyer: {
        id: number;
        code_document_sale: string;
        buyer_name_document_sale: string;
        buyer_phone_document_sale: string;
        buyer_address_document_sale: string;
        total_product_document_sale: number;
        total_price_document_sale: string;
        status_document_sale: string;
        created_at: string;
        updated_at: string;
        sales: {
            id: number;
            code_document_sale: string;
            product_name_sale: string;
            product_barcode_sale: string;
            product_price_sale: string;
            product_qty_sale: number;
            status_sale: string;
            created_at: string;
            updated_at: string;
        }[];
    };
}
interface DetailPalletProps {
    data: {
        status: boolean;
        message: string;
        resource: {
            id: number;
            name_palet: string;
            category_palet: string;
            total_price_palet: string;
            total_product_palet: number;
            palet_barcode: string;
            created_at: string;
            updated_at: string;
            palet_products: SubPaletItem[];
        };
    };
}

interface SubPaletItem {
    id: number;
    palet_id: number;
    code_document: string;
    old_barcode_product: string;
    new_barcode_product: string;
    new_name_product: string;
    new_quantity_product: number;
    new_price_product: string;
    old_price_product: null | string;
    new_date_in_product: string;
    new_status_product: string;
    new_quality: string;
    new_category_product: string;
    new_tag_product: null | string;
    created_at: null | string;
    updated_at: null | string;
}

interface SaleProductsProps {
    data: {
        status: boolean;
        message: string;
        resource: {
            current_page: number;
            data: SubSalesProductsProps[];
            first_page_url: string;
            from: number;
            last_page: number;
            last_page_url: string;
            links: Links[];
            next_page_url: null | string;
            path: string;
            per_page: number;
            prev_page_url: null | string;
            to: number;
            total: number;
        };
    };
}

interface SubSalesProductsProps {
    barcode: string;
    name: string;
    category: null;
    created_date: string;
}

interface DumpProps {
    data: {
        message: string;
        resource: {
            current_page: number;
            data: SubPaletItem[];
            first_page_url: string;
            from: number;
            last_page: number;
            last_page_url: string;
            links: Links[];
            next_page_url: string | null;
            path: string;
            per_page: number;
            prev_page_url: string | null;
            to: number;
            total: number;
            status: boolean;
        };
    };
}

interface GetCountColor {
    data: {
        status: boolean;
        message: string;
        resource: {
            biru: number;
            merah: number;
        };
    };
}

export type {
    UserDataItem,
    GenerateInboundDataProcessResponse,
    ProductOlds,
    MergeHeader,
    MergeHeaderBody,
    Barcode,
    CheckProductDocument,
    CheckProductDocumentItem,
    ProductOldsItem,
    GetBarcodeBody,
    GetBarcodeResponse,
    DetailProductOld,
    GetCategories,
    NewProduct,
    NewProductBody,
    ColorTag,
    ColorTagItem,
    GetCategoriesItem,
    CheckAllProducts,
    GetRiwayatcheck,
    GetRiwayatcheckItem,
    DetailGetRiwayatcheck,
    GetAllNewProduct,
    NewProductItem,
    DetailNewProduct,
    DeleteNewProductResponse,
    ProductExpired,
    DetailExpiredProduct,
    ProductExpiredItem,
    BundleItem,
    BundleResponse,
    DetailBundleResponse,
    DeleteBundleResponse,
    FilterProduct,
    GetFilterProductBundles,
    CreateBundle,
    CreateBundleBody,
    PromoLists,
    PromoListItem,
    DetailPromo,
    EditPromoBody,
    EditPromoResponse,
    FilterDisplayPallet,
    filterPalletLists,
    DisplayPallet,
    DeletePaletList,
    PaletLists,
    PaletListItem,
    ProdcutItem,
    CreatePaletResponse,
    CreatePaletBody,
    GetListProductRepair,
    GetListProductRepairItem,
    GetListDump,
    GetListDumpItem,
    CreatePromo,
    CreatePromoBody,
    GetListRole,
    GetListRoleItem,
    GetListAkun,
    GetListAkunItem,
    GetListSale,
    GetListSaleItem,
    GetListMigrate,
    GetListMigrateItem,
    GetListSaleDocument,
    GetListSaleDocumentItem,
    ItemDetailOldsProduct,
    GetShowSaleDocument,
    GetShowSaleDocumentItem,
    GetDashboard,
    GetProductSales,
    GetShowChartInboundOutbound,
    GetInboundData,
    ExportToExcel,
    GetListBuyer,
    GetListBuyerItem,
    GetNotifByRole,
    SpvAprroval,
    GetNotifByRoleItem,
    RepairResponse,
    DetailRepairResponse,
    HistorySubProductItem,
    SaleReportResponse,
    ProductApprovmentItem,
    ProductApprovment,
    DetailPalletProps,
    SubPaletItem,
    SaleProductsProps,
    SubSalesProductsProps,
    DumpProps,
    QCDResponse,
    DetailQCDResponse,
    GetCountColor,
};
