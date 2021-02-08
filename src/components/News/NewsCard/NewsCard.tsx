/// <reference path="../../../typings/custom-definitions.d.ts" />

import React, { useState } from 'react';
import { Card, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { News, NewsImage } from '../../../models/News';
import { Lightbox } from 'react-modal-image';

import Scrollbars from 'react-custom-scrollbars';

import './NewsCard.scss';

interface INewsCardProps {
    new: News;
}

const renderTooltip = (props: {}) => (
    <Tooltip id="image-tooltip" {...props}>
        Click here to open this image in a full screen window.
    </Tooltip>
);

const NewsCard = (props: INewsCardProps) => {
    const [show, setShow] = useState(false);
    const [imageSourceUrl, setImageSourceUrl] = useState('');
    const [thumbImageSourceUrl, setThumbImageSourceUrl] = useState('');

    const processThumbnail = (image: NewsImage): JSX.Element => {
        if (!image) {
            return <></>;
        }

        const handleImageClick = (imageSourceUrl: string, thumbImageUrl: string): void => {
            setImageSourceUrl(imageSourceUrl);
            setThumbImageSourceUrl(thumbImageUrl);
            setShow(true);
        };

        const notAvailableImageUrl: string = 'http://www.staticwhich.co.uk/static/images/products/no-image/no-image-available.png';

        const imageSource = (image.thumbnail && image.thumbnail.length && image.thumbnail)
            || (image && image.base64Encoding && image.base64Encoding.length && image.base64Encoding)
            || (image.url && image.url.length && image.url)
            || notAvailableImageUrl;

        return (
            <OverlayTrigger
                placement="bottom"
                overlay={renderTooltip}
            >
                <Card.Img variant="top" src={imageSource} onClick={() => handleImageClick(((image.url && image.url.length && image.url) || imageSource),
                    ((image.thumbnail && image.thumbnail.length && image.thumbnail) || imageSource))} onError={(e: ((React.SyntheticEvent<HTMLImageElement, Event>))) => e.currentTarget.src = notAvailableImageUrl} />
            </OverlayTrigger>
        );
    };

    const makeDescription = (description: string): string => {
        if (description && description.length) {
            const splittedDescription: string[] = description.split(' ');
            if (splittedDescription && splittedDescription.length >= 20) {
                return `${splittedDescription.slice(0, 20).join(' ')}...`;
            }

            return `${description}...`;
        }

        return description;
    };

    return (
        <>
            {show ? <Lightbox small={thumbImageSourceUrl} large={imageSourceUrl} alt="" onClose={() => setShow(false)} /> : ''}

            <Row xs={3} md={3} lg={3} className="custom-card mb-2">
                <Col>
                    <Card>
                        {processThumbnail(props.new.image)}
                        <Card.Body>
                            <Card.Title>{props.new.title}</Card.Title>
                            <Scrollbars style={{ height: '10rem', width: '18rem' }}>
                                <Card.Text>
                                    {makeDescription(props.new.body)}
                                </Card.Text>
                            </Scrollbars>

                        </Card.Body>
                        <Card.Footer>
                            <Card.Link className="read-more-link" href={props.new.url} target="_blank">Read more...</Card.Link>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default NewsCard;