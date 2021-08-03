import { get as getPath } from 'lodash';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link, useHistory, useParams, useRouteMatch } from 'react-router-dom';
import { ArticlesContext } from '../../context/articles/articles-context';
import { LanguageContext } from '../../context/language/language-context';
import { DateFormaterEnCA } from '../../util/DateUtils';
import './ArticleView.scss'

function ArticleView() {
    const [article, setArticle] = useState();
    const {articleId} = useParams();
    const {locale} = useParams();
    const {url} = useRouteMatch();
    const history = useHistory();
    const {loaded, get} = useContext(ArticlesContext);
    const {goBack} = useContext(LanguageContext);


    useEffect(() => {
        function initArticle() {
            const storageArticle = get(articleId, true)
            setArticle(storageArticle)
        }
        initArticle();
    }, [loaded, articleId])


    const formatDate = (dateStr) => {
        if (!dateStr) {
            return
        }
        return DateFormaterEnCA(new Date(dateStr))
    }

    if (!article) {
        return 'Loading...'
    }
    return (
        <div className="ArticleView">
            <h1>
                Article listing
            </h1>
            <h3>
                Article Details
            </h3>
            <h4>
                { getPath(article, `localized.${locale}.title`) }
            </h4>
            <p dangerouslySetInnerHTML={{ __html: getPath(article, `localized.${locale}.content`)}} />

            <div className="date"> {formatDate(article.date)} </div>

            <footer>
                <Row>
                    <Col xl lg="8">
                        <hr />
                    </Col>
                    <Col lg="4">
                        <span style={{lineHeight: 2}}
                        onClick={() => goBack(history, url)}>{"<- "}Back to the listing</span>
                    </Col>
                </Row>
                <Row>
                    <Col sm md="2">
                        {
                            article?.prev &&
                            <Link to={`/en/articles/${article.prev}`}>
                                {' < Previous'}
                            </Link>
                        }
                    </Col>
                    <Col sm md="2">
                        {
                            article?.next &&
                            <Link to={`/en/articles/${article.next}`}>
                                {'Next > '}
                            </Link>
                        }
                    </Col>
                </Row>
            </footer>
        </div>
    )
};


export default ArticleView;
