import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface ProductListing {
    id: bigint;
    title: string;
    imageUrls: Array<string>;
    description: string;
    seller: Principal;
    timestamp: Time;
    category: ProductCategory;
    price: bigint;
    condition: ProductCondition;
}
export type Time = bigint;
export interface ProductListingInput {
    imageFiles: Array<ExternalBlob>;
    title: string;
    description: string;
    category: ProductCategory;
    price: bigint;
    condition: ProductCondition;
}
export interface PurchaseDetails {
    productId: bigint;
    paymentId: string;
    buyer: Principal;
}
export interface ChatMessage {
    content: string;
    sender: Principal;
    timestamp: Time;
}
export interface UserProfile {
    name: string;
    role: string;
    email: string;
}
export enum ProductCategory {
    automotive = "automotive",
    tools = "tools",
    clothing = "clothing",
    other = "other",
    toys = "toys",
    furniture = "furniture",
    beauty = "beauty",
    books = "books",
    sports = "sports",
    electronics = "electronics",
    homeAppliances = "homeAppliances"
}
export enum ProductCondition {
    new_ = "new",
    fair = "fair",
    good = "good",
    poor = "poor",
    likeNew = "likeNew"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createProductListing(listingInput: ProductListingInput): Promise<bigint>;
    createTracking(buyer: Principal, productId: bigint): Promise<bigint>;
    getAllProducts(): Promise<Array<ProductListing>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMessages(conversationId: bigint): Promise<Array<ChatMessage> | null>;
    getProductById(id: bigint): Promise<ProductListing | null>;
    getTracking(trackingId: bigint): Promise<string>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    purchaseProduct(purchaseDetails: PurchaseDetails): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    sendMessage(recipient: Principal, content: string): Promise<void>;
    updateTracking(trackingId: bigint, status: string): Promise<string>;
}
