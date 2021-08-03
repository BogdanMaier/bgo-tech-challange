import React, { useContext } from 'react';
import { Link, useParams, useRouteMatch } from 'react-router-dom';
import { ArticlesContext } from '../../context/articles/articles-context';
import './AdminTable.scss'

function AdminTable() {
    const { articles, remove } = useContext(ArticlesContext)
    const { url } = useRouteMatch();
    const { locale } = useParams();


    const onRemove = (id, title) => {
      return () => {
          const result = window.confirm(`Are you sure you want to delete "${title}"?`);
          if (result) {
              remove(id)
          }
      }
}

    const renderActions = (id, title) => {
        return (
            <>
                <Link to={`${url}/${id}`}>
                    Update
                </Link>
                {' '}
                <a href="javascript:undefined"
                   onClick={onRemove(id, title)}>
                    Remove
                </a>
            </>
        )
    }

    const renderArticles = () => {
        return (
            <>
                {
                    articles?.length > 0 && articles
                        .map(({ id, date, localized, actions }) => (
                            <tr key={id}>
                                <td>{ date?.substr(0,10)}</td>
                                <td>{ localized[locale]?.title || '(not set)' }</td>
                                <td>{ renderActions(id, localized[locale]?.title) }</td>
                            </tr>))
                }
           </>
        )
    }

    return (
        <div className="AdminTable">
            <h1>Admin Dashboard</h1>
            <table>
                <thead>
                    <tr id="on-top">
                        <td></td>
                        <td></td>
                        <td>
                            <Link to={`${url}/new`}>
                                + Add new
                            </Link>
                        </td>
                    </tr>
                </thead>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Article name</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    { renderArticles() }
                </tbody>
            </table>

            {
                !articles && 'There are no articles.'
            }
        </div>
    )
};


export default AdminTable;
