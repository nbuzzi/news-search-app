/**
 * News response interface.
 */
export interface NewsResponse {
    didUMean: string;
    relatedSearch: News[];
    totalCount: number;
    value: News[];
    _type: string;
}

/**
 * News model interface.
 */
export interface News {
    id: string;
    title: string;
    url: string;
    body: string;
    datePublished: string;
    description: string;
    isSafe: true;
    keywords: string;
    language: string;
    provider: NewsProvider;
    image: NewsImage;
}

/**
 * News image provider interface.
 */
export interface NewsProvider {
    favIcon: string;
    favIconBase64Encoding: string;
    name: string;
}

/**
 * News image interface.
 */
export interface NewsImage {
    base64Encoding: string;
    height: number;
    imageWebSearchUrl: string | null;
    name: string | null;
    provider: NewsProvider;
    thumbnail: string;
    thumbnailHeight: number;
    thumbnailWidth: number;
    title: string | null;
    url: string;
    webpageUrl: string;
    width: number;
}