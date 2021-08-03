import * as React from 'react';
import { useContext } from 'react';
import { Link, useParams, useRouteMatch } from 'react-router-dom';
import { ArticlesContext } from '../../context/articles/articles-context';
import { DateFormaterEnCA } from '../../util/DateUtils';
import './ArticleList.scss'

function ArticleList() {
    const {articles = []} = useContext(ArticlesContext)
    const {locale} = useParams();
    const {url} = useRouteMatch();

    const formatDate = (dateStr) => {
        if (!dateStr) {
            return
        }
        return DateFormaterEnCA(new Date(dateStr))
    }

    return (<div className="ArticleList">
        <h1>Articles listing</h1>

        <ul>
            {articles.map(({date, localized, id}, index) => (<li key={id || index}>
                <Link to={`${url}/${id}`}>
                    <h4>
                        {localized[locale].title}
                    </h4>
                </Link>
                <p>
                    {localized[locale].content}
                </p>
                <footer> {formatDate(date)} </footer>
            </li>))}
        </ul>
    </div>)
};


export default ArticleList;
