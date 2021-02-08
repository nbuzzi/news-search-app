import React from 'react';
import axios from 'axios';

import { NewsResponse } from '../../models/News';
import { Observable } from 'rxjs';
import { AxiosInstance } from 'axios';
import { MockedData } from './MockedData';

// For testing purpuses and to prevent too many request in the limited API that we've.
const MOCKED_DATA_ENABLED: boolean = false;

export interface ISearchServiceContext {
    children?: JSX.Element;
    searchByQuery: (query: string, pageNumber: number, pageSize: number, withThumbnails?: boolean, safeSearch?: boolean) => Observable<NewsResponse>;
}

interface ICustomHeaders {
    'x-rapidapi-key'?: string;
    'x-rapidapi-host'?: string;
}

export const SearchServiceContext: React.Context<ISearchServiceContext> = React.createContext<ISearchServiceContext>(undefined!);

export const SeearchServiceContextProvider = (props: any) => {
    const baseURL: string = `https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/`;
    const searchAPI: string = `NewsSearchAPI`;
    const headers: ICustomHeaders = { 'x-rapidapi-key': 'e28105562fmsh01edebafeeb6117p1f37e7jsn0221a314ae3d', 'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com' };

    /**
     * Axios instance.
     */
    const axiosInstance: AxiosInstance = axios.create({
        baseURL
    });

    /**
     * Obtains all the news based on a given/provided filter.
     * @param query query filter
     * @param pageNumber page number
     * @param pageSize page size
     * @param withThumbnails (optional) include thumbnails
     * @param safeSearch (optional) include adult content (default: true)
     */
    const newsSearch = (query: string, pageNumber: number, pageSize: number, withThumbnails: boolean = true, safeSearch: boolean = true): Observable<NewsResponse> => {
        // This is a feature-flag (by default configured in false) to determine if this method should return or not a mocked response.
        if (MOCKED_DATA_ENABLED) {
            const getMockedData = new Observable<NewsResponse>(observer => {
                observer.next(MockedData as NewsResponse);
                observer.complete();
            });

            return getMockedData;
        }

        /*
        * Based on the given document with the requirement spec (along with the respective API information and headers/auth)
        * The parameter to determine the current page selected is "page" but it doesn't work.
        * Therefore in the following official link (API's documentation): https://rapidapi.com/contextualwebsearch/api/web-search?endpoint=apiendpoint_b8b43008-dd94-4b86-8fd0-26d70a4e870b
        * The doc indicates that the parameter should be "pageNumber" instead of just "page".
        */
        return new Observable((observer) => {
            axiosInstance.get<NewsResponse>(searchAPI, {
                headers,
                params: {
                    q: query,
                    pageNumber, // read above.
                    pageSize,
                    withThumbnails,
                    safeSearch
                },
            })
                .then((response) => {
                    if (response.status === 200) {
                        observer.next(response.data);
                        observer.complete();

                        return;
                    }

                    observer.error(response);
                })
                .catch((err) => observer.error(err));
        });
    }

    const searchServiceProviderValue: ISearchServiceContext = {
        searchByQuery: newsSearch,
    };

    return (
        <SearchServiceContext.Provider value={searchServiceProviderValue}>
            {props.children}
        </SearchServiceContext.Provider>
    );
};