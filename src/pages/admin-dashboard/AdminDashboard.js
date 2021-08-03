import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import AdminTable from '../../components/admin-table/AdminTable';
import Article from '../../components/article/Article';
import BackButton from '../../components/back-button/BackButton';
import { LANGUAGES } from '../../context/language/language-context';
import './AdminDashboard.scss'


function AdminDashboard(props) {
    const { path } = useRouteMatch();

    return (
        <>
            <BackButton />
            <Switch>
                <Route path={`${path}/:locale/articles/:articleId`} >
                    <Article />
                </Route>
                <Route path={`${path}/:locale/articles`} exact >
                    <AdminTable />
                </Route>
                <Route path={`${path}/`} >
                    <div>
                        <h3>You should not be here.</h3>
                        <p>
                            Pick one of the following URLs and continue your journey:
                        </p>
                        <ul>
                            {
                                LANGUAGES.entries.map(({ key, value }) => (<li key={key}>
                                    <Link to={`${path}/${key}/articles`}>
                                        {`${value} articles`}
                                    </Link>
                                </li>))
                            }
                        </ul>

                    </div>
                </Route>
            </Switch>
        </>)
}


export default AdminDashboard;
