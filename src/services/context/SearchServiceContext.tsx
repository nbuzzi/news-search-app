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
    searchByQuery: (query: string, page: number, pageSize: number) => Observable<NewsResponse>;
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
     * @param page page number
     * @param pageSize page size
     */
    const newsSearch = (query: string, page: number, pageSize: number): Observable<NewsResponse> => {
        if (MOCKED_DATA_ENABLED) {
            const getMockedData = new Observable<NewsResponse>(observer => {
                observer.next(MockedData as NewsResponse);
                observer.complete();
            });

            return getMockedData;
        }

        return new Observable((observer) => {
            axiosInstance.get<NewsResponse>(searchAPI, {
                headers,
                params: {
                    q: query,
                    page,
                    pageSize,
                    withThumbnails: true
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