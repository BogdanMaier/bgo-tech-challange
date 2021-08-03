import React from 'react';
import { Route, Switch } from 'react-router-dom';
import ArticleList from '../../components/article-list/ArticleList';
import ArticleView from '../../components/article-view/ArticleView';
import LanguageDropdown from '../../components/language-dropdown/LanguageDropdown';
import './UserPage.scss'

function UserPage() {
    return (
        <>
            <Switch>
                <Route path={`/:locale/articles/:articleId`} >
                    <LanguageDropdown />
                    <ArticleView />
                </Route>
                <Route path={`/:locale/articles`} exact >
                    <LanguageDropdown />
                    <ArticleList />
                </Route>
            </Switch>
        </>
    )
}


export default UserPage;
