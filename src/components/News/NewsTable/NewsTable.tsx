import React from 'react';
import NewsCard from '../NewsCard/NewsCard';
import ReactPaginate from 'react-paginate';

import { News } from '../../../models/News';

import './NewsTable.scss';

interface INewsTableProps {
    news: News[];
    currentPage: number;
    pageSize: number;
    totalRows: number;
    setPageHandler: React.Dispatch<React.SetStateAction<number>>;
    showPaginator: boolean;
}

const NewsTable = (props: INewsTableProps) => {
    const onPageChanged = (page: number): void => {
        props.setPageHandler(page);
    };

    return (
        <>
            {
                props.news.map((singleNew: News) => {
                    return (
                        <NewsCard key={singleNew.id} new={singleNew} />
                    );
                })
            }

            { ((!props.news || !props.news.length) && props.showPaginator) ? <span className="d-flex justify-content-center text-info mt-4 mb-5">There're no news in the page.</span> : ''}

            { ((props.news && props.news.length > 0) || props.showPaginator) ?
                <div className="d-flex justify-content-center w-100 paginator mb-4">
                    <ReactPaginate pageCount={props.totalRows} pageRangeDisplayed={props.pageSize} marginPagesDisplayed={props.pageSize}
                        initialPage={props.currentPage} onPageChange={(ev) => onPageChanged(ev.selected)}>
                    </ReactPaginate>
                </div>
                :
                ''
            }
        </>
    );
};

export default NewsTable;