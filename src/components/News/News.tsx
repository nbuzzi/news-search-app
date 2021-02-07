import React, { useCallback, useContext, useEffect, useState } from 'react';

import { useFormik } from 'formik';
import { Button, Col, Container, FormControl, InputGroup, Row, Spinner } from 'react-bootstrap';
import { SearchServiceContext } from '../../services/context/SearchServiceContext';
import { useToasts } from 'react-toast-notifications';
import { News, NewsResponse } from '../../models/News';

import NewsTable from './NewsTable/NewsTable';

import './News.scss';

interface INewsComponentProps {
    searchText?: string;
}

const validate = (values: INewsComponentProps) => {
    const errors: INewsComponentProps = {};

    if (!values.searchText) {
        errors.searchText = `Required`;
    } else if (values.searchText.length > 15) {
        errors.searchText = `Search text must be 15 characters or less.`;
    }

    return errors;
};

const renderSpinner = () => {
    return (
        <Container>
            <Row>
                <Col></Col>
                <Col xs={6} className="d-flex justify-content-center mt-4"><Spinner animation="border" variant="primary" className="spinner" /></Col>
                <Col></Col>
            </Row>
        </Container>
    );
};

const NewsComponent: React.FC = () => {
    const [news, setNews] = useState([] as News[]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [pageSize] = useState(6);
    const [totalRowCount, setTotalRowCount] = useState(0);

    const searchServiceContext = useContext(SearchServiceContext);

    const { addToast } = useToasts();

    const processSearchRequest = useCallback((searchText: string) => {
        if (!searchText) {
            return;
        }

        setLoading(true);

        searchServiceContext.searchByQuery(searchText, page, pageSize).subscribe((response: NewsResponse) => {
            setLoading(false);
            setNews(response.value);
            setTotalRowCount(response.totalCount);
        }, (err) => {
            console.error(err);
            setLoading(false);
            addToast(`Error obtaining news, please try again later.`, { appearance: 'error', autoDismiss: true });
        });
    }, [addToast, page, pageSize, searchServiceContext]);

    const formik = useFormik({
        initialValues: {
            searchText: '',
        },
        validate,
        onSubmit: (values: INewsComponentProps) => {
            if (values && values.searchText) {
                const { searchText } = values;

                processSearchRequest(searchText);
            }
        }
    });

    useEffect(() => {
        processSearchRequest((formik.values && formik.values.searchText) || '');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, processSearchRequest]);

    return (
        <>
            <h2>News search</h2>
            <form onSubmit={formik.handleSubmit}>
                <InputGroup className="mb-3">
                    <FormControl
                        id="searchText"
                        placeholder="Filter here..."
                        aria-label="Filter here..."
                        aria-describedby="basic-addon2"
                        onChange={formik.handleChange}
                        value={formik.values.searchText}
                    />
                    <InputGroup.Append>
                        <Button variant="outline-secondary" type="submit">Search</Button>
                    </InputGroup.Append>
                </InputGroup>
            </form>

            <Container className="d-flex flex-wrap justify-content-center">
                {
                    loading ? renderSpinner() : <NewsTable news={news} currentPage={page} pageSize={6} totalRows={totalRowCount} setPageHandler={setPage} />
                }
            </Container>
        </>
    );
};

export default NewsComponent;